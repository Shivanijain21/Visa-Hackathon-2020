import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import TextInput from './InputComponents/TextInput';
import FileInput from './InputComponents/FileInput';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  Bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
    marginLeft: 200,
  },
});

export default function InputTextCredentialScreen({
  navigation: {navigate},
  credentialName,
  credentialType,
  nextPageName,
}) {
  const [input, setInput] = useState('');
  const CheckTextInput = () => {
    if (credentialType == 'File') {
      navigate(nextPageName);
      return;
    }

    if (input != '') {
      navigate(nextPageName);
    } else {
      alert(`Please enter ${credentialName}`);
    }
  };
  return (
    <View style={styles.Container}>
      <View style={{marginTop: 100}}>
        {credentialType === 'File' ? (
          <FileInput credentialName={credentialName} />
        ) : (
          <TextInput credentialName={credentialName} setInput={setInput} />
        )}
      </View>

      <View style={styles.Bottom}>
        <Button
          labelStyle={{fontSize: 30}}
          color="#FDBB0A"
          onPress={() => {
            CheckTextInput();
          }}>
          Next
        </Button>
      </View>
    </View>
  );
}
