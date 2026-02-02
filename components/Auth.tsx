import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import floatingHearts from "../utils/floatinghearts";
import {
  Heart,
  Mail,
  Lock,
  User,
  CreditCard,
  Calendar,
  Shield,
} from "lucide-react";

type FormMode = "login" | "signup";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface LoginData {
  email: string;
  password: string;
}

export default function LoveAuthForm() {
  const [mode, setMode] = useState<FormMode>("login");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!loginData.email) newErrors.push("Email is required");
    if (!loginData.password) newErrors.push("Password is required");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      console.log("Login:", loginData);
      alert("Welcome back, lovebird! 💕");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!signupData.name) newErrors.push("Name is required");
    if (!signupData.email) newErrors.push("Email is required");
    if (!signupData.password) newErrors.push("Password is required");
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.push("Passwords don't match");
    }
    if (!signupData.cardNumber || signupData.cardNumber.length < 16) {
      newErrors.push("Valid card number required");
    }
    if (!signupData.expiry) newErrors.push("Expiry date required");
    if (!signupData.cvv || signupData.cvv.length < 3)
      newErrors.push("Valid CVV required");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      console.log("Signup:", signupData);
      alert("Welcome to love! Your $10 registration is confirmed 💖");
    }
  };

  return (
    <div className="min-h-screen font-nunita relative overflow-hidden bg-linear-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4 ">
      {/* Animated floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-rose-300/20"
            style={{
              left: heart.left,
              bottom: "-50px",
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
              ease: "linear",
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      {/* Decorative linear orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main form container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
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
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-lg" />
          </motion.div>
          <h1 className="text-5xl font-bold font-dancing text-transparent bg-clip-text bg-linear-to-r from-rose-600 via-pink-600 to-red-600 mb-2">
            Love Connect
          </h1>
          <p className="text-rose-600/80 text-lg italic">
            Where hearts find their match
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-rose-200/50"
        >
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 bg-rose-100/50 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                setMode("login");
                setErrors([]);
              }}
              className="relative flex-1 py-3 rounded-xl font-semibold transition-all duration-300 text-sm"
            >
              {mode === "login" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-linear-to-r from-rose-500 to-pink-500 rounded-xl shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 ${mode === "login" ? "text-white" : "text-rose-700"}`}
              >
                Sign In
              </span>
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setErrors([]);
              }}
              className="relative flex-1 py-3 rounded-xl font-semibold transition-all duration-300 text-sm"
            >
              {mode === "signup" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-linear-to-r from-rose-500 to-pink-500 rounded-xl shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 ${mode === "signup" ? "text-white" : "text-rose-700"}`}
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
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg"
              >
                {errors.map((error, idx) => (
                  <p key={idx} className="text-red-700 text-sm font-medium">
                    • {error}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
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
                  <label className="block text-sm font-semibold text-rose-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-rose-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-rose-500"
                    />
                    <span className="text-rose-700 group-hover:text-rose-900 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-rose-600 hover:text-rose-800 font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-linear-to-r from-rose-500 via-pink-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Sign In to Love</span>
                  <Heart className="w-5 h-5 group-hover:fill-white transition-all" />
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
                  <label className="block text-sm font-semibold text-rose-900 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                    <input
                      type="text"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-rose-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-rose-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                      <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-rose-900 mb-2">
                      Confirm
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                      <input
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="pt-4 border-t-2 border-rose-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-rose-500" />
                      Payment Details
                    </h3>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-600 to-pink-600">
                      $10
                    </span>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-rose-900 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                      <input
                        type="text"
                        maxLength={16}
                        value={signupData.cardNumber}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            cardNumber: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300 font-mono"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-rose-900 mb-2">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                        <input
                          type="text"
                          maxLength={5}
                          value={signupData.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length >= 2)
                              val = val.slice(0, 2) + "/" + val.slice(2, 4);
                            setSignupData({ ...signupData, expiry: val });
                          }}
                          className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300 font-mono"
                          placeholder="MM/YY"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-rose-900 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                        <input
                          type="text"
                          maxLength={3}
                          value={signupData.cvv}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              cvv: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-rose-50/50 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 text-rose-900 placeholder:text-rose-300 font-mono"
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
                  className="w-full py-4 bg-linear-to-r from-rose-500 via-pink-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Join for $10</span>
                  <Heart className="w-5 h-5 group-hover:fill-white transition-all" />
                </motion.button>

                <p className="text-xs text-rose-600/70 text-center mt-4">
                  🔒 Secure payment • Cancel anytime • Your heart is safe with
                  us
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
          className="text-center text-rose-600/60 text-sm mt-6"
        >
          Made with{" "}
          <Heart className="inline w-4 h-4 fill-rose-500 text-rose-500" /> for
          those seeking love
        </motion.p>
      </motion.div>
    </div>
  );
}
