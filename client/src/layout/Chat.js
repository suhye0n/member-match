import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    addMessageToChat,
    updateChat,
    markMessageAsRead,
    getChatById,
    getAllChats,
} from '../service/ApiService';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    z-index: 10;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: #FFFEFA;
`;

const ChatItem = styled.div`
    padding: 30px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid #eceae5;
    position: relative;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #f0f0f0;
    }
`;

const UnreadMessageCount = styled.div`
    position: absolute;
    top: 13px;
    right: 13px;
    width: 10px;
    height: 10px;
    padding: 5px;
    background: #feaca9;
    border-radius: 50%;
    cursor: pointer;
    font-size: 10px;
    text-align: center;
`;

const ChatList = styled.div`
    width: 30%;
    background: #fff;
    border-radius: 10px 0 0 10px;
    box-shadow: 0px 3px 6px 0px #eceae5;
    overflow: hidden;
`;

const ChatView = styled.div`
    width: calc(70% - 40px);
    background: #fff;
    border-radius: 0 10px 10px 0;
    box-shadow: 0px 3px 6px 0px #eceae5;
    padding: 20px;
`;

const Scroll = styled.div`
    max-height: 60vh;
    overflow-y: scroll;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eceae5;
    flex: 1;
`;

const SendButton = styled.button`
    background: #A9EAFE;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
`;

const ChatBubbleTimestamp = styled.div`
    font-size: 10px;
    color: #999;
    text-align: ${(props) => (props.isUser ? 'right' : 'left')};
    margin: 10px;
`;

const ChatBubble = styled.div`
    background: ${(props) => (props.isUser ? '#e1ffd3' : '#A9EAFE')};
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    width: max-content;
    max-width: 70%;
    margin-left: ${(props) => (props.isUser ? 'auto' : '5px')};
    margin-right: ${(props) => (props.isUser ? '5px' : 'auto')};
    align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
    display: flex;
    flex-direction: column;
`;

const ChatBubbleContent = styled.div`
    margin: 5px;
`;

const ChatBubbleSender = styled.div`
    font-size: 14px;
    margin: 10px;
    margin-bottom: 5px;
`;

const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [username] = useState(localStorage.getItem('username') || '');
    const chatScrollRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatData = await getAllChats();
                setChats(chatData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchChats();
    }, []);

    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [selectedChat]);

    const sendMessage = async () => {
        if (newMessage && selectedChat) {
            const message = {
                text: newMessage,
                sender: username,
                timestamp: Date.now(),
                read: false,
            };

            try {
                const updatedChat = await addMessageToChat(selectedChat.id, message);

                setSelectedChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, message],
                }));

                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === updatedChat.id ? updatedChat : chat
                    )
                );

                setNewMessage('');
            } catch (error) {
                console.error('Failed to send the message:', error);
            }
        }
    };

    const markChatAsRead = async (chat) => {
        if (chat) {
            if (chat.messages) {
                for (const message of chat.messages) {
                    if (!message.read && message.unreadMembers.includes(username)) {
                        try {
                            await markMessageAsRead(chat.id, message.id, username);
                        } catch (error) {
                            console.error(`Failed to mark message as read: ${error}`);
                        }
                    }
                }

                try {
                    updateChat(chat.id, chat);
                    const updatedChat = await getChatById(chat.id);
                    setSelectedChat(updatedChat);
                    setChats((prevChats) =>
                        prevChats.map((c) => (c.id === chat.id ? updatedChat : c))
                    );
                } catch (error) {
                    console.error(`Failed to update chat: ${error}`);
                }
            }
        }
    };

    const handleChatItemClick = (chat) => {
        if (chat) {
            markChatAsRead(chat);
        }
    };

    const getUnreadMessageCount = (chat) => {
        if (chat && chat.messages) {
            return chat.messages.reduce((count, message) => {
                if (!message.read && message.unreadMembers.includes(username)) {
                    return count + 1;
                }
                return count;
            }, 0);
        }
        return 0;
    };

    const filteredChats = chats.filter(chat => chat.members.includes(username));

    return (
        <Container>
            <ChatList>
                {filteredChats.map((chat) => (
                    <ChatItem key={chat.id} onClick={() => handleChatItemClick(chat)}>
                        {chat.type === 'group' ? `${chat.name} (${chat.members})` : chat.name}
                        {getUnreadMessageCount(chat) > 0 && (
                            <UnreadMessageCount>
                                {getUnreadMessageCount(chat)}
                            </UnreadMessageCount>
                        )}
                    </ChatItem>
                ))}
            </ChatList>
            {selectedChat && (
                <ChatView>
                    <h2>{selectedChat.name}</h2>
                    <Scroll ref={chatScrollRef}>
                        {selectedChat.messages.map((message) => (
                            <div key={message.id}>
                                {message.sender !== username && (
                                    <ChatBubbleSender>{message.sender}</ChatBubbleSender>
                                )}
                                <ChatBubble isUser={message.sender === username}>
                                    <ChatBubbleContent>{message.text}</ChatBubbleContent>
                                </ChatBubble>
                                <ChatBubbleTimestamp isUser={message.sender === username}>
                                    {new Date(message.timestamp).toLocaleString()}
                                </ChatBubbleTimestamp>
                            </div>
                        ))}
                    </Scroll>
                    <InputContainer>
                        <Input
                            type="text"
                            placeholder="메시지를 입력하세요"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <SendButton onClick={sendMessage}>
                            전송
                        </SendButton>
                    </InputContainer>
                </ChatView>
            )}
        </Container>
    );
};

export default Chat;
