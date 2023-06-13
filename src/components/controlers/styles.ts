import { Box } from "@mui/material";
import { styled } from "@mui/material";
import { STYLE } from "../../constants/styles";

export const Container = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: "50%",
    left: 0,
    right: 0,
    translate: "0% -50%",
    zIndex: 1,
    width: "80vw",
    maxWidth: "1280px",
    margin: "auto",
    height: "5vw",
    maxHeight: 80,
    minHeight: 50,
    pointerEvents: "none",
    display: "flex",
    justifyContent: "space-between",
}));

export const ArrowContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    aspectRatio: "1/1",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    pointerEvents: "auto",
    transition: "0.3s",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",

    backgroundColor: theme.palette.background.paper,

    ":hover": {
        backgroundColor: theme.palette.action.active,
        color: theme.palette.background.default,
    },
}));
