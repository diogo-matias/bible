import { Box, styled } from "@mui/material";
import { STYLE } from "../../constants/styles";

export const HeaderContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: STYLE.HEADER_HEIGHT,
}));

export const HeaderContainerRelative = styled(Box)(({ theme }) => ({
    positions: "relative",
    width: "100%",
    height: "100%",
    paddingBottom: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
}));

export const HeaderContainerAbsolute = styled(Box)(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    height: "100%",
    maxWidth: "1280px",
    paddingInline: "10vw",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    borderBottom: `1px solid ${theme.palette.divider}`,

    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.divider,
    },
}));

export const StyledInput = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
}));