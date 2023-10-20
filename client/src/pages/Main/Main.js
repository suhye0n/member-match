import React from 'react';
import { Link } from 'react-router-dom';
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

const StyledLink = styled(Link)`
  color: #9AE6FE;
  transition: 0.4s;

  &:hover {
    opacity: 0.7;
  }
`;

const Main = () => {
  return (
    <Container>
      <MainContent>
        <h1>멤버매치에 오신 것을 환영합니다</h1>
        <p>
          멤버매치는 프로젝트 관리자, 개발자, 디자이너, 작가, 엔지니어, 그래픽 디자이너 등 다양한 분야에서 활동하는 개인 및 팀을 위한 플랫폼을 제공합니다.
        </p>
        <p>
          토이 프로젝트를 시작하고 싶은데 프로젝트에 맞는 멤버를 구하는 것에 어려움을 느끼셨나요?
        </p>
        <p>
          지금 <StyledLink to='/login'>로그인</StyledLink>하여 멤버들과 함께 토이 프로젝트를 시작해보세요!
        </p>
      </MainContent>
    </Container>
  );
};

export default Main;
