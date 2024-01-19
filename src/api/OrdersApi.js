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

    
  }
  
  export default OrdersApi;
  