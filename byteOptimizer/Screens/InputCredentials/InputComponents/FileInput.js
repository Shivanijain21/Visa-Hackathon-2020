import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  ChildContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#B9B9B9',
    borderWidth: 1,
    padding: 5,
  },

  Text: {
    marginHorizontal: 70,
    color: '#C4C4C4',
    marginVertical: 10,
  },
});

export default function({credentialName}) {
  return (
    <View style={styles.ChildContainer}>
      <Button
        mode="contained"
        onPress={() => {
          console.log('Enter Credential Logic');
        }}>
        Choose File
      </Button>
      <Text style={styles.Text}>{credentialName}</Text>
    </View>
  );
}
