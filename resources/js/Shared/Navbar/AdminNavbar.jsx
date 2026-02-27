import { useEffect, useRef, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaFileInvoiceDollar, FaRegUserCircle } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import {
    IoIosArrowDown,
    IoIosArrowUp,
    IoIosLogOut,
    IoMdNotificationsOutline,
} from "react-icons/io";
import { IoClose, IoMailOpenOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";
import { Link, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Logo from "../../assets/logo/wbLogo.png";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { Translations } from "../../utils/Translations";

const FALLBACK_AVATAR =
    "https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg?semt=ais_hybrid&w=740&q=80";

const startsWithSegment = (pathname, prefix) =>
    pathname === prefix || pathname.startsWith(prefix + "/");

const AdminNavbar = () => {
    const { language, toggleLanguage, theme, setTheme } = UseAuth();
    const nextLanguage = language === "en" ? "bn" : "en";
    const axiosSecure = UseAxiosSecure();

    // ✅ FIXED (Inertia way)
    const { url } = usePage();

    const dropdownRef = useRef(null);
    const profileImageRef = useRef(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const notificationDropdownRef = useRef(null);
    const notificationIconRef = useRef(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const t = Translations[language];

    const academicPrefixes = ["/table"];
    const studentPrefixes = ["/card", "/cardtable"];
    const examPrefixes = ["/from", "/login", "/register"];
    const settingsPrefixes = ["/support"];

    // ✅ FIXED active check
    const isParentActive = (prefixes) =>
        prefixes.some((p) => startsWithSegment(url, p));

    const toggleDropdown = () => setDropdownVisible((p) => !p);
    const toggleNotificationDropdown = () => setIsNotificationOpen((p) => !p);
    const toggleSidebar = () => setIsSidebarOpen((p) => !p);

    const handleMenuClick = () => {
        setDropdownVisible(false);
        setIsSidebarOpen(false);
    };

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        toast.success(
            newTheme === "dark" ? "Dark Mode Enabled" : "Light Mode Enabled",
            { position: "top-right", autoClose: 2000, theme: newTheme }
        );
    };

    const navLinkClass = (path) =>
        `block min-w-40 p-2 rounded-md transition-colors text-nowrap ${
            startsWithSegment(url, path)
                ? "bg-primary text-white font-semibold"
                : "hover:bg-primary-light hover:text-black"
        }`;

    return (
        <>
            <div className="navbar sticky top-0 left-0 w-full z-40 px-5 bg-base-200 shadow-sm">
                
                {/* LOGO */}
                <div className="navbar-start -my-4">
                    <Link href="/dashboard">
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <ul className="navbar-center hidden lg:flex space-x-2">
                    
                    <li>
                        <Link
                            href="/dashboard"
                            className={navLinkClass("/dashboard")}
                        >
                            {t.dashboard}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/table"
                            className={navLinkClass("/table")}
                        >
                            {t.table}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/card"
                            className={navLinkClass("/card")}
                        >
                            {t.card}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/cardtable"
                            className={navLinkClass("/cardtable")}
                        >
                            {t.cardtable}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/from"
                            className={navLinkClass("/from")}
                        >
                            {t.form}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/support"
                            className={navLinkClass("/support")}
                        >
                            {t.settings}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/profile"
                            className={navLinkClass("/profile")}
                        >
                            {t.profile}
                        </Link>
                    </li>
                </ul>

                {/* Right Side */}
                <div className="navbar-end">
                    
                    {/* Theme Toggle */}
                    <button onClick={handleThemeToggle}>
                        {theme === "light" ? (
                            <GoSun className="text-2xl" />
                        ) : (
                            <BsMoonStarsFill className="text-2xl" />
                        )}
                    </button>

                    {/* Profile */}
                    <div
                        ref={profileImageRef}
                        onClick={toggleDropdown}
                        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer ml-2"
                    >
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={FALLBACK_AVATAR}
                            alt="Profile"
                        />
                    </div>

                    {isDropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-8 top-14 mt-3 w-56 bg-base-100 shadow-lg rounded-md"
                        >
                            <ul className="py-3 space-y-3">

                                <li>
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-4 px-4 hover:bg-base-200"
                                        onClick={handleMenuClick}
                                    >
                                        <FaRegUserCircle size={20} />
                                        {t.profile}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-4 px-4 hover:bg-base-200"
                                        onClick={handleMenuClick}
                                    >
                                        <MdOutlineSettings size={20} />
                                        {t.settings}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-4 px-4 hover:bg-base-200"
                                        onClick={handleMenuClick}
                                    >
                                        <FaFileInvoiceDollar size={20} />
                                        {t.billing}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-4 px-4 hover:bg-base-200"
                                        onClick={handleMenuClick}
                                    >
                                        <TbCurrencyDollar size={20} />
                                        {t.pricing}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-4 px-4 hover:bg-base-200"
                                        onClick={handleMenuClick}
                                    >
                                        <FaQuestion size={20} />
                                        {t.faq}
                                    </Link>
                                </li>

                                <li className="px-4">
                                    <button
                                        onClick={() => {
                                            localStorage.clear();
                                            window.location.href = "/login";
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-error text-white"
                                    >
                                        {t.logout}
                                        <IoIosLogOut />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;