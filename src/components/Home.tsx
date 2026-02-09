import React from 'react';
import { useNavigate } from 'react-router';
import { PRIMARY_GRADIENT } from '../library/constants';
import { FaHeartPulse, FaComments } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import Navbar from './Navbar';
const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    desc: string;
}> = ({ icon, title, desc }) => (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
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

    return (
        <div className="pt-20">
            <Navbar />
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 py-20">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="mb-6 font-serif text-5xl leading-tight font-bold lg:text-7xl">
                            Find your{' '}
                            <span className="text-rose-500 italic">real</span>{' '}
                            spark with Love Connect
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 lg:mx-0">
                            We focus on deep personality matching and authentic
                            conversations to help you find meaningful
                            connections that last.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <button
                                className={`rounded-full px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-rose-300 active:scale-95 ${PRIMARY_GRADIENT}`}
                            >
                                Join Now
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="rounded-full border-2 border-gray-100 bg-white px-10 py-5 text-lg font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                            >
                                Take a Tour
                            </button>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-4 lg:justify-start">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://picsum.photos/seed/${i + 10}/100`}
                                        className="h-12 w-12 rounded-full border-4 border-white shadow-sm"
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
                        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-rose-200 opacity-30 blur-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=800"
                            alt="Authentic Connection"
                            className="relative z-10 mx-auto w-full max-w-lg rotate-3 transform rounded-[3rem] border-8 border-white shadow-2xl transition-transform duration-700 hover:rotate-0"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 px-4 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900">
                            Experience a better way to date
                        </h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
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

            <footer className="border-t border-gray-200 px-4 py-12 text-center">
                <p className="text-gray-400">
                    &copy; 2024 Love Connect. Authentic connections, every day.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
