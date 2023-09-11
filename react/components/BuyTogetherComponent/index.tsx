import React, { useContext, useState } from "react";
import { ProductContext } from "vtex.product-context";
import { Link } from "vtex.render-runtime";
import { useIntl } from "react-intl";
import { isEmpty } from "ramda";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { formatCurrency } from "vtex.format-currency";
import { useRuntime } from "vtex.render-runtime";
import { mapCatalogItemToCart } from "vtex.add-to-cart-button";
import { Spinner } from "vtex.styleguide";

import "./BuyTogetherComponent.global.css";

function getInstallment(installments: any[] = []) {
  if (
    !installments ||
    isEmpty(
      installments.filter(
        ({ NumberOfInstallments }) => NumberOfInstallments > 1
      )
    )
  )
    return null;

  const noInterestRateInstallments = installments.filter(
    (installment) =>
      !installment?.InterestRate && installment?.NumberOfInstallments > 1
  );
  const installment = (
    isEmpty(noInterestRateInstallments)
      ? installments
      : noInterestRateInstallments
  ).reduce((previous: any, current: any) =>
    previous?.NumberOfInstallments > current?.NumberOfInstallments
      ? previous
      : current
  );

  return installment;
}

function BuyTogetherComponent({ children }: any) {
  const intl = useIntl();
  const { culture } = useRuntime();
  const { addItem } = useOrderItems();
  const { product, selectedItem, assemblyOptions } =
    useContext(ProductContext) || {};
  const { ListPrice, Price } = selectedItem?.sellers?.[0]?.commertialOffer || {
    ListPrice: 0,
    Price: 0,
  };

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [benefits] = (product as any)?.benefits || [];
  const { items } = benefits || {};
  const suggestedItems = items?.slice(-3) || [];
  const { NumberOfInstallments, Value } =
    getInstallment(
      selectedItem?.sellers?.[0]?.commertialOffer?.Installments || []
    ) || {};

  const totalPriceWithoutDiscount = selectedItems.reduce(
    (previous: number, current: any) => {
      const { ListPrice, Price } = current?.sellers?.[0]?.commertialOffer || {
        ListPrice: 0,
        Price: 0,
      };

      return previous + ListPrice - Price;
    },
    ListPrice - Price
  );
  const totalPrice = selectedItems.reduce((previous: number, current: any) => {
    const { Price } = current?.sellers?.[0]?.commertialOffer || { Price: 0 };

    return previous + Price;
  }, selectedItem?.sellers?.[0]?.commertialOffer?.Price);

  return items ? (
    <div className="buy-together">
      {children}
      <div className="buy-together-container">
        <div className="buy-together-item-buiyng">
          <div className="btg-item-buying-img">
            <img
              src={selectedItem?.images?.[0]?.imageUrl || ""}
              alt={product?.productName}
            />
          </div>
          <div className="btg-item-buying-tittle">
            <h3>
              <div className="fn productName">{product?.productName}</div>
            </h3>
          </div>
          <div className="btg-item-buying-price">
            <div className="plugin-preco">
              <div className="productPrice loaded">
                <p className="descricao-preco">
                  {ListPrice !== Price ? (
                    <em className="valor-de price-list-price db">
                      De:{" "}
                      <strong className="skuListPrice">
                        {formatCurrency({ intl, culture, value: ListPrice })}
                      </strong>
                    </em>
                  ) : null}
                  <em className="valor-por price-best-price dib">
                    Por:
                    <strong className="skuBestPrice">
                      {" "}
                      {formatCurrency({ intl, culture, value: Price })}
                    </strong>
                  </em>
                  <em className="valor-dividido price-installments dib">
                    <span>
                      <span>
                        ou
                        <label className="skuBestInstallmentNumber">
                          {" "}
                          {NumberOfInstallments}
                          <span className="x">x</span>
                        </label>{" "}
                        de
                      </span>
                      <strong>
                        <label className="skuBestInstallmentValue">
                          {" "}
                          {formatCurrency({ intl, culture, value: Value })}
                        </label>
                      </strong>
                    </span>
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="buy-together-plus-item">+</div>
        <div className="buy-together-items-to-buy">
          <ul className="items-btg pl0">
            {suggestedItems?.map((suggestedItem: any) => {
              const { benefitProduct } = suggestedItem || {};
              const { productName, linkText, items } = benefitProduct || {};
              const [item] = items || [];
              const { Price, ListPrice } =
                item?.sellers?.[0]?.commertialOffer || {};
              const selected = selectedItems.find(
                (si) => si?.itemId === item?.itemId
              );

              return (
                <Link
                  page="store.product"
                  params={{ slug: linkText }}
                  title={productName}
                  className="buy-together-item-ad"
                >
                  <li>
                    <div
                      className="product-item-btg-select"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (selected) {
                          setSelectedItems((selectedItems) =>
                            selectedItems.filter(
                              (sku) => sku.itemId !== item?.itemId
                            )
                          );
                        } else {
                          setSelectedItems((selectedItems) => [
                            ...selectedItems,
                            item,
                          ]);
                        }
                      }}
                    >
                      <div
                        className={`select-btg-item ${
                          selected ? "active-select" : ""
                        }`}
                      ></div>
                    </div>
                    <div className="product-item-btg-image">
                      <img src={item?.images[0]?.imageUrl || ""} />
                    </div>
                    <div className="product-item-btg-infos">
                      <div className="product-item-btg-infos-tittle">
                        <p>{productName}</p>
                      </div>
                      <div className="product-item-btg-infos-price">
                        {ListPrice !== Price ? (
                          <span>
                            {formatCurrency({
                              intl,
                              culture,
                              value: ListPrice,
                            })}
                          </span>
                        ) : null}
                        <p>{formatCurrency({ intl, culture, value: Price })}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="buy-together-resume">
          {!selectedItems?.length ? (
            <>
              <p>
                Selecione o produto desejado ao lado para adicionar à sua compra
              </p>
              <button className="add-products-to-cart-btg">Adicionar</button>
            </>
          ) : (
            <>
              {totalPriceWithoutDiscount ? (
                <h3>
                  Leve os{" "}
                  <span className="product-btg-qty-items">
                    {selectedItems?.length + 1}
                  </span>{" "}
                  produtos e economize{" "}
                  <span className="product-btg-items-discount">
                    {formatCurrency({
                      intl,
                      culture,
                      value: totalPriceWithoutDiscount,
                    })}
                  </span>
                </h3>
              ) : (
                <h3>Combo perfeito</h3>
              )}
              <div className="product-btg-resume">
                {totalPriceWithoutDiscount !== 0 ? (
                  <span className="product-btg-listPrice">
                    De:{" "}
                    {formatCurrency({
                      intl,
                      culture,
                      value: totalPrice + totalPriceWithoutDiscount,
                    })}
                  </span>
                ) : null}
                <p className="product-btg-sellingPrice">
                  Por: {formatCurrency({ intl, culture, value: totalPrice })}
                </p>
              </div>
              <button
                className="add-products-to-cart-btg active-button-add"
                onClick={async () => {
                  const productsToAdd = mapCatalogItemToCart({
                    product,
                    selectedItem,
                    selectedQuantity: 1,
                    selectedSeller: selectedItem?.sellers[0],
                    assemblyOptions,
                  });

                  setLoading(true);

                  await addItem([
                    ...productsToAdd,
                    ...selectedItems.map((itemToCart) => ({
                      id: itemToCart?.itemId,
                      seller: 1,
                      quantity: 1,
                    })),
                  ]);

                  setLoading(false);
                }}
              >
                {loading ? (
                  <Spinner size={15} />
                ) : (
                  `Adicionar os ${selectedItems?.length + 1} produtos`
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default BuyTogetherComponent;
