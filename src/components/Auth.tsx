import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import type { FormMode } from '../../frontendTypes/Auth';
import { useAuthStore } from '../Store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    loginSchema,
    registerSchema,
    type LoginInput,
    type RegisterInput,
} from '../shared/Schema/validator';
import handleApiError from '../utils/ApiError';
import useErrorStore from '../Store/ErrorStore';

export default function LoveAuthForm() {
    const [mode, setMode] = useState<FormMode>('login');

    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-nunita bg-linear-to-br from-rose-50 via-pink-50 to-red-50">
            {/* Animated floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            <div className="absolute rounded-full top-20 left-20 h-96 w-96 animate-pulse bg-rose-300/30 blur-3xl" />
            <div
                className="absolute rounded-full right-20 bottom-20 h-80 w-80 animate-pulse bg-pink-400/20 blur-3xl"
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
                        className="inline-block mb-4"
                    >
                        <Heart className="w-16 h-16 fill-rose-500 text-rose-500 drop-shadow-lg" />
                    </motion.div>
                    <h1 className="mb-2 text-5xl font-bold text-transparent font-dancing bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text">
                        Love Connect
                    </h1>
                    <p className="text-lg italic text-rose-600/80">
                        Where hearts find their match
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    layout
                    className="p-8 border-2 shadow-2xl rounded-3xl border-rose-200/50 bg-white/80 backdrop-blur-xl"
                >
                    {/* Mode Toggle */}
                    <div className="mb-8 flex gap-2 rounded-2xl bg-rose-100/50 p-1.5">
                        <button
                            onClick={() => {
                                setMode('login');
                            }}
                            className="relative flex-1 py-3 text-sm font-semibold transition-all duration-300 rounded-xl"
                        >
                            {mode === 'login' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 shadow-lg rounded-xl bg-linear-to-r from-rose-500 to-pink-500"
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
                            }}
                            className="relative flex-1 py-3 text-sm font-semibold transition-all duration-300 rounded-xl"
                        >
                            {mode === 'signup' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 shadow-lg rounded-xl bg-linear-to-r from-rose-500 to-pink-500"
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

                    <AnimatePresence mode="wait">
                        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
                    </AnimatePresence>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-sm text-center text-rose-600/60"
                >
                    Made with{' '}
                    <Heart className="inline w-4 h-4 fill-rose-500 text-rose-500" />{' '}
                    for those seeking love
                </motion.p>
            </motion.div>
        </div>
    );
}
const LoginForm = () => {
    const { setError } = useErrorStore();
    const navigate = useNavigate();
    const loginUser = useAuthStore((state) => state.login);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
    const handleLogin = async (data: LoginInput) => {
        try {
            await loginUser(data.email, data.password);
            navigate('/dashboard');
        } catch (error) {
            handleApiError(error, setError);
        }
    };
    return (
        <>
            <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-5"
            >
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-rose-900">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-600 font-blod">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-rose-900">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-600 font-blod">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-rose-500"
                        />
                        <span className="transition-colors text-rose-700 group-hover:text-rose-900">
                            Remember me
                        </span>
                    </label>
                    <button
                        type="button"
                        className="font-semibold transition-colors text-rose-600 hover:text-rose-800"
                    >
                        Forgot password?
                    </button>
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all duration-300 shadow-lg group rounded-xl bg-linear-to-r from-rose-500 via-pink-500 to-red-500 hover:shadow-xl"
                >
                    <span>
                        {isSubmitting ? 'Logging in ...' : 'Sign In to Love'}
                    </span>
                    <Heart className="w-5 h-5 transition-all group-hover:fill-white" />
                </motion.button>
            </motion.form>
        </>
    );
};
const RegisterForm = () => {
    const { setError } = useErrorStore();
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.register);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });
    const handleRegister = async (data: RegisterInput) => {
        try {
            await registerUser(data.email, data.password);
            navigate('/dashboard');
        } catch (error: unknown) {
            handleApiError(error, setError);
        }
    };
    return (
        <>
            <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-5"
            >
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-rose-900">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                        <input
                            type="text"
                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                            placeholder="Jane Doe"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-rose-900">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-600 font-blod">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                        <label className="block mb-2 text-sm font-semibold text-rose-900">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                            <input
                                type="password"
                                {...register('password')}
                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-red-600 font-blod">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="group">
                        <label className="block mb-2 text-sm font-semibold text-rose-900">
                            Confirm
                        </label>
                        <div className="relative">
                            <Lock className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                            <input
                                type="password"
                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="pt-4 border-t-2 border-rose-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-rose-900">
                            <Shield className="w-5 h-5 text-rose-500" />
                            Payment Details
                        </h3>
                        <span className="text-2xl font-bold text-transparent bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text">
                            $10
                        </span>
                    </div>

                    <div className="group">
                        <label className="block mb-2 text-sm font-semibold text-rose-900">
                            Card Number
                        </label>
                        <div className="relative">
                            <CreditCard className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                            <input
                                type="text"
                                maxLength={16}
                                className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="group">
                            <label className="block mb-2 text-sm font-semibold text-rose-900">
                                Expiry Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                                <input
                                    type="text"
                                    maxLength={5}
                                    className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                    placeholder="MM/YY"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block mb-2 text-sm font-semibold text-rose-900">
                                CVV
                            </label>
                            <div className="relative">
                                <Shield className="absolute w-5 h-5 transition-colors -translate-y-1/2 top-1/2 left-4 text-rose-400 group-focus-within:text-rose-600" />
                                <input
                                    type="text"
                                    maxLength={3}
                                    className="w-full rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3.5 pr-4 pl-12 font-mono text-rose-900 transition-all duration-300 placeholder:text-rose-300 focus:border-rose-500 focus:bg-white focus:outline-none"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all duration-300 shadow-lg group rounded-xl bg-linear-to-r from-rose-500 via-pink-500 to-red-500 hover:shadow-xl"
                >
                    <span>
                        {isSubmitting ? 'Creating account...' : 'Join for $10'}
                    </span>
                    <Heart className="w-5 h-5 transition-all group-hover:fill-white" />
                </motion.button>

                <p className="mt-4 text-xs text-center text-rose-600/70">
                    🔒 Secure payment • Cancel anytime • Your heart is safe with
                    us
                </p>
            </motion.form>
        </>
    );
};
