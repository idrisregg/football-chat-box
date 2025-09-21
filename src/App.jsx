import React from 'react'; 
import Texts from './componenets/texts';
import Inputs from './componenets/inputs';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const sendMessageToBot = async (input) => {
  const userMessage = { sender: "user", text: input };
  setMessages((prevMessages) => [...prevMessages, userMessage]);
  setLoading(true);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const history = [...messages, userMessage].map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
  history,
  systemInstruction: {
    role: "system",
    parts: [
      { text: "You are a support assistant. Only answer soccer/football-related questions." }
    ]
  }
});

    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = response.text();

    const botMessage = { sender: "bot", text };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  } catch (error) {
    console.error("Error communicating with the bot:", error);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Error: " + error.message },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div >
        <Texts message={messages} />
        <Inputs onSend={sendMessageToBot} loading={loading} />
    </div>
  );
}

export default App
