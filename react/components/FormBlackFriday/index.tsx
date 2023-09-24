import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./styles.css";

const FormBlackFriday = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    return axios
      .post("/api/dataentities/BF/documents", {
        name,
        email
      })
      .then(() => setSuccess(true));
  };

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");

      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
  }, [success]);

  return success ? (
    <div className={`${style.container} ${style.success}`}>
      <h6>Mensagem enviada com sucesso!</h6>
    </div>
  ) : (
    <div className={style.container_contact}>
        <h2>Inscreva-se</h2>
        <p>E fique por dentro das principais promoções</p>
        <form onSubmit={submit}>
            <div className={style.input_contact}>
            <label>Nome</label>
            <input
                className={style.input_name}
                type="text"
                placeholder="Nome*"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                required
            ></input>
            </div>
            <div className={style.input_contact}>
            <label>E-mail</label>
            <input
                className={style.input_email}
                type="email"
                placeholder="E-mail*"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                required
            ></input>
            </div>
            <button type="submit">Cadastrar</button>
            <label>Ao clicar em "Cadastrar", aceito receber e-mails com novidades e promoções Use Orgânico.</label>
        </form>
    </div>
  );
};

export default FormBlackFriday;
