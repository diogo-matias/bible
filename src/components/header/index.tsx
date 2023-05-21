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
import { SearchModal } from "../modals/searchModal";
import { useState } from "react";

export function Header() {
    const selectedBible = useAppSelector(
        (state) => state.bible.selectedBible.bibleInfo
    );

    const [openModal, setOpenModal] = useState(false);

    function clickAway() {
        console.log("entrou aqui");
        setOpenModal(false);
    }

    return (
        <HeaderContainer>
            <HeaderContainerRelative>
                <HeaderContainerAbsolute>
                    <Grid container sx={{ height: "50%" }}>
                        <Grid item xs={4}>
                            <StyledInput>
                                <StyledBox onClick={() => setOpenModal(true)}>
                                    <Typography fontWeight={400}>
                                        {selectedBible?.abbreviationLocal ??
                                            "Selecionar biblia"}
                                    </Typography>
                                    <ArrowDropDown />
                                </StyledBox>
                                <SearchModal
                                    open={openModal}
                                    onClose={clickAway}
                                />
                            </StyledInput>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </HeaderContainerAbsolute>
            </HeaderContainerRelative>
        </HeaderContainer>
    );
}
