import React from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

let emulatorsStarted = false;

export function genId(): string {
  return Math.random().toString(32);
}

export async function signIn(auth: Auth): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, `${genId()}@foo.com`, "123456");
}

export function init() {
  const firebase = initializeApp({
    projectId: "test-project",
    apiKey: "foo",
  });

  const auth = getAuth(firebase);

  if (!emulatorsStarted) {
    connectAuthEmulator(auth, "http://localhost:9099");
    emulatorsStarted = true;
  }

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
        cacheTime: 0,
      },
    },
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return { client, wrapper, firebase, auth };
}
