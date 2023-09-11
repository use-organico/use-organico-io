import React from 'react'
import { useProduct } from 'vtex.product-context'
import CurrentProductCard from './CurrentProductCard'
import styles from './styles.module.css'
import SecondProductCard from './SecondProductCard'
import ResultCard from './ResultCard'
import checkoutSimulate from '../../requests/checkoutSimulate'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Spinner } from 'vtex.styleguide'
import { formatCurrency } from '../../utils/formatCurrency'

const BuyTogetherCustom = () => {
  const { orderForm } = useOrderForm()
  const { addItems } = useOrderItems()

  try {
    const { product, selectedItem } = useProduct() || {}
    const [benefits] = (product as any)?.benefits || [];
    const { items } = benefits || {};

    const buildInstallmentsString = (installmentsList: any[]) => {
      try {
        if(!installmentsList?.length) throw new Error('')
        const initialValue = installmentsList[0]?.installments?.[0]
        const installment = installmentsList.reduce(
          (finalValue, current) => {
            const [ref] = current.installments.slice(-1)
            if(ref.count > finalValue.count) return ref
            return finalValue
          },
          initialValue
        )
        
        if(!installment || installment.count === 1) throw new Error('')
        const { count, value, hasInterestRate } = installment
        if(!count || !value) throw new Error('')

        return `ou ${count}x ${formatCurrency(value / 100)} ${hasInterestRate ? '' : 's/ juros'}`
      } catch {
        return false
      }
    }

    const clickHandler = () => {
      const currentItems = [
        ...orderForm?.items,
        {
          id: mainProductId,
          quantity: 1,
          seller: "1"
        },
        {
          id: secondProductId,
          quantity: 1,
          seller: "1"
        }
      ]

      addItems(currentItems, {
        salesChannel: '1'
      })
    }

    if (!items) return <></>
    const [suggestedItem] = items
    const { benefitProduct } = suggestedItem || {};
    const { items: benefitItems } = benefitProduct || {};

    const [secondItem] = benefitItems || [];

    const mainProductId = selectedItem.itemId
    const secondProductId = secondItem.itemId

    if (!mainProductId || !secondProductId) return <></>

    const { loading, simulation } = checkoutSimulate([mainProductId, secondProductId])
    
    if (loading) return <span className="db tc c-muted-1">
      <Spinner color="currentColor" size={20} />
    </span>

    const { paymentData: { installmentOptions }, totals } = simulation
    const installmentsString = buildInstallmentsString(installmentOptions)

    const fullPrice = totals?.find((total: any) => total.id.toLowerCase() === 'items')?.value / 100
    const discounts = totals?.find((total: any) => total.id.toLowerCase() === 'discounts')?.value / 100

    if(!fullPrice || isNaN(fullPrice)) throw new Error('')

    return <div className={styles.container}>
      <span className={styles.title}>Compre Junto</span>
      <span className={styles.subtitle}>Separamos os produtos abaixo para comprar junto:</span>

      <div className={styles.body}>
        <div className={styles.productsList}>
          <CurrentProductCard />

          <span className={styles.plus}>+</span>

          <SecondProductCard />

        </div>

        <span className={styles.equals}>=</span>

        <ResultCard
          fullPrice={fullPrice}
          discounts={discounts}
          installmentsString={installmentsString}
          clickHandler={clickHandler}
        />
      </div>
    </div>
  } catch {
    return <></>
  }
}

export default BuyTogetherCustom