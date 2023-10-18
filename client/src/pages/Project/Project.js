import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { MdOutlineReportGmailerrorred, MdStarBorder, MdChatBubbleOutline, MdBlock } from 'react-icons/md';
import Chat from '../../layout/Chat';
import CustomCalendar from './Calendar';
import { deleteProject, updateProject, recProject, getAllProjects, rateUser, reportResource, getAverageRating } from "../../service/ApiService";

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

const AddBtn = styled.button`
    display: block;
    font-size: 12px;
    width: 180px;
    margin: 0 auto 25px auto;
    text-align: center;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

const PositionInput = styled.input`
    flex: 1;
    padding: 14px;
    border: 1px solid #eee;
    border-radius: 5px 0 0 5px;
    box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const CountInput = styled.input`
    flex: 0.2;
    padding: 14px;
    border: 1px solid #eee;
    border-radius: 0 5px 5px 0;
    box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Project = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [recdate, setRecdate] = useState(null);
    const [projects, setProjects] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [members, setMembers] = useState([]);
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
    const [projectIdToUpdate, setProjectIdToUpdate] = useState(null);
    const [positions, setPositions] = useState([{ position: "", count: "" }]);
    const projectIdToDelete = useRef(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [rating, setRating] = useState(0);
    const reportInputRef = useRef(null);
    const [starIcons, setStarIcons] = useState([BsStar, BsStar, BsStar, BsStar, BsStar]);
    const [averageRating, setAverageRating] = useState(null);
    
    const openAnswerModal = (applicant) => {
        setSelectedApplicant(applicant);
        setAnswerOpen(true);
    }

    const addPosition = () => {
        setPositions([...positions, { position: "", count: "" }]);
    };

    const updatePosition = (index, field, value) => {
        const updatedPositions = [...positions];
        updatedPositions[index][field] = value;
        setPositions(updatedPositions);
    };

    const addQuestion = () => {
        setQuestions([...questions, ""]);
    };

    const updateQuestion = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const submitQuestions = () => {
        const currentDate = new Date().toISOString();

        const isPositionCountValid = positions.every(positionData => parseInt(positionData.count, 10) >= 1);

        if (!isPositionCountValid) {
            alert("포지션당 최소 1명 이상의 인원이 필요합니다.");
            return;
        }

        const updatedProject = {
            reckey: projectId,
            question: questions,
            recdate: currentDate,
            status: true,
            recruitment: {},
        };

        positions.forEach((positionData, index) => {
            updatedProject.recruitment[positionData.position] = parseInt(positionData.count, 10);
        });

        recProject(projectId, updatedProject)
            .then(() => {
                alert("모집 공고 작성이 완료되었습니다.");
                setRecruitOpen(false);
                window.location.reload();
            });
    };

    const endRecruitment = () => {
        const userConfirmed = window.confirm('모집을 종료하시겠습니까?');
        if (userConfirmed) {
            const recdateValue = "1970-01-01T00:00:00.000+00:00";

            const updatedProject = {
                reckey: projectId,
                recdate: recdateValue,
            };

            recProject(projectId, updatedProject)
                .then(() => {
                    setRecruitOpen(false);
                    window.location.reload();
                });
        }
    };

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await getAllProjects();
                setProjects(response);

                const selectedProject = response.find(project => project.key == projectId);
                if (selectedProject) {
                    setApplicants(selectedProject.applicants);
                    setMembers(selectedProject.member);
                    setRecdate(selectedProject.recdate);
                    setQuestions(selectedProject.question);
                }
            } catch (error) {
                console.error("프로젝트 불러오기 오류:", error);
            }
        }
        fetchProjects();
    }, [projectId]);

    const handleDeleteProject = () => {
        const userConfirmed = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirmed) {
            deleteProject(projectIdToDelete.current).then(() => {
                navigate('/list/my');
            });
        }
    };

    const isTeamLeader = (members) => {
        const username = localStorage.getItem('username');
        const teamLeader = members.find((member) => member.position === '팀장');
        return teamLeader && teamLeader.name === username;
    };

    const isCurrentUser = (name) => {
        const username = localStorage.getItem('username');
        return name === username;
    };

    const renderAnswers = (applicant) => {
        const answersToDisplay = [];

        for (let i = 0; i < applicant.answers.length; i++) {
            answersToDisplay.push(
                <div key={i}>
                    <p>질문 {i + 1}: {questions[i]}</p>
                    <p>{applicant.answers[i]}</p>
                </div>
            );
        }

        return answersToDisplay;
    }

    const handleApproveApplicant = (applicant) => {
        const updatedProjects = [...projects];

        updatedProjects.forEach((project) => {
            const updatedApplicants = project.applicants.filter((a) => a.name !== applicant.name);

            if (updatedApplicants.length < project.applicants.length) {
                project.member.push({
                    name: applicant.name,
                    position: applicant.position,
                });

                project.applicants = updatedApplicants;

                const updatedProjectData = {
                    reckey: project.key,
                    applicants: updatedApplicants,
                    member: project.member,
                };

                updateProject(project.key, updatedProjectData)
                    .then((response) => {
                        alert("지원자가 승인되었습니다.");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("승인 오류:", error);
                    });
            }
        });

        setProjects(updatedProjects);
    };

    const handleRejectApplicant = (applicant) => {
        const updatedProjects = [...projects];

        updatedProjects.forEach((project) => {
            const updatedApplicants = project.applicants.filter((a) => a.name !== applicant.name);

            if (updatedApplicants.length < project.applicants.length) {
                project.applicants = updatedApplicants;

                const updatedProjectData = {
                    reckey: project.key,
                    applicants: updatedApplicants,
                    member: project.member,
                };

                updateProject(project.key, updatedProjectData)
                    .then((response) => {
                        alert("지원자가 거절되었습니다.");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("거절 오류:", error);
                    });
            }
        });

        setProjects(updatedProjects);
    };

    const handleStarClick = (value) => {
        const newStarIcons = starIcons.map((icon, index) => {
            if (index + 1 <= value) {
                return BsStarFill;
            } else if (index < value) {
                return BsStarHalf;
            } else {
                return BsStar;
            }
        });
        setStarIcons(newStarIcons);
        setRating(value);
    };

    const submitRating = async () => {
        const raterUsername = localStorage.getItem('username');
        const ratedUsername = selectedApplicant;
        console.log(raterUsername, ratedUsername, rating);
        try {
            const response = await rateUser(raterUsername, ratedUsername, rating);
            if (response) {
                alert('평가하기가 완료되었습니다');
                setRating(0);
                setRateOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const submitReport = async () => {
        const reporter = localStorage.getItem('username');
        const target = selectedApplicant;
        const reason = reportInputRef.current.value;

        if (!reason) {
            alert('신고 이유를 입력해주세요.');
            return;
        }

        const reportDTO = {
            reporter,
            target,
            reason,
        };

        try {
            await reportResource(reportDTO);
            alert('신고가 완료되었습니다.');
            setReportOpen(false);
        } catch (error) {
            console.error('신고하기 오류:', error);
        }
    };

    const handleProfileClick = async (applicantName) => {
        setSelectedApplicant(applicantName);
        console.log(applicantName);
        try {
            const rating = await getAverageRating(applicantName);
            setAverageRating(rating);
        } catch (error) {
            console.error("별점 가져오기 오류:", error);
        }
        setProfileOpen(true);
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
                        {positions.map((position, index) => (
                            <InputContainer key={index}>
                                <PositionInput
                                    placeholder={`포지션 ${index + 1}`}
                                    value={position.position}
                                    onChange={(e) => updatePosition(index, "position", e.target.value)}
                                />
                                <CountInput
                                    placeholder="인원"
                                    value={position.count}
                                    onChange={(e) => updatePosition(index, "count", e.target.value)}
                                    type="number"
                                />
                            </InputContainer>
                        ))}
                        <AddBtn onClick={addPosition}>+ 포지션 추가</AddBtn>

                        {questions.map((question, index) => (
                            <div key={index}>
                                <div>질문 {index + 1}</div>
                                <Input
                                    value={question}
                                    onChange={(e) => updateQuestion(index, e.target.value)}
                                />
                            </div>
                        ))}

                        <AddBtn onClick={addQuestion}>+ 멤버 신청 질문 추가</AddBtn>

                        <Button onClick={submitQuestions}>작성 완료</Button>
                    </Modal>
                </>
            )}

            {isAnswerOpen && selectedApplicant && (
                <>
                    <BlurBackground open={isAnswerOpen} onClick={() => setAnswerOpen(false)} />
                    <Modal open={isAnswerOpen}>
                        <Title>{selectedApplicant.name}님의 답변</Title>
                        <CloseBtn onClick={() => setAnswerOpen(false)}>X</CloseBtn>
                        {renderAnswers(selectedApplicant)}
                    </Modal>
                </>
            )}

            {isProfileOpen && (
                <>
                    <BlurBackground open={isProfileOpen} onClick={() => setProfileOpen(false)} />
                    <Modal open={isProfileOpen}>
                        <CloseBtn onClick={() => setProfileOpen(false)}>X</CloseBtn>
                        <Title>{selectedApplicant ? `${selectedApplicant}님 프로필 정보` : '프로필 정보'}</Title>

                        {averageRating !== null ? (
                        <div>
                            <p>평균 별점: {averageRating}</p>
                            {averageRating >= 1 ? <BsStarFill /> : <BsStar />}
                            {averageRating >= 2 ? <BsStarFill /> : averageRating >= 1.5 ? <BsStarHalf /> : <BsStar />}
                            {averageRating >= 3 ? <BsStarFill /> : averageRating >= 2.5 ? <BsStarHalf /> : <BsStar />}
                            {averageRating >= 4 ? <BsStarFill /> : averageRating >= 3.5 ? <BsStarHalf /> : <BsStar />}
                            {averageRating >= 5 ? <BsStarFill /> : averageRating >= 4.5 ? <BsStarHalf /> : <BsStar />}
                        </div>
                    ) : null}

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
                        <Title>{selectedApplicant ? `${selectedApplicant}님 평가하기` : '평가하기'}</Title>
                        <div>
                            <div>
                                {starIcons.map((Icon, index) => (
                                    <Icon
                                        key={index}
                                        onClick={() => handleStarClick(index + 1)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button onClick={submitRating}>평가 완료</button>
                    </Modal>
                </>
            )}

            {isReportOpen && (
                <>
                    <BlurBackground open={isReportOpen} onClick={() => setReportOpen(false)} />
                    <Modal open={isReportOpen}>
                        <CloseBtn onClick={() => setReportOpen(false)}>X</CloseBtn>
                        <Title>{selectedApplicant ? `${selectedApplicant}님 신고하기` : '신고하기'}</Title>
                        <div>신고 사유</div>
                        <Input ref={reportInputRef} />
                        <Button onClick={submitReport}>신고 완료</Button>
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
                            {isCurrentUser(project.member[0].name) ? (
                                <>
                                    <BlackBtn onClick={() => {
                                        projectIdToDelete.current = projectId;
                                        handleDeleteProject();
                                    }}>삭제</BlackBtn>
                                    <BlackBtn onClick={() => navigate(`/write?id=${projectId}`)}>수정</BlackBtn>
                                    {recdate !== null && recdate !== "1970-01-01T00:00:00.000+00:00" ? (
                                        <BlackBtn onClick={() => endRecruitment()}>모집 종료</BlackBtn>
                                    ) : (
                                        <BlackBtn onClick={() => setRecruitOpen(true)}>모집</BlackBtn>
                                    )}
                                </>
                            ) : null}
                        </Heading>
                    </div>
                ) : null
            ))}

            <Container>
                {applicants.length > 0 && isTeamLeader(members) && (
                    <ListItem>
                        <MemberTitle>멤버 지원자</MemberTitle>
                        {applicants.map((applicant, index) => (
                            <div key={index}>
                                <p>{applicant.name}</p>
                                <Rate>★★★★☆</Rate>
                                <div className="btns">
                                    <BlackBtn onClick={() => openAnswerModal(applicant)}>답변</BlackBtn>
                                    <BlackBtn onClick={() => handleApproveApplicant(applicant)}>승인</BlackBtn>
                                    <BlackBtn onClick={() => handleRejectApplicant(applicant)}>거절</BlackBtn>
                                </div>
                            </div>
                        ))}
                    </ListItem>
                )}

                {members && members.length > 0 && (
                    <>
                        <ListItem>
                            <MemberTitle>멤버</MemberTitle>
                            {members.map((member, index) => {
                                const isCurrentUserMember = isCurrentUser(member.name);
                                return (
                                    <div key={index}>
                                        <p style={{ fontWeight: isCurrentUserMember ? 'bold' : 'normal', color: isCurrentUserMember ? 'blue' : 'black' }}>
                                            {member.name}&nbsp;
                                        </p>
                                        <p>({member.position})</p>
                                        <div className="btns">
                                            <TransBtn onClick={() => {
                                                handleProfileClick(member.name);
                                            }}>
                                                <CgProfile /> 프로필
                                            </TransBtn>
                                            {!isCurrentUserMember && (
                                                <>
                                                    <TransBtn onClick={() => setChatOpen(true)}>
                                                        <MdChatBubbleOutline /> 1:1 채팅
                                                    </TransBtn>
                                                    <TransBtn onClick={() => {
                                                        setSelectedApplicant(member.name);
                                                        setRateOpen(true);
                                                    }}>
                                                        <MdStarBorder /> 평가
                                                    </TransBtn>
                                                    <TransBtn onClick={() => {
                                                        setSelectedApplicant(member.name);
                                                        setReportOpen(true);
                                                    }}>
                                                        <MdOutlineReportGmailerrorred /> 신고
                                                    </TransBtn>

                                                    {isTeamLeader(members) && (
                                                        <TransBtn onClick={() => {
                                                            setSelectedApplicant(member.name);
                                                            const shouldExclude = window.confirm(`${member.name}님을 팀에서 제외하시겠습니까?`);
                                                            if (shouldExclude) {
                                                                const updatedMembers = members.filter((m) => m.name !== member.name);
                                                                const updatedProjectData = {
                                                                    reckey: projectId,
                                                                    member: updatedMembers,
                                                                };
                                                                updateProject(projectId, updatedProjectData)
                                                                    .then(() => {
                                                                        alert(`${member.name}님을 팀에서 제외하였습니다.`);
                                                                        window.location.reload();
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("멤버 제외 오류:", error);
                                                                    });
                                                            }
                                                        }}>
                                                            <MdBlock /> 제외
                                                        </TransBtn>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </ListItem>
                        <CustomCalendar projectId={projectId} />
                    </>
                )}
            </Container >
        </>
    );
};

export default Project;