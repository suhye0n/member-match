import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <>
            <Heading>
                <h1>내 프로젝트</h1>
                <Link to="/write">
                    <WriteButton>글쓰기</WriteButton>
                </Link>
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
                        </Link>
                    </ListItem>
                ))}
            </Container>
        </>
    );
};

export default MyList;
