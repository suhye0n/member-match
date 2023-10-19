import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';
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

const firebaseConfig = {
    apiKey: "AIzaSyBT5YGKrfgzcjENaADP_QFm56JXsJA_JzQ",
    authDomain: "swedu2023-c17ce.firebaseapp.com",
    projectId: "swedu2023-c17ce",
    storageBucket: "swedu2023-c17ce.appspot.com",
    messagingSenderId: "676960709919",
    appId: "1:676960709919:web:179417a9018bda84c8d42a",
    measurementId: "G-93JEKWQRZ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function Chat() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const getUsernameFromLocalStorage = () => {
        const username = localStorage.getItem('username');
        return username || '기본 사용자 이름';
    }

    useEffect(() => {
        const chatRef = ref(db, 'chats');
        onValue(chatRef, (snapshot) => {
            if (snapshot.exists()) {
                const chatData = snapshot.val();
                const chatList = Object.values(chatData);

                const username = getUsernameFromLocalStorage();

                const userChats = chatList.filter((chat) => chat.members && chat.members.includes(username));

                if (userChats.length === 0) {
                    const newChatRef = push(ref(db, 'chats'));
                    const newChatKey = newChatRef.key;

                    const chatInfo = {
                        id: newChatKey,
                        name: '임의의 채팅방',
                        members: ['수현', '사용자1', '사용자2', '사용자3', '사용자4'],
                    };

                    set(ref(db, `chats/${newChatKey}`), chatInfo);

                    function createMessage(sender, text) {
                        return {
                            sender,
                            text,
                            timestamp: new Date().getTime(),
                            read: true,
                        };
                    }

                    const messages = [
                        createMessage('수현', '안녕하세요!'),
                        createMessage('사용자1', '안녕!'),
                        createMessage('수현', '오늘 어떤 일이 있었나요?'),
                        createMessage('사용자1', '오늘은 피곤했어요.'),
                        createMessage('수현', '이해해요. 푹 쉬세요.'),
                    ];

                    messages.forEach((message) => {
                        const messageRef = push(ref(db, `chats/${newChatKey}/messages`));
                        set(messageRef, message);
                    });
                }

                setChats(userChats);
            }
        });
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        if (selectedChat) {
            const chatRef = ref(db, `chats/${selectedChat.id}/messages`);
            const newMessageData = {
                text: newMessage,
                sender: '수현',
                timestamp: new Date().getTime(),
                read: true,
            };
            push(chatRef, newMessageData, (error) => {
                if (error) {
                    console.error('메시지 보내기 실패: ', error);
                } else {
                    setNewMessage('');
                }
            });
        }
    };

    useEffect(() => {
        if (selectedChat) {
            const chatRef = ref(db, `chats/${selectedChat.id}/messages`);
            onValue(chatRef, (snapshot) => {
                if (snapshot.exists()) {
                    const messageData = snapshot.val();
                    const messageList = Object.values(messageData);
                    setSelectedChat((prevSelectedChat) => ({
                        ...prevSelectedChat,
                        messages: messageList,
                    }));
                }
            });
        }
    }, [selectedChat]);

    const selectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <Container>
            <ChatList>
                {chats.map((chat) => (
                    <ChatItem key={chat.id} onClick={() => selectChat(chat)}>
                        {chat.name}
                        {Array.isArray(chat.messages) &&
                            chat.messages.some((message) => !message.read) && (
                                <UnreadMessageCount>
                                    {chat.messages.filter((message) => !message.read).length}
                                </UnreadMessageCount>
                            )}
                    </ChatItem>
                ))}
            </ChatList>
            <ChatView>
                {selectedChat && (
                    <>
                        <h2>{selectedChat.name}</h2>
                        <Scroll>
                            {Array.isArray(selectedChat.messages) ? (
                                selectedChat.messages.map((message) => (
                                    <div key={message.timestamp}>
                                        {message.sender !== '수현' && (
                                            <ChatBubbleSender>{message.sender}</ChatBubbleSender>
                                        )}
                                        <ChatBubble isUser={message.sender === '수현'}>
                                            <ChatBubbleContent>{message.text}</ChatBubbleContent>
                                        </ChatBubble>
                                        <ChatBubbleTimestamp isUser={message.sender === '수현'}>
                                            {new Date(message.timestamp).toLocaleString()}
                                        </ChatBubbleTimestamp>
                                    </div>
                                ))
                            ) : (
                                <div>No messages</div>
                            )}
                        </Scroll>
                        <InputContainer>
                            <Input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <SendButton onClick={sendMessage}>전송</SendButton>
                        </InputContainer>
                    </>
                )}
            </ChatView>
        </Container>
    );
}

export default Chat;