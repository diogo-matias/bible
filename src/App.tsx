import {
    Button,
    CssBaseline,
    ThemeProvider,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleThemeMode } from "./store/modules/theme";
import { useAppSelector } from "./hooks/redux";

function App() {
    const dispatch = useDispatch();
    const theme = useAppSelector((state) => state.theme);

    function toggleTheme() {
        dispatch(toggleThemeMode());
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h1">hello</Typography>
            <Button onClick={toggleTheme}>{theme.palette.mode}</Button>
        </ThemeProvider>
    );
}

export default App;
