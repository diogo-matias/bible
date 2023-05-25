import {
    Box,
    Button,
    CssBaseline,
    Grid,
    ThemeProvider,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toggleThemeMode } from "./store/modules/theme";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { BibleApi } from "./api/bible/bible.api";
import { getBiblesList } from "./store/modules/bible";
import { Header } from "./components/header";
import { STYLE } from "./constants/styles";

function App() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme);

    const ref = useRef<HTMLDivElement>(null);

    const {
        selectedBible: { selectedChapterInfo },
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = selectedChapterInfo?.content ?? "";
        }
    }, [selectedChapterInfo]);

    useEffect(() => {
        dispatch(getBiblesList());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box
                sx={{
                    paddingInline: "30vw",
                    paddingTop: `${STYLE.HEADER_HEIGHT + 20}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3" fontWeight={600}>
                    {selectedChapterInfo?.reference}
                </Typography>
                <Box id="bible-content" ref={ref} />
            </Box>
        </ThemeProvider>
    );
}

export default App;
