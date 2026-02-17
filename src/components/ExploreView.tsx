import React from 'react';
import type { UserProfile } from '../types/profile';
import { MOCK_USERS, PRIMARY_GRADIENT } from '../library/constants';
import { FaSliders, FaHeart } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import Navbar from './Navbar';
import useConnection from '../Store/matchStore';

const ExploreView: React.FC = () => {
    const { addMatch } = useConnection((state) => ({
        addMatch: state.addMatch,
    }));
    const handleLike = (user: UserProfile) => {
        addMatch(user);
    };

    const handlePass = (user: UserProfile) => {
        // In a real app, this would hide the user from discovery
        console.log('Passed on', user.name);
    };

    return (
        <>
            <Navbar />
            <div className="px-4 pt-24 pb-12 mx-auto max-w-7xl">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="font-serif text-4xl font-bold text-gray-900">
                            Discover
                        </h1>
                        <p className="mt-2 text-gray-500">
                            People near you who share your sparks.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 text-gray-500 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                            <FaSliders />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {MOCK_USERS.map((user) => (
                        <div
                            key={user.id}
                            className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
                        >
                            <div className="relative overflow-hidden aspect-4/5">
                                <img
                                    src={user.images[0]}
                                    alt={user.name}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 transition-opacity bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90"></div>

                                <div className="absolute top-4 right-4">
                                    <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md">
                                        {user.compatibilityScore}% Match
                                    </span>
                                </div>

                                <div className="absolute text-white right-6 bottom-6 left-6">
                                    <h3 className="text-2xl font-bold">
                                        {user.name}, {user.age}
                                    </h3>
                                    <p className="mb-3 text-sm text-gray-200">
                                        {user.location}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.interests
                                            .slice(0, 3)
                                            .map((interest) => (
                                                <span
                                                    key={interest}
                                                    className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md"
                                                >
                                                    {interest}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 p-4 bg-white">
                                <button
                                    onClick={() => handlePass}
                                    className="flex items-center justify-center flex-1 py-3 text-gray-400 transition-all rounded-2xl bg-gray-50 hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                                <button
                                    onClick={() => handleLike}
                                    className={`flex-3 rounded-2xl py-3 ${PRIMARY_GRADIENT} flex items-center justify-center gap-2 font-bold text-white shadow-lg shadow-rose-100 transition-all hover:scale-[1.02]`}
                                >
                                    <FaHeart /> Connect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ExploreView;
