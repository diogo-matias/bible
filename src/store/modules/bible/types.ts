export type BibleState = {
    biblesList: Bible[];
    selectedBible: {
        bibleInfo: Bible | null;
        books: Book[];
        selectedBook: Book | null;
        selectedBookInfo: null;
        chapters: Chapter[];
        selectedChapterInfo: Chapter | null;
    };
    selectedLanguage: Language | null;
    availableLanguages?: Language[];
    bibleFilter: {
        bibleFilteredList: Bible[];
        languagesFilteredLis: Language[];
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
