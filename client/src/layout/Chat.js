import React, { useState } from 'react';
import styled from 'styled-components';

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
    overflow: auto;
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
    const [chats, setChats] = useState([
        {
            id: 1,
            name: '토이 프로젝트 멤버 모집 사이트',
            type: 'group',
            members: 3,
            messages: [
                {
                    id: 1,
                    text: '안녕하세요!',
                    sender: 'User1',
                    read: false,
                    timestamp: new Date('2023-10-12T09:30:00'),
                },
                {
                    id: 2,
                    text: '안녕하세요! 반가워요!',
                    sender: 'User2',
                    read: true,
                    timestamp: new Date('2023-10-12T09:31:00'),
                },
            ],
        },
        {
            id: 2,
            name: 'User3',
            type: 'private',
            messages: [
                {
                    id: 3,
                    text: '안녕, User3!',
                    sender: 'User1',
                    read: true,
                    timestamp: new Date('2023-10-12T10:15:00'),
                },
                {
                    id: 4,
                    text: '안녕, User1!',
                    sender: 'User3',
                    read: false,
                    timestamp: new Date('2023-10-12T10:16:00'),
                },
            ],
        },
    ]);

    const markChatAsRead = (chat) => {
        if (chat) {
          const updatedChats = chats.map((c) => {
            if (c.id === chat.id) {
              return {
                ...c,
                messages: c.messages.map((message) => ({
                  ...message,
                  read: true,
                })),
              };
            }
            return c;
          });
          setChats(updatedChats);
          setSelectedChat(updatedChats.find((c) => c.id === chat.id));
        }
      };  

      return (
        <Container>
            <ChatList>
                {chats.map((chat) => (
                    <ChatItem key={chat.id} onClick={() => markChatAsRead(chat)}>
                        {chat.type === 'group' ? `${chat.name} (${chat.members})` : chat.name}
                        {chat.messages.some((message) => !message.read) && (
                            <UnreadMessageCount>
                                {chat.messages.filter((message) => !message.read).length}
                            </UnreadMessageCount>
                        )}
                    </ChatItem>
                ))}
            </ChatList>
            {selectedChat && (
                <ChatView>
                    <h2>{selectedChat.name}</h2>
                    <Scroll>
                        {selectedChat.messages.map((message) => (
                            <div key={message.id}>
                                {message.sender !== 'User1' && (
                                    <ChatBubbleSender>{message.sender}</ChatBubbleSender>
                                )}
                                <ChatBubble isUser={message.sender === 'User1'}>
                                    <ChatBubbleContent>{message.text}</ChatBubbleContent>
                                </ChatBubble>
                                <ChatBubbleTimestamp isUser={message.sender === 'User1'}>
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
                        />
                        <SendButton onClick={() => markChatAsRead(selectedChat)}>
                            전송
                        </SendButton>
                    </InputContainer>
                </ChatView>
            )}
        </Container>
    );
};

export default Chat;