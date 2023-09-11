import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import styles from './styles.module.css'
import Similar from './Similar'


const SimilarsSelector = () => {
  const { product } = useProduct() || {}
  const [products, setProducts] = useState([])
  if (!product) return <></>
  const { productId } = product

  useEffect(() => {
    fetch(`/api/catalog_system/pub/products/crossselling/similars/${productId}`)
      .then(response => response.json())
      .then(response => {
        return response
      })
      .then(data => data && data.length && setProducts(data))
      .catch(error => console.error(error))
  }, [product])

  return <div className={styles.container}>
    {
      products.map((product: any, index: number) => {
        return <Similar product={product} key={index} />
      })
    }
  </div>
}

export default SimilarsSelector