import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { update, withdrawal, signout } from "../../service/ApiService";
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

const Mypage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    try {
      await update({ email, username, password })
    } catch (error) {
      alert("회원 정보 수정을 실패했습니다.");
    }
  };

  const handleWithdrawal = async () => {
    const emailInput = prompt('탈퇴하시려면 이메일을 입력해주세요.');
    const password = prompt('비밀번호를 입력해주세요.');

    const storedEmail = localStorage.getItem("email");

    if (emailInput !== storedEmail) {
      alert("입력하신 이메일이 올바르지 않습니다.");
      return;
    }

    if (emailInput && password) {
      try {
        await withdrawal({ email: emailInput, password: password });
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        alert('회원 탈퇴가 완료되었습니다.');
        window.location.href = "/";
      } catch (error) {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("회원 탈퇴를 취소하였습니다.");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    if (!accessToken) {
      window.location.href = "/";
      return;
    }
  }, [])

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <form noValidate onSubmit={handleUpdate}>
        <div>닉네임</div>
        <Input
          autoComplete="username"
          name="username"
          required
          id="username"
          placeholder="닉네임"
          defaultValue={localStorage.getItem("username")}
        />
        <div>이메일 주소 (수정 불가)</div>
        <Input
          autoComplete="email"
          name="email"
          id="email"
          placeholder="이메일 주소"
          defaultValue={localStorage.getItem("email")}
          InputProps={{
              readOnly: true,
          }}
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
        <div>비밀번호 확인</div>
        <InputWithIcon>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="confirm-password"
            name="confirmPassword"
            required
            id="confirmPassword"
            placeholder="비밀번호 확인"
          />
          <Icon onClick={handleConfirmPasswordVisibility}>
            {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </Icon>
        </InputWithIcon>
        <Button>회원정보 수정</Button>
        </form>

        <StyledLink>회원 탈퇴하시려면 여기를 클릭해주세요.</StyledLink>
      
    </Container>
  );
};

export default Mypage;