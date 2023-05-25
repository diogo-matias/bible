import { Box, Button, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React, { useRef, useState } from "react";
import { toggleThemeMode } from "./store/modules/theme";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { BibleApi } from "./api/bible/bible.api";
import { getBiblesList } from "./store/modules/bible";
import { Header } from "./components/header";

function App() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme);

    function toggleTheme() {
        dispatch(toggleThemeMode());
    }
    const [content, setContent] = useState();

    const ref = useRef<HTMLDivElement>(null);

    const [openModal, setOpenModal] = useState(false);

    const bibleId = "de4e12af7f28f599-02";
    const bookId = "GEN";
    const chapterId = "GEN.2";

    const { biblesList, bibleFilter } = useAppSelector((state) => state.bible);
    const { bibleFilteredList } = bibleFilter;

    function getBibleList1() {
        dispatch(getBiblesList());
    }

    function getBible() {
        BibleApi.getBible(bibleId);
    }

    function getBibleBooks() {
        BibleApi.getBibleBooks(bibleId);
    }

    function getBookInfo() {
        BibleApi.getBookInfo({
            bibleId,
            bookId,
        });
    }

    function getChapters() {
        BibleApi.getChapters({
            bibleId,
            bookId,
        });
    }

    function renderChapter(content: string) {
        if (!ref.current) {
            return;
        }

        ref.current.innerHTML = content;
    }

    async function getChapterInfo() {
        const response = await BibleApi.getChapterInfo({
            bibleId,
            chapterId,
        });

        if (!ref.current) {
            return null;
        }

        renderChapter(response.content);
    }

    function clickAway() {
        setOpenModal(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Button onClick={getBibleList1} variant="contained">
                get Bible List
            </Button>
            <Button onClick={getBible} variant="outlined">
                getBible
            </Button>
            <Button onClick={getBibleBooks} variant="contained">
                getBibleBooks
            </Button>
            <Button onClick={getBookInfo} variant="outlined">
                getBookInfo
            </Button>
            <Button onClick={getChapters} variant="outlined">
                getChapters
            </Button>
            <Button onClick={getChapterInfo} variant="outlined">
                getChapterInfo
            </Button>
            <Button onClick={toggleTheme} variant="outlined">
                toggleTheme
            </Button>
            <Header />
            <Box ref={ref} />
        </ThemeProvider>
    );
}

export default App;
