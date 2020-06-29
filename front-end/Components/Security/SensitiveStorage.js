import SInfo from "react-native-sensitive-info";
import { Component } from "react";

const setSensitiveStorage = async () => {
  SInfo.setItem("key1", "value1", {
    sharedPreferencesName: "mySharedPrefs",
    keychainService: "myKechain",
  });
};

class SensitiveStorage extends Component(){
    setSensitiveData(key, value) {
        SInfo.setItem(key, value, {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
          }); 
    }

    getSensitiveData(key, value){
        SInfo.setItem(key, value, {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain"
        })
    }

}

export default function SensitiveStorage();