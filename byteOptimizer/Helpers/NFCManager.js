import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { NativeModules } from 'react-native';

function setupNFC() {
  //console.log("****************-------in setupnfc func---------***************");
  NfcManager.start();
  //console.log("****************-------after start---------***************");
  NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    //console.log('*********tag***********\n', tag);
    //console.log(tag["ndefMessage"][0].payload);
    let pay = tag["ndefMessage"][0].payload;
    pay = pay.slice(3, pay.length)
    pay = String.fromCharCode(...pay)
    console.log("********-------START-------*********\n")
    console.log(pay + "\n")
    console.log("********-------END---------*********\n")
    console.log("Printing pay::   " + pay);
    NfcManager.setAlertMessageIOS('I got your tag!');
    NfcManager.unregisterTagEvent().catch(() => 0);
    return pay;
  });
}

export default readTag = async () => {
  // await setupNFC();
  try {
    console.log("from register tag");
    let data = await NfcManager.registerTagEvent();
    console.log("********-------data---------*********\n")
    console.log(data);
  } catch (ex) {
    console.warn('ex', ex);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }
}


