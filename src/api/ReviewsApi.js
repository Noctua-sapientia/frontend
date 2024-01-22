import swal from 'sweetalert';
class ReviewsApi{
    static API_BASE_URL = "/api/v1/reviews";
    
    static requestHeaders(accessToken) {
        return {  'Content-Type': 'application/json',
                  'Authorization': accessToken
              };
      }
  

    static objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
      }

       static async getReviews(filters, type,accessToken) {

        const headers = this.requestHeaders(accessToken);
        const queryString = ReviewsApi.objToQueryString(filters);
        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"?"+queryString, {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);
        if (! response.ok) {
            if (response.status === 404) {
                return {};
              } else {
                throw new Error("Response not valid: " + response.status);
              }
        }

        return response.json();

    }

    static async getNumberReviews(type,filters,accessToken){
        const headers = this.requestHeaders(accessToken);
        const queryString = ReviewsApi.objToQueryString(filters);
        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"/count?"+queryString, {
            method: 'GET',
            headers: headers
        });
        const response = await fetch(request);
        if (! response.ok) {
            throw Error("Response not valid" + response.status);
        }
        return response.json();
    }

    static async updateReview(reviewId, reviewData, type,accessToken){
        const headers = this.requestHeaders(accessToken);
        const body = JSON.stringify(reviewData);

        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type+"/" + reviewId, {
            method: 'PUT',
            headers: headers,
            body: body
        });

        const response = await fetch(request);
        if (!response.ok) {
            if (response.status === 403) {
                swal("Error","No se ha podido editar la valoración. Recibirá un correo con más detalles");
            }else{
                throw Error("Response not valid: " + response.status);
            }
            
        }

        return response.json();
    }

    static async createReview(reviewData, type,accessToken){
        const headers = this.requestHeaders(accessToken);
        const body = JSON.stringify(reviewData);
        const request = new Request(ReviewsApi.API_BASE_URL + "/"+type, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const response = await fetch(request);
        console.log(response);
        if (!response.ok) {
            if (response.status === 409) {
              swal("Error","No puede añadir una valoración ya que ya hay una existente");
            }else if (response.status === 403) {
                swal("Error","No se ha podido crear la valoración. Recibirá un correo con más detalles");
            }else{
                throw Error("Response not valid: " + response.status);
            }
          } else {
            return response.json();
          }
    }

    static async deleteReviewById(reviewId, type,accessToken){
        const headers = this.requestHeaders(accessToken);
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