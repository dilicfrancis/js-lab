import { TIMEOUT_SECS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const apiRequest = async (url, payload = undefined) => {
  try {
    const request = payload
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : fetch(url);

    const res = await Promise.race([request, timeout(TIMEOUT_SECS)]);

    const resJSON = await res.json();

    if (!res.ok) throw new Error(`${resJSON.message} (${res.status})`);

    return resJSON;
  } catch (err) {
    throw err;
  }
};
