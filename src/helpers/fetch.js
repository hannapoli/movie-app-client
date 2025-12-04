const conectar = async (urlApi, method = 'GET', body = {}, token) => {
  try {
    let options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      options.body = JSON.stringify(body);
    }

    const resp = await fetch(urlApi, options);

    if (resp.ok) {
      const datos = await resp.json();
      return datos;
    } else {
      throw new Error('Error de la solicitud');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = { conectar };
