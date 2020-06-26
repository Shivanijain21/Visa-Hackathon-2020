import ScreenNames from '../Names';

export default InputCredentialScreens = [
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
	// {
	// 	Name: ScreenNames.InputCredentialsStep4,
	// 	Credential: 'Key',
	// 	step: '4',
	// 	NextPage: ScreenNames.InputCredentialsStep5,
	// },
	// {
	// 	Name: ScreenNames.InputCredentialsStep5,
	// 	Credential: 'Client Cert. File',
	// 	step: '5',
	// 	NextPage: ScreenNames.SubmitPageScreen,
	// },
];
