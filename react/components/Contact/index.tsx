import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./styles.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    return axios
      .post("/api/dataentities/CT/documents", {
        name,
        email,
        telefone,
        assunto,
        mensagem,
      })
      .then(() => setSuccess(true));
  };

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setTelefone("");
      setAssunto("");
      setMensagem("");

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
        <div className={style.input_contact}>
          <label>Telefone</label>
          <input
            className={style.input_telefone}
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={({ target: { value } }) => setTelefone(value)}
            required
          ></input>
        </div>
        <div className={style.input_contact}>
          <select
            className={style.input_assunto}
            value={assunto}
            onChange={({ target: { value } }) => setAssunto(value)}
            required
          >
            <option value="">Selecione um assunto</option>
            <option value="Esclarecer uma dúvida">Esclarecer uma dúvida</option>
            <option value="Fazer uma sugestão">Fazer uma sugestão</option>
            <option value="Fazer uma reclamação">Fazer uma reclamação</option>
            <option value="Fazer um elogio">Fazer um elogio</option>
            <option value="Troca e Devolução">Troca e Devolução</option>
            <option value="Cancelamento">Cancelamento</option>
            <option value="Desistência">Desistência</option>
          </select>
        </div>
        <div className={style.input_contact}>
          <label>Escreva abaixo sua mensagem</label>
          <input
            className={style.input_mensagem}
            type="text"
            placeholder="Deixe um comentário e, caso deseje cancelar sua compra, informe o motivo do cancelamento e o número do seu pedido.*"
            value={mensagem}
            onChange={({ target: { value } }) => setMensagem(value)}
            required
          ></input>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
