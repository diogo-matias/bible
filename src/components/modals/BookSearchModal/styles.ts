import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material";
import { hexToRGBA } from "../../../utils/colors";
import { STYLE } from "../../../constants/styles";

export const ContentContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    boxSizing: "border-box",
    top: STYLE.HEADER_HEIGHT / 2,
    overflow: "hidden",
    maxHeight: 500,
    width: 600,
    maxWidth: "55vw",
    backgroundColor: hexToRGBA(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(5px)",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 10,
    transition: "0.5s",
    marginRight: "200px",
}));

export const ListContainer = styled(Box)({
    overflow: "auto",
    maxHeight: "50vh",
});

export const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        "& input": {
            height: 10,
        },

        "& fieldset": {
            borderRadius: 10,
            borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.divider,
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.divider} !important`,
        },
    },
}));

export const LanguageSelectContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginInline: 10,
    paddingInline: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledChapterCard = styled(Box)(({ theme }) => ({
    width: "calc(1/5 * 100% - 8px)",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    margin: "4px",
    transition: "0.5s",
    aspectRatio: "1/1",

    "&:hover": {
        backgroundColor: theme.palette.divider,
        cursor: "pointer",
    },
}));
