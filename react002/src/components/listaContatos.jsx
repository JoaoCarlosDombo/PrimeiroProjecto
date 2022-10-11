import React from "react";
import { v4 as uuidv } from "uuid";
export default function ListeContato({ listeContatos }) {
  return (
    <>
      <ul>
        {listeContatos.map((contatos) => {
          return (
            <li key={uuidv}>{contatos.nome + "  " + contatos.telefone}</li>
          );
        })}
      </ul>
    </>
  );
}