import React, { useState, useEffect } from "react";
import api from "./services/api";
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
  useEffect(() => {
    api.get(" http://localhost:8080/").then((response) => {
      setUsuarios(response.data.user);
      setUrl(response.data.url);
    });
  }, []);

  return (
    <>
      <h1>Minha lista de Contactos</h1>

      <ListeContato listeContatos={listeContatos} />

      <hr />
      <p>Nome: {usuarios.nome}</p>
      <p>Email: {usuarios.email}</p>
      <p>Apelido: {usuarios.apelido}</p>
      <img src={url + usuarios.images} alt="" width="200" />
    </>
  );
}
