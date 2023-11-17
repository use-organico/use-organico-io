import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context'
import { ProductAssemblyOptions, ProductAssemblyOptionInputValues } from 'vtex.product-customizer'
import { Installments, SellingPrice } from 'vtex.product-price'
// import ModalSubscription from "./Modal";
import {ModalTrigger, Modal, ModalHeader, ModalContent} from 'vtex.modal-layout'
// import { FormattedPrice } from 'vtex.formatted-price'
// import { FormattedCurrency } from 'vtex.format-currency'
import { IOMessage } from 'vtex.native-types'
import { Button } from 'vtex.styleguide'


import styles from './styles.module.css'

const Signature = () => {

    const {selectedItem } = useProduct()
    
    const [activeSubscription, setSubscription] = useState('priceNotSubscription')

    const itemAttachments = selectedItem?.attachments;

    const priceProduct = selectedItem?.sellers[0].commertialOffer.Price

    const priceSignature = priceProduct - (priceProduct * 0.10)

    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    useEffect(() => {
        const buttonRemoveSubscription = document.querySelectorAll('.useorganico-store-0-x-productAssemblyGroupNameRow button');
        buttonRemoveSubscription.forEach(button => {
            button.addEventListener('click', () => {
                setSubscription('priceNotSubscription')
            });
        });
          
    })

    return (
        (itemAttachments[0] && activeSubscription === 'priceNotSubscription') ?
            <div className={styles.prices}>
                <div className={styles.contentPrices}>
                    {/* <span onClick={ () => setSubscription('priceSubscription') }>Rodrigo Subscription</span> */}
                    {/* <span className={styles.priceProduct}>{formatBR.format(priceProduct)}</span> */}
                    <p className={styles.priceProduct}><SellingPrice message={'{sellingPriceValue}'}/></p>
                    <p className={styles.installmentPrice}><Installments message={'ou {installmentsNumber}x {installmentValue} {hasInterest, select, true {} false { sem juros}}'} /></p>
                </div>
                <div className={styles.selectCondition}>
                    <div className={(activeSubscription === "priceNotSubscription") ? styles.selectedBuyItemActive : styles.selectedBuyItem} onClick={ () => setSubscription('priceNotSubscription') }>
                        <span className={(activeSubscription === "priceNotSubscription") ? styles.selectedBuyItemSpanActive : styles.selectedBuyItemSpan}><strong className={styles.internalSelect}></strong></span>
                        <label>Comprar</label>
                    </div>
                    <div className={styles.selectedSubscriptionItem} onClick={ () => setSubscription('priceSubscription') }>
                        <span className={styles.selectedBuyItemSpan}></span>
                        <label>Assinar</label>
                        <div className={styles.flagDiscountDisable}>Economize {formatBR.format(priceProduct - priceSignature)}</div>
                    </div>
                    <div className={styles.modalContainer}>
                        <ModalTrigger>
                            <div className={styles.modalTriggerButton}><p>Saiba mais sobre a assinatura.</p></div>
                                <Modal>
                                    <div className={styles.modalHeader}><ModalHeader iconCloseSize={20} ><h2>Assinatura Use Orgânico</h2></ModalHeader></div>
                                    <ModalContent>
                                        <h4>O que é assinatura?</h4>
                                        <p>
                                            O Plano de Assinaturas da Use Orgânico é a maneira perfeita de você se comprometer com a sua saúde e bem-estar, enquanto desfruta de produtos naturais e sustentáveis de alta qualidade. Nossa empresa, a Use Orgânico, tem o prazer de oferecer a você uma experiência única de assinatura que coloca em suas mãos uma seleção cuidadosamente curada de produtos orgânicos e ecologicamente corretos, entregues diretamente à sua porta.
                                            <br/>
                                            Com o nosso Plano de Assinaturas, você se torna parte de uma comunidade comprometida com a saúde e o meio ambiente. A cada entrega, você receberá uma variedade de produtos que vão desde cosméticos naturais, produtos para cuidados com a pele, suplementos orgânicos, até alimentos saudáveis e muito mais. Além disso, você terá a tranquilidade de saber que todos os produtos que enviamos são livres de substâncias químicas prejudiciais e são produzidos de maneira sustentável, respeitando o planeta.
                                            <br/>
                                            Nossa assinatura é flexível, permitindo que você escolha entre diferentes pacotes e frequências de entrega para atender às suas necessidades pessoais. Ao se inscrever no Plano de Assinaturas da Use Orgânico, você estará tomando uma atitude consciente em relação à sua saúde e ao meio ambiente, ao mesmo tempo em que desfruta da comodidade de receber produtos orgânicos de alta qualidade em sua porta. Junte-se a nós e faça parte da revolução orgânica que está transformando a maneira como vivemos, cuidamos de nós mesmos e do nosso planeta.
                                        </p>
                                        <h4>Quais os benefícios?</h4>
                                        <p>
                                            Os benefícios de ter um Plano de Assinaturas da Use Orgânico são numerosos e refletem nosso compromisso em oferecer a melhor experiência possível para nossos clientes. Aqui estão alguns dos principais benefícios:
                                            <br/>
                                            <ul>
                                                <li><b>Comodidade e Regularidade:</b> Com um plano de assinaturas, você não precisa se preocupar em fazer pedidos repetidos. Os produtos orgânicos de alta qualidade são entregues regularmente na sua porta de acordo com a frequência que você escolher. Isso economiza tempo e esforço.</li>
                                                <li><b>Seleção Cuidadosa:</b> Cada entrega é cuidadosamente selecionada para garantir uma variedade de produtos orgânicos, incluindo cosméticos naturais, produtos para cuidados com a pele, suplementos orgânicos, alimentos saudáveis e muito mais. Nossos especialistas escolhem a dedo os melhores itens para enriquecer sua rotina de cuidados pessoais e bem-estar.</li>
                                                <li><b>Produtos de Qualidade:</b> Todos os produtos enviados em nosso plano de assinaturas são de alta qualidade e orgânicos. Isso significa que você está recebendo produtos que são livres de substâncias químicas prejudiciais, pesticidas e conservantes artificiais, proporcionando uma experiência de uso segura e saudável.</li>
                                                <li><b>Sustentabilidade:</b> A Use Orgânico está comprometida com a sustentabilidade. Ao se inscrever em nosso plano, você está apoiando práticas de produção ambientalmente responsáveis. Os produtos orgânicos são produzidos de maneira ética e ecologicamente correta, contribuindo para a preservação do meio ambiente.</li>
                                                <li><b>Descontos Exclusivos:</b> Muitas vezes, os assinantes recebem descontos exclusivos em comparação com os clientes que compram avulso. Isso significa que você economiza dinheiro ao mesmo tempo em que cuida de si mesmo e do planeta.</li>
                                                <li><b>Personalização:</b> Oferecemos opções de planos e pacotes para atender às suas necessidades pessoais. Você pode escolher a frequência das entregas e os tipos de produtos que deseja receber, tornando o plano de assinaturas altamente personalizável.</li>
                                                <li><b>Apoio à Comunidade:</b> Ao fazer parte do Plano de Assinaturas da Use Orgânico, você se torna parte de uma comunidade dedicada à saúde e à sustentabilidade. Compartilhar essa visão com outras pessoas que valorizam os mesmos princípios pode ser uma fonte de inspiração e apoio.</li>
                                            </ul>
                                            <br/>
                                            Em resumo, um Plano de Assinaturas da Use Orgânico não é apenas uma maneira conveniente de receber produtos orgânicos de alta qualidade, mas também uma escolha que reflete seus valores pessoais de saúde, sustentabilidade e bem-estar. Junte-se a nós e comece a desfrutar de todos esses benefícios hoje.
                                        </p>
                                    </ModalContent>
                                </Modal>
                        </ModalTrigger>
                    </div>
                </div>
            </div>
        : (itemAttachments[0] && activeSubscription === 'priceSubscription') ?
            <div className={styles.prices}>
               {/* <span onClick={ () => setSubscription('priceNotSubscription') }>Rodrigo Sem Subscription</span> */}
                <div className={styles.priceSignatureContent}>
                    <p className={styles.priceProductWithSubscription}><SellingPrice message={'{sellingPriceValue}'}/></p>
                    <p className={styles.installmentPriceWithSubscription}><Installments message={'ou {installmentsNumber}x {installmentValue} {hasInterest, select, true {} false { sem juros}}'} /></p>
                    <p className={styles.titleSubscription}>Preço com assinatura:</p>
                    <span className={styles.priceSignature}>{formatBR.format(priceSignature)} <label>à vista no cartão</label></span>
                </div>
                <div className={styles.selectCondition}>
                    {/* <div className={styles.selectedBuyItem} onClick={ () => { setSubscription('priceNotSubscription')} }>
                        <span className={styles.selectedBuyItemSpan}></span>
                        <label>Comprar</label>
                    </div> */}
                    <div className={(activeSubscription === "priceSubscription") ? styles.selectedSubscriptionItemActive : styles.selectedSubscriptionItem}>
                        <span className={(activeSubscription === "priceSubscription") ? styles.selectedBuyItemSpanActive : styles.selectedBuyItemSpan}><strong className={styles.internalSelect}></strong></span>
                        <label>Assinar</label>
                        <p className={styles.flagDiscount}>Economize {formatBR.format(priceProduct - priceSignature)}</p>
                        <ProductAssemblyOptions initiallyOpened={"always"}>
                            <ProductAssemblyOptionInputValues optionsDisplay={"select"}>
                            <div className={styles.removeButton}>
                                <Button
                                size="small"
                                collapseRight
                                variation="tertiary"
                                value="Comprar sem assinatura"
                                >
                                <IOMessage
                                    id="store/product-customizer.remove-assembly"
                                />
                                </Button>
                            </div>
                            </ProductAssemblyOptionInputValues>
                        </ProductAssemblyOptions>
                    </div>
                    <div className={styles.modalContainer}>
                        <ModalTrigger>
                            <div className={styles.modalTriggerButton}><p>Saiba mais sobre a assinatura.</p></div>
                                <Modal>
                                    <div className={styles.modalHeader}><ModalHeader iconCloseSize={20} ><h2>Assinatura Use Orgânico</h2></ModalHeader></div>
                                    <ModalContent>
                                        <h4>O que é assinatura?</h4>
                                        <p>
                                            O Plano de Assinaturas da Use Orgânico é a maneira perfeita de você se comprometer com a sua saúde e bem-estar, enquanto desfruta de produtos naturais e sustentáveis de alta qualidade. Nossa empresa, a Use Orgânico, tem o prazer de oferecer a você uma experiência única de assinatura que coloca em suas mãos uma seleção cuidadosamente curada de produtos orgânicos e ecologicamente corretos, entregues diretamente à sua porta.
                                            <br/>
                                            Com o nosso Plano de Assinaturas, você se torna parte de uma comunidade comprometida com a saúde e o meio ambiente. A cada entrega, você receberá uma variedade de produtos que vão desde cosméticos naturais, produtos para cuidados com a pele, suplementos orgânicos, até alimentos saudáveis e muito mais. Além disso, você terá a tranquilidade de saber que todos os produtos que enviamos são livres de substâncias químicas prejudiciais e são produzidos de maneira sustentável, respeitando o planeta.
                                            <br/>
                                            Nossa assinatura é flexível, permitindo que você escolha entre diferentes pacotes e frequências de entrega para atender às suas necessidades pessoais. Ao se inscrever no Plano de Assinaturas da Use Orgânico, você estará tomando uma atitude consciente em relação à sua saúde e ao meio ambiente, ao mesmo tempo em que desfruta da comodidade de receber produtos orgânicos de alta qualidade em sua porta. Junte-se a nós e faça parte da revolução orgânica que está transformando a maneira como vivemos, cuidamos de nós mesmos e do nosso planeta.
                                        </p>
                                        <h4>Quais os benefícios?</h4>
                                        <p>
                                            Os benefícios de ter um Plano de Assinaturas da Use Orgânico são numerosos e refletem nosso compromisso em oferecer a melhor experiência possível para nossos clientes. Aqui estão alguns dos principais benefícios:
                                            <br/>
                                            <ul>
                                                <li><b>Comodidade e Regularidade:</b> Com um plano de assinaturas, você não precisa se preocupar em fazer pedidos repetidos. Os produtos orgânicos de alta qualidade são entregues regularmente na sua porta de acordo com a frequência que você escolher. Isso economiza tempo e esforço.</li>
                                                <li><b>Seleção Cuidadosa:</b> Cada entrega é cuidadosamente selecionada para garantir uma variedade de produtos orgânicos, incluindo cosméticos naturais, produtos para cuidados com a pele, suplementos orgânicos, alimentos saudáveis e muito mais. Nossos especialistas escolhem a dedo os melhores itens para enriquecer sua rotina de cuidados pessoais e bem-estar.</li>
                                                <li><b>Produtos de Qualidade:</b> Todos os produtos enviados em nosso plano de assinaturas são de alta qualidade e orgânicos. Isso significa que você está recebendo produtos que são livres de substâncias químicas prejudiciais, pesticidas e conservantes artificiais, proporcionando uma experiência de uso segura e saudável.</li>
                                                <li><b>Sustentabilidade:</b> A Use Orgânico está comprometida com a sustentabilidade. Ao se inscrever em nosso plano, você está apoiando práticas de produção ambientalmente responsáveis. Os produtos orgânicos são produzidos de maneira ética e ecologicamente correta, contribuindo para a preservação do meio ambiente.</li>
                                                <li><b>Descontos Exclusivos:</b> Muitas vezes, os assinantes recebem descontos exclusivos em comparação com os clientes que compram avulso. Isso significa que você economiza dinheiro ao mesmo tempo em que cuida de si mesmo e do planeta.</li>
                                                <li><b>Personalização:</b> Oferecemos opções de planos e pacotes para atender às suas necessidades pessoais. Você pode escolher a frequência das entregas e os tipos de produtos que deseja receber, tornando o plano de assinaturas altamente personalizável.</li>
                                                <li><b>Apoio à Comunidade:</b> Ao fazer parte do Plano de Assinaturas da Use Orgânico, você se torna parte de uma comunidade dedicada à saúde e à sustentabilidade. Compartilhar essa visão com outras pessoas que valorizam os mesmos princípios pode ser uma fonte de inspiração e apoio.</li>
                                            </ul>
                                            <br/>
                                            Em resumo, um Plano de Assinaturas da Use Orgânico não é apenas uma maneira conveniente de receber produtos orgânicos de alta qualidade, mas também uma escolha que reflete seus valores pessoais de saúde, sustentabilidade e bem-estar. Junte-se a nós e comece a desfrutar de todos esses benefícios hoje.
                                        </p>
                                    </ModalContent>
                                </Modal>
                        </ModalTrigger>
                    </div>
                </div>
            </div>
        : <div className={styles.pricesNormal}>
            <div className={styles.contentPrices}>
                <p className={styles.priceProduct}><SellingPrice message={'{sellingPriceValue}'}/></p>
                <p className={styles.installmentPrice}><Installments message={'ou {installmentsNumber}x {installmentValue} {hasInterest, select, true {} false { sem juros}}'} /></p>
            </div>
        </div>
    )
}

export default Signature