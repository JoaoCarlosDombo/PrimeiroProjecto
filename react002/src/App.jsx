import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeContato from "./components/listaContatos";
export default function App() {
  // States
  const [contactos, setContactos] = useState({ nome: "", telefone: "" });
  const [listeContatos, setListeContatos] = useState([]);
  const [url, setUrl] = useState({ url: "" });
  const [usuarios, setUsuarios] = useState({
    nome: "",
    email: "",
    apelido: "",
    images: "",
  });

  //metodos
  function definirNome(event) {
    setContactos({ ...contactos, nome: event.target.value });
  }

  function definirTelefone(event) {
    setContactos({ ...contactos, telefone: event.target.value });
  }

  function adicionarContatos() {
    setListeContatos([...listeContatos, contactos]);
  }
  useEffect(() => {
    axios.get("http://localhost:8080/").then((response) => {
      setUsuarios(response.data.user);
      setUrl(response.data.url);
    });
  }, []);

  return (
    <>
      <h1>Minha lista de Contactos</h1>
      <hr />
      <div>
        <input type="text" onChange={definirNome} value={contactos.nome} />
      </div>
      <div>
        <input
          type="text"
          onChange={definirTelefone}
          value={contactos.telefone}
        />
      </div>
      <button onClick={adicionarContatos}>Adicionar Contactos</button>
      <hr />

      <ListeContato listeContatos={listeContatos} />

      <hr />
      <p>Nome: {usuarios.nome}</p>
      <p>Email: {usuarios.email}</p>
      <p>Apelido: {usuarios.apelido}</p>
      <img src={url + usuarios.images} alt="" width="200" />
    </>
  );
}
