import ScreenNames from '../Names';

export default (InputCredentialScreens = [
  {
    Name: ScreenNames.InputCredentialsStep1,
    Credential: 'Key Store File',
    Type: 'File',
    step: '1',
    NextPage: ScreenNames.InputCredentialsStep2,
  },
  {
    Name: ScreenNames.InputCredentialsStep2,
    Type: 'Text',
    Credential: 'Key Store Password',
    step: '2',
    NextPage: ScreenNames.InputCredentialsStep3,
  },
  {
    Name: ScreenNames.InputCredentialsStep3,
    Type: 'Text',
    Credential: 'Private Key Password',
    step: '3',
    NextPage: ScreenNames.SubmitPageScreen,
  },
]);
