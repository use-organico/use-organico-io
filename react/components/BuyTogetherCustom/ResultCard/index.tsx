import React from 'react'
import styles from './styles.module.css'
import { formatCurrency } from '../../../utils/formatCurrency'


const ResultCard = ({ fullPrice, discounts, installmentsString, clickHandler }: any) => {

  let total = fullPrice
  if(discounts && !isNaN(discounts)) total += discounts
  
  try {
    return <div className={styles.container}>
      <p className={styles.title}>Compre os 2 produtos por apenas</p>

      <div>
        {
          fullPrice > total && <p className={styles.fullPrice}>{formatCurrency(fullPrice)}</p>
        }

        <p className={styles.total}>{formatCurrency(total)} <span className={styles.totalString}>à vista</span></p>
        {
          installmentsString && <span className={styles.installments}>{installmentsString}</span>
        }

        <button className={styles.button} onClick={clickHandler}>
          Adicionar
        </button>
      </div>

    </div>
  } catch {
    return <></>
  }
}

export default ResultCard