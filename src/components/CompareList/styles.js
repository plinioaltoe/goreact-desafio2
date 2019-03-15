import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: now;
  justify-content: center;

  margin-top: 50px;
`
export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  margin: 0px 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
        margin-left: 5px;
      }
    }

    &:nth-child(2n -1) {
      background: #f5f5f5;
    }
  }

  button:first-child {
    width: 25px;
    margin-right: 5px;
    background: #63f5b8;
    border: 0;
    border-radius: 3px;
  }

  button:last-child {
    width: 25px;
    padding: 5px 8px;
    background: #f23;
    border: 0;
    border-radius: 3px;
  }

  .botao {
    display: flex;
    padding: 5px;
    justify-content: flex-end;
  }
`
