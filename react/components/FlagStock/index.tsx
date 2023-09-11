import React, { useContext, useEffect, useCallback, useState } from "react";
import { ProductContext } from "vtex.product-context";
import axios from "axios";

import style from "./styles.css";

const FlagStock = () => {
  const { product } = useContext(ProductContext) || {};
  const prodId = product?.productId;
  const [productQuantity, setProductQuantity] = useState<number>(10) || null;

  const getData = useCallback(async () => {
    const { data } = await axios.get(
      `/api/catalog_system/pub/products/variations/${prodId}`
    );
    setProductQuantity(data?.skus[0].availablequantity);
  }, [prodId]);

  useEffect(() => {
    getData();
  }, []);

  console.log("data", productQuantity);

  return productQuantity < 10 ? (
    <div className={style.flag_stock_container}>
      <span className={style.flag_stock_text}>restam</span>
      <span className={style.flag_stock_text}>
        <strong className={style.flag_stock_text_number}>
          {productQuantity}
        </strong>
        un
      </span>
    </div>
  ) : null;
};

export default FlagStock;
