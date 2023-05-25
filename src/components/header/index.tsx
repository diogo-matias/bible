import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    HeaderContainer,
    HeaderContainerAbsolute,
    HeaderContainerRelative,
    StyledBox,
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

    const selectedBible = useAppSelector(
        (state) => state.bible.selectedBible.bibleInfo
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
                    <Grid container gap={4} sx={{ height: "50%" }}>
                        <Grid item xs={4}>
                            <StyledInput>
                                <CustomInput
                                    label={
                                        selectedBible?.abbreviationLocal ??
                                        "Selecionar biblia"
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
                        </Grid>
                        <Grid item xs={4}>
                            <StyledInput>
                                <CustomInput
                                    label={"Gênesis"}
                                    onClick={() => setOpenBookSearchModal(true)}
                                />
                                <BookSearchModal
                                    open={openBookSearchModal}
                                    onClose={clickAwayBookModal}
                                />
                            </StyledInput>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" onClick={toggleTheme}>
                                Theme
                            </Button>
                        </Grid>
                    </Grid>
                </HeaderContainerAbsolute>
            </HeaderContainerRelative>
        </HeaderContainer>
    );
}
