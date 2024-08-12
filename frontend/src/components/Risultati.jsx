import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Risultati() {
  const [data, setData] = useState(null);
  const [dataBlog, setDataBlog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/authors')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);


  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(response => response.json())
      .then(json => setDataBlog(json));
  }, []);

  return (

    <>
    <div className="App">
      <h1>Dati</h1>
      {data ? (
        <div>
          <h2>Pagina: {data.page} di {data.totalPages}</h2>
          <h3>Totale Risultati: {data.totalResults}</h3>
          {data.dati.map((item, index) => (
            <div key={item._id}>
              <p>Nome: {item.nome}</p>
              <p>Cognome: {item.cognome}</p>
              <p>Email: {item.email}</p>
              <p>Data di Nascita: {new Date(item.dataNascita).toLocaleDateString()}</p>
              <p>Avatar: {item.avatar}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>




    <div className="App">
      <h1>DatiBlog</h1>
      {data ? (
        <div>
          {dataBlog.dati.map((item, index) => (
            <div key={item._id}>
              <p>Titolo: {item.title}</p>
              <p>Cover: {item.cover}</p>
              <p>Author: {item.author}</p>
              <p>Content: {item.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

    </>

  );
};
export default Risultati;
