import styled from "styled-components";

export const IconButton = styled.div`
    height: 40px;
    width: 40px;
    color: black;
    background: white;
    border-radius: 50%;
    box-shadow: grey 0 0 2px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms;

    &:hover , &:active{
        background: whitesmoke;
    }
`;
