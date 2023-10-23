import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { getAllProjects, apply } from "../../service/ApiService";

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

const Desc = styled.p`
    font-size: 14px;
    color: #999;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

    input {
        flex: 1;
        border: none;
        padding: 8px;
        border-radius: 5px;
        box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
    }
`;

const SearchIcon = styled.div`
    margin-right: 10px;
    font-size: 24px;
    color: #999;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageNumber = styled.div`
    cursor: pointer;
    margin: 0 10px;
    color: ${(props) => (props.active ? "blue" : "black")};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const List = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [username, setUsername] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProjects();
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

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
            const filteredProjects = response.filter(project => project.recdate !== undefined && project.recdate !== null && project.recdate !== "1970-01-01T00:00:00.000+00:00");
            setProjects(filteredProjects);
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
            const userHasApplied = project.applicants.some(applicant => applicant.name === username);

            if (userHasApplied) {
                alert("이미 이 프로젝트에 지원한 상태입니다.");
            } else {
                setSelectedProject(project);
                setSelectedPosition("");
                setQuestions(project.question);
                setAnswers(new Array(project.question.length).fill(""));
                setModalOpen(true);
            }
        } else {
            console.error(projectId);
        }
    }

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
            await apply(selectedProject.key, selectedProject);
            window.location.reload();
        } catch (error) {
            console.error("멤버 지원 오류:", error);
        }
    }

    const userMemberProject = (project) => {
        return project.member.some((member) => member.name === username);
    };

    const userHasAppliedForProject = (project) => {
        return project.applicants.some((applicant) => applicant.name === username);
    };

    const filteredProjects = projects.filter((project) => {
        return project.title.toLowerCase().includes(search.toLowerCase());
    });

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        const totalPageCount = Math.ceil(filteredProjects.length / projectsPerPage);
        if (currentPage < totalPageCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProjects.length / projectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Heading>
                <h1>멤버 모집</h1>

                <SearchBar>
                    <SearchIcon>
                        <BiCategory />
                    </SearchIcon>
                    <input
                        type="text"
                        placeholder="프로젝트 검색"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchBar>
            </Heading>

            <Container>
                {currentProjects.map((item, index) => (
                    <ListItem key={index}>
                        <h2>{item.title}</h2>
                        <Desc>{item.desc}</Desc>
                        <div>
                            <span><BiCategory /></span>
                            <span>#{item.cate}</span>
                        </div>
                        <div>
                            <span><BiLogoReact /></span>
                            <span>
                                {item.stack.map((stack, index, array) => (
                                    index === array.length - 1 ? `#${stack}` : `#${stack}, `
                                ))}
                            </span>
                        </div>
                        <div>
                            <span><CgProfile /></span>
                            <span>
                                {Object.keys(item.recruitment).map((position, index, positionsArray) => {
                                    const recruitmentCount = item.recruitment[position];
                                    const applicantsCount = item.applicants.filter(applicant => applicant.position === position).length;
                                    return (
                                        index === positionsArray.length - 1
                                            ? `${position} ${applicantsCount}/${recruitmentCount}`
                                            : `${position} ${applicantsCount}/${recruitmentCount}, `
                                    );
                                })}
                            </span>
                        </div>
                        {userHasAppliedForProject(item) ? (
                            <button disabled style={{ background: "#ccc", cursor: "not-allowed" }}>
                                이미 지원함
                            </button>
                        ) : userMemberProject(item) ? (
                            <button disabled style={{ background: "#ccc", cursor: "not-allowed" }}>
                                지원할 수 없음
                            </button>
                        ) : localStorage.getItem('username') ? (
                            <button onClick={() => handleApplyClick(item.key)}>지원하기</button>
                        ) : null}
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
                                {Object.keys(selectedProject.recruitment).map((position, index) => (
                                    <option key={index} value={position}>{position}</option>
                                ))}
                            </Select>
                            {/* {Object.keys(selectedProject.recruitment).map((position, index) => (
                                <div key={index}>
                                    <span>{position}</span>
                                    <span>{`${selectedProject.applicants.filter(applicant => applicant.position === position).length}/${selectedProject.recruitment[position]}`}</span>
                                </div>
                            ))} */}
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
                <Pagination>
                    <PageNumber onClick={prevPage}>&#60;</PageNumber>
                    {pageNumbers.map((number) => (
                        <PageNumber
                            key={number}
                            onClick={() => paginate(number)}
                            active={number === currentPage}
                        >
                            {number}
                        </PageNumber>
                    ))}
                    <PageNumber onClick={nextPage}>&#62;</PageNumber>
                </Pagination>
            </Container>
        </>
    );
};

export default List;
