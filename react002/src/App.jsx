import React, { useState, useEffect } from "react";
//import api from "./services/api";
import axios from "axios";
import ListeContato from "./components/listaContatos";
export default function App() {
  // States
  const [contactos, setContactos] = useState({ nome: "", telefone: "" });
  const [listeContatos, setListeContatos] = useState([]);
  const [url, setUrl] = useState({ url: "" });
  const [usuarios, setUsuarios] = useState({
    id_post: "",
    titulo: "",
    conteudo: "",
  });

  //metodos
  useEffect(() => {
    axios
      .get("https://primeiro-web-site.herokuapp.com/post")
      .then((response) => {
        setListeContatos(response.data);
      });
  }, []);

  return (
    <>
      <h1>Minha listar os Postes</h1>

      <ListeContato listeContatos={listeContatos} />
    </>
  );
}
