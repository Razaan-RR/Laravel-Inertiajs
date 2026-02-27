import "../css/app.css";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { createRoot } from "react-dom/client";
import React from "react";

import AuthProvider from "./ContextAPI/AuthProvider"; 

const pages = import.meta.glob("./Pages/**/*.jsx");

createInertiaApp({
    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`];
        if (!page) throw new Error(`Page not found: ${name}`);
        return page();
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AuthProvider>
                <App {...props} />
            </AuthProvider>
        );
    },
});