import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const Heading = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 20% 50px 20%;
    background: url('/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 20% 50px 20%;
    background: #fff;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: rgba(196, 216, 243, .2);
    padding: 20px;
    margin-bottom: 30px;
    
    h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        align-items: center;
        margin: 5px 0;

        span {
            margin-right: 10px;
        }
    }

    button {
        margin-top: 14px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background: #A9EAFE;
        border: none;
        border-radius: 50px;
        transition: 0.4s;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: break-word;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

        &:hover {
            opacity: 0.7;
        }
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
    padding: 20px;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    padding: 20px;
    width: 90%;
    max-width: 550px;

    h2 {
        text-align: center;
    }

    button {
        display: inline;
        width: calc(50% - 8px);
        margin-top: 14px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background: #A9EAFE;
        border: none;
        border-radius: 50px;
        transition: 0.4s;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: break-word;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

        &:hover {
            opacity: 0.7;
        }
      }  

      .cancel {
        background: #feaca9;
        margin-left: 15px;
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

const Input = styled.input`
    padding: 14px;
    margin: 8px 0 20px 0;
    width: calc(100% - 28px);
    border-radius: 5px;
    border: none;
	box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Select = styled.select`
    padding: 14px;
    margin: 8px 0 20px 0;
    width: 100%;
    border-radius: 5px;
    border: none;
	box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const List = () => {
    const data = [
        {
            projectName: "프로젝트 1",
            category: "게임",
            techStack: ["React", "Node.js", "MongoDB"],
            positions: ["포지션1 0/3", "포지션2 1/1"],
        },
        {
            projectName: "프로젝트 2",
            category: "뉴스/정보",
            techStack: ["React", "Redux", "Node.js"],
            positions: ["포지션1 2/4", "포지션2 0/2"],
        },
        {
            projectName: "프로젝트 3",
            category: "유틸",
            techStack: ["Vue.js", "Node.js", "MongoDB"],
            positions: ["포지션1 1/2", "포지션2 1/1"],
        },
    ];

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Heading>
                <h1>멤버 모집</h1>
            </Heading>

            <Container>
                {data.map((item, index) => (
                    <ListItem key={index}>
                        <Link to='/project'>
                            <h2>{item.projectName}</h2>
                            <div>
                                <span><BiCategory /></span>
                                <span>#{item.category}</span>
                            </div>
                            <div>
                                <span><BiLogoReact /></span>
                                {item.techStack.map((tech, techIndex) => (
                                    <span key={techIndex}>#{tech}</span>
                                ))}
                            </div>
                            <div>
                                <span><CgProfile /></span>
                                {item.positions.map((position, positionIndex) => (
                                    <span key={positionIndex}>
                                        {position}
                                        {positionIndex < item.positions.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </div>
                        </Link>
                        <button onClick={() => setModalOpen(true)}>지원하기</button>
                    </ListItem>
                ))}

                {isModalOpen && (
                    <>
                        <BlurBackground open={isModalOpen} onClick={() => setModalOpen(false)} />
                        <Modal open={isModalOpen}>
                            <h2>멤버 신청</h2>
                            <Select>
                                <option>-- 포지션 선택 --</option>
                                <option>React</option>
                                <option>Node.js</option>
                                <option>MongoDB</option>
                                <option>Express</option>
                                <option>HTML</option>
                                <option>CSS</option>
                                <option>JavaScript</option>
                            </Select>
                            <span>신청 질문 1</span>
                            <Input />
                            <span>신청 질문 2</span>
                            <Input />
                            <button>완료</button>
                            <button className='cancel' onClick={() => setModalOpen(false)}>취소</button>
                        </Modal>
                    </>
                )}
            </Container>
        </>
    );
};

export default List;
