import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 100px auto;
  /* justify-content: space-evenly; */
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
  border-right: 1px solid #59594a;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: space-between;
  min-width: 400px;
`;

const BtnStyle = styled.div`
  width: 50%;
  text-align: center;
  margin-top: 30px;
  padding-left: 20px;
  font-size: 22px;
  letter-spacing: 20px;
  line-height: 40px;
  border: 5px solid #f5f5f5;
  color: #99a4ad;
  font-weight: 700;
  &:hover {
    font-size: 24px;
    color: #b2777c;
    cursor: pointer;
  }
`;

export const Create = styled(BtnStyle)``;

export const Existing = styled(BtnStyle)``;

export const SocialMedia = styled.div`
  border-left: 1px solid #59594a;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
