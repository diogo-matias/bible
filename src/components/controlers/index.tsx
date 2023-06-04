import { useEffect, useRef, useState } from "react";
import { ArrowContainer, Container } from "./styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useWindowDimensions from "../../hooks/window-dimentions";
import { useAppDispatch } from "../../hooks/redux";
import { nextOrPreviousChapter } from "../../store/modules/bible";

export function ArrowControllers() {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const { width } = useWindowDimensions();

    const [arrowSize, setArrowSize] = useState(0);
    const fontSize = `${arrowSize - 20}px`;

    useEffect(() => {
        if (ref.current) {
            setArrowSize(ref.current?.offsetHeight);
        }
    }, [width]);

    function handleNextChapterClick() {
        dispatch(nextOrPreviousChapter("next"));
    }

    function handlePreviousChapterClick() {
        dispatch(nextOrPreviousChapter("previous"));
    }

    return (
        <Container>
            <ArrowContainer ref={ref} onClick={handlePreviousChapterClick}>
                <ChevronLeft sx={{ fontSize }} />
            </ArrowContainer>
            <ArrowContainer onClick={handleNextChapterClick}>
                <ChevronRight sx={{ fontSize }} />
            </ArrowContainer>
        </Container>
    );
}
