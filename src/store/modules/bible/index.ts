import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BibleApi } from "../../../api/bible/bible.api";
import { Bible, BibleState, Book } from "./types";
import { DEFAULT_BIBLE } from "../../../constants/bible";

export const getBiblesList = createAsyncThunk(
    "@bible/getBiblesList",
    async (_, { dispatch }) => {
        const { biblesList } = await BibleApi.getBiblesList();

        dispatch(
            setLanguagesAvailableFromBibleList({
                biblesList,
            })
        );

        dispatch(setDefaultBibleInfo(biblesList));

        console.log("biblesList: ", biblesList);

        return biblesList;
    }
);

export const setDefaultBibleInfo = createAsyncThunk(
    "@bible/setDefaultBibleInfo",
    async (biblesList: Bible[], { dispatch }) => {
        const { books } = await BibleApi.getBibleBooks(DEFAULT_BIBLE.id);

        const defaultBible = biblesList.find(
            (item) => item.id === DEFAULT_BIBLE.id
        );
        const selectedBook = books.find(
            (item: any) => item.id === DEFAULT_BIBLE.bookId
        );

        if (!defaultBible) {
            return null;
        }

        dispatch(setSelectedBible(defaultBible));
        dispatch(setSelectedBookThunk(selectedBook));
        dispatch(
            getChapterInfo({
                chapterId: DEFAULT_BIBLE.chapterId,
                bibleId: DEFAULT_BIBLE.id,
            })
        );
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

export const setSelectedBookThunk = createAsyncThunk(
    "@bible/setSelectedBook",
    async (book: Book, { dispatch, getState }) => {
        const { bible } = getState() as any;
        const bibleState = bible as BibleState;

        const response = await BibleApi.getChapters({
            bibleId: bibleState.selectedBible.bibleInfo?.id ?? "",
            bookId: book.id,
        });

        dispatch(setSelectedBook({ selectedBook: book }));

        dispatch(
            setChapters({
                chapters: response.chapters,
            })
        );
    }
);

export const getChapterInfo = createAsyncThunk(
    "@bible/getChapterInfo",
    async (
        { chapterId, bibleId }: { chapterId: string; bibleId?: string },
        { getState }
    ) => {
        const { bible } = getState() as any;
        const { selectedBible } = bible as BibleState;

        const response = await BibleApi.getChapterInfo({
            bibleId: selectedBible.bibleInfo?.id ?? bibleId ?? "",
            chapterId,
        });

        return response;
    }
);

const initialState: BibleState = {
    biblesList: [],
    selectedBible: {
        bibleInfo: null,
        books: [],
        selectedBook: null,
        selectedChapterInfo: null,
        chapters: [],
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
        setSelectedBook(state, { payload }) {
            const { selectedBook } = payload;

            return {
                ...state,
                selectedBible: {
                    ...state.selectedBible,
                    selectedBook,
                },
            };
        },
        setChapters(state, { payload }) {
            const { chapters } = payload;

            return {
                ...state,
                selectedBible: {
                    ...state.selectedBible,
                    chapters,
                },
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
        addCase(getChapterInfo.fulfilled, (state, { payload }) => {
            state.selectedBible.selectedChapterInfo = payload;
        });
    },
});

export const {
    filterBibleListByNameOrId,
    setLanguagesAvailableFromBibleList,
    selectLanguage,
    filterLanguageByNameOrId,
    clearSelectedLanguage,
    setSelectedBook,
    setChapters,
} = BibleSlice.actions;

export default BibleSlice.reducer;
