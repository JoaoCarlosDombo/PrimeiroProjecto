import React from "react";
import ResumoItem from "../ResumoItem";
import * as c from "./style";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";
export default function Resumo() {
  return (
    <>
      <c.Container>
        <ResumoItem title="Entradas" Icon={FaRegArrowAltCircleUp} />
        <ResumoItem title="Saidas" Icon={FaRegArrowAltCircleDown} />
        <ResumoItem title="Total" Icon={FaDollarSign} />
      </c.Container>
    </>
  );
}
