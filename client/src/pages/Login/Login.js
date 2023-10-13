import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from "../../service/ApiService";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

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
  margin: 14px 0;
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

const InputWithIcon = styled.div`
  position: relative;
  width: calc(100% - 28px);
  max-width: 358px;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await signin({ email, password })
    } catch (error) {
      alert("로그인에 실패했습니다.");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    if (accessToken) {
      window.location.href = "/";
      return;
    }
  }, [])

  return (
    <Container>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <div>이메일 주소</div>
        <Input
          autoComplete="email"
          name="email"
          required
          id="email"
          placeholder="이메일 주소"
        />
        <div>비밀번호</div>
        <InputWithIcon>
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            name="password"
            required
            id="password"
            placeholder="비밀번호"
          />
          <Icon onClick={handlePasswordVisibility}>
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </Icon>
        </InputWithIcon>
        <Button
          type="submit"
          variant
        >
          로그인
        </Button>
        <br />
        <StyledLink to="/reset">비밀번호를 잊으셨나요?</StyledLink>
      </form>
    </Container>
  );
};

export default Login;