const conectar = async (urlApi, method = 'GET', body = {}, token) => {
  let errorBody;
  try {
    let options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
      options.credentials = 'include'
    }

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      options.body = JSON.stringify(body);
    }

    const resp = await fetch(urlApi, options);

    if (resp.ok) {
      // Leer una sola vez en éxito
      const datos = await resp.json();
      return datos;
    } else {
      // Leer el cuerpo UNA vez, luego intentar parsear
      const text = await resp.text();
      try {
        errorBody = JSON.parse(text);
      } catch (err) {
        errorBody = text;
      }
      console.error('Error de la solicitud:', resp.status, errorBody);
      throw new Error(`Error de la solicitud: ${resp.status} - ${typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody)}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = { conectar };
