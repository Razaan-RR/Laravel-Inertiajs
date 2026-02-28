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
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");

        return pages[`./Pages/${name}.jsx`]().then((module) => {
            const page = module.default;

            page.layout =
                page.layout || ((page) => <AdminLayout>{page}</AdminLayout>);

            return module;
        });
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <App {...props} />
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            theme="colored"
                        />
                    </AuthProvider>
                </QueryClientProvider>
            </StrictMode>,
        );
    },
});
