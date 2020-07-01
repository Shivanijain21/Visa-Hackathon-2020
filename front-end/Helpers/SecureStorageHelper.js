import { setItem, getItem } from "react-native-sensitive-info";

const setSafeData = (key, value) => {
  return setItem(key, value, {
    sharedPreferencesName: "mySharedPrefs",
    keychainService: "myKeychain",
  });
};

const getSafeData = async (key) => {
  return getItem(key, {
    sharedPreferencesName: "mySharedPrefs",
    keychainService: "myKeychain",
  });
};

export { setSafeData, getSafeData };
