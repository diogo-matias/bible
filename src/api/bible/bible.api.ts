import Api from "../api";

export class _BibleApi {
    api: Api;

    constructor() {
        this.api = new Api("https://api.scripture.api.bible", {
            "api-key": "4a088a6516e8f2bcb4d589b498fa8736",
        });
    }

    async getBiblesList() {
        const response: any = await this.api.get("/v1/bibles");

        return { biblesList: response.data.data };
    }

    async getBible(bibleId: string) {
        const response = await this.api.get(`/v1/bibles/${bibleId}`);

        console.log(response);
    }

    async getBibleBooks(bibleId: string) {
        const response: any = await this.api.get(`/v1/bibles/${bibleId}/books`);

        return { books: response.data.data };
    }

    async getBookInfo({
        bibleId,
        bookId,
    }: {
        bibleId: string;
        bookId: string;
    }) {
        const response = await this.api.get(
            `/v1/bibles/${bibleId}/books/${bookId}`
        );

        console.log(response);
    }

    async getChapters({
        bibleId,
        bookId,
    }: {
        bibleId: string;
        bookId: string;
    }) {
        if (!bookId || !bibleId) {
            return null;
        }

        const response: any = await this.api.get(
            `/v1/bibles/${bibleId}/books/${bookId}/chapters`
        );

        return { chapters: response.data.data };
    }
    async getChapterInfo({
        bibleId,
        chapterId,
    }: {
        bibleId: string;
        chapterId: string;
    }) {
        const response: any = await this.api.get(
            `/v1/bibles/${bibleId}/chapters/${chapterId}`
        );

        return response.data.data;
    }
}

export const BibleApi = new _BibleApi();
