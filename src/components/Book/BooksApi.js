import { useAuth } from '../AuthContext';
class BooksApi {

    static API_BASE_URL = "/api/v1/books";
  
    static requestHeaders(accessToken) {
      return {
        'Content-Type' : 'application/json',
        Authorization : accessToken
      };
    }
  
    static async getAllBooks(accessToken) {
      const headers = this.requestHeaders(accessToken);
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

    static async postBook(accessToken, newBook) {
      const headers = this.requestHeaders(accessToken);
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
  
    static async updateBook(accessToken, userId, book) {
      const headers = this.requestHeaders(accessToken);
      const optionWithSellerIndex = book.options.findIndex(option => Number(option.seller) === Number(userId));
      const originalOptions = book.options;
      console.log(originalOptions);
      // Copia el objeto 'sellerTwoOptions' para no modificar el original directamente
      const updatedSellerTwoOptions = { ...book.options[optionWithSellerIndex] };

      // Actualiza los valores de 'prize' y 'stock' en el objeto copiado
      updatedSellerTwoOptions.prize = book.prize; // Reemplaza 'nuevoValorDePrize' con el nuevo valor
      updatedSellerTwoOptions.stock = book.stock; // Reemplaza 'nuevoValorDeStock' con el nuevo valor

      
      // Reemplaza el objeto original con el objeto modificado en el array copiado
      originalOptions[optionWithSellerIndex] = updatedSellerTwoOptions;
      console.log(originalOptions);
      const updatedBook = { ...book, options: originalOptions }
      
      const request = new Request(`http://localhost:4002/api/v1/books/${book.isbn}`, {
        method: 'PUT',
        headers: headers,

        body: JSON.stringify(updatedBook)
      });

      const response = await fetch(request);
      if(!response.ok){
        throw Error("Response not valid: " + response.status);
      }
      return response.json();
    }

    static async deleteBooksByISBN(accessToken, isbn) {
      const headers = this.requestHeaders(accessToken);
      const request = new Request(BooksApi.API_BASE_URL+"/"+isbn, {
        method: 'DELETE',
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

    static async getBooksByISBN(accessToken, isbn) {
      const headers = this.requestHeaders(accessToken);
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
  