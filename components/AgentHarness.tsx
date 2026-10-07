'use client'

import { useState } from 'react'
import CodeEditor from './CodeEditor'
import AgentOutput from './AgentOutput'
import LogPanel from './LogPanel'

export interface Message {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: Date
}

export interface LogEntry {
  id: string
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  timestamp: Date
}

export default function AgentHarness() {
  const [messages, setMessages] = useState<Message[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [code, setCode] = useState('// Your code here\n')

  const addLog = (level: LogEntry['level'], message: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      level,
      message,
      timestamp: new Date(),
    }
    setLogs(prev => [...prev, newLog])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)
    addLog('info', `User request: ${input}`)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          code,
          history: messages 
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, agentMessage])
      
      if (data.code) {
        setCode(data.code)
        addLog('info', 'Code updated by agent')
      }
      
      addLog('info', 'Agent response received')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      addLog('error', `Error: ${errorMessage}`)
      
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `Error: ${errorMessage}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, systemMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClearMessages = () => {
    setMessages([])
    addLog('info', 'Messages cleared')
  }

  const handleClearLogs = () => {
    setLogs([])
  }

  const handleResetCode = () => {
    setCode('// Your code here\n')
    addLog('info', 'Code reset')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Code Editor */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Code Editor</h2>
            <button
              onClick={handleResetCode}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              Reset Code
            </button>
          </div>
          <CodeEditor code={code} onChange={setCode} />
        </div>

        {/* Log Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Logs</h2>
            <button
              onClick={handleClearLogs}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              Clear Logs
            </button>
          </div>
          <LogPanel logs={logs} />
        </div>
      </div>

      {/* Right Column: Agent Interaction */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Agent Interaction</h2>
            <button
              onClick={handleClearMessages}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              Clear Messages
            </button>
          </div>
          
          <AgentOutput messages={messages} />

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your request for the agent..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={isProcessing || !input.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors font-medium"
              >
                {isProcessing ? 'Processing...' : 'Send'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">About This Harness</h3>
          <p className="text-blue-800 text-sm">
            This is a web-based harness for testing agentic coding interactions. 
            Enter requests in the input field, and the agent will respond with 
            code modifications, suggestions, or explanations. The code editor 
            allows you to view and edit code, while the log panel tracks all activities.
          </p>
        </div>
      </div>
    </div>
  )
}
