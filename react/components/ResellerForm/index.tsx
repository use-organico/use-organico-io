import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./styles.css" ;

const ResellerForm = () => {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [cnpj, setCnpj] = useState(""),
    [corporateName, setCorporateName] = useState(""),
    [tradingName, setTradingName] = useState(""),
    [lineOfBusiness, setLineOfBusiness] = useState(""),
    [state, setState] = useState(""),
    [city, setCity] = useState(""),
    [telephone, setTelephone] = useState(""),
    [generalObservations, setGeneralObservations] = useState(""),
    [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    return axios
      .post("/api/dataentities/SR/documents", {
        cnpj,
        corporateName,
        tradingName,
        lineOfBusiness,
        state,
        city,
        name,
        email,
        telephone,
        generalObservations
      })
      .then(() => setSuccess(true));
  };

  useEffect(() => {
    if (success) {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
      setCnpj("");
      setCorporateName("");
      setTradingName("");
      setState("");
      setCity("");
      setName("");
      setEmail("");
      setTelephone("");

      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
  }, [success]);

  return success ? (
    <div
      className={`${style.container} ${style.container_ResellerForm_success}`}
    >
      <h6>Formulário enviado com sucesso!</h6>
    </div>
  ) : (
    <div className={style.container_ResellerForm}>
      <form onSubmit={submit}>

        <div className={style.content_ResellerForm}>
          <h3>CNPJ</h3>
          <div className={style.ResellerForm_line}>
            <input
              className={style.input_cnpj}
              type="text"
              placeholder="CNPJ da empresa*"
              value={cnpj}
              onChange={({ target: { value } }) => setCnpj(value)}
              required
            ></input>
            </div>

            <h3>Razão Social</h3>
            <div className={style.ResellerForm_line}>
              <input
                className={style.input_corporateName}
                type="text"
                placeholder="*Razão Social"
                value={corporateName}
                onChange={({ target: { value } }) => setCorporateName(value)}
                required
              ></input>
            </div>

            <h3>Fantasia</h3>
            <div className={style.ResellerForm_line}>
              <input
                className={style.input_tradingName}
                type="text"
                placeholder="*Fantasia"
                value={tradingName}
                onChange={({ target: { value } }) => setTradingName(value)}
                required
              ></input>
            </div>

            <h3>Cidade</h3>
            <div className={style.ResellerForm_line}>
            <input
              className={style.input_City}
              type="text"
              placeholder="*Cidade"
              value={city}
              onChange={({ target: { value } }) => setCity(value)}
              required
            ></input>
            </div>

            <h3>Estado</h3>
            <div className={style.ResellerForm_line}>
            <select
              className={style.input_state}
              value={state}
              onChange={({ target: { value } }) => setState(value)}
              required
            >
              <option value="">Selecione o Estado*</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
            </div>

            <h3>Ramo de atuação</h3> 
            <div className={style.ResellerForm_line}>
            <input
              className={style.input_lineOfBusiness}
              type="text"
              placeholder="*Ramo de atuação"
              value={lineOfBusiness}
              onChange={({ target: { value } }) => setLineOfBusiness(value)}
              required
            ></input>
            </div>

            <h3>Nome</h3> 
            <div className={style.ResellerForm_line}>
            <input
              className={style.input_name}
              type="text"
              placeholder="*Nome do contato"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              required
            ></input>
            </div>
            
            <h3>E-mail</h3>
            <div className={style.ResellerForm_line}>
              <input
                className={style.input_email}
                type="email"
                placeholder="*Email do contato"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                required
              ></input>
            </div>

            <h3>Telefone</h3>
            <div className={style.ResellerForm_line}>
            <input
              className={style.input_telephone}
              type="number"
              placeholder="*Telefone do contato"
              value={telephone}
              onChange={({ target: { value } }) => setTelephone(value)}
              required
            ></input>
            </div>

            <h3>Observações Gerais</h3>
            <div className={style.ResellerForm_line}>
            <textarea
              className={style.input_generalObservations}
              placeholder="*Digite aqui"
              value={generalObservations}
              onChange={({ target: { value } }) => setGeneralObservations(value)}
              required
            ></textarea>
            </div>
          </div>

        <div className={style.content_ResellerForm}>
          <div className={style.ResellerForm_line}>
            <div className={style.ResellerForm_checkbox}>
              <input type="checkbox" required></input>
              <span>
                Aceito receber promoções, novidades e dicas de acordo com as
                <a
                  href="https://www.useorganico.com.br/institucional/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Políticas de Privacidade
                </a>
              </span>
            </div>
            <div className={style.ResellerForm_btn}>
              <div className={style.ResellerForm_agrad}>
                Agradecemos o interesse em trabalhar com a
                <span>
                  Use Orgânico
                </span>
                !
              </div>
              <button type="submit">Cadastrar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResellerForm;
