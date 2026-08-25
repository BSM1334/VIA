import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    Cpu,
    AlertTriangle,
    Bell,
    Wrench,
    FileCheck,
    ShieldAlert,
    Goal,
    Siren
} from "lucide-react";

const Card = ({ title, children, icon }) => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="group bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-gray-700 rounded-2xl p-8 mb-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
                    {icon}
                    {title}
                </div>
            </div>

            <div className="text-white leading-relaxed">{children}</div>
        </motion.section>
    );
};

export default function Home() {
    const [showTopButton, setShowTopButton] = useState(false);

    // Scroll-to-top visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowTopButton(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="page p-6 text-white">
            <h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-br from-cyan-400 to-blue-500"
            >
                Welcome to VIA
            </h1>

            <p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl mb-8 text-gray-300 max-w-l"
            >
                A smart system for road accident management and victim assistance —
                built for safety, speed, and transparency.
            </p>

            <Card title="Key Features" icon={<Cpu />}>
                <div className="grid md:grid-cols-2 gap-5">
                    <Feature
                        icon={<AlertTriangle />}
                        text="Instant hospital connection"
                    />
                    <Feature icon={<Bell />} text="Automatic family notifications" />
                    <Feature icon={<Wrench />} text="Digital repair-cost estimation" />
                    <Feature
                        icon={<FileCheck />}
                        text="Verified accident documentation"
                    />
                    <Feature icon={<Cpu />} text="Real-time repair tracking" />
                </div>
            </Card>

            <Card title="Problem" icon={<ShieldAlert />}>
                Road accidents are among the most critical issues in modern society, not
                only because of their frequency but also due to the lack of immediate
                response and fairness in handling the affected individuals.
                <br />
                <br />
                Current systems suffer from delayed medical assistance, unclear
                insurance procedures, and a lack of transparency in determining
                responsibility and damage costs.
                <br />
                <br />
                These challenges lead to dissatisfaction and a loss of trust among all
                involved parties.
            </Card>

            <Card title="Goals" icon={<Goal />}>
                <ul className="list-disc pl-6 space-y-3">
                    <li>Accelerate emergency response and save lives.</li>
                    <li>Ensure transparency and fairness for all involved parties.</li>
                    <li>Reduce legal disputes caused by unclear damage estimation.</li>
                    <li>Simplify and speed up insurance and compensation procedures.</li>
                    <li>Build a fully digital and reliable road safety ecosystem.</li>
                </ul>
            </Card>

            <Card title="Emergency numbers" icon={<Siren />}>
                <ul>
                    <li>Unified emergency number: 112</li>
                    <li>(You can use it from your mobile phone to be transferred to the police, ambulance, or fire department)</li>
                    <li>Emergency police: 122</li>
                    <li>Ambulance: 123</li>
                    <li>Fire truck: 180</li>
                    <li>traffic police: 128</li>
                    <li>Highway relief : 01221110000</li>
                    <li>Tourism police: 126~</li>
                </ul>
            </Card>

            {showTopButton && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 bg-cyan-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
                >
                    ↑
                </button>
            )}
        </div>
    );
}

function Feature({ icon, text }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-3 p-4 bg-gray-900/60 border border-gray-700 rounded-xl hover:border-cyan-400 cursor-pointer"
        >
            <div className="text-cyan-400">{icon}</div>
            <p className="text-lg text-gray-300">{text}</p>
        </motion.div>
    );
}
