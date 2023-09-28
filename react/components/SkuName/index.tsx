import React from "react";
import { useProduct } from 'vtex.product-context'

import styles from './styles.module.css'


const SkuName = () => {

    const { product, selectedItem } = useProduct() || {}


    const nameProduct = product?.productName;
    const nameSku = selectedItem.name;

    // console.log('nameProduct', nameProduct)

    // console.log('nameSku', (nameSku === nameProduct) ? 'Sim' : 'Não')
    

    return (
        (nameProduct != nameSku) ? <div className={styles.nameSku}>{nameSku}</div> : ''
    )

}

export default SkuName