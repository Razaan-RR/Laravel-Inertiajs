import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

import ImagePicker from "../../componentes/ImagePicker";
import Loader from "../../componentes/Loader";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Translations } from "../../utils/Translations";

const InstituteSetting = ({ panelHide, closeAddPanel }) => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const { loading, language } = UseAuth();
    const t = Translations[language];

    /* ================= REFS ================= */
    const refs = {
        hologram: useRef(null),
        background: useRef(null),
        seal: useRef(null),
        sign: useRef(null),
        logo: useRef(null),
        frontendLogo: useRef(null),
        frontendBgLogo: useRef(null),
    };

    /* ================= STATE ================= */
    const [images, setImages] = useState({
        hologram: null,
        background: null,
        seal: null,
        sign: null,
        logo: null,
        frontendLogo: null,
        frontendBgLogo: null,
    });

    const [previews, setPreviews] = useState({
        hologram: null,
        background: null,
        seal: null,
        sign: null,
        logo: null,
        frontendLogo: null,
        frontendBgLogo: null,
    });

    const [serverImages, setServerImages] = useState({
        hologram: null,
        background: null,
        seal: null,
        sign: null,
        logo: null,
        frontendLogo: null,
        frontendBgLogo: null,
    });

    const [removed, setRemoved] = useState({
        hologram: 0,
        background: 0,
        seal: 0,
        sign: 0,
        logo: 0,
        frontendLogo: 0,
        frontendBgLogo: 0,
    });

    const [form, setForm] = useState({
        institute_name_bangla: "",
        institute_name_english: "",
        institute_contact_no: "",
        institute_contact_no_2: "",
        institute_contact_email: "",
        image_opacity: 0,
        institute_code: "",
        emis_code: "",
        institute_established: "",
        institute_address_bangla: "",
        institute_address: "",
    });

    /* ================= MUTATION ================= */
    const { mutate, isPending } = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.post("/institute-setting", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Institute updated successfully");
            queryClient.invalidateQueries(["institute-setting"]);
            closeAddPanel();
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    /* ================= HANDLERS ================= */
    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleImage = (key) => (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setRemoved((prev) => ({ ...prev, [key]: 0 }));

        setPreviews((prev) => {
            const old = prev[key];
            if (old?.startsWith("blob:")) URL.revokeObjectURL(old);
            return { ...prev, [key]: URL.createObjectURL(file) };
        });

        setImages((prev) => ({ ...prev, [key]: file }));
    };

    const removeImage = (key) => {
        setPreviews((prev) => {
            const old = prev[key];
            if (old?.startsWith("blob:")) URL.revokeObjectURL(old);
            return { ...prev, [key]: null };
        });

        setImages((prev) => ({ ...prev, [key]: null }));
        setServerImages((prev) => ({ ...prev, [key]: null }));
        setRemoved((prev) => ({ ...prev, [key]: 1 }));

        if (refs[key]?.current) refs[key].current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();

        Object.entries(form).forEach(([k, v]) => fd.append(k, v));

        if (images.hologram) fd.append("hologram_image", images.hologram);
        if (images.background) fd.append("background_image", images.background);
        if (images.seal) fd.append("seal_image", images.seal);
        if (images.sign) fd.append("sign_image", images.sign);
        if (images.logo) fd.append("logo_image", images.logo);
        if (images.frontendLogo)
            fd.append("frontend_logo_image", images.frontendLogo);
        if (images.frontendBgLogo)
            fd.append("frontend_back_logo_image", images.frontendBgLogo);

        fd.append("remove_hologram_image", removed.hologram);
        fd.append("remove_background_image", removed.background);
        fd.append("remove_seal_image", removed.seal);
        fd.append("remove_sign_image", removed.sign);
        fd.append("remove_logo_image", removed.logo);
        fd.append("remove_frontend_logo_image", removed.frontendLogo);
        fd.append("remove_frontend_back_logo_image", removed.frontendBgLogo);

        mutate(fd);
    };

    /* ================= UI ================= */
    return (
        <div className="fixed inset-0 bg-black/20 z-40">
            <div
                className={`fixed top-0 right-0 w-full lg:w-4/12 h-screen bg-base-200 overflow-y-auto z-40 ${panelHide ? "slide-in" : "slide-out"}`}
            >
                {isPending ? (
                    <Loader />
                ) : (
                    <>
                        <div className="flex justify-between items-center border-b border-accent px-5 py-3">
                            <h1 className="font-semibold">
                                {t.institute_setting}
                            </h1>
                            <button onClick={closeAddPanel}>
                                <IoMdClose size={22} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="px-5 space-y-3 mt-4 pb-8"
                        >
                            {/* YOUR UI PART UNCHANGED */}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstituteSetting;
