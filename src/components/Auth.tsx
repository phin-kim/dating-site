import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import floatingHearts from '../utils/floatinghearts';
import {
    Heart,
    Mail,
    Lock,
    User,
    CreditCard,
    Calendar,
    Shield,
} from 'lucide-react';
import type { FormMode, LoginData, SignupData } from '../../frontendTypes/Auth';

export default function LoveAuthForm() {
    const [mode, setMode] = useState<FormMode>('login');
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [signupData, setSignupData] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [errors, setErrors] = useState<string[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];

        if (!loginData.email) newErrors.push('Email is required');
        if (!loginData.password) newErrors.push('Password is required');

        setErrors(newErrors);

        if (newErrors.length === 0) {
            console.log('Login:', loginData);
            alert('Welcome back, lovebird! 💕');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];

        if (!signupData.name) newErrors.push('Name is required');
        if (!signupData.email) newErrors.push('Email is required');
        if (!signupData.password) newErrors.push('Password is required');
        if (signupData.password !== signupData.confirmPassword) {
            newErrors.push("Passwords don't match");
        }
        if (!signupData.cardNumber || signupData.cardNumber.length < 16) {
            newErrors.push('Valid card number required');
        }
        if (!signupData.expiry) newErrors.push('Expiry date required');
        if (!signupData.cvv || signupData.cvv.length < 3)
            newErrors.push('Valid CVV required');

        setErrors(newErrors);

        if (newErrors.length === 0) {
            console.log('Signup:', signupData);
            alert('Welcome to love! Your $10 registration is confirmed 💖');
        }
    };

    return (
        <div className="font-nunita relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-rose-50 via-pink-50 to-red-50 p-4">
            {/* Animated floating hearts background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {floatingHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-rose-300/20"
                        style={{
                            left: heart.left,
                            bottom: '-50px',
                            fontSize: `${heart.size}px`,
                        }}
                        animate={{
                            y: [0, -1200],
                            x: [0, heart.xOffset],
                            rotate: [0, 360],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        ❤
                    </motion.div>
                ))}
            </div>

            {/* Decorative linear orbs */}
            <div className="absolute top-20 left-20 h-96 w-96 animate-pulse rounded-full bg-rose-300/30 blur-3xl" />
            <div
                className="absolute right-20 bottom-20 h-80 w-80 animate-pulse rounded-full bg-pink-400/20 blur-3xl"
                style={{ animationDelay: '1s' }}
            />

            {/* Main form container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <motion.div
                    className="mb-8 text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="mb-4 inline-block"
                    >
                        <Heart className="h-16 w-16 fill-rose-500 text-rose-500 drop-shadow-lg" />
                    </motion.div>
                    <h1 className="font-dancing mb-2 bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-5xl font-bold text-transparent">
                        Love Connect
                    </h1>
                    <p className="text-lg text-rose-600/80 italic">
                        Where hearts find their match
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    layout
                    className="rounded-3xl border-2 border-rose-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl"
                >
                    {/* Mode Toggle */}
                    <div className="mb-8 flex gap-2 rounded-2xl bg-rose-100/50 p-1.5">
                        <button
                            onClick={() => {
                                setMode('login');
                                setErrors([]);
                            }}
                            className="relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
                        >
                            {mode === 'login' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 shadow-lg"
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                            <span
                                className={`relative z-10 ${mode === 'login' ? 'text-white' : 'text-rose-700'}`}
                            >
                                Sign In
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                setMode('signup');
                                setErrors([]);
                            }}
                            className="relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
                        >
                            {mode === 'signup' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 shadow-lg"
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                            <span
                                className={`relative z-10 ${mode === 'signup' ? 'text-white' : 'text-rose-700'}`}
                            >
                                Join Now
                            </span>
                        </button>
                    </div>

                    {/* Error messages */}
                    <AnimatePresence>
                        {errors.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 rounded-lg border-l-4 border-red-400 bg-red-50 p-4"
                            >
                                {errors.map((error, idx) => (
                                    <p
                                        key={idx}
                                        className="text-sm font-medium text-red-700"
                                    >
                                        • {error}
                                    </p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {mode === 'login' ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleLogin}
                                className="space-y-5"
                            >
                                <div className="group">
                                    <label className="mb-2 block text-sm font-semibold text-rose-900">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                        <input
                                            type="email"
                                            value={loginData.email}
                                            onChange={(e) =>
                                                setLoginData({
                                                    ...loginData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-2 block text-sm font-semibold text-rose-900">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                        <input
                                            type="password"
                                            value={loginData.password}
                                            onChange={(e) =>
                                                setLoginData({
                                                    ...loginData,
                                                    password: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="group flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-rose-500"
                                        />
                                        <span className="text-rose-700 transition-colors group-hover:text-rose-900">
                                            Remember me
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        className="font-semibold text-rose-600 transition-colors hover:text-rose-800"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 via-pink-500 to-red-500 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    <span>Sign In to Love</span>
                                    <Heart className="h-5 w-5 transition-all group-hover:fill-white" />
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="signup"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleSignup}
                                className="space-y-5"
                            >
                                <div className="group">
                                    <label className="mb-2 block text-sm font-semibold text-rose-900">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                        <input
                                            type="text"
                                            value={signupData.name}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="mb-2 block text-sm font-semibold text-rose-900">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                        <input
                                            type="email"
                                            value={signupData.email}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="group">
                                        <label className="mb-2 block text-sm font-semibold text-rose-900">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                            <input
                                                type="password"
                                                value={signupData.password}
                                                onChange={(e) =>
                                                    setSignupData({
                                                        ...signupData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="mb-2 block text-sm font-semibold text-rose-900">
                                            Confirm
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                            <input
                                                type="password"
                                                value={
                                                    signupData.confirmPassword
                                                }
                                                onChange={(e) =>
                                                    setSignupData({
                                                        ...signupData,
                                                        confirmPassword:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="border-t-2 border-rose-200/50 pt-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="flex items-center gap-2 text-lg font-bold text-rose-900">
                                            <Shield className="h-5 w-5 text-rose-500" />
                                            Payment Details
                                        </h3>
                                        <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                                            $10
                                        </span>
                                    </div>

                                    <div className="group">
                                        <label className="mb-2 block text-sm font-semibold text-rose-900">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <CreditCard className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                            <input
                                                type="text"
                                                maxLength={16}
                                                value={signupData.cardNumber}
                                                onChange={(e) =>
                                                    setSignupData({
                                                        ...signupData,
                                                        cardNumber:
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                ''
                                                            ),
                                                    })
                                                }
                                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="group">
                                            <label className="mb-2 block text-sm font-semibold text-rose-900">
                                                Expiry Date
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                                <input
                                                    type="text"
                                                    maxLength={5}
                                                    value={signupData.expiry}
                                                    onChange={(e) => {
                                                        let val =
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                ''
                                                            );
                                                        if (val.length >= 2)
                                                            val =
                                                                val.slice(
                                                                    0,
                                                                    2
                                                                ) +
                                                                '/' +
                                                                val.slice(2, 4);
                                                        setSignupData({
                                                            ...signupData,
                                                            expiry: val,
                                                        });
                                                    }}
                                                    className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="mb-2 block text-sm font-semibold text-rose-900">
                                                CVV
                                            </label>
                                            <div className="relative">
                                                <Shield className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-rose-400 transition-colors group-focus-within:text-rose-600" />
                                                <input
                                                    type="text"
                                                    maxLength={3}
                                                    value={signupData.cvv}
                                                    onChange={(e) =>
                                                        setSignupData({
                                                            ...signupData,
                                                            cvv: e.target.value.replace(
                                                                /\D/g,
                                                                ''
                                                            ),
                                                        })
                                                    }
                                                    className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 via-pink-500 to-red-500 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    <span>Join for $10</span>
                                    <Heart className="h-5 w-5 transition-all group-hover:fill-white" />
                                </motion.button>

                                <p className="mt-4 text-center text-xs text-rose-600/70">
                                    🔒 Secure payment • Cancel anytime • Your
                                    heart is safe with us
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center text-sm text-rose-600/60"
                >
                    Made with{' '}
                    <Heart className="inline h-4 w-4 fill-rose-500 text-rose-500" />{' '}
                    for those seeking love
                </motion.p>
            </motion.div>
        </div>
    );
}
