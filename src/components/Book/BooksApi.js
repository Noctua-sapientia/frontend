class BooksApi {
  
    static requestHeaders() {
      return {};
    }
  
    static async getAllBooks() {
      const headers = this.requestHeaders();
      const request = new Request('http://localhost:4002/api/v1/books', {
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
      const request = new Request(`http://localhost:4002/api/v1/books/${isbn}`, {
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
  