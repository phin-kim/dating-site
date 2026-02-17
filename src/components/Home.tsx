import React from 'react';
import { useNavigate } from 'react-router';
import { PRIMARY_GRADIENT } from '../library/constants';
import { FaHeartPulse, FaComments } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import Navbar from './Navbar';
import { useAuthStore } from '../Store/authStore';
const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    desc: string;
}> = ({ icon, title, desc }) => (
    <div className="p-8 transition-all bg-white border border-gray-100 shadow-sm rounded-3xl hover:-translate-y-1 hover:shadow-xl">
        <div
            className={`h-14 w-14 rounded-2xl ${PRIMARY_GRADIENT} mb-6 flex items-center justify-center text-2xl text-white shadow-lg shadow-rose-100`}
        >
            {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-gray-800">{title}</h3>
        <p className="leading-relaxed text-gray-500">{desc}</p>
    </div>
);

const LandingPage = () => {
    const navigate = useNavigate();
    const isAuth = useAuthStore((state) => state.isAuthenticated);
    return (
        <div className="pt-20">
            <Navbar />
            {/* Hero Section */}
            <section className="relative px-4 py-20 overflow-hidden">
                <div className="flex flex-col items-center gap-12 mx-auto max-w-7xl lg:flex-row">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight lg:text-7xl">
                            Find your{' '}
                            <span className="italic text-rose-500">real</span>{' '}
                            spark with Love Connect
                        </h1>
                        <p className="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-gray-600 lg:mx-0">
                            We focus on deep personality matching and authentic
                            conversations to help you find meaningful
                            connections that last.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            {!isAuth && (
                                <button
                                    onClick={() => navigate('/login')}
                                    className={`rounded-full px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-rose-300 active:scale-95 ${PRIMARY_GRADIENT}`}
                                >
                                    Join Now
                                </button>
                            )}
                            {isAuth && (
                                <button
                                    onClick={() => navigate('/explore')}
                                    className="px-10 py-5 text-lg font-bold text-gray-700 transition-all bg-white border-2 border-gray-100 rounded-full hover:bg-gray-50 active:scale-95"
                                >
                                    Discover Connections
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-12 lg:justify-start">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://picsum.photos/seed/${i + 10}/100`}
                                        className="w-12 h-12 border-4 border-white rounded-full shadow-sm"
                                        alt="User"
                                    />
                                ))}
                            </div>
                            <p className="text-sm font-medium text-gray-500">
                                <span className="font-bold text-rose-500">
                                    Over 2 Million
                                </span>{' '}
                                connections made
                            </p>
                        </div>
                    </div>

                    <div className="relative flex-1">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 h-80 w-80 animate-pulse bg-rose-200 opacity-30 blur-3xl"></div>
                        <img
                            src="/everton-vila-AsahNlC0VhQ-unsplash.webp"
                            alt="Authentic Connection"
                            className="relative z-10 mx-auto w-full max-w-lg rotate-3 transform rounded-[3rem] border-8 border-white shadow-2xl transition-transform duration-700 hover:rotate-0"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900">
                            Experience a better way to date
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-600">
                            Tired of superficial swiping? We bring depth and
                            intention back to dating.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={<FaHeartPulse />}
                            title="Smart Matching"
                            desc="Our unique algorithm analyzes your values and lifestyle to suggest highly compatible matches."
                        />
                        <FeatureCard
                            icon={<FaComments />}
                            title="Spark Starters"
                            desc="Get personalized icebreakers based on shared interests to make your first hello easier."
                        />
                        <FeatureCard
                            icon={<IoShieldCheckmark />}
                            title="Pure Privacy"
                            desc="We prioritize your safety with verified profiles and secure conversation tools."
                        />
                    </div>
                </div>
            </section>

            <footer className="px-4 py-12 text-center border-t border-gray-200">
                <p className="text-gray-400">
                    &copy; 2024 Love Connect. Authentic connections, every day.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
