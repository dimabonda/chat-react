import styled from "styled-components";

export const UserEditorModalWrapper = styled.div`
    width: 100%;
    padding-bottom: 40px;
`;

export const UserEditorHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 18px 16px 20px;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
`;

export const UserEditorTitle = styled.h3`
    margin: 0;
    font-weight: 500;
    font-size: 18px;
`;

export const UserEditorMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UserEditorAvatar = styled.div`

`;

export const UserEditorName = styled.h3`
    margin: 20px 0;
    
`;

export const BadgeComponent = styled.div`
    background-color: #00a6dd; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    width: 36px;
    height: 36px;
    cursor: pointer;
    img{
        height: 22px;
    }
`;

export const UserEditorList = styled.ul`
    margin: 10px 0;
    padding: 0;
    list-style-type: none;
`;

export const UserEditorListItem = styled.li`
    height: 40px;
    padding: 0 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
    img{
        height: 22px;
        margin-right: 30px;
    }
    &:hover{
        background-color: #f3f3f3;
    }
`;

export const ModalChildContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    border-radius: 10px;
    background-color: #fff;
`;

