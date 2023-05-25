import { Bible, Language } from "../../../store/modules/bible/types";

export type FilterModeType = "bible" | "language";

export type ListContentType = Bible[] | Language[];
