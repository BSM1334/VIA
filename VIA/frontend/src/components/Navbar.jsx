import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const reportsActive = location.pathname.startsWith("/Reports");
    const active = "text-blue-500 font-semibold";

    const linkBase =
        "block px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors";

    return (
        <nav className="px-6 py-4 flex justify-between items-center relative">
            <h1 className="text-2xl font-bold text-blue-600">VIA</h1>

            <ul className="hidden md:flex gap-6 text-lg text-blue-800">
                <li>
                    <NavLink to="/Home" className={({ isActive }) => isActive ? active : ""}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/Reports" className={reportsActive ? active : ""}>
                        Reports
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/Settings" className={({ isActive }) => isActive ? active : ""}>
                        Settings
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            (isActive ? active : "") +
                            " border rounded-xl px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors"
                        }
                    >
                        Log in
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/Signup"
                        className={({ isActive }) =>
                            (isActive ? active : "") +
                            " border rounded-xl px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors"
                        }
                    >
                        Signup
                    </NavLink>
                </li>
            </ul>

            <button
                onClick={() => setOpen(!open)}
                className="md:hidden text-blue-600"
            >
                {open ? <X size={28} /> : <Menu size={28} />}
            </button>

            {open && (
                <div className="absolute top-full left-0 w-full bg-black shadow-lg md:hidden z-50">
                    <ul className="flex flex-col text-blue-800 p-4 space-y-2">
                        <li>
                            <NavLink
                                to="/Home"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                            (isActive ? active : "") + linkBase
                            }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/Reports"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                            (isActive ? active : "") + linkBase
                            }
                            >
                                Reports
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/Settings"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                            (isActive ? active : "") + linkBase
                            }
                            >
                                Settings
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                            (isActive ? active : "") + linkBase
                            }
                            >
                                Log in
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/Signup"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                            (isActive ? active : "") + linkBase
                            }
                            >
                                Signup
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
