import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import { NativeModules } from 'react-native';

function setupNFC(){
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
    return tag;
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
}

export default readTag = async () => {
    setupNFC();
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }

    
