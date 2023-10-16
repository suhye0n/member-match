import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineReportGmailerrorred, MdStarBorder, MdChatBubbleOutline } from 'react-icons/md';
import Chat from '../../layout/Chat';
import CustomCalendar from './Calendar';
import { deleteProject, updateProject, getAllProjects } from "../../service/ApiService";

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

const Title = styled.h2`
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    padding: 30px 0;
`;

const Input = styled.input`
    padding: 14px;
    margin: 8px 0 20px 0;
    width: calc(100% - 28px);
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
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

const Button = styled.button`
    display: inline;
    width: 100%;
    margin-top: 14px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #000;
    color: #fff;
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
`;

const MemberTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [members, setMembers] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get('id');
    const [questions, setQuestions] = useState([]);
    const [isRecruitOpen, setRecruitOpen] = useState(false);
    const [isAnswerOpen, setAnswerOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false);
    const [isRateOpen, setRateOpen] = useState(false);
    const [isReportOpen, setReportOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);
    const [projectIdToUpdate, setProjectIdToUpdate] = useState(null);

    const addQuestion = () => {
        setQuestions([...questions, ""]);
    };

    const updateQuestion = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const submitQuestions = () => {
        const updatedProject = {
            reckey: projectId,
            question: questions,
            recdate: new Date(),
            status: true,
        };

        updateProject(updatedProject)
            .then((response) => {
                console.log("프로젝트가 업데이트되었습니다.", response);
            })
            .catch((error) => {
                console.error("프로젝트 업데이트 오류:", error);
            });
    };

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await getAllProjects();
                setProjects(response);

                const selectedProject = response.find(project => project.key == projectId);
                if (selectedProject) {
                    setApplicants(selectedProject.applicants);
                    setMembers(selectedProject.member)
                }
            } catch (error) {
                console.error("프로젝트 불러오기 오류:", error);
            }
        }
        fetchProjects();
    }, [projectId]);

    const deleteProject = async (projectId) => {
        try {
            const response = await deleteProject(projectId);
            if (response) {
                alert("프로젝트가 삭제되었습니다.");
            }
        } catch (error) {
            console.error("프로젝트 삭제 오류:", error);
        }
    };

    return (
        <>
            {isRecruitOpen && (
                <>
                    <BlurBackground open={isRecruitOpen} onClick={() => setRecruitOpen(false)} />
                    <Modal open={isRecruitOpen}>
                        <CloseBtn onClick={() => setRecruitOpen(false)}>X</CloseBtn>
                        <Title>멤버 모집</Title>
                        <div>필요한 포지션</div>
                        <Input />
                        <div>필요한 인원</div>
                        <Input />

                        {questions.map((question, index) => (
                            <div key={index}>
                                <div>질문 {index + 1}</div>
                                <Input
                                    value={question}
                                    onChange={(e) => updateQuestion(index, e.target.value)}
                                />
                            </div>
                        ))}

                        <Button onClick={addQuestion}>+ 멤버 신청 질문 추가</Button>

                        <Button onClick={submitQuestions}>작성 완료</Button>
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

            {projects.map(project => (
                project.key == projectId ? (
                    <div key={project.key}>
                        <Heading>
                            <h1>{project.title}</h1>
                            <p>{project.desc}</p>
                            <FlexContainer>
                                <Icon><BiCategory /></Icon>
                                <Tag>{project.cate}</Tag>
                            </FlexContainer>
                            <FlexContainer>
                                <Icon><BiLogoReact /></Icon>
                                {Array.isArray(project.stack) && project.stack.map((stackItem, index) => (
                                    <Tag key={index}>{stackItem}</Tag>
                                ))}
                            </FlexContainer>
                            <BlackBtn onClick={() => setProjectIdToDelete(project.key)}>삭제</BlackBtn>
                            <BlackBtn onClick={() => setRecruitOpen(true)}>수정</BlackBtn>
                            <BlackBtn onClick={() => setRecruitOpen(true)}>모집</BlackBtn>
                        </Heading>
                    </div>
                ) : null
            ))}


            <Container>
                <ListItem>
                    <MemberTitle>멤버 지원자</MemberTitle>
                    {applicants.map((applicant, index) => (
                    <div key={index}>
                        <p>{applicant.name}</p>
                        <Rate>★★★★☆</Rate>
                        <div className="btns">
                        <BlackBtn onClick={() => setAnswerOpen(true)}>답변</BlackBtn>
                        <BlackBtn>승인</BlackBtn>
                        <BlackBtn>거절</BlackBtn>
                        </div>
                    </div>
                    ))}
                </ListItem>

                <ListItem>
                    <MemberTitle>멤버</MemberTitle>
                    {members.map((memberName, index) => (
                    <div key={index}>
                        <p>{memberName}</p>
                        <div className="btns">
                        <TransBtn onClick={() => setProfileOpen(true)}>
                            <CgProfile /> 프로필 보기
                        </TransBtn>
                        <TransBtn onClick={() => setChatOpen(true)}>
                            <MdChatBubbleOutline /> 1:1 채팅하기
                        </TransBtn>
                        <TransBtn onClick={() => setRateOpen(true)}>
                            <MdStarBorder /> 평가하기
                        </TransBtn>
                        <TransBtn onClick={() => setReportOpen(true)}>
                            <MdOutlineReportGmailerrorred /> 신고하기
                        </TransBtn>
                        </div>
                    </div>
                    ))}
                </ListItem>

                <CustomCalendar />
            </Container >
        </>
    );
};

export default Project;