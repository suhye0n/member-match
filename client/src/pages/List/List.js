import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { getAllProjects, updateProject } from "../../service/ApiService";

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
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        loadProjects();
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const loadProjects = async () => {
        try {
            const response = await getAllProjects();
            setProjects(response);
        } catch (error) {
            console.error("프로젝트 불러오기 오류:", error);
        }
    };

    const handleApplyCancel = () => {
        setModalOpen(false);
    };

    const handleApplyClick = (projectId) => {
        const project = projects.find(item => item.key === projectId);

        if (project) {
            setSelectedProject(project);
            setSelectedPosition("");
            setQuestions(project.question);
            setAnswers(new Array(project.question.length).fill(""));
            setModalOpen(true);
        } else {
            console.error("Project not found for projectId: ", projectId);
        }
    };

    const handleApplySubmit = async () => {
        if (!selectedProject || selectedPosition === "" || questions.some(q => q === "") || answers.some(a => a === "")) {
            alert("포지션과 질문을 모두 입력해야 합니다.");
            return;
        }

        const newApplicant = {
            "id": selectedProject.applicants.length + 1,
            "name": username,
            "position": selectedPosition,
            "answers": answers,
        };

        selectedProject.applicants.push(newApplicant);

        try {
            const updatedProject = await updateProject(selectedProject.key, selectedProject);
            if (updatedProject) {
                setModalOpen(false);
                const updatedProjects = projects.map(item =>
                    item.key === selectedProject.key ? updatedProject : item
                );
                setProjects(updatedProjects);
            }
        } catch (error) {
            console.error("멤버 추가 오류:", error);
        }
    }

    return (
        <>
            <Heading>
                <h1>멤버 모집</h1>
            </Heading>

            <Container>
                {projects.map((item, index) => (
                    <ListItem key={index}>
                        <Link to={`/project?id=${item.key}`}>
                            <h2>{item.title}</h2>
                            <div>
                                <span><BiCategory /></span>
                                <span>#{item.cate}</span>
                            </div>
                            <div>
                                <span><BiLogoReact /></span>
                                <span>{item.stack.map((stack, index) => (
                                    <span key={index}>#{stack}</span>
                                ))}</span>
                            </div>
                            <div>
                                <span><CgProfile /></span>
                                <span>
                                    {Object.keys(item.recruitment).map((position, index) => {
                                        const recruitmentCount = item.recruitment[position];
                                        const applicantsCount = item.applicants.filter(applicant => applicant.position === position).length;
                                        return (
                                            <span key={index}>
                                                {`${position} ${applicantsCount}/${recruitmentCount}`}
                                            </span>
                                        );
                                    })}
                                </span>
                            </div>
                        </Link>
                        <button onClick={() => handleApplyClick(item.key)}>지원하기</button>
                    </ListItem>
                ))}

                {isModalOpen && (
                    <>
                        <BlurBackground open={isModalOpen} onClick={handleApplyCancel} />
                        <Modal open={isModalOpen}>
                            <h2>멤버 신청</h2>
                            <Select
                                value={selectedPosition}
                                onChange={(e) => setSelectedPosition(e.target.value)}
                            >
                                <option value="">-- 포지션 선택 --</option>
                                {Object.keys(projects[0].recruitment).map((position, index) => (
                                    <option key={index} value={position}>{position}</option>
                                ))}
                            </Select>
                            {questions.map((question, index) => (
                                <div key={index}>
                                    <span>{question}</span>
                                    <Input
                                        type="text"
                                        value={answers[index]}
                                        onChange={(e) => {
                                            const updatedAnswers = [...answers];
                                            updatedAnswers[index] = e.target.value;
                                            setAnswers(updatedAnswers);
                                        }}
                                    />
                                </div>
                            ))}
                            <button onClick={handleApplySubmit}>완료</button>
                            <button className='cancel' onClick={handleApplyCancel}>취소</button>
                        </Modal>
                    </>
                )}
            </Container>
        </>
    );
};

export default List;
