import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import { signin, findId } from "../../service/ApiService";
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
  border: 1px solid #eee;
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
  cursor: pointer;
  white-space: normal;
  overflow-wrap: break-word;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  transition: 0.4s;

  &:hover {
    opacity: 0.7;
  }
`;

const CloseBtn = styled.button`
    text-align: center;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px !important;
    height: 42px !important;
    border-radius: 50%;
    padding: 10px;
    font-size: 1rem;
    background: #feaca9 !important;
    border: none;
    transition: 0.4s;
    cursor: pointer;
    white-space: normal;
    overflow-wrap: break-word;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 999;

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
    text-align: center;

    h2 {
        text-align: center;
    }

    button {
        display: inline;
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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

  const handleResetPassword = async () => {
    try {
      const email = resetEmail;

      const id = await findId(email);

      if (id) {
        const resetLink = `http://localhost:3000/reset?id=${id}`;

        const templateParams = {
          to_email: email,
          to_name: email.split('@')[0],
          reset_link: resetLink,
        };

        await emailjs.send('service_6ivehyn', 'template_fwqamhr', templateParams, '3YYSEIx_1W94_6PHN');
        alert('비밀번호 재설정 링크를 전송했습니다. 메일함을 확인해주세요.');
      } else {
        alert('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.log(error);
      alert('이메일 전송 중 오류가 발생했습니다.');
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
        <StyledLink onClick={() => setModalOpen(true)}>비밀번호를 잊으셨나요?</StyledLink>
      </form>

      {isModalOpen && (
        <>
          <BlurBackground open={isModalOpen} onClick={() => setModalOpen(false)} />
          <Modal open={isModalOpen}>
            <Title>비밀번호 찾기</Title>
            <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword(resetEmail);
            }}>
              <div>이메일 주소</div>
              <Input
                autoComplete="resetemail"
                name="resetemail"
                required
                id="resetemail"
                placeholder="이메일 주소"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <Button type="submit">완료</Button>
            </form>
          </Modal>
        </>
      )}

    </Container>
  );
};

export default Login;