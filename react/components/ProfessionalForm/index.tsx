import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "./styles.css" ;

const ProfessionalForm = () => {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [registerType, setRegisterType] = useState(""),
    [registerNumber, setRegisterNumber] = useState(""),
    [specialty, setSpecialty] = useState(""),
    [cpf, setCpf] = useState(""),
    [birthDate, setBirthDate] = useState(""),
    [officeStreet, setOfficeStreet] = useState(""),
    [officeNumber, setOfficeNumber] = useState(""),
    [officeComplement, setOfficeComplement] = useState(""),
    [officeNeighborhood, setOfficeNeighborhood] = useState(""),
    [officeCity, setOfficeCity] = useState(""),
    [officeState, setOfficeState] = useState(""),
    [officeZipCode, setOfficeZipCode] = useState(""),
    [offceDDD, setOffceDDD] = useState(""),
    [officeTelephone, setOfficeTelephone] = useState(""),
    [officeSocial, setOfficeSocial] = useState(""),
    [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    return axios
      .post("/api/dataentities/PS/documents", {
        name,
        email,
        registerType,
        registerNumber,
        specialty,
        cpf,
        birthDate,
        officeStreet,
        officeNumber,
        officeComplement,
        officeNeighborhood,
        officeCity,
        officeState,
        officeZipCode,
        offceDDD,
        officeTelephone,
        officeSocial,
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
      setName("");
      setEmail("");
      setRegisterType("");
      setRegisterNumber("");
      setSpecialty("");
      setCpf("");
      setBirthDate("");
      setOfficeStreet("");
      setOfficeNumber("");
      setOfficeComplement("");
      setOfficeNeighborhood("");
      setOfficeCity("");
      setOfficeState("");
      setOfficeZipCode("");
      setOffceDDD("");
      setOfficeTelephone("");
      setOfficeSocial("");

      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
  }, [success]);

  return success ? (
    <div
      className={`${style.container} ${style.container_ProfessionalForm_success}`}
    >
      <h6>Formulário enviado com sucesso!</h6>
    </div>
  ) : (
    <div className={style.container_ProfessionalForm}>
      <form onSubmit={submit}>
        <div className={style.content_ProfessionalForm}>
          <h3>REGISTRO</h3>
          <select
            className={style.select_registerType}
            value={registerType}
            onChange={({ target: { value } }) => setRegisterType(value)}
            required
          >
            <option value="">Tipo de Registro*</option>
            <option value="CRM">CRM</option>
            <option value="CRN">CRN</option>
            <option value="CREFITO">CREFITO</option>
            <option value="CRO">CRO</option>
            <option value="Outros">Outros</option>
          </select>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_registerNumber}
              type="number"
              placeholder="Número do Registro*"
              value={registerNumber}
              onChange={({ target: { value } }) => setRegisterNumber(value)}
              required
            ></input>
            <input
              className={style.input_specialty}
              type="text"
              placeholder="Especialidade"
              value={specialty}
              onChange={({ target: { value } }) => setSpecialty(value)}
            ></input>
          </div>
        </div>
        <div className={style.content_ProfessionalForm}>
          <h3>SEUS DADOS</h3>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_name}
              type="text"
              placeholder="Nome*"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              required
            ></input>
            <input
              className={style.input_email}
              type="email"
              placeholder="E-mail*"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              required
            ></input>
          </div>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_cpf}
              type="text"
              placeholder="CPF*"
              value={cpf}
              onChange={({ target: { value } }) => setCpf(value)}
              required
            ></input>
            <input
              className={style.input_birthDate}
              type="text"
              placeholder="Data de Nascimento*"
              value={birthDate}
              onChange={({ target: { value } }) => setBirthDate(value)}
              required
            ></input>
          </div>
        </div>
        <div className={style.content_ProfessionalForm}>
          <h3>CONSULTÓRIO</h3>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_officeStreet}
              type="text"
              placeholder="Logradouro Consultório*"
              value={officeStreet}
              onChange={({ target: { value } }) => setOfficeStreet(value)}
              required
            ></input>
            <input
              className={style.input_officeNumber}
              type="number"
              placeholder="Número Consultório*"
              value={officeNumber}
              onChange={({ target: { value } }) => setOfficeNumber(value)}
              required
            ></input>
          </div>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_officeComplement}
              type="text"
              placeholder="Complemento Consultório"
              value={officeComplement}
              onChange={({ target: { value } }) => setOfficeComplement(value)}
            ></input>
            <input
              className={style.input_officeNeighborhood}
              type="text"
              placeholder="Bairro Consultório*"
              value={officeNeighborhood}
              onChange={({ target: { value } }) => setOfficeNeighborhood(value)}
              required
            ></input>
          </div>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_officeCity}
              type="text"
              placeholder="Cidade Consultório*"
              value={officeCity}
              onChange={({ target: { value } }) => setOfficeCity(value)}
              required
            ></input>
            <select
              className={style.input_officeState}
              value={officeState}
              onChange={({ target: { value } }) => setOfficeState(value)}
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
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_officeZipCode}
              type="number"
              placeholder="CEP Consultório*"
              value={officeZipCode}
              onChange={({ target: { value } }) => setOfficeZipCode(value)}
              required
            ></input>
            <input
              className={style.input_officeDDD}
              type="number"
              placeholder="DDD Consultório*"
              value={offceDDD}
              onChange={({ target: { value } }) => setOffceDDD(value)}
              required
            ></input>
          </div>
          <div className={style.ProfessionalForm_line}>
            <input
              className={style.input_officeTelephone}
              type="number"
              placeholder="Telefone Consultório*"
              value={officeTelephone}
              onChange={({ target: { value } }) => setOfficeTelephone(value)}
              required
            ></input>
            <input
              className={style.input_officeSocial}
              type="text"
              placeholder="Redes Sociais"
              value={officeSocial}
              onChange={({ target: { value } }) => setOfficeSocial(value)}
              required
            ></input>
          </div>
          <div className={style.ProfessionalForm_line}>
            <div className={style.ProfessionalForm_checkbox}>
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
            <div className={style.ProfessionalForm_btn}>
              <div className={style.ProfessionalForm_agrad}>
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

export default ProfessionalForm;
