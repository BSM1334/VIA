import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LogOut, Eye, EyeOff } from "lucide-react";

export default function Settings() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState(null);

    const token = localStorage.getItem("token");
    console.log("TOKEN:", token); 

    // 🔹 Load profile data
useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setForm({
                    name: data.user.name,
                    email: data.user.email,
                    password: ""
                });
            }
        });
}, []);

    // 🔹 Update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setMsg(null);
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setMsg({ type: "success", text: "Profile updated" });
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                setMsg({ type: "error", text: "Update failed" });
            }
        } catch {
            setLoading(false);
            setMsg({ type: "error", text: "Server error" });
        }
    };

    // 🔹 Logout
    const handleLogout = async () => {
        try {
            await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.warn("Logout request failed, clearing session anyway", err);
        }

        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="page">
            <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-9 bg-clip-text text-transparent bg-linear-to-br from-cyan-400 to-blue-500"
            >
                Profile Settings
            </motion.h1>

            {msg && (
                <div className={`mb-4 p-3 rounded ${msg.type === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                    {msg.text}
                </div>
            )}

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-gray-700 rounded-2xl p-8"
            >
                <label className="block">
                    <span className="text-white">Name</span>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 rounded bg-gray-800/60 text-cyan-300"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </label>

                <label className="block mt-4">
                    <span className="text-white">Email</span>
                    <input
                        type="email"
                        className="w-full mt-1 p-2 rounded bg-gray-800/60 text-cyan-300"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </label>

                <label className="block mt-4">
                    <span className="text-white">New Password (optional)</span>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full mt-1 p-2 pr-10 rounded bg-gray-800/60 text-cyan-300"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-7"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </motion.form>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                    Logout <LogOut className="inline ml-2" />
                </button>
            </motion.div>
        </div>
    );
}
