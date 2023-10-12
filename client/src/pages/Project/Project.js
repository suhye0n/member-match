import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineReportGmailerrorred, MdStarBorder, MdChatBubbleOutline } from 'react-icons/md';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Chat from '../../layout/Chat';

const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: rgba(224, 199, 195, .2);
    padding: 40px;
    border: none;
    margin-bottom: 30px;
  }
`;

const EventInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  padding: 5px;
`;

const EventButton = styled.button`
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const Heading = styled.div`
    padding: 150px 20% 50px 20%;
    background: url('/bg3.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 20% 50px 20%;
    background: #fff;
`;

const Tag = styled.span`
    background: #000;
    color: #FFF;
    padding: 5px 8px;
    border-radius: 3px;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: rgba(224, 199, 195, .2);
    padding: 40px;
    margin-bottom: 30px;
    
    h2 {
        font-size: 24px;
        margin-bottom: 30px;
    }

    div {
        display: flex;
        align-items: center;
        margin: 5px 0;

        span {
            margin-right: 10px;
        }
    }
    
    svg {
        margin-right: 4px;
    }

    .btns {
        margin-left: auto;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
`;

const Rate = styled.div`
    margin-left: 10px !important;
    color: #F3BAAF;
`;

const Icon = styled.span`
    align-self: center;
    margin-right: 10px;

    * {
        height: 30px;
    }
`;

const TransBtn = styled.div`
    float: right;
    display: inline;
    margin-left: 10px;
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: .4s;

    &:hover {
        opacity: 0.7;
    }
`;

const BlackBtn = styled.button`
    float: right;
    display: inline;
    margin-left: 10px;
    font-size: 14px;
    background: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    transition: .4s;

    &:hover {
        opacity: 0.7;
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

const Project = () => {
    const [isRecruitOpen, setRecruitOpen] = useState(false);
    const [isAnswerOpen, setAnswerOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false);
    const [isRateOpen, setRateOpen] = useState(false);
    const [isReportOpen, setReportOpen] = useState(false); const [date, setDate] = useState(new Date());
    const [newEventTitle, setNewEventTitle] = useState('');


    const [events, setEvents] = useState([
        {
            title: '로그인 기능 만들기',
            description: '로그인 기능',
            date: new Date(2023, 9, 15),
        },
        {
            title: '회원가입 성공하기',
            description: '성공',
            date: new Date(2023, 9, 20),
        },
    ]);

    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);
    };

    const addEvent = () => {
        if (newEventTitle.trim() === '') {
            return;
        }

        const newEvent = {
            date,
            title: newEventTitle,
        };

        setEvents([...events, newEvent]);
        setNewEventTitle('');
    };

    return (
        <>
            {isRecruitOpen && (
                <>
                    <BlurBackground open={isRecruitOpen} onClick={() => setRecruitOpen(false)} />
                    <Modal open={isRecruitOpen}>
                        <CloseBtn onClick={() => setRecruitOpen(false)}>X</CloseBtn>
                        <Chat />
                    </Modal>
                </>
            )}

            {isAnswerOpen && (
                <>
                    <BlurBackground open={isAnswerOpen} onClick={() => setAnswerOpen(false)} />
                    <Modal open={isAnswerOpen}>
                        <CloseBtn onClick={() => setAnswerOpen(false)}>X</CloseBtn>
                        <Chat />
                    </Modal>
                </>
            )}

            {isProfileOpen && (
                <>
                    <BlurBackground open={isProfileOpen} onClick={() => setProfileOpen(false)} />
                    <Modal open={isProfileOpen}>
                        <CloseBtn onClick={() => setProfileOpen(false)}>X</CloseBtn>
                        <Chat />
                    </Modal>
                </>
            )}

            {isChatOpen && (
                <>
                    <BlurBackground open={isChatOpen} onClick={() => setChatOpen(false)} />
                    <ChatModal open={isChatOpen}>
                        <CloseBtn onClick={() => setChatOpen(false)}>X</CloseBtn>
                        <Chat />
                    </ChatModal>
                </>
            )}

            {isRateOpen && (
                <>
                    <BlurBackground open={isRateOpen} onClick={() => setRateOpen(false)} />
                    <Modal open={isRateOpen}>
                        <CloseBtn onClick={() => setRateOpen(false)}>X</CloseBtn>
                        <Chat />
                    </Modal>
                </>
            )}

            {isReportOpen && (
                <>
                    <BlurBackground open={isReportOpen} onClick={() => setReportOpen(false)} />
                    <Modal open={isReportOpen}>
                        <CloseBtn onClick={() => setReportOpen(false)}>X</CloseBtn>
                        <Chat />
                    </Modal>
                </>
            )}

            <Heading>
                <h1>프로젝트 제목</h1>
                <p>프로젝트 설명</p>
                <FlexContainer>
                    <Icon><BiCategory /></Icon>
                    <Tag>#게임</Tag>
                </FlexContainer>
                <FlexContainer>
                    <Icon><BiLogoReact /></Icon>
                    <Tag>#게임</Tag>
                    <Tag>#게임</Tag>
                </FlexContainer>

                <BlackBtn>삭제</BlackBtn>
                <BlackBtn>수정</BlackBtn>
                <BlackBtn onClick={() => setRecruitOpen(true)}>모집</BlackBtn>
            </Heading>

            <Container>
                <ListItem>
                    <h2>멤버 지원자</h2>

                    <div>
                        <p>홍길동</p>
                        <Rate>★★★★☆</Rate>
                        <div className='btns'>
                            <BlackBtn onClick={() => setAnswerOpen(true)}>답변</BlackBtn>
                            <BlackBtn>승인</BlackBtn>
                            <BlackBtn>거절</BlackBtn>
                        </div>
                    </div>

                    <div>
                        <p>홍길동</p>
                        <Rate>★★★★☆</Rate>
                        <div className='btns'>
                            <BlackBtn onClick={() => setAnswerOpen(true)}>답변</BlackBtn>
                            <BlackBtn>승인</BlackBtn>
                            <BlackBtn>거절</BlackBtn>
                        </div>
                    </div>
                </ListItem>

                <ListItem>
                    <h2>멤버</h2>

                    <div>
                        <p>박길동 (팀장)</p>
                        <div className='btns'>
                            <TransBtn onClick={() => setProfileOpen(true)}><CgProfile /> 프로필 보기</TransBtn>
                            <TransBtn onClick={() => setChatOpen(true)}><MdChatBubbleOutline /> 1:1 채팅하기</TransBtn>
                            <TransBtn onClick={() => setRateOpen(true)}><MdStarBorder /> 평가하기</TransBtn>
                            <TransBtn onClick={() => setReportOpen(true)}><MdOutlineReportGmailerrorred /> 신고하기</TransBtn>
                            {/* <TransBtn><MdOutlineReportGmailerrorred /> 신고 및 제외하기</TransBtn> */}
                        </div>
                    </div>

                    <div>
                        <p>김길동 (프론트엔드)</p>
                        <div className='btns'>
                            <TransBtn onClick={() => setProfileOpen(true)}><CgProfile /> 프로필 보기</TransBtn>
                            <TransBtn onClick={() => setChatOpen(true)}><MdChatBubbleOutline /> 1:1 채팅하기</TransBtn>
                            <TransBtn onClick={() => setRateOpen(true)}><MdStarBorder /> 평가하기</TransBtn>
                            <TransBtn onClick={() => setReportOpen(true)}><MdOutlineReportGmailerrorred /> 신고하기</TransBtn>
                            {/* <TransBtn><MdOutlineReportGmailerrorred /> 신고 및 제외하기</TransBtn> */}
                        </div>
                    </div>
                </ListItem>

                <CalendarContainer>
                    <Calendar onChange={handleDateClick} value={date} />
                </CalendarContainer>

                <ListItem>
                    <div>
                        <EventInput
                            type="text"
                            placeholder="일정 제목 입력"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                        <EventButton onClick={addEvent}>일정 추가</EventButton>
                    </div>

                    <div>
                        <ul>
                            {events
                                .filter((event) => event.date.toDateString() === date.toDateString())
                                .map((event, index) => (
                                    <li key={index}>{event.title}</li>
                                ))}
                        </ul>
                    </div>
                </ListItem>
            </Container>

        </>
    );
};

export default Project;