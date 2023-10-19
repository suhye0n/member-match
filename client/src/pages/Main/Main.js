import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/bg.jpg');
  background-size: cover;
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
`;

const MainContent = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
`;

const Main = () => {
  return (
    <Container>
      <MainContent>
        <h1>맴버메치에 오신 것을 환영합니다</h1>
        <p>
          소개글
        </p>
        <p>
          소개글
        </p>
        <p>
          소개글
        </p>
      </MainContent>
    </Container>
  );
};

export default Main;
