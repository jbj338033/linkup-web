import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #1a73e8;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #105296;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login: React.FC = () => {
  const { body, loading, error, login, handleInput } = useLogin();

  return (
    <Container>
      <LoginWrapper>
        <Title>Login</Title>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={body.email}
          onChange={handleInput}
        />
        {error && error === "INVALID_EMAIL" && (
          <Error>이메일 형식이 잘못되었습니다.</Error>
        )}
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={body.password}
          onChange={handleInput}
        />
        {error && error === "INVALID_PASSWORD" && (
          <Error>비밀번호 형식이 잘못되었습니다.</Error>
        )}
        <Button onClick={login} disabled={loading}>
          Login
        </Button>
      </LoginWrapper>
    </Container>
  );
};

export default Login;
