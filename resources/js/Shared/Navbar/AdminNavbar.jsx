import { useRef, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
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

const FALLBACK_AVATAR =
    "https://img.freepik.com/premium-vector/boy-face-design-illustrat_1063011-590.jpg";

const AdminNavbar = () => {
    const { language, theme, setTheme } = UseAuth();
    const { url } = usePage();

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleLogout = () => {
        localStorage.clear();
        router.visit("/login");
    };

    return (
        <div className="sticky top-0 left-0 w-full z-40 bg-base-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 relative">
                {/* LOGO */}
                <div className="flex items-center">
                    <Link href="/dashboard">
                        <img src={Logo} alt="logo" className="pl-4 h-7.5" />
                    </Link>
                </div>

                {/* NAV LINKS */}
                <ul className="hidden lg:flex flex-1 justify-center gap-4 text-base font-medium">
                    <li>
                        <Link
                            href="/dashboard"
                            className={navLinkClass("/dashboard")}
                        >
                            {t.dashboard}
                        </Link>
                    </li>
                    <li>
                        <Link href="/table" className={navLinkClass("/table")}>
                            {t.table}
                        </Link>
                    </li>
                    <li>
                        <Link href="/card" className={navLinkClass("/card")}>
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
                        <Link href="/form" className={navLinkClass("/form")}>
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

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button onClick={handleThemeToggle}>
                        {theme === "light" ? (
                            <GoSun className="text-2xl" />
                        ) : (
                            <BsMoonStarsFill className="text-2xl" />
                        )}
                    </button>

                    {/* Avatar */}
                    <div
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={FALLBACK_AVATAR}
                            alt="Profile"
                        />
                    </div>

                    {/* DROPDOWN */}
                    {isDropdownVisible && (
                        <div className="absolute right-6 top-16 w-56 bg-base-100 shadow-lg rounded-md p-3">
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 hover:bg-base-200 p-2 rounded"
                                    >
                                        <FaRegUserCircle />
                                        {t.profile}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/support"
                                        className="flex items-center gap-3 hover:bg-base-200 p-2 rounded"
                                    >
                                        <MdOutlineSettings />
                                        {t.settings}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/billing"
                                        className="flex items-center gap-3 hover:bg-base-200 p-2 rounded"
                                    >
                                        <FaFileInvoiceDollar />
                                        {t.billing}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/pricing"
                                        className="flex items-center gap-3 hover:bg-base-200 p-2 rounded"
                                    >
                                        <TbCurrencyDollar />
                                        {t.pricing}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/faq"
                                        className="flex items-center gap-3 hover:bg-base-200 p-2 rounded"
                                    >
                                        <FaQuestion />
                                        {t.faq}
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogout}
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
        </div>
    );
};

export default AdminNavbar;
