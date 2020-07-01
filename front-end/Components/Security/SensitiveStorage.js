import SInfo from "react-native-sensitive-info";
import React from "react";

class SensitiveStorage extends React.Component {
  setSensitiveData(key, value) {
    SInfo.setItem(key, value, {
      sharedPreferencesName: "mySharedPrefs",
      keychainService: "myKeychain",
    });
  }

  getSensitiveData(key, value) {
    SInfo.setItem(key, value, {
      sharedPreferencesName: "mySharedPrefs",
      keychainService: "myKeychain",
    });
  }
}

export default SensitiveStorage;
