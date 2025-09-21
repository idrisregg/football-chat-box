import React from "react";
import './texts.scss'
import userPfpf from '/pfp.jpg';
import botPfp from '/bot.jpg';
import { useEffect, useRef } from "react";

export default function Texts({message}){
  const endRef = useRef(null);
    useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

    return(
        <div className="texts">
           {message.map((msg, index) => (
            <div key={index} className={`text ${msg.sender === 'user' ? 'user-text' : 'bot-text'}`}>
              {msg.sender !== 'user' && (
                <img src={botPfp} alt="Bot" className="pfp" />
              )}
              <span>{msg.text}</span>
                {msg.sender === 'user' && (
                  <img src={userPfpf} alt="User" className="pfp" />
                )}
            </div>
          ))}
      <div ref={endRef} />
      </div>
    )
}