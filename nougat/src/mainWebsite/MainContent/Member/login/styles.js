import styled from "styled-components";

export const Email = styled.div``;
export const Create = styled.div``;
export const Existing = styled.div``;
export const SocialMedia = styled.div``;
export const Container = styled.div`
  & * {
    opacity: ${(props) => (props.isLoading ? 0.7 : 1)};
  }
`;
