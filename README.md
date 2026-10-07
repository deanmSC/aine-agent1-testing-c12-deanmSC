# Agentic Coding Harness

A Next.js-based web harness for testing and interacting with agentic coding systems. This application provides a user-friendly interface for sending requests to an AI coding agent, viewing responses, editing code, and monitoring system logs.

## Features

- **Interactive Agent Chat**: Send requests to the coding agent and receive intelligent responses
- **Code Editor**: View and edit code with syntax highlighting and a clean interface
- **Real-time Logging**: Monitor all system activities with categorized log levels (info, warning, error, debug)
- **Message History**: Track the full conversation history with the agent
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14.2.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18.3.0

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aine-agent1-testing-c12-deanmSC
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run the linter:

```bash
npm run lint
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── agent/
│   │       └── route.ts          # API endpoint for agent interactions
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles with Tailwind
├── components/
│   ├── AgentHarness.tsx          # Main harness component
│   ├── AgentOutput.tsx           # Message display component
│   ├── CodeEditor.tsx            # Code editing component
│   └── LogPanel.tsx              # Log display component
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies and scripts
```

## Usage

### Interacting with the Agent

1. **Send a Request**: Type your request in the input field at the bottom of the Agent Interaction panel and click "Send"
2. **View Responses**: Agent responses appear in the conversation history with timestamps
3. **Edit Code**: Use the Code Editor panel to view and modify code
4. **Monitor Logs**: Check the Logs panel for system activities and debugging information

### Example Requests

Try these example requests to interact with the agent:

- "Hello" - Get a greeting from the agent
- "Create a function" - Generate a sample function
- "Refactor the code" - Get an improved version of the code
- "Write unit tests" - Generate test cases
- "Explain the code" - Get an explanation of the current code
- "Fix the bug" - Get debugging assistance

### API Endpoint

The agent API is available at `/api/agent` and accepts POST requests with the following structure:

```typescript
{
  message: string,      // User's request
  code: string,         // Current code in the editor
  history: Message[]    // Conversation history
}
```

Response format:

```typescript
{
  response: string,     // Agent's text response
  code?: string,        // Updated code (optional)
  timestamp: string     // ISO timestamp
}
```

## Customization

### Connecting to a Real AI Service

The current implementation uses a mock agent in `app/api/agent/route.ts`. To connect to a real AI service:

1. Install your AI provider's SDK (e.g., OpenAI, Anthropic, etc.)
2. Add your API key to environment variables (`.env.local`)
3. Replace the mock logic in `app/api/agent/route.ts` with actual API calls

Example with OpenAI:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In your POST handler:
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a coding assistant." },
    { role: "user", content: message }
  ],
});
```

### Styling

The application uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js` or modify component styles directly in the component files.

## Environment Variables

Create a `.env.local` file in the root directory for environment-specific configuration:

```env
# Example environment variables
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.
