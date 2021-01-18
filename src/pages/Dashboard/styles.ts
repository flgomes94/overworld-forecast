import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  line-height: 56px;
`;
export const SubTitle = styled.h2`
  font-size: 36px;
  color: #3a3a3a;
  margin-top: 40px;
  max-width: 600px;
`;
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  display: flex;
  width: 70vw;
  input {
    width: 50vw;
    height: 8vh;
    padding: 0 2vw;
    border: 0px;
    border-radius: 5px 0px 0px 5px;
    color: #a3a3a3;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 20vw;
    height: 8vh;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;
export const Cities = styled.ul`
  margin-top: 80px;

  a {
    background: ${shade(0.01, '#ecf0f1')};
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 10vw;
      border-radius: 50px;
    }

    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #34495e;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #34495e;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
