import React, { useEffect, useState } from "react";
import styled from "styled-components";
import emailjs from 'emailjs-com';
import { signup, checkUsernameAvailability, checkEmailAvailability } from "../../service/ApiService";
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

const Select = styled.select`
  padding: 14px;
  margin: 8px 0 20px 0;
  width: 100%;
  max-width: 358px;
  border: none;
  border-radius: 5px;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Button = styled.button`
  display: inline;
  width: 100%;
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
  const [selectedLocation, setSelectedLocation] = useState("");

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

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const location = data.get("location");
    const confirmPassword = data.get("confirmPassword");
    const storedVerificationCode = localStorage.getItem('verificationCode');
  
    if (inputVerificationCode !== storedVerificationCode) {
      alert("이메일 인증을 받아주세요.");
      return;
    }
  
    if (!username) {
      alert("닉네임을 입력하세요.");
      return;
    }
  
    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (isUsernameAvailable) {
      alert("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      await signup({ email, username, password, location });
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
          <div>닉네임 *</div>
          <Input
            name="username"
            required
            id="username"
            placeholder="닉네임"
            style={{
              maxWidth: 'calc(100% - 138px)',
              width: '220px',
              borderRadius: '5px 0 0 5px'
            }}
          />
          <Button
            style={{
              width: '110px',
              borderRadius: '0 5px 5px 0',
              padding: '12.5px'
            }}
            onClick={async () => {
              const usernameInput = document.getElementById("username").value;
              if (!usernameInput) {
                alert('닉네임을 입력하세요.');
                return;
              }
              
              const available = await checkUsernameAvailability(usernameInput);
              if (!available) {
                alert('사용 가능한 닉네임입니다.');
              } else {
                alert('중복된 닉네임입니다.');
              }
            }}
          >
            중복 확인
          </Button>
          <div>이메일 주소 *</div>
          <Input
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
              borderRadius: '0 5px 5px 0',
              padding: '12.5px'
            }}
            onClick={async () => {
              const email = document.getElementById("email").value;
              const available = await checkEmailAvailability(email);
              if (available) {
                alert('이미 가입된 이메일입니다.');
              } else {
                sendEmailVerificationCode(email);
              }
            }}
          >
            확인
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
          <div style={{marginTop: '20px'}}>활동지역</div>
          <Select
            name="location"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">-- 활동지역 선택 --</option>
            <option value="경기도">경기도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="전라남도">전라남도</option>
            <option value="전라북도">전라북도</option>
            <option value="충청남도">충청남도</option>
            <option value="충청북도">충청북도</option>
            <option value="강원도">강원도</option>
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="제주특별자치도">제주특별자치도</option>
            <option value="세종특별자치시">세종특별자치시</option>
          </Select>
          <div>비밀번호 *</div>
          <InputWithIcon>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              id="password"
              placeholder="비밀번호"
            />
            <Icon onClick={handlePasswordVisibility}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </Icon>
          </InputWithIcon>
          <div>비밀번호 확인 *</div>
          <InputWithIcon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
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
