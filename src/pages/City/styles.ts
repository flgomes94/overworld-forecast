import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  line-height: 56px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    text-decoration: none;
    color: #3a3a3a;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }
    svg {
      margin-right: 4px;
    }
  }
`;

export const CurrentWeatherInfo = styled.section`
  margin-top: 80px;
  width: 70vw;
  header {
    display: flex;
    align-items: center;

    div {
      margin-left: 24px;
      strong {
        font-size: 36px;
        color: #3a3a3a;
        display: block;
      }

      p {
        font-size: 18px;
        color: #3a3a3a;
        display: inline;

        & + p {
          display: inline;
          margin-left: 20px;
        }
      }
    }
  }

  ul {
    display: flex;

    list-style: none;
    margin-top: 40px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      & + li {
        margin-left: 40px;
      }
      img {
        width: 32px;
        height: 32px;
      }
      p {
        display: block;
        font-size: 28px;
        color: #2c3e50;
        margin-left: 10px;
      }
    }
  }
`;

export const Weathers = styled.ul`
  margin-top: 80px;
`;

export const Weather = styled.li`
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

  & + li {
    margin-top: 16px;
  }

  div {
    margin: 0 16px;
    flex: 1;
    strong {
      font-size: 20px;
      color: #3d3d4d;
      display: block;
    }
    p {
      font-size: 18px;
      color: #34495e;
      margin-top: 4px;
      display: inline;
    }
  }

  ul {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    li {
      flex: 1;
      display: flex;
      justify-content: start;

      p {
        margin-left: 5px;
        font-size: 24px;
        color: #2c3e50;
        margin-top: 4px;
        display: inline;
      }
    }
  }
  svg {
    margin-left: auto;
    color: #cbcbd6;
  }
`;
