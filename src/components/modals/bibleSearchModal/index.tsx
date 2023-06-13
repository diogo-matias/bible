import {
    Box,
    Button,
    ClickAwayListener,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { HTMLProps, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    clearSelectedLanguage,
    filterBibleListByNameOrId,
    filterLanguageByNameOrId,
    selectLanguage,
    setSelectedBible,
} from "../../../store/modules/bible";
import { Bible, Language } from "../../../store/modules/bible/types";
import {
    ContentContainer,
    LanguageSelectContainer,
    ListContainer,
    StyledInput,
} from "./styles";
import { FilterModeType, ListContentType } from "./types";

export type SearchModalPropsType = {
    open: boolean;
    onClose: () => void;
};

export function BibleSearchModal(props: SearchModalPropsType) {
    const { onClose, open } = props;

    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState("");
    const [listContent, setListContent] = useState<ListContentType>([]);
    const [filterMode, setFilterMode] = useState<FilterModeType>("bible");

    const {
        filter: { bibleFilteredList, languagesFilteredLis },
        selectedLanguage,
    } = useAppSelector((state) => state.bible);

    useEffect(() => {
        if (filterMode === "bible") {
            setListContent(bibleFilteredList);
        } else {
            setListContent(languagesFilteredLis);
        }
    }, [filterMode, bibleFilteredList, languagesFilteredLis]);

    useEffect(() => {
        if (filterMode === "bible") {
            handleBibleFilter(inputValue);
        } else {
            handleLanguageFilter(inputValue);
        }
    }, [inputValue, filterMode]);

    function handleBibleFilter(query: string) {
        dispatch(
            filterBibleListByNameOrId({
                query,
            })
        );
    }

    function handleLanguageFilter(query: string) {
        dispatch(filterLanguageByNameOrId({ query }));
    }

    function handleBibleSelection(bible: Bible) {
        dispatch(setSelectedBible(bible));

        onClose();
    }

    function handleLanguageSelection(language: Language) {
        dispatch(
            selectLanguage({
                language,
            })
        );

        setFilterMode("bible");
        setInputValue("");
    }

    function toggleFilterMode() {
        setFilterMode((state) => {
            if (state === "bible") {
                return "language";
            }

            return "bible";
        });
    }

    function handleClearSelectedLanguage() {
        dispatch(clearSelectedLanguage());

        handleBibleFilter("");
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
                    <LanguageSelectContainer>
                        <Box>
                            <Typography fontSize="small" fontWeight={"bold"}>
                                Bible Language
                            </Typography>
                            <Typography
                                sx={{ cursor: "pointer" }}
                                onClick={handleClearSelectedLanguage}
                            >
                                {selectedLanguage?.nameLocal ?? "All"}
                            </Typography>
                        </Box>
                        <Box
                            sx={{ cursor: "pointer" }}
                            onClick={toggleFilterMode}
                        >
                            <Typography>
                                {filterMode === "bible"
                                    ? "Select Language"
                                    : "Select Bible"}
                            </Typography>
                        </Box>
                    </LanguageSelectContainer>
                </Box>
                <ListContainer>
                    {listContent?.map((item, index) => {
                        const language = item as Language;
                        const bible = item as Bible;

                        if (filterMode === "bible") {
                            return (
                                <MenuItem
                                    onClick={() => handleBibleSelection(bible)}
                                >
                                    {item.name}
                                </MenuItem>
                            );
                        }

                        return (
                            <MenuItem
                                onClick={() =>
                                    handleLanguageSelection(language)
                                }
                            >
                                {language.nameLocal}
                            </MenuItem>
                        );
                    })}
                </ListContainer>
            </ContentContainer>
        </ClickAwayListener>
    );
}
