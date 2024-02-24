const express = require("express");
const app = express();
const path = require("path");
const { initTuya, getDeviceInfo, config } = require("./tuya_sdk");

initTuya();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/device", async (req, res) => {
  const deviceInfo = await getDeviceInfo(`/v1.0/devices/${config.deviceId}`);
  res.render("device", { deviceInfo });
});


app.get("/logs", async (req, res) => {
  const endPoint = `/v1.0/devices/${config.deviceId}/logs`;
  const params = {
    device_id: config.deviceId,
    start_time: 0,
    end_time: new Date().getTime(),
    // start_row_key: undefined,
    size: 100,
    type: "7",
    query_type: 1,
  };

  const currentData = await getDeviceInfo(endPoint, {
    ...params,
    codes: "cur_current",
  });
  const voltageData = await getDeviceInfo(endPoint, {
    ...params,
    codes: "cur_voltage",
  });
  const powerData = await getDeviceInfo(endPoint, {
    ...params,
    codes: "cur_power",
  });

  res.render("logs", {
    amps: currentData.result.logs,
    voltage: voltageData.result.logs,
    power: powerData.result.logs,
  });
});

app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(7000, () => {
  console.log("server listening on port 7000");
});

