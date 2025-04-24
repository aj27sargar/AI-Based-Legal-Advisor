import React, { useEffect } from "react";
import "./Chatbot.css"; // Adjust the path if necessary
import bg from "../../assets/lawyer4.jpg"

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress script when the component mounts
    const injectBotpressScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"; 
      script.async = true;
      document.body.appendChild(script);

      const configScript = document.createElement("script");
      configScript.src = "https://files.bpcontent.cloud/2025/02/24/12/20250224124337-G1WSOQIU.js"; 
      configScript.async = true;
      document.body.appendChild(configScript);

      return () => {
        document.body.removeChild(script);
        document.body.removeChild(configScript);
      };
    };

    injectBotpressScript();
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <h1>Welcome to Our Legal AI Chatbot 🤖</h1>
        <p>Ask me any legal questions, and I'll assist you with accurate and instant responses.</p>
        <img src={bg} alt="Chatbot" className="chatbot-image" />
        <h2>What can I help you with?</h2>
        <ul>
          <li>📜 Legal document guidance</li>
          <li>⚖️ Basic legal advice</li>
          <li>📅 Book appointments with lawyers</li>
          <li>🔍 Case law references</li>
        </ul>
        <p>Click on the chatbot in the bottom-right corner to start chatting!</p>
      </div>
    </div>
  );
};

export default Chatbot;
