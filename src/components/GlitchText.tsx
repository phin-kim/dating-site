import React from 'react';
import { motion } from 'framer-motion';

export const GlitchText: React.FC<{ text: string; className?: string }> = ({
    text,
    className,
}) => {
    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <motion.span
                animate={{ x: [0, -2, 2, 0], opacity: [0, 0.7, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
                className="text-pink absolute top-0 left-0 z-0 h-full w-full skew-x-12 mix-blend-screen select-none"
            >
                {text}
            </motion.span>
            <motion.span
                animate={{ x: [0, 2, -2, 0], opacity: [0, 0.7, 0.4, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 0.15,
                    repeatDelay: 1.5,
                }}
                className="absolute top-0 left-0 z-0 h-full w-full -skew-x-12 text-cyan-400 mix-blend-screen select-none"
            >
                {text}
            </motion.span>
        </div>
    );
};
