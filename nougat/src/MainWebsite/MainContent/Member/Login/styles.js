import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 100px auto;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 400px;
  max-width: 1016px;
  min-height: 500px;
  max-height: 900px;
  padding: 20px 100px;
  & > * {
    opacity: ${(props) => (props.isLoading ? 0.7 : 1)};
    padding: 15px 30px 15px 0;
    flex-basis: 50%;
  }
`;

export const Email = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  min-width: 400px;
  margin-top: 180px;
  padding: 10px 0;
  & * {
    font-family: chalk;
  }
  position: relative;
`;

const BtnStyle = styled.div`
  width: 50%;
  text-align: center;
  margin-top: 30px;
  padding-left: 20px;
  font-size: 45px;
  letter-spacing: 20px;
  line-height: 50px;
  border: 5px solid #f5f5f5;
  font-weight: 700;
  font-family: lotus;
  &:hover {
    font-size: 50px;
    color: #b2777c;
    cursor: pointer;
  }
`;

export const Create = styled(BtnStyle)`
  color: ${(props) => (props.selected ? "#b2777c" : "#99a4ad")};
`;

export const Existing = styled(BtnStyle)`
  color: ${(props) => (props.selected ? "#b2777c" : "#99a4ad")};
`;

export const BtnContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  /* margin: 0 auto; */
  width: 100%;
  top: -120px;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 170px;
  padding: 10px 0px;
  min-width: 400px;
  border-bottom: thick double #9d858d;
`;
