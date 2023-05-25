import { Box, styled } from "@mui/material";

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
