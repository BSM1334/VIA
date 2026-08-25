import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CircleUserRound, Mail, Lock, Eye, EyeOff } from "lucide-react";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!form.name || !form.email || !form.password) {
      setMsg({ type: "error", text: "All fields required" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/Home");
      } else {
        setMsg({ type: "error", text: data.msg || "Signup failed" });
      }
    } catch {
      setLoading(false);
      setMsg({ type: "error", text: "Server error" });
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl p-3 text-center font-bold mb-9 bg-clip-text text-transparent bg-linear-to-br from-cyan-400 to-blue-500"
        >
          Sign up
        </motion.h1>

        {msg && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              msg.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-gray-700 rounded-2xl p-6 sm:p-8"
        >
          <label className="block">
            <span className="font-medium text-white flex items-center gap-2">
              <CircleUserRound className="text-cyan-400" />
              Name
            </span>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="block mt-4">
            <span className="font-medium text-white flex items-center gap-2">
              <Mail className="text-cyan-400" />
              Email
            </span>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="block mt-4">
            <span className="font-medium text-white flex items-center gap-2">
              <Lock className="text-cyan-400" />
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full mt-1 p-2 pr-10 border rounded-md text-cyan-300 bg-gray-800/60"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-7"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <p className="text-center text-white mt-4">
            already have an account?
            <Link to="/" className="text-blue-500 ml-1 hover:underline">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

export default Signup;