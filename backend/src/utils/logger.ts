import chalk from 'chalk';
import crypto from 'node:crypto';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'highlight';

interface LogOptions {
  requestId?: string;       // for correlating logs
  context?: string;         // module or middleware name
  data?: Record<string, unknown>; // any extra structured info
}

 function createLogger(_name: string) {
  const timestamp = () => new Date().toISOString();

  const formatArgs = (level: LogLevel, message: string, options?: LogOptions) => {
    const rid = options?.requestId ?? crypto.randomUUID().slice(0, 8);
    const ctx = options?.context ? `[${options.context}]` : '';
    return [
      `[${timestamp()}]`,
      `[${rid}]`,
      ctx,
      chalk[level === 'error' ? 'redBright' : level === 'warn' ? 'yellow' : level === 'highlight' ? 'bgCyanBright' : 'gray'](level.toUpperCase()),
      message,
      options?.data ? JSON.stringify(options.data, null, 2) : '',
    ].filter(Boolean).join(' ');
  };

  const logger = {
    info: (message: string, options?: LogOptions) => {
      console.log(formatArgs('info', message, options));
    },

    warn: (message: string, options?: LogOptions) => {
      console.warn(formatArgs('warn', message, options));
    },

    error: (message: string | Error, options?: LogOptions) => {
      if (message instanceof Error) {
        console.error(formatArgs('error', message.message, { ...options, data: { stack: message.stack, ...options?.data } }));
      } else {
        console.error(formatArgs('error', message, options));
      }
    },

    highlight: (message: string, options?: LogOptions) => {
      console.log(formatArgs('highlight', message, options));
    },

    debug: (message: string, options?: LogOptions) => {
      if (process.env.DEBUG === 'true') {
        console.log(formatArgs('debug', message, options));
      }
    },

    // structured log
    structured: (level: LogLevel, message: string, options?: LogOptions) => {
      console.log({
        timestamp: timestamp(),
        requestId: options?.requestId,
        context: options?.context,
        level,
        message,
        data: options?.data,
      });
    },
  };

  return logger;
}
export default createLogger