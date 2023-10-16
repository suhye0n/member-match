import React, { useState } from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import { Link, useNavigate } from 'react-router-dom';
import { addProject } from "../../service/ApiService";

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

const Textarea = styled.textarea`
  padding: 14px;
  margin: 8px 0 20px 0;
  width: calc(100% - 28px);
  height: 90px;
  max-width: 330px;
  border-radius: 5px;
  border: none;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
  resize: none;
`;

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [techStack, setTechStack] = useState('');
  const [categories, setCategories] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [techSuggestions, setTechSuggestions] = useState([]);

  const categorySuggestions = ["게임", "공유서비스", "건강", "교육", "뉴스/정보", "부동산/인테리어", "뷰티/패션", "소셜네트워크", "엔터테인먼트", "여행", "유틸", "육아/출산", "이커머스", "헬스/스포츠"].filter(item => item.trim() !== "");
  const techStackSuggestions = ["React", "Node.js", "MongoDB", "Express", "HTML", "CSS", "JavaScript", "Redux", "GraphQL", "Docker", "AWS", "REST API", "Python", "PostgreSQL", "Angular", "Vue.js", "Firebase", "Ruby", "Java", "Kotlin", "Swift"].filter(item => item.trim() !== "");

  const getSuggestions = (value, suggestionsArray) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0 || inputValue === "#") {
      return suggestionsArray;
    }

    return suggestionsArray.filter(item => item.toLowerCase().includes(inputValue));
  };


  const renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, categorySuggestions));
  };

  const onTechSuggestionsFetchRequested = ({ value }) => {
    setTechSuggestions(getSuggestions(value, techStackSuggestions));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onTechSuggestionsClearRequested = () => {
    setTechSuggestions([]);
  };

  const handleCategoryChange = (event, { newValue }) => {
    setCategory(newValue);
  };

  const handleTechStackChange = (event, { newValue }) => {
    setTechStack(newValue);
  };

  const renderInputComponent = inputProps => (
    <Input {...inputProps} />
  );

  const categoryInputProps = {
    placeholder: '카테고리',
    value: category,
    onChange: handleCategoryChange,
  };

  const techStackInputProps = {
    placeholder: '기술 스택',
    value: techStack,
    onChange: handleTechStackChange,
  };

  const handleSubmit = () => {
    const projectData = {
      title,
      description,
      category: categories,
      techStack: techStacks,
    };
    // addProject(projectData).then(response => {
    //   console.log('프로젝트 추가 성공:', response);
    //   navigate('/list/my');
    // }).catch(error => {
    //   console.error('프로젝트 추가 오류:', error);
    // });
  };

  return (
    <Container>
      <Title>프로젝트 등록</Title>
      <span>제목</span>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <span>프로젝트 설명</span>
      <Textarea
        placeholder="프로젝트 설명"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <span>카테고리</span>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={categoryInputProps}
        renderInputComponent={renderInputComponent}
      />
      <span>기술 스택</span>
      <Autosuggest
        suggestions={techSuggestions}
        onSuggestionsFetchRequested={onTechSuggestionsFetchRequested}
        onSuggestionsClearRequested={onTechSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={techStackInputProps}
        renderInputComponent={renderInputComponent}
      />
      <Button onClick={handleSubmit}>작성 완료</Button>
    </Container>
  );
};

export default Write;
