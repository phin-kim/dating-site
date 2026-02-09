import React from 'react';
import { PRIMARY_GRADIENT } from '../library/constants';
import { useNavigate } from 'react-router';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className="flex cursor-pointer items-center gap-2">
                    <div
                        className={`h-10 w-10 rounded-xl ${PRIMARY_GRADIENT} flex items-center justify-center text-xl text-white shadow-lg shadow-rose-200`}
                    >
                        <i className="fas fa-heart"></i>
                    </div>
                    <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text font-serif text-2xl font-bold tracking-tight text-transparent">
                        Love Connect
                    </span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    <>
                        <button className="font-medium text-gray-600 transition-colors hover:text-rose-500">
                            How it Works
                        </button>
                        <button className="font-medium text-gray-600 transition-colors hover:text-rose-500">
                            Success Stories
                        </button>
                        <button
                            className={`rounded-full px-6 py-2 font-semibold text-white shadow-md transition-all hover:shadow-xl active:scale-95 ${PRIMARY_GRADIENT}`}
                        >
                            Sign In
                        </button>
                    </>
                    ) : (
                    <div className="flex items-center gap-6">
                        <button
                            className={`'text-gray-500 hover:text-rose-500' flex items-center gap-2 transition-all`}
                        >
                            <i className="fas fa-compass"></i> Discover
                        </button>
                        <button
                            className={`'text-gray-500 hover:text-rose-500' flex items-center gap-2 transition-all`}
                        >
                            <i className="fas fa-comment-dots"></i> Chats
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className={`p-0.5' h-10 w-10 rounded-full border-2 border-rose-500`}
                        >
                            <img
                                src="https://picsum.photos/seed/me/100"
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </button>
                    </div>
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
