import React from "react";
import { Title } from "../Headers/style";
import * as c from "./style";
export default function ResumoItem({ title, Icon }) {
  return (
    <>
      <c.Container>
        <c.Header>
          <c.HeaderTitle>{title}</c.HeaderTitle>
          <Icon />
        </c.Header>
        <c.Total>100kz</c.Total>
      </c.Container>
    </>
  );
}
