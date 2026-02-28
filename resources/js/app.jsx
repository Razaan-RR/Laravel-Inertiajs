import "../css/app.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AuthProvider from "./ContextAPI/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import AdminLayout from "./Layout/AdminLayout";

Aos.init();

const queryClient = new QueryClient();

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");

        const module = await pages[`./Pages/${name}.jsx`]();
        const page = module.default;

        // Default layout wrapper
        page.layout =
            page.layout ||
            ((page) => (
                <AuthProvider>
                    <AdminLayout>{page}</AdminLayout>
                </AuthProvider>
            ));

        return module;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        theme="colored"
                    />
                </QueryClientProvider>
            </StrictMode>
        );
    },
});