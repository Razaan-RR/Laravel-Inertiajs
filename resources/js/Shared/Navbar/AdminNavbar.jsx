import { useRef, useState } from "react";
import { BsMoonStarsFill, BsBell } from "react-icons/bs";
import { FaFileInvoiceDollar, FaRegUserCircle } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";
import { Link, usePage, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import Logo from "../../assets/logo/wbLogo.png";
import UseAuth from "../../Hooks/UseAuth";
import { Translations } from "../../utils/Translations";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoClose, IoMailOpenOutline } from "react-icons/io5";
import { useEffect } from "react";

const FALLBACK_AVATAR =
    "https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg";

const AdminNavbar = () => {
    const { language, theme, setTheme, setLanguage } = UseAuth();
    const { url } = usePage();

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [notifications] = useState(3);
    const dropdownRef = useRef(null);
    const notificationIconRef = useRef(null);
    const toggleNotificationDropdown = () => setIsNotificationOpen((p) => !p);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    const t = Translations[language];

    const navLinkClass = (path) =>
        `px-4 py-2 rounded-md transition-colors duration-300 ${
            url === path
                ? "bg-primary text-primary-content font-semibold"
                : "hover:bg-primary hover:text-primary-content"
        }`;

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        toast.success(
            newTheme === "dark" ? "Dark Mode Enabled" : "Light Mode Enabled",
            { autoClose: 2000 },
        );
    };

    const handleLanguageToggle = () => {
        const newLang = language === "en" ? "bn" : "en";
        setLanguage(newLang);

        toast.success(
            newLang === "bn" ? "বাংলা চালু হয়েছে" : "English Enabled",
            { autoClose: 2000 },
        );
    };

    const handleLogout = () => {
        localStorage.clear();
        router.visit("/login");
    };

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target) &&
                notificationIconRef.current &&
                !notificationIconRef.current.contains(event.target)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () =>
            document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    return (
        <div className="sticky top-0 left-0 w-full bg-base-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 relative">
                {/* LOGO */}
                <div className="flex items-center">
                    <Link href="/dashboard">
                        <img src={Logo} alt="logo" className="pl-4 h-7.5" />
                    </Link>
                </div>

                {/* NAV LINKS */}
                <ul className="hidden lg:flex flex-1 justify-center items-center text-base font-medium">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className={navLinkClass("/dashboard")}
                        >
                            {t.dashboard}
                        </Link>
                    </li>

                    {/* TABLE DROPDOWN */}
                    <li className="group relative">
                        <span className="px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-content flex items-center gap-1">
                            {t.table}
                            <IoIosArrowDown className="block group-hover:hidden" />
                            <IoIosArrowUp className="hidden group-hover:block" />
                        </span>
                        <ul
                            className="absolute top-10 left-0 w-40 bg-base-200 rounded-md shadow-lg
                                       opacity-0 scale-95 translate-y-2
                                       group-hover:opacity-100
                                       group-hover:scale-100
                                       group-hover:translate-y-0
                                       transition-all duration-300 ease-out z-50"
                        >
                            <li>
                                <Link
                                    href="/table"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.table}
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* CARD DROPDOWN */}
                    <li className="group relative">
                        <span className="flex items-center gap-1 px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-content">
                            {t.card}
                            <IoIosArrowDown className="block group-hover:hidden" />
                            <IoIosArrowUp className="hidden group-hover:block" />
                        </span>
                        <ul
                            className="absolute top-10 left-0 w-40 bg-base-200 rounded-md shadow-lg
                                       opacity-0 scale-95 translate-y-2
                                       group-hover:opacity-100
                                       group-hover:scale-100
                                       group-hover:translate-y-0
                                       transition-all duration-300 ease-out z-50"
                        >
                            <li>
                                <Link
                                    href="/card"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.card}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cardtable"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.cardtable}
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* FORM DROPDOWN */}
                    <li className="group relative">
                        <span className="flex items-center gap-1 px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-content">
                            {t.form}
                            <IoIosArrowDown className="block group-hover:hidden" />
                            <IoIosArrowUp className="hidden group-hover:block" />
                        </span>
                        <ul
                            className="absolute top-10 left-0 w-40 bg-base-200 rounded-md shadow-lg
                                       opacity-0 scale-95 translate-y-2
                                       group-hover:opacity-100
                                       group-hover:scale-100
                                       group-hover:translate-y-0
                                       transition-all duration-300 ease-out z-50"
                        >
                            <li>
                                <Link
                                    href="/form"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.form}
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* SETTINGS DROPDOWN */}
                    <li className="group relative">
                        <span className="flex items-center gap-1 px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-content">
                            {t.settings}
                            <IoIosArrowDown className="block group-hover:hidden" />
                            <IoIosArrowUp className="hidden group-hover:block" />
                        </span>

                        <ul
                            className="absolute top-10 left-0 w-40 bg-base-200 rounded-md shadow-lg
                   opacity-0 scale-95 translate-y-2
                   group-hover:opacity-100
                   group-hover:scale-100
                   group-hover:translate-y-0
                   transition-all duration-300 ease-out z-50"
                        >
                            <li>
                                <Link
                                    href="/support"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.support}
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* Profile */}
                    <li>
                        <Link
                            href="/profile"
                            className={navLinkClass("/profile")}
                        >
                            {t.profile}
                        </Link>
                    </li>
                </ul>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLanguageToggle}
                        className="text-sm font-medium"
                    >
                        {language.toUpperCase()}
                    </button>

                    <button onClick={handleThemeToggle}>
                        {theme === "light" ? (
                            <GoSun className="text-2xl" />
                        ) : (
                            <BsMoonStarsFill className="text-2xl" />
                        )}
                    </button>

                    {/* Notification Icon + Dropdown */}
                    <div className="relative pl-2">
                        <button
                            type="button"
                            ref={notificationIconRef}
                            onClick={() => setIsNotificationOpen((p) => !p)}
                            className="relative p-2 rounded-full hover:bg-base-300 transition-colors"
                            aria-label="Notifications"
                            aria-expanded={isNotificationOpen}
                        >
                            <IoMdNotificationsOutline size={34} />
                            <span className="absolute text-error-content -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-error flex items-center justify-center text-xs">
                                5
                            </span>
                        </button>

                        {isNotificationOpen && (
                            <div
                                ref={notificationDropdownRef}
                                className="absolute right-0 top-12 mt-3 w-72 px-4 shadow-lg bg-base-100 rounded-md text-sm text-primary-content z-[1000]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-base-300 pr-5">
                                    <h1 className="px-4 py-4 text-[20px] font-semibold">
                                        {t.notifications}
                                    </h1>
                                    <div className="flex gap-3 items-center">
                                        <h1 className="bg-[#FFF2DB] text-warning text-[10px] px-2 py-1 rounded-sm text-nowrap">
                                            8 {t.new}
                                        </h1>
                                        <IoMailOpenOutline size={22} />
                                    </div>
                                </div>

                                {/* Notifications List */}
                                <ul className="max-h-80 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <li
                                            key={i}
                                            className="flex relative group py-3 border-b border-base-300 hover:bg-base-200 cursor-pointer items-center"
                                        >
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={FALLBACK_AVATAR}
                                                    alt="Profile"
                                                />
                                            </div>

                                            <div className="flex-1 space-y-1.5">
                                                <p className="text-[14px] font-medium">
                                                    Send connection request
                                                </p>
                                                <p className="text-[10px]">
                                                    Peter sent you a connection
                                                    request
                                                </p>
                                                <p className="text-xs opacity-70">
                                                    4 days ago
                                                </p>
                                            </div>

                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3">
                                                <IoClose size={24} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Footer */}
                                <div className="w-full border-t border-base-300 px-4 py-2 my-4 text-center text-xs text-warning-content bg-warning rounded-sm cursor-pointer">
                                    {t.viewAllNotifications}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Icon */}
                    <div ref={dropdownRef} className="relative">
                        <div
                            onClick={() =>
                                setDropdownVisible(!isDropdownVisible)
                            }
                            className="w-10 h-10 rounded-full cursor-pointer ml-2"
                        >
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src={FALLBACK_AVATAR}
                                alt="Profile"
                                onError={(e) =>
                                    (e.currentTarget.src = FALLBACK_AVATAR)
                                }
                            />
                        </div>

                        {/* Profile Dropdown */}
                        {isDropdownVisible && (
                            <div className="absolute right-0 top-14 mt-3 w-56 bg-base-100 shadow-lg rounded-md text-sm text-primary-content z-50">
                                {/* Header */}
                                <div className="flex items-center gap-2 border-b border-base-300 p-3">
                                    <div className="w-8 h-8 rounded-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={FALLBACK_AVATAR}
                                            alt="Profile"
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    FALLBACK_AVATAR)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <h1 className="font-medium">
                                            Profile Name
                                        </h1>
                                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                                            Role
                                        </span>
                                    </div>
                                </div>

                                {/* Menu */}
                                <ul className="pt-3 space-y-3">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-4 px-4 hover:bg-base-200 py-2"
                                        >
                                            <FaRegUserCircle size={20} />
                                            <span>{t.profile}</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-4 px-4 hover:bg-base-200 py-2"
                                        >
                                            <MdOutlineSettings size={20} />
                                            <span>{t.settings}</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/billing"
                                            className="flex items-center gap-4 px-4 hover:bg-base-200 py-2 border-b border-base-300"
                                        >
                                            <FaFileInvoiceDollar size={20} />
                                            <span>{t.billing}</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/pricing"
                                            className="flex items-center gap-4 px-4 hover:bg-base-200 py-2"
                                        >
                                            <TbCurrencyDollar size={20} />
                                            <span>{t.pricing}</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/faq"
                                            className="flex items-center gap-4 px-4 hover:bg-base-200 py-2"
                                        >
                                            <FaQuestion size={20} />
                                            <span>{t.faq}</span>
                                        </Link>
                                    </li>
                                </ul>

                                {/* Logout */}
                                <div className="p-3">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-error text-error-content text-sm font-medium hover:brightness-95"
                                    >
                                        {t.logout}
                                        <IoIosLogOut />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
