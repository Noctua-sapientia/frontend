class OrdersApi {

    static API_BASE_URL = "/api/v1";
 
    static requestHeaders(accessToken) {
      return {  'Content-Type': 'application/json',
                'Authorization': accessToken
            };
    }

    // ------------------------ GET ------------------------------
  
    static async getAllOrders(accessToken, userType, userId) {
        const headers = this.requestHeaders(accessToken);

        let url;
        if (userType === 'Customer') {
            url = OrdersApi.API_BASE_URL + "/orders?userId=" + userId;
        } else if (userType === 'Seller') {
            url = OrdersApi.API_BASE_URL + "/orders?sellerId=" + userId;
        } else {
            throw Error("Invalid user type");
        }

        const request = new Request(
            url, 
            {
            method: 'GET',
            headers: headers
            }
        );
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Error: " + response.status + " - " + response.statusText);
        }
    
        return response.json();
        }

    
    static async getOrder(accessToken, orderId) {
        const headers = this.requestHeaders(accessToken);
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

    // ------------------------ POST ------------------------------

    static async createOrder(accessToken, order) {
        const headers = this.requestHeaders(accessToken);

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

    // ------------------------ PUT ------------------------------

    static async updateOrder(accessToken, orderId, newOrderData) {
        const headers = this.requestHeaders(accessToken);

        console.log("order in createOrder:", newOrderData);
        console.log("headers in createOrder:", headers);

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

    // ------------------------ DELETE ------------------------------

    static async deleteOrder(accessToken, orderId) {
        const headers = this.requestHeaders(accessToken);
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
    
  }
  
  export default OrdersApi;