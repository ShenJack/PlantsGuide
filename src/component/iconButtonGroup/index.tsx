import styled from "styled-components";

export const IconButtonGroup = styled.div`
    color: black;
    background: whitesmoke;
    box-shadow: grey 0 0 2px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms;

    bottom: 40px;
    left: 20px;
    position: absolute;
    z-index: 2;

    flex-direction: column;
    padding: 2px;
    border-radius: 20px;

    & > div:nth-child(2){
      margin-top: 5px;
    }

    & > div:nth-child(1){
      margin-bottom: 5px;
    }
`;
