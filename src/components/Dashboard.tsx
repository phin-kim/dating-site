import React, { useState } from 'react';
import type { UserProfile } from '../types/profile';
import { MOCK_USERS, PRIMARY_GRADIENT } from '../library/constants';
import { GrMagic } from 'react-icons/gr';
import { FaHeart, FaStar, FaXmark } from 'react-icons/fa6';
import { FaUndo } from 'react-icons/fa';
import { MdBolt } from 'react-icons/md';
import Navbar from './Navbar';
interface ProfileCardProps {
    user: UserProfile;
    onLike: () => void;
    onPass: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onLike, onPass }) => {
    const [icebreaker, setIcebreaker] = useState<string>('');
    const [isLoadingIcebreaker, setIsLoadingIcebreaker] = useState(false);

    const handleGetIcebreaker = async () => {
        setIsLoadingIcebreaker(true);
        const text = 'ai willbe intergrated later on in the backend';
        setIcebreaker(text);
        setIsLoadingIcebreaker(false);
    };

    return (
        <div className="group relative w-full max-w-md overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-2xl">
            <div className="relative h-25">
                <img
                    src={user.images[0]}
                    alt={user.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute text-white right-6 bottom-6 left-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold">
                            {user.name}, {user.age}
                        </h2>
                        {user.compatibilityScore && (
                            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-rose-500/90 backdrop-blur-sm">
                                {user.compatibilityScore}% Compatibility
                            </span>
                        )}
                    </div>
                    <p className="mb-4 text-sm text-gray-200 line-clamp-2">
                        {user.bio}
                    </p>

                    <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
                        {user.interests.map((interest) => (
                            <span
                                key={interest}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 whitespace-nowrap backdrop-blur-md"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6">
                {icebreaker ? (
                    <div className="p-4 mb-4 duration-500 border animate-in fade-in slide-in-from-bottom-2 rounded-2xl border-rose-100 bg-rose-50">
                        <p className="mb-1 text-xs font-bold uppercase text-rose-500">
                            Spark Starter Idea:
                        </p>
                        <p className="text-sm italic text-gray-700">
                            "{icebreaker}"
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={handleGetIcebreaker}
                        disabled={isLoadingIcebreaker}
                        className="flex items-center justify-center w-full gap-2 py-3 mb-4 font-semibold transition-all border rounded-xl border-rose-200 text-rose-500 hover:bg-rose-50"
                    >
                        {isLoadingIcebreaker ? (
                            <i className="fas fa-circle-notch animate-spin"></i>
                        ) : (
                            <GrMagic className="text-rose-400" />
                        )}
                        {isLoadingIcebreaker
                            ? 'Creating magic...'
                            : 'Get a Spark tip'}
                    </button>
                )}

                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={onPass}
                        className="flex items-center justify-center flex-1 text-xl text-gray-400 transition-all border-2 border-gray-100 h-14 rounded-2xl hover:bg-gray-50 hover:text-gray-600"
                    >
                        <FaXmark />
                    </button>
                    <button className="flex items-center justify-center flex-1 text-xl text-purple-400 transition-all border-2 border-gray-100 h-14 rounded-2xl hover:bg-gray-50 hover:text-purple-600">
                        <FaStar />
                    </button>
                    <button
                        onClick={onLike}
                        className={`h-14 flex-2 rounded-2xl ${PRIMARY_GRADIENT} flex items-center justify-center gap-2 text-xl font-bold text-white shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] hover:shadow-xl`}
                    >
                        <FaHeart /> Like
                    </button>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [matches, setMatches] = useState<UserProfile[]>([]);

    const handleNext = () => {
        setCurrentUserIndex((prev) => (prev + 1) % MOCK_USERS.length);
    };

    const handleLike = () => {
        const user = MOCK_USERS[currentUserIndex];
        if (!matches.find((m) => m.id === user.id)) {
            setMatches([...matches, user]);
        }
        handleNext();
    };

    return (
        <div className="flex flex-col min-h-screen pt-20 bg-gray-50 md:flex-row">
            <Navbar />
            <aside className="hidden w-full overflow-y-auto bg-white border-r border-gray-200 md:block md:w-80">
                <div className="p-6">
                    <h2 className="mb-6 text-xl font-bold">Recent Matches</h2>
                    <div className="space-y-4">
                        {matches.length === 0 ? (
                            <div className="px-4 py-10 text-center border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50">
                                <p className="text-sm text-gray-400">
                                    Find your first match by exploring more
                                    profiles!
                                </p>
                            </div>
                        ) : (
                            matches.map((match) => (
                                <div
                                    key={match.id}
                                    className="flex items-center gap-4 p-3 transition-all cursor-pointer group rounded-2xl hover:bg-gray-50"
                                >
                                    <div className="relative">
                                        <img
                                            src={match.images[0]}
                                            alt={match.name}
                                            className="object-cover shadow-md h-14 w-14 rounded-2xl"
                                        />
                                        <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -right-1 -bottom-1"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            {match.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-rose-500">
                                            {match.compatibilityScore}%
                                            Compatibility
                                        </p>
                                    </div>
                                    <div className="ml-auto transition-opacity opacity-0 group-hover:opacity-100">
                                        <i className="text-gray-300 fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <h2 className="mt-12 mb-6 text-xl font-bold">Messages</h2>
                    <div className="py-8 text-center">
                        <p className="text-sm text-gray-400">
                            Once you match, you can start chatting here.
                        </p>
                    </div>
                </div>
            </aside>

            <main className="flex flex-col items-center justify-center flex-1 p-4 md:p-8">
                <div className="flex flex-col items-center w-full max-w-7xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 font-serif text-3xl font-bold text-gray-900">
                            Discover Connections
                        </h1>
                        <p className="text-gray-500">
                            Profiles curated based on your preferences and vibe.
                        </p>
                    </div>

                    <ProfileCard
                        user={MOCK_USERS[currentUserIndex]}
                        onLike={handleLike}
                        onPass={handleNext}
                    />

                    <div className="flex gap-8 mt-12">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 mb-2 text-gray-400 bg-white shadow-sm rounded-2xl">
                                <FaUndo />
                            </div>
                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                Rewind
                            </span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 mb-2 bg-white shadow-sm rounded-2xl text-rose-400">
                                <MdBolt className="text-2xl text-rose-400" />
                            </div>
                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                Boost
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;