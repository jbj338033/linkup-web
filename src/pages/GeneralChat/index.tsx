import { useEffect, useRef, useState } from "react";
import { GeneralChatMessage } from "../../types/chat/general-chat";
import { CompatClient, Stomp } from "@stomp/stompjs";
import useToken from "../../hooks/auth/useToken";
import axios from "axios";
import { BaseResponse } from "../../types/base";
import * as S from "./style";
import { User } from "../../types/user/user";

const GeneralChat = () => {
  const [me, setMe] = useState<User | null>(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<GeneralChatMessage[]>([]);
  const stompClientRef = useRef<CompatClient | null>(null);
  const { getAccessToken } = useToken();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const connect = () => {
    const accessToken = getAccessToken();

    stompClientRef.current = Stomp.client(import.meta.env.VITE_WS_URL);
    stompClientRef.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        stompClientRef.current?.subscribe(
          "/exchange/linkup.exchange/room.general",
          (message) => {
            const body = JSON.parse(message.body);

            setMessages((prev) => [...prev, body]);
          }
        );
      },
      (error: Error) => {
        console.error(error);

        setTimeout(connect, 5000);
      }
    );
  };

  const disconnect = () => {
    stompClientRef.current?.disconnect(() => {
      console.log("Disconnected");
    });
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get<BaseResponse<GeneralChatMessage[]>>(
        `${import.meta.env.VITE_API_URL}/chat-messages/general`
      );

      setMessages(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getMe = async () => {
    const accessToken = getAccessToken();

    try {
      const { data } = await axios.get<BaseResponse<User>>(
        `${import.meta.env.VITE_API_URL}/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMe(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async () => {
    if (content.trim().length === 0) {
      alert("Message cannot be empty");

      return;
    }

    stompClientRef.current?.publish({
      destination: "/pub/send-general-message",
      body: JSON.stringify({ content }),
    });
    // stompClientRef.current?.send(
    //   "/pub/send-general-message",
    //   {},
    //   JSON.stringify({ content })
    // );

    setContent("");
  };

  const scrollToEnd = () => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getMe();
    connect();
    getMessages();
    scrollToEnd();

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  return (
    <S.Container>
      <S.MessageContainer ref={messageContainerRef}>
        {me &&
          messages.map((message) =>
            me.linkupId === message.sender.linkupId ? (
              <S.MyMessageContainer key={message.id}>
                <S.MyProfileImage
                  src={message.sender.profileImage}
                  alt="profile"
                />
                <S.MyMessage>
                  <S.MessageText>{message.content}</S.MessageText>
                </S.MyMessage>
              </S.MyMessageContainer>
            ) : (
              <S.OtherMessageContainer key={message.id}>
                <S.OtherProfileImage
                  src={message.sender.profileImage}
                  alt="profile"
                />
                <S.OtherMessage>
                  <S.MessageText>{message.content}</S.MessageText>
                </S.OtherMessage>
              </S.OtherMessageContainer>
            )
          )}
      </S.MessageContainer>
      <S.InputContainer>
        <S.Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <S.SendButton onClick={sendMessage}>Send</S.SendButton>
      </S.InputContainer>
    </S.Container>
  );
};

export default GeneralChat;
