export type BibleState = {
    biblesList: Bible[];
    selectedBible: {
        bibleInfo: Bible | null;
        books: any[];
        selectedBook: null;
        selectedBookInfo: null;
        selectedChapterInfo: null;
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
