import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { toggleThemeMode } from "../../store/modules/theme";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigator = useNavigate();

    function handleNavigation() {
        navigator("/bible");
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(rgba(255, 255, 255, 0.4), rgba(0,0,0,0.7)), url(img/home-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    backdropFilter: "blur(5px)",
                    zIndex: 1,
                }}
            />

            <div
                style={{
                    cursor: "pointer",
                    zIndex: 1,
                    display: "flex",
                }}
                onClick={handleNavigation}
            >
                <Box>
                    <img
                        src="img/bible-logo.png"
                        alt="bible-logo"
                        style={{
                            filter: "invert(1)",
                            width: "100px",
                        }}
                    />
                </Box>

                <Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography
                            variant="h1"
                            fontWeight={600}
                            sx={{ letterSpacing: -7 }}
                            color={"white"}
                        >
                            Bible
                        </Typography>
                        <Typography
                            variant="h1"
                            fontWeight={600}
                            sx={{ letterSpacing: -7 }}
                            color={"white"}
                        >
                            .com
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            padding: 1,
                            transition: "0.5s",
                            color: "white",
                            borderRadius: 1,
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black",
                            },
                        }}
                    >
                        <Typography variant="h6" fontWeight={"light"}>
                            Read online bible
                        </Typography>
                        <ArrowForward />
                    </Box>
                </Box>
            </div>
        </Box>
    );
}
