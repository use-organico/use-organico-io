import React, {useState, useEffect} from "react"
import styles from "./styles.module.css"

const LGPD = () => {

    const [ cookiesModal, useCookiesModal ]: any = useState();

    const acceptCookies = (event: any) => {
        
        event.preventDefault()
        const consentUpdate = [
            "consent",
            "update",
            {
                ad_storage: "granted",
                analytics_storage: "granted",
            },
        ];
        localStorage.setItem(`cookies`, "true");
        localStorage.setItem(`consent`, JSON.stringify(consentUpdate));
        verifyCookies()
    }
    
    const verifyCookies = () => {
        let cookiesLocalStorage = localStorage.getItem("cookies");
        if(cookiesLocalStorage == "true") {
            useCookiesModal(true)
        } else {
            useCookiesModal(false)
        }
    }

    useEffect(() => {
        verifyCookies()
    },[cookiesModal])

    return (
        <section className={(cookiesModal != true) ? styles.upflightCookies : styles.hiddenCookies}>
            <div className={styles.upflightCookiesCenter}>
                <div className={styles.upflightCookiesContents}>
                    <div className={styles.upflightCookiesText}>
                        <p>Utilizamos cookies para oferecer melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo. <a href="/institucional/politica-de-privacidade">Saiba mais</a>.</p>
                    </div>
                    <div className={styles.upflightCookiesAccept}>
                        <button className={styles.upflightCookiesButton} onClick={acceptCookies}>Fechar</button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default LGPD