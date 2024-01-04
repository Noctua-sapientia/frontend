class UserApi {
    static API_BASE_URL ="/api/v1";

    static requestHearders(){
        return {}
    }

    static async getCustomer(){
        /*
        Customer: 
        {
            id : { Autogenerado// omitir
                type: Number,
                required: true
            },
            name : {
                type: String,
                required: true
            },
            surnames : {
                type: String,
                required: true
            },
            address : {
                type: String,
                required: true
            }
        
        }
        */
        const headers = this.requestHearders();
        const request = new Request(UserApi.API_BASE_URL + "/customers", {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok){
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
    static async getSeller(){
        /*
        Seller: 
        id (autogenerado): {
                type: Number,
                required: true    
            },
            name : {
                type: String,
                required: true
            },
            valoration : { iniciado a 0
                type: Number,
                required: true
            },
            orders: { iniciado a 0
                type: Number,
                required: true
            },
            reviews: { iniciado a 0
                type: Number,
                required: true
            }
        */
        const headers = this.requestHearders();
        const request = new Request(UserApi.API_BASE_URL + "/sellers", {
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