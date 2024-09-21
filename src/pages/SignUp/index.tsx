import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem 0;
`;

const SignupBox = styled.div`
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Button = styled.div`
  background-color: #1a73e8;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  user-select: none;

  &:hover {
    background-color: #1557b0;
  }
`;

interface SignupResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  status: string;
}

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [linkupId, setLinkupId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post<SignupResponse>(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          nickname,
          linkupId,
          email,
          password,
          birthday,
          phoneNumber,
          gender,
        }
      );

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.data.code;

        if (code === "EMAIL_DUPLICATED") {
          alert("이미 사용 중인 이메일입니다.");
        } else if (code === "PHONE_NUMBER_DUPLICATED") {
          alert("이미 사용 중인 전화번호입니다.");
        } else if (code === "LINKUP_ID_DUPLICATED") {
          alert("이미 사용 중인 LinkupId입니다.");
        }
      }
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>Sign Up</Title>
        <Input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          type="text"
          placeholder="LinkupId"
          value={linkupId}
          onChange={(e) => setLinkupId(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Birthday (YYYY-MM-DD)"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </Select>
        <Button onClick={handleSignup}>Sign Up</Button>
      </SignupBox>
    </Container>
  );
};

export default SignUp;
