import { useEffect, useRef, useState } from "react";
import { ArrowContainer, Container } from "./styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useWindowDimensions from "../../hooks/window-dimentions";

export function ArrowControllers() {
    const ref = useRef<HTMLDivElement>(null);
    const { width } = useWindowDimensions();

    const [arrowSize, setArrowSize] = useState(0);
    const fontSize = `${arrowSize - 20}px`;

    useEffect(() => {
        if (ref.current) {
            setArrowSize(ref.current?.offsetHeight);
        }
    }, [width]);

    return (
        <Container>
            <ArrowContainer ref={ref}>
                <ChevronLeft sx={{ fontSize }} />
            </ArrowContainer>
            <ArrowContainer>
                <ChevronRight sx={{ fontSize }} />
            </ArrowContainer>
        </Container>
    );
}
