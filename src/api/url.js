let server = process.env.API_URL;
let testUrl = "http://localhost:4000/auth/login/local";
let healthCheckUrl = "http://localhost:4000/healthCheck";

// Message.notice(process.env.NODE_ENV)

export function setServer(serverSet) {
  server = serverSet;
  console.log("switch");
}

export function getServer() {
  return server;
}

export function getHealthCheckUrl() {
  return healthCheckUrl;
}

export function getTestUrl() {
  return testUrl;
}
