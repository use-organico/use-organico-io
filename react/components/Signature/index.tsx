import React from "react";
import { useProduct } from 'vtex.product-context'


// import styles from './styles.module.css'

const Signature = () => {

    const {product, selectedItem} = useProduct()

    console.log('assemblyOptions', selectedItem, product)

    return <></>
}

export default Signature