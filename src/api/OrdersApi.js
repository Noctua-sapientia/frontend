class OrdersApi {
    static API_BASE_URL = "/api/v1";
  
    static requestHeaders() {
      return {'Content-Type': 'application/json',};
    }
  
    static async getAllOrders() {
        const headers = this.requestHeaders();
        const request = new Request(
            OrdersApi.API_BASE_URL + "/orders", 
            {
            method: 'GET',
            headers: headers
            }
        );
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }
    
        return response.json();
        }

    static async createOrder(order) {
        const headers = {'Content-Type': 'application/json',};
        const request = new Request(
            OrdersApi.API_BASE_URL + "/orders",
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(order)
            }
        );
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }

    static async getOrder(orderId) {
        const headers = this.requestHeaders();
        const request = new Request(
            OrdersApi.API_BASE_URL + "/orders/" + orderId, 
            {
            method: 'GET',
            headers: headers
            }
        );
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }    
        return response.json();
    }

    static async deleteOrder(orderId) {
        const headers = this.requestHeaders();
        const request = new Request(
            OrdersApi.API_BASE_URL + "/orders/" + orderId, 
            {
            method: 'DELETE',
            headers: headers
            }
        );
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }    
        return response.json();
    }

    static async updateOrder(orderId, newOrderData) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const request = new Request(
            OrdersApi.API_BASE_URL + "/orders/" + orderId, 
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(newOrderData)
            }
        );
    
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid: " + response.status);
        }    
        return response.json();
    }

    
  }
  
  export default OrdersApi;
  