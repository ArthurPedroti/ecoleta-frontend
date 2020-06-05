import React from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import { Container, Header, Form, ItemsGrid } from './styles';

const CreatePoint: React.FC = () => {
  return (
    <Container>
      <Header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>
    </Container>
  );
};

export default CreatePoint;
