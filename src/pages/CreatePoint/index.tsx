import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiHome,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMap,
} from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container, Header, ItemsGrid, FieldGroup } from './styles';

const CreatePoint: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>
      <Form ref={formRef} onSubmit={() => {}}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <Input
            name="name"
            icon={FiHome}
            type="text"
            placeholder="Nome da entidade"
          />
          <FieldGroup>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              containerStyle={{ marginTop: 0, marginLeft: 8 }}
              name="tel"
              icon={FiPhone}
              type="text"
              placeholder="Whatsapp"
            />
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <FieldGroup>
            <Select name="uf" icon={FiMapPin} placeholder="Estado (UF)">
              <option value="0">Selecione uma UF</option>
            </Select>
            <Select
              containerStyle={{ marginTop: 0, marginLeft: 8 }}
              name="city"
              icon={FiMap}
              placeholder="Cidade"
            >
              <option value="0">Selecione uma cidade</option>
            </Select>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ItemsGrid>
            <li className="selected">
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/files/oleo.svg" alt="Óleo" />
              <span>Óleo de Cozinha</span>
            </li>
          </ItemsGrid>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
