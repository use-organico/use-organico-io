import React, { useState, useEffect } from "react";
import { ProductContext } from "vtex.product-context";

import style from "./styles.css";

const Seal = () => {
  const { product } = React.useContext(ProductContext) || {};
  const [sealData, setSealData] = useState<any[]>([]);
  const [sealItems, setSealItems] = useState<any[]>([]);

  const getSeal = () => {
    setSealData(product?.properties || []);
  };

  useEffect(() => {
    getSeal();
  }, [product]);

  const getSpecificationItems = () => {
    sealData.find((seal: any) => {
      if (seal.name === "u-caracteristicas") {
        setSealItems(seal.values);
      }
    });
  };

  useEffect(() => {
    getSpecificationItems();
  }, [sealData]);

  return (
    <div className={style.seal_container}>
      {sealItems.map((specification: any, index: number) => (
        <div
          key={index}
          className={style.seal_item}
        >
          <img
            className={`${style.seal_item_image} ${style.seal_item_image}_${specification}`}
            srcSet={`/arquivos/${specification
              .replace("ã", "a")
              .replace("â", "a")
              .replace("á", "a")
              .replace("ó", "o")
              .replace(" ", "-")
              .replace(" ", "-")
              .replace(" ", "-")}-new-type-product.svg`}
          />
          <span
              className={`${style.seal_item_text} ${style.seal_item_text_active}`}
            >
              {specification}
            </span>
        </div>
      ))}
    </div>
  );
};

export default Seal;
