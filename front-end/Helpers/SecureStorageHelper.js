import { setItem, getItem } from "react-native-sensitive-info";

const setSafeData = (key, value) => {
  return setItem(key, value, {
    sharedPreferencesName: "mySharedPrefs",
    keychainService: "myKeychain",
  }).then((value) => console.log(value));
};

const getSafeData = async (key) => {
  return getItem(key, {
    sharedPreferencesName: "mySharedPrefs",
    keychainService: "myKeychain",
  });
};

export { setSafeData, getSafeData };
