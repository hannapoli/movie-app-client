const conectar = async (urlApi, method='GET', body={}, token) => {
    try {
      let options;

      if(method =='POST' || method =='PUT'){
        options = {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        }
      }
      const resp = await fetch(urlApi, options);

      if (resp.ok) {
        const datos = await resp.json();
        return datos;
      } else {
        throw  new Error('Error de la solicitud');
      }
    } catch (error) {
        console.log(error);
      throw (error);
    }
};

module.exports = { conectar };
