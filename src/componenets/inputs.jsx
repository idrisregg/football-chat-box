import React from "react";
import { useState } from "react";
import './inputs.scss';

export default function Inputs({onSend, loading}){
    const [input, setInput] = useState("");
    
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };


    return(
        <form className="input" onSubmit={handleSubmit}>
        <input type="text" placeholder="Type your message here..." value={input} onChange={(e) => setInput(e.target.value)}/>
        <button type="submit" disabled={loading}>Send</button>
        </form>
    )
}