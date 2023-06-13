import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { STYLE } from "../../constants/styles";

export const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: `${STYLE.HEADER_HEIGHT + 20}px`,
    left: 0,
    right: 0,
    margin: "auto",
    maxWidth: "calc((800px + 10vw))",
    paddingInline: "10vw",
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
}));
