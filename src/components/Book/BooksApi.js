class BooksApi {
    static API_BASE_URL = "/api/v1";
  
    static requestHeaders() {
      return {};
    }
  
    static async getAllBooks() {
      const headers = this.requestHeaders();
      const request = new Request(BooksApi.API_BASE_URL + "/books", {
        method: 'GET',
        headers: headers
      });
  
      const response = await fetch(request);
  
      if (!response.ok) {
        throw Error("Response not valid" + response.status);
      }
  
      return response.json();
    }
  
    static async getBooksByISBN(isbn) {
      try {
        const headers = this.requestHeaders();
        const request = new Request(BooksApi.API_BASE_URL + `/books/${isbn}`, {
          method: 'GET',
          headers: headers,
        });
    
        const response = await fetch(request);
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to get book details. Status: ${response.status}, Message: ${errorData.message}`);
        }
    
        return response.json();
      } catch (error) {
        console.error('Error in getBooksByISBN:', error);
        throw error;
      }
    }
    
  }
  
  export default BooksApi;
  