# AI Models at Localhost

A Node.js Express server that provides a REST API for chatting with open-source AI models running locally via Ollama. This project allows you to interact with AI models like Llama 3.2 without relying on external cloud services.

## 🚀 Features

- **Local AI Models**: Run AI models locally using Ollama
- **REST API**: Simple HTTP endpoints for chat interactions
- **Memory Support**: Chat with conversation history
- **Multiple Endpoints**: Different chat patterns for various use cases
- **CORS Enabled**: Ready for frontend integration
- **Environment Configuration**: Flexible configuration via environment variables

## 📋 Prerequisites

Before running this project, you need to have the following installed:

1. **Node.js** (v16 or higher)
2. **Ollama** - Download and install from [ollama.ai](https://ollama.ai)
3. **Git** (for cloning the repository)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anutechofficial/ai-models-at-localhost.git
   cd ai-models-at-localhost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.2:1b
   ```

4. **Install and run Ollama models**
   ```bash
   # Install the Llama 3.2 model (or any other model you prefer)
   ollama pull llama3.2:1b
   
   # Start Ollama service
   ollama serve
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
- **GET** `/`
- **Description**: Simple health check endpoint
- **Response**: Welcome message

**Example:**
```bash
curl http://localhost:5000/
```

**Response:**
```json
"Welcome to Chat API"
```

#### 2. Chat with Memory
- **POST** `/chat`
- **Description**: Chat endpoint with conversation memory
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "message": "Your message here"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well, thank you for asking. How can I help you today?"
}
```

#### 3. Simple Question Answering
- **POST** `/chat-completions`
- **Description**: Simple question-answering without memory
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "message": "Your question here"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/chat-completions \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the capital of France?"}'
```

**Response:**
```json
{
  "reply": "The capital of France is Paris."
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port number |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `llama3.2:1b` | Default AI model to use |

### Available Models

You can use any model available in Ollama. Some popular options:

- `llama3.2:1b` - Lightweight Llama model
- `llama3.2:3b` - Medium-sized Llama model
- `llama3.2:8b` - Larger Llama model
- `mistral:7b` - Mistral 7B model
- `codellama:7b` - Code-focused model

To use a different model, either:
1. Change the `OLLAMA_MODEL` in your `.env` file
2. Modify the model name in `server.js`

## 🏗️ Project Structure

```
ai-models-at-localhost/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── package-lock.json  # Locked dependency versions
├── .env              # Environment variables (create this)
└── README.md         # This documentation
```

## 🔍 Code Architecture

### Key Components

1. **Express Server**: HTTP server with CORS and JSON middleware
2. **LangChain Integration**: Uses LangChain for AI model interactions
3. **ChatOllama**: Connects to local Ollama instance
4. **Prompt Templates**: Structured prompts for consistent responses
5. **Runnable Sequences**: Chain processing for complex workflows

### Main Features

- **Memory Management**: The `/chat` endpoint maintains conversation history
- **Template-based Prompts**: Uses LangChain prompt templates for consistent formatting
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Flexible Model Support**: Easy to switch between different AI models

## 🧪 Testing

### Using cURL

Test the health endpoint:
```bash
curl http://localhost:5000/
```

Test chat with memory:
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what is your name?"}'
```

Test simple question answering:
```bash
curl -X POST http://localhost:5000/chat-completions \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain quantum computing in simple terms"}'
```

### Using JavaScript/Fetch

```javascript
// Chat with memory
const response = await fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hello, how are you?'
  })
});

const data = await response.json();
console.log(data.reply);
```

## 🐛 Troubleshooting

### Common Issues

1. **Ollama not running**
   - Error: Connection refused to localhost:11434
   - Solution: Start Ollama with `ollama serve`

2. **Model not found**
   - Error: Model not found
   - Solution: Pull the model with `ollama pull <model-name>`

3. **Port already in use**
   - Error: EADDRINUSE
   - Solution: Change the PORT in your `.env` file

4. **CORS issues**
   - Error: CORS policy blocked
   - Solution: The server already has CORS enabled, check your frontend configuration

### Debug Mode

To enable debug logging, add this to your `.env` file:
```env
DEBUG=*
```

## 🔒 Security Considerations

- This server is designed for local development
- No authentication is implemented
- CORS is enabled for all origins
- Consider adding rate limiting for production use
- Validate and sanitize user inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) for providing the local AI model infrastructure
- [LangChain](https://langchain.com) for the AI framework
- [Express.js](https://expressjs.com) for the web framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Ensure Ollama is running and the model is installed
3. Verify your environment variables are set correctly
4. Check the server logs for detailed error messages

---

**Happy coding with Anurag Yadav! 🤖** 