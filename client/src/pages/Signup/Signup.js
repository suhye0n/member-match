import React, { useEffect, useState } from "react";
import styled from "styled-components";
import emailjs from 'emailjs-com';
import { signup } from "../../service/ApiService";
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
  border: none;
  border-radius: 5px;
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

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const sendEmailVerificationCode = (email) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const templateParams = {
      to_email: email,
      to_name: email.split('@')[0],
      verification_code: verificationCode
    };

    emailjs.send('service_6ivehyn', 'template_alppw2q', templateParams, '3YYSEIx_1W94_6PHN')
      .then((response) => {
        alert('인증코드를 전송했습니다. 메일함을 확인해주세요.');
        console.log('인증코드 전송 성공!', response.status, response.text);
        localStorage.setItem('verificationCode', verificationCode);
        setShowVerificationInput(true);
      }, (error) => {
        console.log('Failed...', error);
      });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const storedVerificationCode = localStorage.getItem('verificationCode');

    if (inputVerificationCode !== storedVerificationCode) {
      alert("이메일 인증을 받아주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup({ email, username, password })
      localStorage.removeItem('verificationCode');
    } catch (error) {
      alert("회원가입에 실패했습니다.");
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
      <Container>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <div>닉네임</div>
          <Input
            autoComplete="username"
            name="username"
            required
            id="username"
            placeholder="닉네임"
          />
          <div>이메일 주소</div>
          <Input
            autoComplete="email"
            name="email"
            required
            id="email"
            placeholder="이메일 주소"
            style={{
              margin: 0,
              maxWidth: 'calc(100% - 118px)',
              width: '240px',
              borderRadius: '5px 0 0 5px'
            }}
          />
          <Button
            style={{
              width: '90px',
              borderRadius: 0,
              borderRadius: '0 5px 5px 0',
              padding: '12.5px'
            }}
            onClick={() => {
              const email = document.getElementById("email").value;
              sendEmailVerificationCode(email);
            }}
          >
            인증
          </Button>
          <br />
          {showVerificationInput && (
            <>
              <Input
                style={{
                  maxWidth: 'calc(100% - 118px)',
                  width: '240px',
                  borderRadius: '5px 0 0 5px'
                }}
                autoComplete="verification-code"
                name="inputVerificationCode"
                required
                id="inputVerificationCode"
                placeholder="인증 코드 입력"
                value={inputVerificationCode}
                onChange={e => setInputVerificationCode(e.target.value)}
              />
              <Button
                style={{
                  marginTop: '5px',
                  width: '90px',
                  borderRadius: 0,
                  borderRadius: '0 5px 5px 0',
                  padding: '12.5px',
                  background: '#EEC3B8',
                  color: '#000'
                }}
                onClick={() => {
                  const storedVerificationCode = localStorage.getItem('verificationCode');
                  if (inputVerificationCode !== storedVerificationCode) {
                    alert("인증 코드가 일치하지 않습니다.");
                  } else {
                    alert("인증 코드가 확인되었습니다.");
                  }
                }}
              >
                확인
              </Button>
            </>
          )}
          <div style={{marginTop: '20px'}}>비밀번호</div>
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
          <Button
            type="submit"
            variant
          >
            계정생성
          </Button>
        </form>
      </Container>
    </>
  );
}

export default SignUp;
