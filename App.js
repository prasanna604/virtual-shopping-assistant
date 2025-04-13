import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
const getATResonse =(query) => {
  const responses ={
    "Hi":"Hi I am your shopping assistent,How can i help you",
    "show me partyware dress":"sure, here is a partyware dress ",
    "show me laptops": "we have dell,lenovo,Hp,  which type of laptop do you want dear",
    " i want a buy a mobile":"which mobile phone you have to buy , Here are some mobiles Vivo,Oppo,i phone,Samsung,Realme",
  };
  return responses[query] ||"sorry, I did't get that,could you rephrase?";
};

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setChat((prevChat) => [...prevChat, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/message", {
        message: input,
      });

      const botMessage = {
        type: "bot",
        text: response.data.reply,
      };

      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
    resetTranscript(); // Clear after sending
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Sorry, your browser doesn’t support speech recognition.</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🛍️ Virtual Shopping Assistant</h2>

      <div style={{ marginBottom: "1rem", maxHeight: "300px", overflowY: "auto" }}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.type === "user" ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <p>
              <strong>{msg.type === "user" ? "You" : "Assistant"}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flexGrow: 1, padding: "0.5rem" }}
          placeholder="Type or speak your message..."
        />
        <button onClick={handleSend} style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
        <button onClick={handleMicClick} style={{ padding: "0.5rem 1rem" }}>
          {listening ? "🛑" : "🎤"}
        </button>
      </div>
    </div>
  );
}

export default App;
