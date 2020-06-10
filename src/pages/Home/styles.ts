import styled from 'styled-components';

import background from '../../assets/home-background.svg';

export const Container = styled.div`
  height: 100vh;
  position: relative;
  margin: 0 auto;
  max-width: 1920px;

  > img {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -99;
  }

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
  /* background: url(${background}) no-repeat 400px bottom; */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Header = styled.div`
  margin: 48px 0 0;

  @media (max-width: 900px) {
    margin: 48px auto 0;
  }
`;

export const Main = styled.div`
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    align-items: center;

    h1 {
      font-size: 42px;
    }

    p {
      font-size: 24px;
    }
  }

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.secondary};
  }

  p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }

  a {
    width: 100%;
    max-width: 360px;
    height: 72px;
    background: ${props => props.theme.colors.primary};
    border-radius: 8px;
    text-decoration: none;

    display: flex;
    align-items: center;
    overflow: hidden;

    margin-top: 40px;

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 72px;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      svg {
        color: #fff;
        width: 20px;
        height: 20px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: #fff;
    }

    &:hover {
      background: #2fb86e;
    }
  }
`;
