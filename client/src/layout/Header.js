import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import Chat from './Chat';
import Notification from './Notification';

const StyledHeader = styled.div`
    width: calc(100% - 160px);
    padding: 40px 80px;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    display: flex;
    align-items: center;
    grid-area: header;
    
    @media (max-width: 768px) {
        width: calc(100% - 40px);
        padding: 10px 20px;
    }

    a {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        transition: 0.4s;
        &:hover {
            opacity: 0.7;
        }
    }
`;

const CateBtn = styled.div`
    display: inline-flex;
    margin-left: 30px;
    gap: 30px;
    font-size: 14px;
`;

const MenuBtn = styled.div`
    display: inline-flex;
    margin-left: auto;
    gap: 20px;
    font-size: 14px;
`;

const TransBtn = styled.div`
    display: inline-flex;
    margin-left: auto;
    gap: 20px;
    font-size: 14px;
    padding: 10px 20px;
`;

const BlackBtn = styled.div`
    display: inline-flex;
    margin-left: auto;
    gap: 20px;
    font-size: 14px;
    background: #000;
    padding: 10px 20px;
    border-radius: 10px;
    * {
        color: #fff !important;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Modal = styled.div`
    animation: ${(props) => (props.open ? fadeIn : fadeOut)} .4s ease;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 60px 20px 20px 20px;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    width: 90%;
    max-height: 80%;
    max-width: 550px;
    overflow: auto;

    h2 {
        text-align: center;
    }
`;

const ChatModal = styled.div`
    animation: ${(props) => (props.open ? fadeIn : fadeOut)} .4s ease;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    width: 90%;
    max-height: 80%;
    max-width: 850px;
    overflow: auto;

    h2 {
        text-align: center;
    }
`;

const CloseBtn = styled.button`
    text-align: center;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 38px !important;
    height: 38px !important;
    border-radius: 50%;
    padding: 10px;
    font-size: 1rem;
    background: #feaca9 !important;
    border: none;
    transition: 0.4s;
    cursor: pointer;
    white-space: normal;
    overflow-wrap: break-word;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 999;

    &:hover {
        opacity: 0.7;
    }
`;

const BlurBackground = styled.div`
    animation: ${(props) => (props.open ? fadeIn : fadeOut)} .4s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    z-index: 998;
`;

const ChatIconWithBadge = styled.div`
  position: relative;

  .badge {
    position: absolute;
    top: -18px;
    right: -18px;
    background: #feaca9;
    width: 10px;
    height: 10px;
    padding: 5px;
    border-radius: 50%;
    font-size: 10px;
    text-align: center;
  }
`;

const Header = () => {
    const navigate = useNavigate();
    const userExists = !!localStorage.getItem('user');
    const [isChatOpen, setChatOpen] = useState(false);
    const [isNotiOpen, setNotiOpen] = useState(false);

    const chats = [
        {
            id: 1,
            name: '토이 프로젝트 멤버 모집 사이트',
            type: 'group',
            members: 3,
            messages: [
                { id: 1, text: '안녕하세요!', sender: 'User1', read: false },
                { id: 2, text: '안녕하세요! 반가워요!', sender: 'User2', read: true },
            ],
        },
        {
            id: 2,
            name: 'User3',
            type: 'private',
            messages: [
                { id: 3, text: '안녕, User3!', sender: 'User1', read: true },
                { id: 4, text: '안녕, User1!', sender: 'User3', read: false },
            ],
        },
    ];

    const notifications = [
        {
            text: '알림 1 내용',
            date: '2023-10-09',
            read: false,
        },
        {
            text: '알림 2 내용',
            date: '2023-10-08',
            read: true,
        },
        {
            text: '알림 3 내용',
            date: '2023-10-07',
            read: false,
        },
        {
            text: '알림 4 내용',
            date: '2023-10-06',
            read: false,
        },
        {
            text: '알림 5 내용',
            date: '2023-10-05',
            read: false,
        },
    ];

    const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
    const unreadChatCount = chats.reduce((count, chat) => {
        return count + chat.messages.filter((message) => !message.read).length;
    }, 0);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <StyledHeader>
                <Link to='/'>
                    <h2>멤버매치</h2>
                </Link>

                <CateBtn>
                    <Link to='/about'>소개</Link>
                    <Link to='/notice'>공지사항</Link>
                    <Link to='/list'>멤버 모집</Link>
                    <Link to='/list/my'>내 프로젝트</Link>
                    <ChatIconWithBadge>
                        <a onClick={() => setChatOpen(true)}>채팅</a>
                        {unreadChatCount > 0 && (
                            <span className="badge">{unreadChatCount}</span>
                        )}
                    </ChatIconWithBadge>
                    <ChatIconWithBadge>
                        <a onClick={() => setNotiOpen(true)}>알림</a>
                        {unreadNotificationCount > 0 && (
                            <span className="badge">{unreadNotificationCount}</span>
                        )}
                    </ChatIconWithBadge>
                    {/* {userExists && <Link to='/list/my'>내 프로젝트</Link>}
{userExists && <Link to='/chat'>채팅</Link>}
{userExists && <Link to='/notice'>알림</Link>} */}
                </CateBtn>

                <MenuBtn>
                    <TransBtn><a onClick={handleLogout}>로그아웃</a></TransBtn>
                    <BlackBtn><Link to='/mypage'>마이페이지</Link></BlackBtn>
                    {/* {userExists && <Link to='/mypage'>마이페이지</Link>}
                {userExists && <a onClick={handleLogout}>로그아웃</a>} */}
                    {!userExists && <TransBtn><Link to='/login'>로그인</Link></TransBtn>}
                    {!userExists && <BlackBtn><Link to='/signup'>회원가입</Link></BlackBtn>}
                </MenuBtn>
            </StyledHeader>

            {isChatOpen && (
                <>
                    <BlurBackground open={isChatOpen} onClick={() => setChatOpen(false)} />
                    <ChatModal open={isChatOpen}>
                        <CloseBtn onClick={() => setChatOpen(false)}>X</CloseBtn>
                        <Chat />
                    </ChatModal>
                </>
            )}

            {isNotiOpen && (
                <>
                    <BlurBackground open={isNotiOpen} onClick={() => setNotiOpen(false)} />
                    <Modal open={isNotiOpen}>
                        <CloseBtn onClick={() => setNotiOpen(false)}>X</CloseBtn>
                        <Notification />
                    </Modal>
                </>
            )}
        </>
    );
};

export default Header;