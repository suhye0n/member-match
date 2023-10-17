import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { getAllProjects } from "../../service/ApiService";

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

const WriteButton = styled.button`
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: .4s;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
        opacity: 0.7;
    }
`;

const MyList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            loadProjects(storedUsername);
        }
    }, []);

    const loadProjects = async (username) => {
        try {
            const response = await getAllProjects();
            const filteredProjects = response.filter(project => project.member.some(member => member.name === username));
            setProjects(filteredProjects);
        } catch (error) {
            console.error("프로젝트 불러오기 오류:", error);
        }
    };

    return (
        <>
            <Heading>
                <h1>내 프로젝트</h1>
                <Link to="/write">
                    <WriteButton>프로젝트 등록하기</WriteButton>
                </Link>
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
                        </Link>
                    </ListItem>
                ))}
            </Container>
        </>
    );
};

export default MyList;
