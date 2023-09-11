import React, { useContext } from "react";
import { ProductContext } from "vtex.product-context";

import style from "./styles.css";

const UsePontos = () => {
  const { product } = useContext(ProductContext) || {};

  const pontos =
    product?.items?.[0]?.sellers?.[0]?.commertialOffer?.RewardValue || 0;

  return product && pontos ? (
    <>
      <div className={style.container_UsePontos}>
        <img
          src="/arquivos/logousepontos.svg"
          alt="use orgânico"
        />
        <span>USEPONTOS {pontos}</span>
      </div>
    </>
  ) : null;
};

UsePontos.defaultProps = {};

UsePontos.schema = {
  title: "Componente ver mais",
  description: "Componente ver mais",
  type: "object",
  properties: {},
};

export default UsePontos;
