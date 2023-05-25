import {
    Bible,
    Book,
    Chapter,
    Language,
} from "../../../store/modules/bible/types";

export type FilterModeType = "chapter" | "book";

export type ListContentType = Book[] | Chapter[];
