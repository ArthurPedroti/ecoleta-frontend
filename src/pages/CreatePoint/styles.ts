import styled from 'styled-components';
import { shade, lighten, transparentize } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  form {
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 36px;
    }

    fieldset {
      margin-top: 64px;
      min-inline-size: auto;
      border: 0;
    }

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      h2 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: ${props => props.theme.colors.text};
      }
    }
    button {
      width: 260px;
      height: 56px;
      background: ${props => props.theme.colors.primary};
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      align-self: flex-end;
      margin-top: 40px;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background: ${props => shade(0.2, props.theme.colors.primary)};
      }
    }
  }
`;
export const Header = styled.div`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const ItemsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;

    span {
      flex: 1;
      margin-top: 12px;

      display: flex;
      align-items: center;
      color: ${props => props.theme.colors.secondary};
    }

    &.selected {
      background: ${props => transparentize(0.8, props.theme.colors.primary)};
      border: 2px solid ${props => props.theme.colors.primary};
    }
  }
`;
