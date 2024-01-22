class UserApi {

    static requestHearders(accessToken){
        return {
            Authorization: accessToken
        }
    }

    static async getCustomer(accessToken,userId){

        const headers = this.requestHearders(accessToken);
        const request = new Request('/api/v1/customers/' + userId , {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok){
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
    static async registerCustomer(formData) {
      try {
        const headers = this.requestHearders(); // Puedes ajustar esto según tus necesidades
        const response = await fetch('/api/v1/customers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          console.log('Registro exitoso como cliente');
          // Puedes realizar alguna acción adicional después del registro
        } else {
          console.error('Error en el registro como cliente');
          // Maneja errores si es necesario
        }
      } catch (error) {
        console.error('Error en la llamada al backend', error);
        throw error; // Re-lanzar el error para que se maneje externamente si es necesario
      }
    }
    static async getSeller(accessToken,userId){

        const headers = this.requestHearders(accessToken);
        const request = new Request('/api/v1/sellers/' + userId , {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (! response.ok){
            throw Error("Response not valid" + response.status);
        }

        return response.json();
    }
    
    static async registerSeller(formData, selectedPlan) {
        try {
          const headers = this.requestHearders(); // Puedes ajustar esto según tus necesidades
          const response = await fetch('/api/v1/sellers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Registro exitoso como vendedor');
            // Puedes realizar alguna acción adicional después del registro
          } else {
            console.error('Error en el registro como vendedor');
            // Maneja errores si es necesario
          }
        } catch (error) {
          console.error('Error en la llamada al backend', error);
          throw error; // Re-lanzar el error para que se maneje externamente si es necesario
        }
      }
      
}

export default UserApi