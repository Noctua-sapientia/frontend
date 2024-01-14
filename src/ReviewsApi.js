class ReviewsApi{
    static API_BASE_URL = "/api/v1/reviews";
    
    static requestHeaders(){
        return {'Content-Type': 'application/json'}
    }

    static objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
      }

       static async getReviews(filters, type) {

        const headers = this.requestHeaders();
        const queryString = ReviewsApi.objToQueryString(filters);
        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"?"+queryString, {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);
        if (! response.ok) {
            throw Error("Response not valid" + response.status);
        }

        return response.json();

    }

    static async updateReview(reviewId, reviewData, type){
        const headers = this.requestHeaders();
        const body = JSON.stringify(reviewData);

        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"/" + reviewId, {
            method: 'PUT',
            headers: headers,
            body: body
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid: " + response.status);
        }

        return response.json();
    }

    static async deleteReviewById(reviewId, type){
        const headers = this.requestHeaders();
        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"/" + reviewId, {
            method: 'DELETE',
            headers: headers,
        });
         const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid: " + response.status);
        }
     
    }

}

export default ReviewsApi;