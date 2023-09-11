import React from 'react'
import { useProduct } from 'vtex.product-context'
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../Card';

const SecondProductCard = () => {
  try {
    const { product } = useProduct() || {}

    const [benefits] = (product as any)?.benefits || [];
    const { items } = benefits || {};

    if (!items) return <></>
    const [suggestedItem] = items
    const { benefitProduct } = suggestedItem || {};
    const { items: benefitItems } = benefitProduct || {};

    const [item] = benefitItems || [];
    const { Price: price, ListPrice: bigPrice } = item?.sellers?.[0]?.commertialOffer || {};

    const calculateDiscount = (price: number, bigPrice: number) => {
      try {
        if (!price || !bigPrice) throw new Error('')

        const savingsValue = bigPrice - price
        if (savingsValue <= 0) throw new Error('')

        const discount = Math.round(savingsValue * 100 / bigPrice)

        return discount
      } catch {
        return null
      }
    }

    const getImageFromItem = (item: any) => {
      try {
        return item?.images?.[0]?.imageUrl
      } catch {
        return null
      }
    }

    const getInstallmentsString = (item: any) => {
      try {
        const installments = item?.sellers?.[0]?.commertialOffer?.Installments

        const [initialValue] = installments

        const bestInstallments = installments.reduce(
          (accumulator: any, currentValue: any) => {
            return (currentValue.NumberOfInstallments > accumulator.NumberOfInstallments)
              ? currentValue
              : accumulator
          },
          initialValue
        )

        const { NumberOfInstallments, Value, InterestRate } = bestInstallments

        if (!NumberOfInstallments || !Value) throw new Error('')

        return `ou ${NumberOfInstallments}x ${formatCurrency(Value)} ${InterestRate === 0 ? 's/j' : ''}`
      } catch {
        return null
      }
    }

    const discount = calculateDiscount(price, bigPrice)
    const imageUrl = getImageFromItem(item)
    const brand = product.brand
    const name = item.name
    const installmentsString = getInstallmentsString(item)


    return <Card discount={discount} imageUrl={imageUrl} brand={brand} name={name} bigPrice={bigPrice} price={price} installmentsString={installmentsString} />
  } catch {
    return <></>
  }
}

export default SecondProductCard