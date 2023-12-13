class BooksApi {
    static API_BASE_URL ="/api/v1";

    static requestHeaders() {
        return {}
    }

    static async getAllBooks() {
        const headers = this.requestHeaders();
        const request = new Request(BooksApi.API_BASE_URL + "/books", {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok) {
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
}

export default BooksApi;