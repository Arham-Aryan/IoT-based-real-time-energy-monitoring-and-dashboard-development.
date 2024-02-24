const { default: axios } = require("axios");
const { TuyaContext } = require("@tuya/tuya-connector-nodejs");

const config = {
  /* Service address */
  host: "https://openapi.tuyaeu.com",
  /* Access Id */
  accessKey: "qjrkm7qjuperkwx4vut8",
  /* Access Secret */
  secretKey: "654e90b1eb454379bd8f41e8229fd30c",
  /* Interface example device_id */
  deviceId: "bfbf4fb6bbbca471b32g7r",

  // uid: "eu1699279714684tpASK",
  uid: "eu1701101248186jp9Eu",
};

let tuya = null;

const initTuya = () => {
  tuya = new TuyaContext({
    baseUrl: config.host,
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    rpc: axios,
  });
};

async function getDeviceInfo(url, params = {}) {
  if (!tuya) {
    throw Error(`NO`);
  }

  const data = await tuya.request({
    method: "GET",
    path: url,
    query: params,
    body: {},
  });

  if (!data || !data.success) {
    // throw Error(`Request highway Failed: ${data.msg}`);
    return null;
  }
  return data;
}

module.exports = {
  config,
  getDeviceInfo,
  initTuya,
};
