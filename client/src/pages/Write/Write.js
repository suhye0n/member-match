import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 150px 20% 50px 20%;
  background: url('/bg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: calc(100vh - 200px);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  padding: 30px 0;
`;

const Input = styled.input`
  padding: 14px;
  margin: 8px 0 20px 0;
  width: calc(100% - 28px);
  max-width: 330px;
  border-radius: 5px;
  border: none;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Button = styled.button`
  display: inline;
  width: calc(100% - 28px);
  max-width: 358px;
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

const StyledLink = styled(Link)`
  margin: 20px 10px;
  font-size: 0.9em;
  font-weight: 600;
  text-decoration: none;
  transition: 0.4s;
  &:hover {
      opacity: 0.7;
  }
`;

const Write = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
      <Title>프로젝트 등록</Title>
      <span>닉네임</span>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>이메일 주소</span>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>비밀번호</span>
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>비밀번호 확인</span>
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>회원정보 수정</Button>
      <StyledLink to="/reset">회원 탈퇴하시려면 여기를 클릭해주세요.</StyledLink>
    </Container>
  );
};

export default Write;