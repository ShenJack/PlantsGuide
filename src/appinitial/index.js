import {testLocalServer} from "../api/util";
import {getHealthCheckUrl, getServer, setServer} from "../api/url";
// import {Message} from "../components/Message";

async function initializeDevserver() {
  if (process.env.NODE_ENV === "development") {
    try {
      let result = await testLocalServer(getHealthCheckUrl());
    } catch (e) {
      // Message.notice("Switch to remote server");
      console.log(process.env.SERVER_URL);
      setServer(process.env.SERVER_URL);
    }
  }
}

export async function appInitialize() {
  await initializeDevserver();
  // await initialScreenStore();
}
