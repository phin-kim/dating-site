import React from 'react';
import { PRIMARY_GRADIENT } from '../library/constants';
import { useAuthStore } from '../Store/authStore';
import { FaCommentDots, FaGrinHearts } from 'react-icons/fa';
import { FaCompass, FaHeart } from 'react-icons/fa6';

import { useNavigate } from 'react-router';
const Navbar = () => {
    const navigate = useNavigate();
    const isAuth = useAuthStore((state) => state.isAuthenticated);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl">
                <div className="flex items-center gap-2 cursor-pointer">
                    <div
                        className={`h-10 w-10 rounded-xl ${PRIMARY_GRADIENT} flex items-center justify-center text-xl text-white shadow-lg shadow-rose-200`}
                    >
                        <FaHeart className="text-lg text-white" />
                    </div>
                    <span className="font-serif text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text">
                        Love Connect
                    </span>
                </div>

                <div className="items-center hidden gap-8 md:flex">
                    <>
                        {isAuth ? (
                            <div className="flex items-center gap-6">
                                <button
                                    className={`'text-gray-500 hover:text-rose-500' flex items-center gap-2 transition-all`}
                                >
                                    <FaCompass className="text-lg text-gray-600" />{' '}
                                    Discover
                                </button>
                                <button
                                    className={`'text-gray-500 hover:text-rose-500' flex items-center gap-2 transition-all`}
                                >
                                    <FaCommentDots className="text-lg text-gray-600" />
                                    Chats
                                </button>
                                <button
                                    className={`'text-gray-500 hover:text-rose-500' flex items-center gap-2 transition-all`}
                                >
                                    <FaGrinHearts className="text-lg text-gray-600" />
                                    Matches
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className={`p-0.5' h-10 w-10 rounded-full border-2 border-rose-500`}
                                >
                                    <img
                                        src="https://picsum.photos/seed/me/100"
                                        alt="Profile"
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </button>
                            </div>
                        ) : (
                            <>
                                <button className="font-medium text-gray-600 transition-colors hover:text-rose-500">
                                    How it Works
                                </button>
                                <button className="font-medium text-gray-600 transition-colors hover:text-rose-500">
                                    Success Stories
                                </button>
                            </>
                        )}
                    </>
                </div>

                <div className="md:hidden">
                    <button className="text-2xl text-gray-500">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
