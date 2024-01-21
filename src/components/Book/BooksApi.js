class BooksApi {

    static API_BASE_URL = "/api/v1/books";
  
    static requestHeaders() {
      return {};
    }
  
    static async getAllBooks() {
      const headers = this.requestHeaders();
      const request = new Request(BooksApi.API_BASE_URL, {
        method: 'GET',
        headers: headers
      });
  
      const response = await fetch(request);
  
      if (!response.ok) {
        throw Error("Response not valid" + response.status);
      }
      console.log(response);
      return response.json();
    }
  
    static async getBooksByISBN(isbn) {
      const headers = this.requestHeaders();
      const request = new Request(BooksApi.API_BASE_URL+"/"+isbn, {
        method: 'GET',
        headers: headers
      });
    
      try {
        const response = await fetch(request);
    
        if (!response.ok) {
          throw Error(`Response not valid: ${response.status}`);
        }
    
        return response.json();
      } catch (error) {
        throw Error(`Network error: ${error.message}`);
      }
    }
  }
  
  export default BooksApi;
  