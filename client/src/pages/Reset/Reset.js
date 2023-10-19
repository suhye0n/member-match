import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { resetPassword } from "../../service/ApiService";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

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

const Input = styled.input`
  padding: 14px;
  margin: 8px 0 20px 0;
  width: calc(100% - 28px);
  max-width: 330px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
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

const Reset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        if (id) {
          const response = await resetPassword(id, password);
          setResetMessage(response.message);
        } else {
          setResetMessage("ID가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("비밀번호 재설정 오류:", error);
      }
    } else {
      setResetMessage("비밀번호가 일치하지 않습니다.");
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
    <>
      <Heading>
        <h1>비밀번호 재설정</h1>
      </Heading>

      <Container>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '20px' }}>비밀번호</div>
          <InputWithIcon>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              name="password"
              required
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Icon onClick={handlePasswordVisibility}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </Icon>
          </InputWithIcon>
          <div>비밀번호 확인</div>
          <InputWithIcon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="confirm-password"
              name="confirmPassword"
              required
              id="confirmPassword"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Icon onClick={handleConfirmPasswordVisibility}>
              {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </Icon>
          </InputWithIcon>
          {resetMessage && <div>{resetMessage}</div>}
          <Button type="submit">비밀번호 재설정</Button>
        </form>
      </Container>
    </>
  );
};

export default Reset;