import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 4rem;
  align-items: center;
  background-color: #333;
`;

export const MessageContainer = styled.div`
  padding: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  overflow-y: auto;
  background-color: white;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const MyMessageContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

export const MyProfileImage = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

export const MyMessage = styled.div`
    background-color: #007bff;
    border-radius: 5px;
    color: white;
    margin-bottom: 10px;
    padding: 10px;
    text-align: right;
    width: fit-content;
    max-width: 80%;
`;

export const OtherMessageContainer = styled.div`
    display: flex;
`;

export const OtherProfileImage = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

export const OtherMessage = styled.div`
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
    width: fit-content;
    justify-self: flex-start;
    max-width: 80%;
`;

export const MessageText = styled.p`
  margin: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

export const Input = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 10px;
`;

export const SendButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 10px;
`;