import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.inputPlaceholder};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.primary};
      border-color: ${props.theme.colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.primary};
    `}

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: ${props => props.theme.colors.background};
      border-radius: 8px;
      border: 0;
      font-size: 16px;
      color: ${props => props.theme.colors.text};
    }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
    color: ${props => props.theme.colors.error};
  }

  span {
    background: ${props => props.theme.colors.error};
    color: #fff;

    &::before {
      border-color: ${props => props.theme.colors.error} transparent;
    }
  }
`;
