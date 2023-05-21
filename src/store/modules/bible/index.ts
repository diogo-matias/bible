import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BibleApi } from "../../../api/bible/bible.api";
import { Bible, BibleState } from "./types";

export const getBiblesList = createAsyncThunk(
    "@bible/getBiblesList",
    async (_, { dispatch }) => {
        const { biblesList } = await BibleApi.getBiblesList();

        dispatch(
            setLanguagesAvailableFromBibleList({
                biblesList,
            })
        );

        return biblesList;
    }
);

export const getBibleBooks = createAsyncThunk(
    "@bible/getBibleBooks",
    async (bibleId: string) => {
        try {
            const { books } = await BibleApi.getBibleBooks(bibleId);

            return books;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }
);

export const setSelectedBible = createAsyncThunk(
    "@bible/setSelectedBible",
    async (bible: Bible, { dispatch }) => {
        dispatch(getBibleBooks(bible.id));

        return bible;
    }
);

const initialState: BibleState = {
    biblesList: [],
    selectedBible: {
        bibleInfo: null,
        books: [],
        selectedBook: null,
        selectedBookInfo: null,
        selectedChapterInfo: null,
    },
    selectedLanguage: null,
    bibleFilter: {
        bibleFilteredList: [],
        languagesFilteredLis: [],
    },
};

const BibleSlice = createSlice({
    name: "@bible",
    initialState,
    reducers: {
        filterBibleListByNameOrId(state, { payload }) {
            const { query } = payload;
            let result = [];

            result = state.biblesList.filter((item) => {
                const name = item.name.toLowerCase();
                const abbreviationLocal = item.abbreviationLocal.toLowerCase();
                const lowerQuery = query.toLowerCase();

                return (
                    name.includes(lowerQuery) ||
                    abbreviationLocal.includes(lowerQuery)
                );
            });

            if (state.selectedLanguage) {
                result = result.filter(
                    (item) => item.language.id === state.selectedLanguage?.id
                );
            }

            return {
                ...state,
                bibleFilter: {
                    ...state.bibleFilter,
                    bibleFilteredList: result,
                },
            };
        },
        setSelectedBible(state, { payload }) {
            const { bible } = payload;

            return {
                ...state,
                selectedBible: {
                    ...state.selectedBible,
                    bibleInfo: bible,
                },
            };
        },
        setLanguagesAvailableFromBibleList(state, { payload }) {
            const { biblesList } = payload;

            const biblesWithDifferentLanguages = biblesList.filter(
                (bible: Bible, index: number) => {
                    let hasSomeEqual = false;

                    for (let i = 0; i < index; i++) {
                        if (bible.language.id === biblesList[i].language.id) {
                            hasSomeEqual = true;
                        }
                    }

                    return !hasSomeEqual;
                }
            ) as Bible[];

            const languages = biblesWithDifferentLanguages.map(
                (item) => item.language
            );

            return {
                ...state,
                availableLanguages: languages,
                bibleFilter: {
                    ...state.bibleFilter,
                    languagesFilteredLis: languages,
                },
            };
        },
        selectLanguage(state, { payload }) {
            const { language } = payload;

            return {
                ...state,
                selectedLanguage: language,
            };
        },
        filterLanguageByNameOrId(state, { payload }) {
            const { query } = payload;

            const result = state.availableLanguages?.filter((item) => {
                const lowerQuery = query.toLowerCase();
                const nameLocal = item.nameLocal.toLowerCase();
                const id = item.id.toLowerCase();

                return (
                    nameLocal.includes(lowerQuery) || id.includes(lowerQuery)
                );
            });

            return {
                ...state,
                bibleFilter: {
                    ...state.bibleFilter,
                    languagesFilteredLis: result ?? [],
                },
            };
        },
        clearSelectedLanguage(state) {
            return {
                ...state,
                selectedLanguage: initialState.selectedLanguage,
            };
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(getBiblesList.fulfilled, (state, { payload }) => {
            state.biblesList = payload;
            state.bibleFilter.bibleFilteredList = payload;
        });
        addCase(getBibleBooks.fulfilled, (state, { payload }) => {
            state.selectedBible.books = payload;
        });
        addCase(setSelectedBible.fulfilled, (state, { payload }) => {
            state.selectedBible.bibleInfo = payload;
        });
    },
});

export const {
    filterBibleListByNameOrId,
    setLanguagesAvailableFromBibleList,
    selectLanguage,
    filterLanguageByNameOrId,
    clearSelectedLanguage,
} = BibleSlice.actions;

export default BibleSlice.reducer;
