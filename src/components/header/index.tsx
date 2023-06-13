import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    HeaderContainer,
    HeaderContainerAbsolute,
    HeaderContainerRelative,
    StyledBox,
    StyledGrid,
    StyledInput,
} from "./styles";
import { ArrowDropDown } from "@mui/icons-material";
import { BibleSearchModal } from "../modals/bibleSearchModal";
import { useState } from "react";
import { CustomInput } from "../customInput";
import { BookSearchModal } from "../modals/BookSearchModal";
import { toggleThemeMode } from "../../store/modules/theme";

export function Header() {
    const dispatch = useAppDispatch();

    const { bibleInfo, selectedBook } = useAppSelector(
        (state) => state.bible.selectedBible
    );

    const [openBibleSearchModal, setOpenBibleSearchModal] = useState(false);
    const [openBookSearchModal, setOpenBookSearchModal] = useState(false);

    function clickAway() {
        setOpenBibleSearchModal(false);
    }

    function clickAwayBookModal() {
        setOpenBookSearchModal(false);
    }

    function toggleTheme() {
        dispatch(toggleThemeMode());
    }

    return (
        <HeaderContainer>
            <HeaderContainerRelative>
                <HeaderContainerAbsolute>
                    <Grid container sx={{ height: "50%" }}>
                        <StyledGrid item xs={4} sx={{ paddingInline: 1 }}>
                            <StyledInput>
                                <CustomInput
                                    label={
                                        bibleInfo?.abbreviationLocal ??
                                        "Select Bible"
                                    }
                                    onClick={() =>
                                        setOpenBibleSearchModal(true)
                                    }
                                />
                                <BibleSearchModal
                                    open={openBibleSearchModal}
                                    onClose={clickAway}
                                />
                            </StyledInput>
                        </StyledGrid>
                        <StyledGrid item xs={4}>
                            <StyledInput>
                                <CustomInput
                                    label={selectedBook?.name ?? "Select Book"}
                                    onClick={() => setOpenBookSearchModal(true)}
                                />
                                <BookSearchModal
                                    open={openBookSearchModal}
                                    onClose={clickAwayBookModal}
                                />
                            </StyledInput>
                        </StyledGrid>
                        <StyledGrid item xs={3}>
                            <Button variant="outlined" onClick={toggleTheme}>
                                Theme
                            </Button>
                        </StyledGrid>
                    </Grid>
                </HeaderContainerAbsolute>
            </HeaderContainerRelative>
        </HeaderContainer>
    );
}
