'use client'

import type { LogEntry } from './AgentHarness'

interface LogPanelProps {
  logs: LogEntry[]
}

export default function LogPanel({ logs }: LogPanelProps) {
  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      case 'info':
        return 'text-blue-600'
      case 'debug':
        return 'text-gray-600'
      default:
        return 'text-gray-800'
    }
  }

  const getLevelBg = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'bg-red-50'
      case 'warning':
        return 'bg-yellow-50'
      case 'info':
        return 'bg-blue-50'
      case 'debug':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className="border border-gray-300 rounded-md h-64 overflow-y-auto p-3 bg-gray-50 font-mono text-xs">
      {logs.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No logs yet</p>
      ) : (
        <div className="space-y-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded ${getLevelBg(log.level)}`}
            >
              <span className="text-gray-500">
                [{log.timestamp.toLocaleTimeString()}]
              </span>{' '}
              <span className={`font-semibold uppercase ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>{' '}
              <span className="text-gray-900">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
