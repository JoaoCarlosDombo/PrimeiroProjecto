import React from "react";
import { v4 as uuidv } from "uuid";
export default function ListeContato({ listeContatos }) {
  return (
    <>
      <ul>
        {listeContatos.map((post) => {
          return <li key={uuidv}>{post.titulo}</li>;
        })}
      </ul>
    </>
  );
}
