import { Box, ClickAwayListener, MenuItem, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    filterBookByName,
    getAndSetChapterInfo,
    setSelectedBook,
    setSelectedBookThunk,
} from "../../../store/modules/bible";
import { Book, Chapter } from "../../../store/modules/bible/types";
import {
    ContentContainer,
    ListContainer,
    StyledChapterCard,
    StyledInput,
} from "./styles";
import { FilterModeType, ListContentType } from "./types";

export type SearchModalPropsType = {
    open: boolean;
    onClose: () => void;
};

export function BookSearchModal(props: SearchModalPropsType) {
    const { onClose, open } = props;

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [inputValue, setInputValue] = useState("");
    const [listContent, setListContent] = useState<ListContentType>([]);
    const [filterMode, setFilterMode] = useState<FilterModeType>("book");

    const {
        selectedBible: { selectedBook, chapters, selectedChapterInfo },
        filter: { booksFilteredList },
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        console.log(inputValue);

        dispatch(
            filterBookByName({
                query: inputValue,
            })
        );
    }, [inputValue]);

    useEffect(() => {
        if (filterMode === "book") {
            setListContent(booksFilteredList);
        } else {
            setListContent(chapters);
        }
    }, [filterMode, chapters, listContent, booksFilteredList]);

    function toggleFilterMode() {
        setFilterMode((state) => {
            if (state === "book") {
                return "chapter";
            }

            return "book";
        });
    }

    function handleBookSelection(book: Book) {
        dispatch(setSelectedBookThunk(book));

        setInputValue("");
        toggleFilterMode();
    }

    function handleChapterSelect(chapterId: string, isSelected: boolean) {
        if (!isSelected) {
            dispatch(
                getAndSetChapterInfo({
                    chapterId,
                })
            );
            onClose();
        }

        toggleFilterMode();
    }

    if (!open) {
        return null;
    }

    return (
        <ClickAwayListener onClickAway={onClose}>
            <ContentContainer>
                <Box>
                    <StyledInput
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        fullWidth
                    />
                </Box>
                <ListContainer>
                    {filterMode === "book" && (
                        <Box>
                            {listContent?.map((i) => {
                                const item = i as Book;

                                const backgroundColor =
                                    item.id === selectedBook?.id
                                        ? theme.palette.divider
                                        : "";

                                return (
                                    <MenuItem
                                        onClick={() =>
                                            handleBookSelection(item)
                                        }
                                        style={{ backgroundColor }}
                                    >
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Box>
                    )}
                    {filterMode === "chapter" && (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                paddingTop: 1,
                            }}
                        >
                            {listContent?.map((i) => {
                                const item = i as Chapter;
                                const isSelected =
                                    item.id === selectedChapterInfo?.id;

                                const backgroundColor = isSelected
                                    ? theme.palette.divider
                                    : "";

                                return (
                                    <StyledChapterCard
                                        onClick={() =>
                                            handleChapterSelect(
                                                item.id,
                                                isSelected
                                            )
                                        }
                                        sx={{ backgroundColor }}
                                    >
                                        {item.number}
                                    </StyledChapterCard>
                                );
                            })}
                        </Box>
                    )}
                </ListContainer>
            </ContentContainer>
        </ClickAwayListener>
    );
}
