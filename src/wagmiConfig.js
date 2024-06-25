import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, base, baseSepolia } from '@wagmi/core/chains'
import { coinbaseWallet } from 'wagmi/connectors';
 
export const config = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'Create Wagmi',
            preference: 'smartWalletOnly',
        }),
    ],
    transports: {
        [baseSepolia.id]: http(),
    },
});


// declare module 'wagmi' {
//   interface Register {
//     config: typeof config;
//   }
// }