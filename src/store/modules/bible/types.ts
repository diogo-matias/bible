export type BibleState = {
    biblesList: Bible[];
    load: {
        isGettingChapterInfo: boolean;
        isGettingBooksInfo: boolean;
        isGettingBookInfo: boolean;
        isGettingBibleList: boolean;
    };
    selectedBible: {
        bibleInfo: Bible | null;
        books: Book[];
        selectedBook: Book | null;
        chapters: Chapter[];
        selectedChapterInfo: ChapterFullInfo | null;
    };
    selectedLanguage: Language | null;
    availableLanguages?: Language[];
    filter: {
        bibleFilteredList: Bible[];
        languagesFilteredLis: Language[];
        booksFilteredList: Book[];
    };
    style: {
        fontSize: string;
    };
};

export type Bible = {
    id: string;
    dblId: string;
    name: string;
    abbreviationLocal: string;

    language: {
        id: string;
        name: string;
        nameLocal: string;
        script: string;
        scriptDirection: string;
    };
};

export type Language = {
    id: string;
    name: string;
    nameLocal: string;
    script: string;
    scriptDirection: string;
};

export type Book = {
    id: string;
    bibleId: string;
    abbreviation: string;
    name: string;
    nameLong: string;
};

export type Chapter = {
    id: string;
    bibleId: string;
    bookId: string;
    number: string;
    reference: string;
};

export type ChapterFullInfo = {
    id: string;
    bibleId: string;
    number: string;
    bookId: string;
    reference: string;
    copyright: string;
    verseCount: string;
    content: string;
};
