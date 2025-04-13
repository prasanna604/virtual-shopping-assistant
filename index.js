import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Default route to test server
app.get('/', (req, res) => {
  res.send('Server Running...');
});

// ✅ Step 3 lo chatbot route – IKKADA ADD CHEYYALI
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Simple chatbot reply logic
  let botReply = 'Sorry, I didn’t understand that.';

  if (userMessage.toLowerCase().includes('hello')) {
    botReply = 'Hello! How can I help you with shopping today?';
  } else if (userMessage.toLowerCase().includes('shoes')) {
    botReply = 'We have sneakers, formal shoes, and sandals available!';
  }

  res.json({ reply: botReply });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});