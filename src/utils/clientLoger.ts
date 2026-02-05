type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'highlight';

interface LogOptions {
    data?: unknown;
    requestId?: string;
}

function createClientLogger(context: string) {
    const isDev = import.meta.env.DEV;

    const timestamp = () => new Date().toISOString();

    const styleMap: Record<LogLevel, string> = {
        info: 'color: gray;',
        warn: 'color: orange; font-weight: bold;',
        error: 'color: red; font-weight: bold;',
        debug: 'color: cyan;',
        highlight: 'color: white; background: purple; font-weight: bold;',
    };

    function log(level: LogLevel, message: string, options?: LogOptions) {
        // Skip debug logs in production
        if (level === 'debug' && !isDev) return;

        const prefix = `[${timestamp()}] [${context}]`;

        const style = styleMap[level];

        if (options?.data) {
            console.groupCollapsed(
                `%c${prefix} ${level.toUpperCase()} → ${message}`,
                style
            );
            console.log('Data:', options.data);
            console.groupEnd();
        } else {
            console.log(
                `%c${prefix} ${level.toUpperCase()} → ${message}`,
                style
            );
        }
    }

    return {
        info: (msg: string, options?: LogOptions) => log('info', msg, options),

        warn: (msg: string, options?: LogOptions) => log('warn', msg, options),

        error: (msg: string, options?: LogOptions) =>
            log('error', msg, options),

        debug: (msg: string, options?: LogOptions) =>
            log('debug', msg, options),

        highlight: (msg: string, options?: LogOptions) =>
            log('highlight', msg, options),
    };
}
export default createClientLogger;
