import React, { useState } from 'react';
import type { UserProfile, Message } from '../types/profile';
import { PRIMARY_GRADIENT } from '../library/constants';
import useMatches from '../Store/matchStore';
import Navbar from './Navbar';
import { FaCircleInfo, FaWandMagic } from 'react-icons/fa6';
import { FaPaperPlane, FaCommentDots, FaVideo } from 'react-icons/fa';
//import { suggestIcebreaker } from '../services/geminiService';

const ChatArea: React.FC = () => {
    const matches = useMatches((state) => state.matches);
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
        <>
            <Navbar />
            <div className="flex flex-col h-screen pt-20 overflow-hidden bg-white md:flex-row">
                {/* Sidebar */}
                <aside className="flex flex-col w-full h-full bg-white border-r border-gray-100 md:w-96">
                    <div className="p-6">
                        <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">
                            Messages
                        </h2>

                        {/* New Matches Row */}
                        <div className="mb-8">
                            <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                                New Sparks
                            </h3>
                            <div className="flex gap-4 pb-2 overflow-x-auto scrollbar-hide">
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
                                        className="object-cover w-12 h-12 shadow-sm rounded-xl"
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
                                        <p className="text-sm text-gray-500 truncate">
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
                <main className="flex flex-col flex-1 h-full bg-gray-50/50">
                    {selectedMatch ? (
                        <>
                            {/* Chat Header */}
                            <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={selectedMatch.images[0]}
                                        alt={selectedMatch.name}
                                        className="object-cover w-10 h-10 rounded-full"
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
                                        <FaVideo />
                                    </button>
                                    <button className="text-gray-400 transition-colors hover:text-gray-600">
                                        <FaCircleInfo />
                                    </button>
                                </div>
                            </header>

                            {/* Message Feed */}
                            <div className="flex-1 p-8 space-y-4 overflow-y-auto">
                                {activeMessages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full max-w-xs mx-auto text-center">
                                        <div className="flex items-center justify-center w-20 h-20 mb-6 text-3xl bg-white shadow-sm rounded-3xl text-rose-500">
                                            <FaCommentDots />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold">
                                            Matched with {selectedMatch.name}!
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            They share your interest in{' '}
                                            {selectedMatch.interests[0]}. Don't
                                            be shy!
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
                            <div className="p-8 bg-white border-t border-gray-100">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="relative flex items-center gap-4"
                                >
                                    <button
                                        type="button"
                                        onClick={handleGetSparkSuggestion}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center w-12 h-12 transition-all rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100"
                                        title="Get a Spark Tip"
                                    >
                                        {isGenerating ? (
                                            <div className="absolute w-6 h-6 border-b-2 border-white rounded-full top-1 right-2 animate-spin" />
                                        ) : (
                                            <FaWandMagic />
                                        )}
                                    </button>
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) =>
                                            setInputText(e.target.value)
                                        }
                                        placeholder="Type a message..."
                                        className="flex-1 px-6 py-4 text-sm border-none outline-none rounded-2xl bg-gray-50 focus:ring-2 focus:ring-rose-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className={`h-12 w-12 rounded-2xl ${inputText.trim() ? PRIMARY_GRADIENT : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-white shadow-lg shadow-rose-100 transition-all`}
                                    >
                                        <FaPaperPlane />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full p-12 text-center">
                            <div className="max-w-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
                                    alt="Discover"
                                    className="w-32 h-32 mx-auto mb-8 shadow-2xl rounded-4xl opacity-30 grayscale"
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
        </>
    );
};

export default ChatArea;
