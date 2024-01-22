class BooksApi {

    static API_BASE_URL = "/api/v1/books";
  
    static requestHeaders() {
      return {
        'Content-Type' : 'application/json'
      };
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

    static async postBook(newBook) {
      const headers = {'Content-Type' : 'application/json'};
      const request = new Request('http://localhost:4002/api/v1/books', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newBook)
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
  
    static async updateBook( isbn, book) {
      const headers = {'Content-Type' : 'application/json'};
      const request = new Request(`http://localhost:4002/api/v1/books/${isbn}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(book)
      });

      const response = await fetch(request);
      if(!response.ok){
        throw Error("Response not valid: " + response.status);
      }
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
  