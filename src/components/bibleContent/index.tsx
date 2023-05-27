import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Container } from "./styles";

export function BibleContent() {
    const ref = useRef<HTMLDivElement>(null);

    const {
        selectedBible: { selectedChapterInfo },
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = `<div>${
                selectedChapterInfo?.content ?? ""
            }</div>`;
        }
    }, [selectedChapterInfo]);

    function renderContent() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Box id="bible-content" ref={ref} />
                </Grid>
            </Grid>
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
