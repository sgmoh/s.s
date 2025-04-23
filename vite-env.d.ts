/// <reference types="vite/client" />

// Add declaration to allow boolean for allowedHosts in ServerOptions
declare module 'vite' {
  interface ServerOptions {
    allowedHosts?: boolean | string[] | true;
  }
}