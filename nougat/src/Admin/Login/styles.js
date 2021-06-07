import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 500px;
  height: 500px;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  background-color: #eee9e1;
  padding: 20px 10px;
  border-radius: 10px;
  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Username = styled.div``;
export const Password = styled.div``;
export const Label = styled.label`
  font-size: 28px;
  text-align: center;
  line-height: 40px;
  margin-bottom: 20px;
  color: #474973;
`;
export const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  padding: 10px 20px;
  padding-right: 45px;
  outline: none;
  font-size: 20px;
  border: ${(props) =>
    props.notValid ? "2px solid #820933;" : "2px solid #474973;"};
  margin-bottom: 40px;
`;

export const LoginBtn = styled.div`
  font-size: 24px;
  letter-spacing: 5px;
  line-height: 40px;
  background-color: #8cabbe;
  width: 200px;
  padding: 10px;
  border-radius: 8px;
  color: #f1f9f6;
  margin-top: 20px;
  transition: transform 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
