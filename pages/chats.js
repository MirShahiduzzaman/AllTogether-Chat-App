import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

console.log(process.env);

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() =>{
    if(username.length === 0 || secret.length === 0) router.push("/");
  });

  if(!showChat) return <div />;

  
  function logout() {
    setUsername("");
    setSecret("");
  }

  return (
    <div className="background">
      <span>{username}</span>
      <span className="logout">
        <button onClick={logout}>Logout</button>
      </span>

      <div className="shadow">
        <ChatEngine
          height = "calc(100vh - 200px)"
          projectID = {process.env.NEXT_PUBLIC_PROJECT_ID}
          userName = {username}
          userSecret = {secret}
          renderNewMessageForm={() => <MessageFormSocial autocomplete="off"/>}
        />
      </div>
    </div>
  );
}
