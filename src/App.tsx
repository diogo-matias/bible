import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getBiblesList } from "./store/modules/bible";
import Router from "./router";
import { Header } from "./components/header";

function App() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme);

    useEffect(() => {
        dispatch(getBiblesList());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App;
