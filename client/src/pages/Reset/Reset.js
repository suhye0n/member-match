import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiCategory, BiLogoReact } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const Heading = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 20% 50px 20%;
    background: url('/bg2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 20% 50px 20%;
    background: #fff;
`;

const Reset = () => {
    return (
        <>
            <Heading>
                <h1>비밀번호 재설정</h1>
            </Heading>

            <Container>
            </Container>
        </>
    );
};

export default Reset;
