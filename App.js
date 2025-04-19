import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.homeContainer}>
      <div style={styles.textContent} >
        <h1 style={styles.heading}> "Hey I'm your Shopping Assistant. How can I help you?"</h1>
        <button style={styles.button} onClick={() => navigate('/assistant')}>Click Here</button>
      </div>
      <div>
        
        <img
          src="C:\Users\ajayc\Downloads\zitharaimage.jpg" // replace with any image you prefer
          alt="Shopping Preview"
          style={styles.image}
        />
      </div>
    </div>
  );
}

function AssistantPage() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleAsk = () => {
    const question = userInput||transcript;
let answer= 'sorry,I could not understand.please try again.';
    if(question.toLowerCase().includes('offers')){
      answer='we have 30% off on summer weat!';
    }else if(question.toLowerCase().includes('i want to buy a laptop')){
      answer='Here are the some brands.Dell,Hp,Lenovo,Acer,...';
    }else if(question.toLowerCase().includes('hello')){
      answer='Hello, I am your Shopping Assistant';
    }
    setResponse(`You asked: "${question}"AI says: ${answer}`);
    resetTranscript();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  return (
    <div style={styles.assistantContainer}>
      <h1 style={styles.heading}> 🛍️Virtual Shopping Assistant</h1>
      <input
        type="text"
        value={userInput || transcript}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me about products, sizes, offers..."
        style={styles.input}
      />
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleAsk}>Ask</button>
        <button style={styles.button} onClick={startListening}>
          {listening ? 'Listening...' : 'Use Mic'}
        </button>
      </div>
      {response && <div style={styles.response}>{response}</div>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<AssistantPage />} />
      </Routes>
    </Router>
  );
}

const styles = {
  homeContainer: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  textContent: {
    marginBottom: '30px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  button: {
    padding: '12px 24px',
    margin: '10px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  image: {
    maxWidth: '300px',
    borderRadius: '12px',
  },
  assistantContainer: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  input: {
    padding: '10px',
    width: '80%',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  buttonGroup: {
    marginBottom: '20px',
  },
  response: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#333',
  },
};

export default App;