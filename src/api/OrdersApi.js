class OrdersApi {
    static API_BASE_URL = "/api/v1";
  
    static requestHeaders() {
      return {}
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

}
  
  export default OrdersApi;