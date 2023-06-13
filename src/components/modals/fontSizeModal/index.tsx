import {
    Box,
    ClickAwayListener,
    Slider,
    Typography,
    useTheme,
} from "@mui/material";
import { Container, FontSizeBox, FontSizeBoxesContainer } from "./styles";
import { FontTypeModalPropsType } from "./types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setFontSize } from "../../../store/modules/bible";

export function FontSizeModal(props: FontTypeModalPropsType) {
    const { open, onClose } = props;

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [sliderInputValue, setSliderInputValue] = useState(0);

    const fontSizeState = useAppSelector((state) => state.bible.style.fontSize);

    if (!open) {
        return null;
    }

    function handleFontSizeChange(value: any) {
        setSliderInputValue(value);
        const fontSize = value / 100 + 1;

        setTimeout(
            () => dispatch(setFontSize({ fontSize: `${fontSize}em` })),
            100
        );
    }

    function renderFontSizeBox(fontSize: number, hideBorder?: boolean) {
        const fontSizeString = `${fontSize}em`;

        const isSelected = fontSizeString === fontSizeState;

        return (
            <FontSizeBox
                sx={{
                    fontSize: fontSizeString,
                    borderRight: hideBorder
                        ? ""
                        : `1px solid ${theme.palette.divider}`,
                    backgroundColor: isSelected
                        ? theme.palette.action.active
                        : "",
                    color: isSelected ? theme.palette.background.paper : "",
                }}
                onClick={() => handleFontSizeChange(fontSize * 100 - 100)}
            >
                Aa
            </FontSizeBox>
        );
    }

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Container>
                <Typography textAlign={"center"} sx={{ marginBottom: 2 }}>
                    Select <span style={{ fontWeight: "bold" }}>Font Size</span>
                </Typography>
                <FontSizeBoxesContainer>
                    {renderFontSizeBox(1)}
                    {renderFontSizeBox(1.5)}
                    {renderFontSizeBox(2, true)}
                </FontSizeBoxesContainer>

                <Slider
                    value={sliderInputValue}
                    onChange={(_, value) => handleFontSizeChange(value)}
                    sx={{ color: theme.palette.text.primary }}
                />
            </Container>
        </ClickAwayListener>
    );
}
