import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Slider,
    Typography,
} from "@mui/material";
import { ReactHTML, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Container, LoadingContainer } from "./styles";
import { breakVerses } from "../../scripts/break-verses";

export function BibleContent() {
    const ref = useRef<HTMLDivElement>(null);

    const {
        selectedBible: { selectedChapterInfo, bibleInfo },
        load: { isGettingChapterInfo, isGettingBooksInfo, isGettingBibleList },
        style: { fontSize },
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = `<div>${
                selectedChapterInfo?.content ?? ""
            }</div>`;
        }
        breakVerses();
    }, [
        selectedChapterInfo,
        bibleInfo,
        isGettingChapterInfo,
        isGettingBooksInfo,
        isGettingBibleList,
    ]);

    function renderBibleContent() {
        if (isGettingBibleList || isGettingBooksInfo || isGettingChapterInfo) {
            return (
                <LoadingContainer>
                    <CircularProgress color="inherit" />
                </LoadingContainer>
            );
        }

        return (
            <Container>
                <Typography variant="h3" fontWeight={600}>
                    {selectedChapterInfo?.reference}
                </Typography>
                {renderContent()}
            </Container>
        );
    }

    function renderContent() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            "& .p": {
                                fontSize,
                            },
                        }}
                        id="bible-content"
                        ref={ref}
                    />
                </Grid>
            </Grid>
        );
    }

    return <Box>{renderBibleContent()}</Box>;
}
