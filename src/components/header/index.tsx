import { Box, Grid, Icon, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
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

export function Header() {
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

    return (
        <HeaderContainer>
            <HeaderContainerRelative>
                <HeaderContainerAbsolute>
                    <Grid container sx={{ height: "50%" }}>
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
                    </Grid>
                </HeaderContainerAbsolute>
            </HeaderContainerRelative>
        </HeaderContainer>
    );
}
