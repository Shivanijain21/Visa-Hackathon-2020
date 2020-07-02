import React from 'react';
import {TextInput} from 'react-native';

export default function({credentialName, setInput}) {
  return (
    <TextInput
      style={{
        height: 50,
        width: 300,
        margin: 20,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
      }}
      onChangeText={text => setInput(text)}
      placeholder={`Paste ${credentialName}`}
    />
  );
}
