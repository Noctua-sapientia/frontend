class UserApi {

    static requestHearders(accessToken){
        return {
            Authorization: accessToken
        }
    }

    static async getCustomer(accessToken,userId){

        const headers = this.requestHearders(accessToken);
        const request = new Request('http://localhost:4001/api/v1/customers/' + 1 , {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok){
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
    static async getSeller(accessToken,userId){

        const headers = this.requestHearders(accessToken);
        const request = new Request('http://localhost:4001/api/v1/sellers/' + userId , {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok){
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
}

export default UserApi