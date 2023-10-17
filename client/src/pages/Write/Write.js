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

const Span = styled.span`
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 14px;
  margin: 8px 0 0 0;
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
  margin: 8px 0 2px 0;
  width: calc(100% - 28px);
  height: 90px;
  max-width: 330px;
  border-radius: 5px;
  border: none;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
  resize: none;
`;

const Suggestion = styled.div`
  background: #ccc;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
`;

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('#');
  const [techStack, setTechStack] = useState('#');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [techStacks, setTechStacks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [techSuggestions, setTechSuggestions] = useState([]);

  const categorySuggestions = ["게임", "공유서비스", "건강", "교육", "뉴스/정보", "부동산/인테리어", "뷰티/패션", "소셜네트워크", "엔터테인먼트", "여행", "유틸", "육아/출산", "이커머스", "헬스/스포츠"].filter(item => item.trim() !== "");
  const techStackSuggestions = ["React", "Node.js", "MongoDB", "Express", "HTML", "CSS", "JavaScript", "Redux", "GraphQL", "Docker", "AWS", "REST API", "Python", "PostgreSQL", "Angular", "Vue.js", "Firebase", "Ruby", "Java", "Kotlin", "Swift"].filter(item => item.trim() !== "");

  const getSuggestions = (value, suggestionsArray) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    if (inputLength < 1) {
      return [];
    }
  
    const searchValue = inputValue[0] === '#' ? inputValue.substring(1) : inputValue;
  
    return suggestionsArray.filter(item => {
      const lowercasedItem = item.toLowerCase();
      return lowercasedItem.includes(searchValue);
    });
  };  

  const SelectedCategories = ({ selectedCategory, removeCategory }) => {
    return selectedCategory ? (
      <div className="selected-category" onClick={() => removeCategory(selectedCategory)}>
        #{selectedCategory} &times;
      </div>
    ) : null;
  };   
  
  const SelectedTechStacks = ({ techStacks, removeTechStack }) => {
    return (
      <div>
        {techStacks.map((techStack, index) => (
          <div key={index} className="selected-tech-stack" onClick={() => removeTechStack(techStack)}>
            #{techStack} &times;
          </div>
        ))}
      </div>
    );
  };

  const renderSuggestion = suggestion => (
    <Suggestion onClick={() => handleCategorySuggestionClick(suggestion)}>
      #{suggestion}
    </Suggestion>
  );
  const renderTechSuggestion = suggestion => (
    <Suggestion onClick={() => handleTechStackSuggestionClick(suggestion)}>
      #{suggestion}
    </Suggestion>
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

  const handleCategorySuggestionClick = (suggestion) => {
    setCategory('#' + suggestion);
    setSelectedCategory(suggestion);
  };  

  const handleTechStackSuggestionClick = (suggestion) => {
    setTechStack('#' + suggestion);
    setTechStacks([...techStacks, suggestion]);
  };  

  const handleCategoryChange = (event, { newValue }) => {
    setCategory(newValue.startsWith('#') ? newValue : `#${newValue}`);
  };

  const handleTechStackChange = (event, { newValue }) => {
    setTechStack(newValue.startsWith('#') ? newValue : `#${newValue}`);
  };


  const removeCategory = (categoryToRemove) => {
    if (selectedCategory === categoryToRemove) {
      setSelectedCategory('');
    }
  };  

  const removeTechStack = (techStackToRemove) => {
    const updatedTechStacks = techStacks.filter(techStack => techStack !== techStackToRemove);
    setTechStacks(updatedTechStacks);
  };

  const categoryInputProps = {
    placeholder: '카테고리',
    value: category,
    defaultValue: '#',
    onChange: handleCategoryChange,
  };  
  
  const techStackInputProps = {
    placeholder: '기술 스택',
    value: techStack,
    defaultValue: '#',
    onChange: handleTechStackChange,
  };

  const renderInputComponent = inputProps => (
    <Input {...inputProps} />
  );  

  const handleSubmit = () => {
    if (!title || title.trim() === '') {
      console.error('제목을 입력하세요.');
      return;
    }
  
    const cleanCategory = category.replace(/^#/, '');
    const cleanTechStacks = techStacks.map(stack => stack.replace(/^#/, ''));
  
    const currentDate = new Date().toISOString();
  
    const username = localStorage.getItem('username');
  
    const projectData = {
      title,
      desc: description,
      createdate: currentDate,
      cate: cleanCategory,
      stack: cleanTechStacks,
      member: [
        {
          name: username,
          position: '팀장',
        },
      ],
    };
  
    addProject(projectData)
      .then(response => {
        console.log('프로젝트 추가 성공:', response);
        navigate('/list/my');
      })
      .catch(error => {
        console.error('프로젝트 추가 오류:', error);
      });
  };  

  return (
    <Container>
      <Title>프로젝트 등록</Title>
      <Span>제목</Span>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Span>프로젝트 설명</Span>
      <Textarea
        placeholder="프로젝트 설명"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Span>카테고리</Span>
      <SelectedCategories selectedCategory={selectedCategory} removeCategory={removeCategory} />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={categoryInputProps}
        renderInputComponent={renderInputComponent}
      />
      <Span>기술 스택</Span>
      <SelectedTechStacks techStacks={techStacks} removeTechStack={removeTechStack} />
      <Autosuggest
        suggestions={techSuggestions}
        onSuggestionsFetchRequested={onTechSuggestionsFetchRequested}
        onSuggestionsClearRequested={onTechSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderTechSuggestion}
        inputProps={techStackInputProps}
        renderInputComponent={renderInputComponent}
      />
      <Button onClick={handleSubmit}>작성 완료</Button>
    </Container>
  );
};

export default Write;
