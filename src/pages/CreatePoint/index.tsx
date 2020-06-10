import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  FiArrowLeft,
  FiHome,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMap,
} from 'react-icons/fi';

import axios from 'axios';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Map from '../../components/Map';
import { useToast } from '../../hooks/toast';

import { Container, Header, ItemsGrid, FieldGroup } from './styles';
import api from '../../services/api';

interface Item {
  id: string;
  title: string;
  image_url: string;
}

interface IibgeUFResponse {
  sigla: string;
}

interface IibgeCityResponse {
  nome: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const CreatePoint: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('0');
  const [cities, setCities] = useState<string[]>([]);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IibgeUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUF === '0') {
      return;
    }
    axios
      .get<IibgeCityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUF]);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;

      setSelectedUF(uf);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        console.log(data);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon do Template!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>

      <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Map />
          <FieldGroup style={{ marginTop: 10 }}>
            <Select
              onChange={handleSelectUf}
              value={selectedUF}
              name="uf"
              icon={FiMapPin}
              placeholder="Estado (UF)"
            >
              <option value="0">Selecione uma UF</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </Select>
            <Select
              containerStyle={{ marginTop: 0, marginLeft: 8 }}
              name="city"
              icon={FiMap}
              placeholder="Cidade"
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ItemsGrid>
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>Óleo de Cozinha</span>
              </li>
            ))}
          </ItemsGrid>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
