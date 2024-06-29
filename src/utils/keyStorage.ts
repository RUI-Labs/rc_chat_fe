// Create a client using keys returned from getKeys
const ENCODING = "binary";

export const getEnv = (): "dev" | "production" | "local" => {
  return "production";
};

export const buildLocalStorageKey = (walletAddress: string) =>
  walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress.toLowerCase()}` : "";

export const loadKeys = (walletAddress: string): Uint8Array | null => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress.toLowerCase()));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress.toLowerCase()),
    Buffer.from(keys).toString(ENCODING),
  );
};
