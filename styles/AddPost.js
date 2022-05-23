import styled from 'styled-components';

export const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
`;

export const InputWrapperGuest = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: white;
    margin:15px;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width:90%;
    margin-bottom: 15px;
`;


export const InputFieldGuest = styled.TextInput`
    font-size: 15px;
    justify-content: flex-start;
    width:73%;
    height:40px;
    borderBottomColor: #ffa500;
    borderBottomWidth:1px;


`;

export const AddImage = styled.Image`
    width: 100%;
    height: 250px;
    margin-bottom: 15px;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #FF6347;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnGuest = styled.TouchableOpacity`
    justify-content: center;
    background-color: #ffa500;
    border-radius: 5px;
    margin-left:15px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: white;
`;
export const SubmitBtnTextGuest = styled.Text`
    font-size: 15px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: white;
`;

