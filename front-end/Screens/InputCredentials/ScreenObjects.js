import ScreenNames from '../Names';

export default InputCredentialScreens = [
	{
		Name: ScreenNames.InputCredentialsStep1,
		Credential: 'API Key',
		step: '1',
		NextPage: ScreenNames.InputCredentialsStep2,
	},
	{
		Name: ScreenNames.InputCredentialsStep2,
		Credential: 'Shared Secret',
		step: '2',
		NextPage: ScreenNames.InputCredentialsStep3,
	},
	{
		Name: ScreenNames.InputCredentialsStep3,
		Credential: 'Certificate',
		step: '3',
		NextPage: ScreenNames.InputCredentialsStep4,
	},
	{
		Name: ScreenNames.InputCredentialsStep4,
		Credential: 'Key',
		step: '4',
		NextPage: ScreenNames.InputCredentialsStep5,
	},
	{
		Name: ScreenNames.InputCredentialsStep5,
		Credential: 'Client Cert. File',
		step: '5',
		NextPage: ScreenNames.TransactionScreen,
	},
];
