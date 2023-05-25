import { Typography } from "@mui/material";
import { StyledBox } from "./styles";
import { ArrowDropDown } from "@mui/icons-material";
import { CustomInputPropsType } from "./types";

export function CustomInput(props: CustomInputPropsType) {
    const { label, onClick } = props;

    return (
        <StyledBox onClick={onClick}>
            <Typography fontWeight={400}>{label}</Typography>
            <ArrowDropDown />
        </StyledBox>
    );
}
