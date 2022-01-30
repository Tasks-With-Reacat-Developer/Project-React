import { setHttpConfigurations } from "@mongez/http";
import cache, { EncryptedLocalStorageDriver, setCacheConfigurations } from "@mongez/cache";
import AES from "crypto-js/aes";
import { setEncryptionConfigurations } from '@mongez/encryption';

setEncryptionConfigurations({
    key: 'my-key',
    driver: AES,
});

setCacheConfigurations({
  driver: new EncryptedLocalStorageDriver(),
});

setHttpConfigurations({
  baseUrl: "https://products-m7fy.herokuapp.com/",
  setAuthorizationHeader: () => {
    if (cache.get('token')) {
      return `Bearer ${cache.get('token')}`;
    }
    return '';
  },
});