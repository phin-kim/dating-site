import React, { useState } from 'react';
import type { UserProfile, Message } from '../types/profile';
import { PRIMARY_GRADIENT } from '../library/constants';
//import { suggestIcebreaker } from '../services/geminiService';

interface ChatAreaProps {
    matches: UserProfile[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ matches }) => {
    const [selectedMatch, setSelectedMatch] = useState<UserProfile | null>(
        matches[0] || null
    );
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const activeMessages = selectedMatch
        ? messages[selectedMatch.id] || []
        : [];

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!selectedMatch || !inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: inputText,
            timestamp: new Date(),
        };

        setMessages((prev) => ({
            ...prev,
            [selectedMatch.id]: [...(prev[selectedMatch.id] || []), newMessage],
        }));
        setInputText('');
    };

    const handleGetSparkSuggestion = async () => {
        if (!selectedMatch) return;
        setIsGenerating(true);
        const suggestion = 'Suggestion will be AI generated later';
        setInputText(suggestion);
        setIsGenerating(false);
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-white pt-20 md:flex-row">
            {/* Sidebar */}
            <aside className="flex h-full w-full flex-col border-r border-gray-100 bg-white md:w-96">
                <div className="p-6">
                    <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">
                        Messages
                    </h2>

                    {/* New Matches Row */}
                    <div className="mb-8">
                        <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                            New Sparks
                        </h3>
                        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                            {matches.map((match) => (
                                <button
                                    key={`spark-${match.id}`}
                                    onClick={() => setSelectedMatch(match)}
                                    className={`group relative w-16 shrink-0`}
                                >
                                    <div
                                        className={`h-16 w-16 rounded-2xl p-0.5 ${selectedMatch?.id === match.id ? PRIMARY_GRADIENT : 'bg-gray-200'}`}
                                    >
                                        <img
                                            src={match.images[0]}
                                            alt={match.name}
                                            className="h-full w-full rounded-[0.9rem] bg-white object-cover"
                                        />
                                    </div>
                                    <p className="mt-2 truncate text-center text-[10px] font-bold text-gray-600">
                                        {match.name}
                                    </p>
                                </button>
                            ))}
                            {matches.length === 0 && (
                                <p className="text-sm text-gray-400">
                                    No new matches yet.
                                </p>
                            )}
                        </div>
                    </div>

                    <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Conversations
                    </h3>
                    <div className="max-h-[calc(100vh-400px)] space-y-1 overflow-y-auto">
                        {matches.map((match) => (
                            <button
                                key={`list-${match.id}`}
                                onClick={() => setSelectedMatch(match)}
                                className={`flex w-full items-center gap-4 rounded-2xl p-4 transition-all ${selectedMatch?.id === match.id ? 'bg-rose-50' : 'hover:bg-gray-50'}`}
                            >
                                <img
                                    src={match.images[0]}
                                    alt={match.name}
                                    className="h-12 w-12 rounded-xl object-cover shadow-sm"
                                />
                                <div className="flex-1 overflow-hidden text-left">
                                    <div className="mb-0.5 flex items-center justify-between">
                                        <h4 className="font-bold text-gray-800">
                                            {match.name}
                                        </h4>
                                        <span className="text-[10px] text-gray-400">
                                            2h ago
                                        </span>
                                    </div>
                                    <p className="truncate text-sm text-gray-500">
                                        {messages[match.id]?.at(-1)?.text ||
                                            `Start a spark with ${match.name}!`}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex h-full flex-1 flex-col bg-gray-50/50">
                {selectedMatch ? (
                    <>
                        {/* Chat Header */}
                        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={selectedMatch.images[0]}
                                    alt={selectedMatch.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {selectedMatch.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                        <span className="text-[10px] font-medium text-gray-400">
                                            Active now
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="text-gray-400 transition-colors hover:text-gray-600">
                                    <i className="fas fa-video"></i>
                                </button>
                                <button className="text-gray-400 transition-colors hover:text-gray-600">
                                    <i className="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </header>

                        {/* Message Feed */}
                        <div className="flex-1 space-y-4 overflow-y-auto p-8">
                            {activeMessages.length === 0 && (
                                <div className="mx-auto flex h-full max-w-xs flex-col items-center justify-center text-center">
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl text-rose-500 shadow-sm">
                                        <i className="fas fa-comment-heart"></i>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold">
                                        Matched with {selectedMatch.name}!
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        They share your interest in{' '}
                                        {selectedMatch.interests[0]}. Don't be
                                        shy!
                                    </p>
                                </div>
                            )}
                            {activeMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-3xl px-6 py-3 text-sm shadow-sm ${
                                            msg.senderId === 'me'
                                                ? `${PRIMARY_GRADIENT} rounded-tr-none text-white`
                                                : 'rounded-tl-none border border-gray-100 bg-white text-gray-700'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div className="border-t border-gray-100 bg-white p-8">
                            <form
                                onSubmit={handleSendMessage}
                                className="relative flex items-center gap-4"
                            >
                                <button
                                    type="button"
                                    onClick={handleGetSparkSuggestion}
                                    disabled={isGenerating}
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 transition-all hover:bg-rose-100"
                                    title="Get a Spark Tip"
                                >
                                    {isGenerating ? (
                                        <i className="fas fa-circle-notch animate-spin"></i>
                                    ) : (
                                        <i className="fas fa-magic"></i>
                                    )}
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) =>
                                        setInputText(e.target.value)
                                    }
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className={`h-12 w-12 rounded-2xl ${inputText.trim() ? PRIMARY_GRADIENT : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-white shadow-lg shadow-rose-100 transition-all`}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center p-12 text-center">
                        <div className="max-w-sm">
                            <img
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
                                alt="Discover"
                                className="mx-auto mb-8 h-32 w-32 rounded-4xl opacity-30 shadow-2xl grayscale"
                            />
                            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-400">
                                Select a connection
                            </h2>
                            <p className="text-gray-400">
                                Pick a match from the sidebar to start a
                                meaningful conversation.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatArea;
