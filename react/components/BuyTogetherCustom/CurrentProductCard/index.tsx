import React from 'react'
import { useProduct } from 'vtex.product-context'
import Card from '../Card'
import { formatCurrency } from '../../../utils/formatCurrency'

const CurrentProductCard = () => {
  const { product, selectedItem } = useProduct() || {}

  const getItem = () => {
    const item = selectedItem ?? product?.items?.[0]
    return item
  }

  const getSeller = () => {
    const item = getItem()
    const defaultSeller = item?.sellers?.find((seller: any) => seller.sellerDefault)
    if (!defaultSeller) return item?.sellers?.[0]
    return defaultSeller
  }

  const getCommertialOffer = () => {
    const seller = getSeller()
    return seller?.commertialOffer
  }

  const getDiscountFromProductContext = () => {
    try {
      const commertialOffer = getCommertialOffer()
      const { ListPrice: bigPrice, Price: price } = commertialOffer

      if (!bigPrice || !price) throw new Error('')

      const savingsValue = bigPrice - price
      if (savingsValue <= 0) throw new Error('')

      const discount = Math.round(savingsValue * 100 / bigPrice)

      return discount
    } catch {
      return null
    }
  }

  const getPrices = () => {
    try {
      const commertialOffer = getCommertialOffer()
      const { ListPrice: bigPrice, Price: price } = commertialOffer

      if (!bigPrice || !price) throw new Error('')

      return {bigPrice, price}
    } catch {
      return {}
    }
  }

  const getInstallmentsString = () => {
    try {
      const commertialOffer = getCommertialOffer()

      const { Installments: installments } = commertialOffer
      if(!installments?.length) throw new Error('')

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

      if(!NumberOfInstallments || !Value) throw new Error('')

      return `ou ${NumberOfInstallments}x ${formatCurrency(Value)} ${InterestRate === 0 ? 's/j' : ''}`
    } catch {
      return null
    }
  }

  const discount = getDiscountFromProductContext()
  const imageUrl = product?.items?.[0]?.images?.[0]?.imageUrl
  const brand = product.brand
  const name = product.productName
  const { bigPrice, price } = getPrices()
  const installmentsString = getInstallmentsString()

  return <Card discount={discount} imageUrl={imageUrl} brand={brand} name={name} bigPrice={bigPrice} price={price} installmentsString={installmentsString} />
}

export default CurrentProductCard