import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import ReportAccident from "./pages/ReportAccident";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
    <Router>
        <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-900 via-black to-gray-800">
            <Navbar />
            <main className="flex-1">
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/Reports/Report-Accident" element={<ReportAccident />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    </Router>
    );
}
