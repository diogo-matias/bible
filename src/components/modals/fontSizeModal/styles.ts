import { Box, styled } from "@mui/material";
import { hexToRGBA } from "../../../utils/colors";

export const Container = styled(Box)(({ theme }) => ({
    height: "25vh",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backdropFilter: "blur(10px)",
    backgroundColor: hexToRGBA(theme.palette.background.paper, 0.8),
    padding: "10%",
}));

export const FontSizeBoxesContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    height: "45%",
    borderRadius: 10,
    border: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
}));

export const FontSizeBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
}));
