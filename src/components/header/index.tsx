import {
    Box,
    Button,
    Grid,
    Icon,
    SvgIcon,
    Typography,
    useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    HeaderContainer,
    HeaderContainerAbsolute,
    HeaderContainerRelative,
    StyledGrid,
    StyledIcon,
    StyledInput,
} from "./styles";
import { BibleSearchModal } from "../modals/bibleSearchModal";
import { useState } from "react";
import { CustomInput } from "../customInput";
import { BookSearchModal } from "../modals/BookSearchModal";
import { toggleThemeMode } from "../../store/modules/theme";
import { LightMode, DarkMode, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function Header() {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigator = useNavigate();

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

    function renderBibleInput() {
        return (
            <StyledInput>
                <CustomInput
                    label={bibleInfo?.abbreviationLocal ?? "Select Bible"}
                    onClick={() => setOpenBibleSearchModal(true)}
                />
                <BibleSearchModal
                    open={openBibleSearchModal}
                    onClose={clickAway}
                />
            </StyledInput>
        );
    }

    function renderBooksInput() {
        return (
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
        );
    }

    function renderToggleThemeIcon() {
        const themeMode = theme.palette.mode;
        const ThemeIcon = themeMode === "dark" ? <LightMode /> : <DarkMode />;

        return <StyledIcon onClick={toggleTheme}>{ThemeIcon}</StyledIcon>;
    }

    function renderButtons() {
        return (
            <Box sx={{ display: "flex", gap: 2 }}>
                <Home
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        navigator("/");
                    }}
                />
                {renderToggleThemeIcon()}
            </Box>
        );
    }

    return (
        <HeaderContainer>
            <HeaderContainerRelative>
                <HeaderContainerAbsolute>
                    <Grid container sx={{ height: "50%" }}>
                        <StyledGrid item xs={4} sx={{ paddingInline: 1 }}>
                            {renderBibleInput()}
                        </StyledGrid>
                        <StyledGrid item xs={4}>
                            {renderBooksInput()}
                        </StyledGrid>
                        <StyledGrid item xs={3}>
                            {renderButtons()}
                        </StyledGrid>
                    </Grid>
                </HeaderContainerAbsolute>
            </HeaderContainerRelative>
        </HeaderContainer>
    );
}
