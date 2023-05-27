import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getBiblesList } from "./store/modules/bible";
import { Header } from "./components/header";
import { BibleContent } from "./components/bibleContent";
import { ArrowControllers } from "./components/controlers";

function App() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme);

    useEffect(() => {
        dispatch(getBiblesList());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <BibleContent />
            <ArrowControllers />
        </ThemeProvider>
    );
}

export default App;
