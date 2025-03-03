import { SmartCaptcha } from '@yandex/smart-captcha';
import { useState } from 'react';

export const ComponentWithCaptcha = () => {
  const [token, setToken] = useState('');

  return <SmartCaptcha sitekey="ysc1_khufT5uaooJ0SJIlGd000V0Cksml2Iw3FhiqIO3We34de20b" onSuccess={setToken} />;
};
