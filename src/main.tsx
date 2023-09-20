import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import React from "react";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
