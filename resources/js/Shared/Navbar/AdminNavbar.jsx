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
    const isActive = (path) => url.startsWith(path);

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [notifications] = useState(3);
    const dropdownRef = useRef(null);
    const notificationIconRef = useRef(null);
    const toggleNotificationDropdown = () => setIsNotificationOpen((p) => !p);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    const t = Translations[language];

    const navLinkClass = (path) => {
        return `
            p-2 rounded-md transition-all
                ${
                    url.startsWith(path)
                    ? "bg-primary text-white font-semibold"
                    : "hover:bg-primary-light"
                }
            `;
        };

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);

        router.post(
            "/theme",
            { theme: newTheme },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success(
                        newTheme === "dark"
                            ? "Dark Mode Enabled"
                            : "Light Mode Enabled",
                    );
                },
            },
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

    const nextLanguage = language === "en" ? "bn" : "en";
    return (
        <div className="sticky top-0 left-0 w-full bg-base-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 relative">
                {/* LOGO */}
                <div className="flex items-center">
                    <Link href="/admin/dashboard">
                        <img src={Logo} alt="logo" className="pl-4 h-7.5" />
                    </Link>
                </div>

                {/* NAV LINKS */}
                <ul className="hidden lg:flex flex-1 justify-center items-center text-base font-medium">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className={navLinkClass("/admin/dashboard")}
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
                                    href="/admin/table"
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
                                    href="/admin/card"
                                    className="block px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {t.card}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/cardtable"
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
                                    href="/admin/form"
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
                                    href="/admin/support"
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
                            href="/admin/profile"
                            className={navLinkClass("/admin/profile")}
                        >
                            {t.profile}
                        </Link>
                    </li>
                </ul>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLanguage(nextLanguage)}
                        className="relative w-16 h-[30px] rounded-full bg-base-200 border border-accent shadow-inner transition cursor-pointer"
                    >
                        <span
                            className={`absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300
        ${language === "en" ? "left-0" : "left-[calc(100%-1.75rem)]"}`}
                        >
                            <img
                                src={
                                    language === "en"
                                        ? "data:image/png;base64,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"
                                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAACWCAMAAADABGUuAAAAdVBMVEUAZ0faKRyFQS2uNiTOLR5QUDdmSjN0RjAVYUPYKh3FLyAsWj/TKx06VzuRPSt/Qy5iSzS6MiKgOSg0WD1XTjaKQCwMY0WWPCm1MyNBVDo9VTtJUzi8MSJcTDXAMCGMPyt7RC8hXUBLUTipNyadOyjKLh9zRzH33yJDAAAC+UlEQVR4nO3dCXLiQAwFULdtwOxrWEIgwMDc/4gTD0VBZmzjRULq6L8T9C+TVu8JAgAAAAAAAAAAAAAAAG8dN5NwFk17sYt702gWTjZH6Sa9Qr89G7j/daPOULppnJanc1bsm8HqtJRuIo95GBfkvorDuXQz6W2ip7mv1i3pptJqrUsGT30spJtLZ1gleGr6Lt1kGslbxeCpVSLdbAK7551bltj7X/1yVCv43w/vd6Xrf9RO7tze50K36DZI/jXG8fdH324UPNWRjlDTuHFy58bSIWqp38E9GknHqKFONc/yKR2ksgNRcv/+3pv3cHcT6TCVbAmTO7eRjlNBciGNHnu0fvWLNLlzkXSg0ui6uJuDdKSShuTJnfNkOF91YaKMtXSoUijr2p0PFS6ptzTxTOzBsg3VAPZfb9LBnjo2m6Ln66r/7CFTcv3z16RoZ6mZgfLP3mFLrn4K12OM3pMOV2jDmNw51XsyNItSeTQv2Cz5OrnUQPGmxIk1uXNb6YD5+Ir6leLSvmeOPpUOmCthTu6c2lFNiz262sMmFDtNxQ7SEfPM2KOfpSPm4e7lnNtLR8zDNVW/6yod1PTZkzvXlw6Z7f0F0ZUepKXdaMumdCjLX9bVFvbdC6LvpENm49l7+K4tHTKb4eiGf/CGuznDxc3wkOb4guhaT9XYnb5YnrQaXqowvEBleFnS8GJ00OSmSxl6tyAsbzwZ3m40vMls+GiB5QMlho8RWT48ZvjIIOM4XnFRv2L77PqPB7MdCg+lgz1n+CpAMGGJ7sMFEMvXfoI5Q3RPLnsxXPFTPpp5YPdiJ/V13osPvfsN6Qyu69MlbtoNZz/q2h3dFO63dJTKqJYoVS/N5LD7OAtNeVc/U81h9yGmIFg0m7x7/PxW00fXlJ4FLsnuU3tfFlYfWAxqPqs58mnYXqDyY6prX6bnJWyrhP9p7webfTg5Vea57Mv4B/3UHy23q6L08Urx0QECRp/Gv/n+DxHOVv4hAgAAAAAAAAAAAAAAmPMHmdUySmYqUhYAAAAASUVORK5CYII="
                                }
                                alt={language === "en" ? "EN" : "BN"}
                                className="h-full w-full rounded-full object-cover"
                            />
                        </span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={handleThemeToggle}
                        title={
                            theme === "light"
                                ? "Switch to dark"
                                : "Switch to light"
                        }
                        className="cursor-pointer p-2 rounded-full hover:bg-color_gray_200"
                    >
                        {theme === "light" ? (
                            <GoSun className="text-2xl font-bold" />
                        ) : (
                            <BsMoonStarsFill className="text-2xl font-bold text-primary-content" />
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
