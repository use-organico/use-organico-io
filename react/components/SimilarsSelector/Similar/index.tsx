import React from "react"
import { useRuntime } from 'vtex.render-runtime'
import styles from './styles.module.css'

const Similar = ({ product }: any) => {
  const { navigate, query } = useRuntime()

  const handleClick = () => {
    let link = `/${product.linkText}/p`

    if(product.items?.[0]?.itemId) link += `?skuId=${product.items[0].itemId}`

    navigate({
      to: link,
    })
  }

  return (
    (product.items[0].sellers[0].commertialOffer.AvailableQuantity == 0) 
      ?
        <button className={`${styles.notAvailable} ${query?.skuId === product.items[0].itemId ? styles.containerSelected : ''}`} onClick={handleClick}>
          <img src={product.items[0].images[1].imageUrl} alt={product.productName} />
        </button>  
      :
        <button className={`${styles.container} ${query?.skuId === product.items[0].itemId ? styles.containerSelected : ''}`} onClick={handleClick}>
          <img src={product.items[0].images[1].imageUrl} alt={product.productName} />
        </button>
  )
}

export default Similar