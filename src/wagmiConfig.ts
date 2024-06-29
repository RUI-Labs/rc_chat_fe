import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia, base } from "@wagmi/core/chains";
import { injected, coinbaseWallet } from "@wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "Ruilabs",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
});
