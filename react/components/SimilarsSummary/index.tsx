import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import styles from './styles.module.css'
// import Similar from './Similar'


const SimilarsSummary = () => {
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

  return (

    (products.length != 0) 
      ?
        <div className={styles.container}>
          <p>+ {products.length} opções</p>
        </div>
      :
        ''
  )
}

export default SimilarsSummary