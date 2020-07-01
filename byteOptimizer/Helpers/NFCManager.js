import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { NativeModules } from 'react-native';

function setupNFC() {
  console.log("****************-------in setupnfc func---------***************");
  NfcManager.start();
  console.log("****************-------after start---------***************");
  NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    console.log('*********tag***********\n', tag);
    console.log(tag["ndefMessage"][0].payload);
    let pay = tag["ndefMessage"][0].payload;
    let res = ""
    // pay.forEach((item) => {
    //   res += (char)item;
    // });
    console.log("printing pay::   " + pay);
    // NfcManager.setAlertMessageIOS('I got your tag!');
    NfcManager.unregisterTagEvent().catch(() => 0);
    //return tag;
  });
}

export default readTag = async () => {
  await setupNFC();
  try {
    await NfcManager.registerTagEvent();
  } catch (ex) {
    console.warn('ex', ex);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }
}


