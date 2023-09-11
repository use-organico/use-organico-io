import React from 'react'
import styles from './styles.module.css'
import { formatCurrency } from '../../../utils/formatCurrency'

interface CardType {
  discount: number | null
  imageUrl: string
  brand: string
  name: string
  bigPrice: number
  price: number
  installmentsString: string | null
}

const Card = ({name, imageUrl, discount, brand, bigPrice, price, installmentsString}: CardType) => {
  return <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt={name} className={styles.image} />
      {
        discount && <span className={styles.discount}>{discount}% off</span>
      }
    </div>

    <span className={styles.brand}>{brand}</span>

    <p className={styles.name}>{name}</p>

    <span className={styles.bigPrice}>{formatCurrency(bigPrice)}</span>
    <span className={styles.price}>{formatCurrency(price)}</span>

    <p className={styles.installments}>{installmentsString}</p>
  </div>
}

export default Card