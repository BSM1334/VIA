import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ReportAccident() {
    const [caseName, setCaseName] = useState("");
    const [status, setStatus] = useState("Pending");
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [coords, setCoords] = useState(null);
    const navigate = useNavigate();
    const API_URL = "http://localhost:8000/api/accidents";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            setCoords({ latitude, longitude });
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await res.json();
                setLocation(data.display_name || `${latitude}, ${longitude}`);
            } catch {
                setLocation(`${latitude}, ${longitude}`);
            }
        }, () => setLocation("Location access denied"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAccident = { caseName, location, details, status, coords };
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAccident)
        });
        navigate("/reports");
    };

    return (
        <div className="page">
            <motion.h1
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-9 bg-clip-text text-transparent bg-linear-to-br from-cyan-400 to-blue-500"
            >
                Report an Accident
            </motion.h1>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-gray-700 rounded-2xl p-8"
            >
                <label className="block">
                    <span className="font-semibold text-white">Case</span>
                    <input
                        type="text"
                        required
                        className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60 placeholder:text-gray-400"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                    />
                </label>

                <label className="block mt-4">
                    <span className="font-medium text-white ">Location</span>
                    <input
                        type="text"
                        required
                        className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60 placeholder:text-gray-400"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>

                <label className="block mt-4">
                    <span className="font-medium text-white">Accident Details</span>
                    <textarea
                        required
                        className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60 placeholder:text-gray-400"
                        rows="4"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </label>

                <label className="block mt-4">
                    <span className="font-semibold text-white">Status</span>
                    <select
                        className="w-full mt-1 p-2 border rounded-md text-cyan-300 bg-gray-800/60 placeholder:text-gray-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending" className="bg-gray-800 text-white">Pending</option>
                        <option value="In Review" className="bg-gray-800 text-white">In Review</option>
                        <option value="Under Investigation" className="bg-gray-800 text-white">Under Investigation</option>
                        <option value="Completed" className="bg-gray-800 text-white">Completed</option>
                    </select>
                </label>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-7">
                    Submit Report
                </button>
            </motion.form>
        </div>
    );
}
