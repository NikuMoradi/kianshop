// plugins/disable-tls.js

export default defineNuxtPlugin(() => {
  if (process.server) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
});
