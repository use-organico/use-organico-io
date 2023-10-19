import React from "react";

import styles from './styles.module.css'


const WhatsappButton = () => {
    return (
        <div className={styles.whatsappButton}>
            <a href="https://api.whatsapp.com/send?phone=5511963354787&amp;text=Olá%2C%20Use%20Org%C3%A2nico" target="_blank">
                <img src="https://useorganico.vtexassets.com/assets/vtex.file-manager-graphql/images/5e81c0f1-418c-4056-add8-95fbec9ae175___094b7379c8d997e30654177acbaf6a90.svg" />
            </a>
        </div>
    )
}

export default WhatsappButton