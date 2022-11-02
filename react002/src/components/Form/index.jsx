import React, { useState } from "react";
import * as c from "./style";

export default function Form() {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setIsExpense] = useState("");

  const handleClick = () => {
    if (!desc || !amount) {
      alert("Informe a descrição e o valor");
      return;
    } else if (amount < 1) {
      alert("o valor tem que ser positivo");
    }
  };
  return (
    <>
      <c.Container>
        <c.InputContent>
          <c.Label>Descrição</c.Label>
          <c.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
          <c.Label>Valor</c.Label>
          <c.Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </c.InputContent>
        <c.RadioGrup>
          <c.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setIsExpense(!isExpense)}
          />
          <c.Label htmlFor="rIncome">Entrada</c.Label>
          <c.Input
            type="radio"
            id="expensed"
            defaultChecked
            name="group1"
            onChange={() => setIsExpense(!isExpense)}
          />
          <c.Label htmlFor="expensed">Saída</c.Label>
        </c.RadioGrup>
        <c.Buttom onClick={handleClick}>ADICIONAR</c.Buttom>
      </c.Container>
    </>
  );
}
