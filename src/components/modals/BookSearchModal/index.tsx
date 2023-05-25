import { Box, ClickAwayListener, MenuItem, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    setSelectedBook,
    setSelectedBookThunk,
} from "../../../store/modules/bible";
import { Book, Chapter } from "../../../store/modules/bible/types";
import { ContentContainer, ListContainer, StyledInput } from "./styles";
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
        selectedBible: { books, selectedBook, chapters },
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        if (filterMode === "book") {
            setListContent(books);
        } else {
            setListContent(chapters);
        }
    }, [filterMode, books, chapters, listContent]);

    // useEffect(() => {
    //     if (filterMode === "bible") {
    //         handleBibleFilter(inputValue);
    //     } else {
    //         handleLanguageFilter(inputValue);
    //     }
    // }, [inputValue, filterMode]);

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
        // onClose();
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
                            {listContent.map((i) => {
                                const item = i as Book;
                                console.log("entrou aqui");

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
                            {listContent.map((i) => {
                                const item = i as Chapter;

                                return (
                                    <Box
                                        onClick={() => toggleFilterMode()}
                                        sx={{
                                            height: "10vh",
                                            width: "calc(1/5 * 100% - 10px)",
                                            border: "1px solid black",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 2,
                                            margin: "5px",
                                        }}
                                    >
                                        {item.number}
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </ListContainer>
            </ContentContainer>
        </ClickAwayListener>
    );
}
