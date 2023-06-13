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
            getAndSetChapterInfo({
                chapterId: DEFAULT_BIBLE.chapterId,
                bibleId: DEFAULT_BIBLE.id,
            })
        );
    }
);

export const getBibleBooks = createAsyncThunk(
    "@bible/getBibleBooks",
    async (bibleId: string, { dispatch }) => {
        try {
            const { books } = await BibleApi.getBibleBooks(bibleId);

            dispatch(
                setFilteredBooksList({
                    books,
                })
            );

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
                chapters: response?.chapters,
            })
        );
    }
);

export const getAndSetChapterInfo = createAsyncThunk(
    "@bible/getAndSetChapterInfo",
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

export const nextOrPreviousChapter = createAsyncThunk(
    "@bible/goToNextChapter",
    async (order: "next" | "previous", { getState, dispatch }) => {
        const { bible } = getState() as any;
        const { selectedBible } = bible as BibleState;
        const {
            chapters,
            bibleInfo,
            selectedChapterInfo,
            books,
            selectedBook,
        } = selectedBible;

        const sum = order === "next" ? 1 : -1;

        const currentChapterIndex = chapters.findIndex(
            (item) => item.id === selectedChapterInfo?.id
        );
        const currentBookIndex = books.findIndex(
            (item) => item.id === selectedBook?.id
        );

        const newChapter = chapters[currentChapterIndex + sum];

        if (!newChapter) {
            const selectedBook = books[currentBookIndex + sum];
            dispatch(setSelectedBookThunk(selectedBook));

            const response = await BibleApi.getChapters({
                bibleId: bibleInfo?.id ?? "",
                bookId: selectedBook.id,
            });

            const responseLength = response?.chapters.length;
            const index = order === "next" ? 0 : responseLength - 1;

            dispatch(
                getAndSetChapterInfo({
                    chapterId: response?.chapters[index].id,
                    bibleId: bibleInfo?.id,
                })
            );

            return;
        }

        dispatch(
            getAndSetChapterInfo({
                chapterId: newChapter.id,
                bibleId: bibleInfo?.id,
            })
        );
    }
);

const initialState: BibleState = {
    load: {
        isGettingChapterInfo: false,
        isGettingBooksInfo: false,
        isGettingBibleList: false,
    },
    biblesList: [],
    selectedBible: {
        bibleInfo: null,
        books: [],
        selectedBook: null,
        selectedChapterInfo: null,
        chapters: [],
    },
    selectedLanguage: null,
    filter: {
        bibleFilteredList: [],
        languagesFilteredLis: [],
        booksFilteredList: [],
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
                filter: {
                    ...state.filter,
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
                filter: {
                    ...state.filter,
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
                filter: {
                    ...state.filter,
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
        filterBookByName(state, { payload }) {
            const query: string = payload.query;

            const books = state.selectedBible.books as Book[];

            const result = books.filter((item: Book) => {
                return item.name.toLowerCase().includes(query.toLowerCase());
            });

            state.filter.booksFilteredList = result;
        },
        setFilteredBooksList(state, { payload }) {
            const { books } = payload;

            state.filter.booksFilteredList = books;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(getBiblesList.pending, (state) => {
            state.load.isGettingBibleList = true;
        });
        addCase(getBiblesList.rejected, (state) => {
            state.load.isGettingBibleList = false;
        });
        addCase(getBiblesList.fulfilled, (state, { payload }) => {
            state.biblesList = payload;
            state.filter.bibleFilteredList = payload;
            state.load.isGettingBibleList = false;
        });

        addCase(getBibleBooks.pending, (state) => {
            state.load.isGettingBooksInfo = true;
        });
        addCase(getBibleBooks.rejected, (state) => {
            state.load.isGettingBooksInfo = false;
        });
        addCase(getBibleBooks.fulfilled, (state, { payload }) => {
            state.selectedBible.books = payload;
            state.load.isGettingBooksInfo = false;
        });

        addCase(setSelectedBible.fulfilled, (state, { payload }) => {
            state.selectedBible.bibleInfo = payload;
        });

        addCase(getAndSetChapterInfo.pending, (state) => {
            state.load.isGettingChapterInfo = true;
        });
        addCase(getAndSetChapterInfo.rejected, (state) => {
            state.load.isGettingChapterInfo = false;
        });
        addCase(getAndSetChapterInfo.fulfilled, (state, { payload }) => {
            state.selectedBible.selectedChapterInfo = payload;
            state.load.isGettingChapterInfo = false;
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
    filterBookByName,
    setFilteredBooksList,
} = BibleSlice.actions;

export default BibleSlice.reducer;
