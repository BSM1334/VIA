import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        caseName: "",
        location: "",
        details: "",
        status: ""
    });

    const API_URL = "http://localhost:8000/api/accidents";

    useEffect(() => {
            // if (!localStorage.getItem("token")) {
            //     navigate("/");
            // }
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setReports(data));
    }, [navigate]);

    const startEdit = (report) => {
        setEditingId(report.id);
        setEditForm({
            caseName: report.caseName,
            location: report.location,
            details: report.details,
            status: report.status,
        });
    };

    const submitEdit = async (id) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm)
        });
        const updatedReport = await res.json();
        setReports(reports.map(r => r.id === id ? updatedReport : r));
        setEditingId(null);
    };

    const deleteReport = async (id) => {
        if (!confirm("Are you sure you want to delete this report?")) return;
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setReports(reports.filter(r => r.id !== id));
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        return !!token;
    };
    return (
        <div className="page">
            <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-9 bg-clip-text text-transparent bg-linear-to-br from-cyan-400 to-blue-500"
            >
                Accident Reports
            </motion.h1>

            <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => {
                    if (!isLoggedIn()) {
                        alert("You must be logged in to report an accident");
                        navigate("/");
                        return;
                    }
                    navigate("/Reports/Report-Accident");
                }}
                className="mb-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
                Report New Accident
            </motion.button>

            {reports.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl text-gray-300 max-w-l mt-6">
                    No reports available.
                </motion.p>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((r) => (
                        <div key={r.id} className="bg-linear-to-br from-gray-900 via-black to-gray-800 shadow p-4 rounded-lg border mt-5">
                            <h3 className="text-xl font-semibold text-white">Case {r.caseName}</h3>
                            <p className=" text-white"><strong>Date:</strong> {new Date(r.created_at).toLocaleString()}</p>
                            <p className=" text-white"><strong>Location:</strong> {r.location}</p>
                            <p className="mt-2 mb-2 text-white"><strong>Details:</strong> {r.details}</p>
                            <p className=" text-white"><strong>Status:</strong> {r.status}</p>

                            {/* EDIT MODE */}
                            {editingId === r.id ? (
                                <div className="space-y-3 mt-3 text-white">
                                    <input
                                        className="w-full border px-3 py-2 rounded"
                                        value={editForm.caseName}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, caseName: e.target.value })
                                        }
                                        placeholder="caseName"
                                    />

                                    <input
                                        className="w-full border px-3 py-2 rounded"
                                        value={editForm.location}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, location: e.target.value })
                                        }
                                        placeholder="location"
                                    />

                                    <input
                                        className="w-full border px-3 py-2 rounded"
                                        value={editForm.details}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, details: e.target.value })
                                        }
                                        placeholder="details"
                                    />

                                    <select
                                        className="w-full border px-3 py-2 rounded"
                                        value={editForm.status}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, status: e.target.value })
                                        }
                                        placeholder="Status"
                                    >
                                        <option value="Pending" className="bg-gray-800 text-white">Pending</option>
                                        <option value="In Review" className="bg-gray-800 text-white">In Review</option>
                                        <option value="Under Investigation" className="bg-gray-800 text-white">Under Investigation</option>
                                        <option value="Completed" className="bg-gray-800 text-white">Completed</option>
                                    </select>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => submitEdit(r.id)}
                                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => startEdit(r)}
                                        className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteReport(r.id)}
                                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
