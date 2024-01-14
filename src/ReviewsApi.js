class ReviewsApi{
    static API_BASE_URL = "/api/v1/reviews";
    
    static requestHeaders(){
        return {}
    }

    static objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
      }

    static async getAllBookReviews(filters){
      
        const headers = this.requestHeaders();
        const queryString = ReviewsApi.objToQueryString(filters)
        
        const request = new Request(ReviewsApi.API_BASE_URL + "/books?"+queryString, {
            method: 'GET',
            headers: headers
        });
       
        
        const response = await fetch(request);
        if (! response.ok) {
            throw Error("Response not valid" + response.status);
        }
        

        return response.json();

    }

    static async getAllSellerReviews(filters){
        const headers = this.requestHeaders();
        const queryString = ReviewsApi.objToQueryString(filters);
        const request = new Request(ReviewsApi.API_BASE_URL + "/sellers?"+queryString, {
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

export default ReviewsApi;