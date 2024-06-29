<template>
  <div>
    <p>Proxy: {{ proxyAddress }}</p>

    <button class="border p-2 px-4 rounded-xl" @click="connectCoinbase()">Connect Coinbase</button>

    <form>
        <input v-model="password" type="password" placeholder="enter your password" />
    </form>

    <button @click="generateProxyWallet()">Generate new proxy</button>

    <button @click="restoreProxyWallet()">Restore</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { signMessage } from "@wagmi/core";

import { connect, reconnect, getAccount, disconnect, getConnectors, watchConnections } from "@wagmi/core";
import { config } from "../wagmiConfig";

import { coinbaseWallet } from "@wagmi/connectors";

import { createWalletClient, http } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { mainnet } from "viem/chains";
// import { generatePrivateKey } from 'viem/accounts'

const proxyAddress = ref();
const password = ref();

const emit = defineEmits(["init"]);

const connectCoinbase = async () => {
  try {
    await connect(config, {
      connector: coinbaseWallet({
        appName: "Ruilabs",
        preference: "smartWalletOnly",
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

const restoreProxyWallet = async () => {
    const encryptedDataJson = localStorage.getItem("proxyAccount");
    const {ciphertext, iv, salt} = JSON.parse(encryptedDataJson);
    
    console.log(ciphertext, iv, salt);
    // Function to derive an AES key from a password, similar to the encryption phase
const deriveKeyFromPassword = async (password, salt) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
};

// Function to decrypt ciphertext using AES-GCM with a derived key from a password
const decryptSymmetric = async (ciphertext, password, iv, salt) => {
    // Convert base64 encoded values back to binary format
    const binaryCiphertext = Buffer.from(ciphertext, 'base64');
    const binaryIv = Buffer.from(iv, 'base64');
    const binarySalt = Buffer.from(salt, 'base64');

    // Derive the key using the password and salt
    const key = await deriveKeyFromPassword(password, binarySalt);

    // Decrypt the ciphertext
    const decryptedPlaintext = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: binaryIv
        },
        key,
        binaryCiphertext
    );

    // Convert the plaintext from a binary buffer to a string
    return new TextDecoder().decode(decryptedPlaintext);
};

// // Example usage
// (async () => {
//     const password = 'your-strong-password';
//     const ciphertext = 'your-ciphertext-here';
//     const iv = 'your-iv-here';
//     const salt = 'your-salt-here';
    
//     try {
//         const plaintext = await decryptSymmetric(ciphertext, password, iv, salt);
//         console.log('Decrypted text:', plaintext);
//     } catch (error) {
//         console.error('Decryption failed:', error);
//     }
// })();

const privateKey = await decryptSymmetric(ciphertext, password.value, iv, salt);

    const account = privateKeyToAccount(privateKey);

    const client = createWalletClient({
        account,
        chain: mainnet,
        transport: http(),
    });

    proxyAddress.value = client.account.address;

    emit("init", client);
}

const generateProxyWallet = async () => {
  const privateKey = generatePrivateKey();
  
//   let enc = new TextEncoder();
//   let encoded_message = enc.encode(privateKey)

//   console.log(encoded_message);

// Function to derive an AES key from a password
const deriveKeyFromPassword = async (password, salt) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
};

// Function to encrypt plaintext using AES-GCM with a derived key from a password
const encryptSymmetric = async (plaintext, password) => {
    // Generate a random salt for key derivation
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Derive a key from the password
    const key = await deriveKeyFromPassword(password, salt);

    // Create a random 96-bit initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encode the plaintext to a format that can be encrypted
    const encodedPlaintext = new TextEncoder().encode(plaintext);

    // Encrypt the plaintext with the derived key
    const ciphertext = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encodedPlaintext
    );

    // Return the encrypted data, IV, and salt, all encoded in base64
    return {
        ciphertext: Buffer.from(ciphertext).toString('base64'),
        iv: Buffer.from(iv).toString('base64'),
        salt: Buffer.from(salt).toString('base64')
    };
};

//   const encryptSymmetric = async (plaintext, key) => {
//   // create a random 96-bit initialization vector (IV)
//   const iv = crypto.getRandomValues(new Uint8Array(12));

//   // encode the text you want to encrypt
//   const encodedPlaintext = new TextEncoder().encode(plaintext);

//   // prepare the secret key for encryption
//   const secretKey = await crypto.subtle.importKey('raw', Buffer.from(key, 'base64'), {
//       name: 'AES-GCM',
//       length: 256
//   }, true, ['encrypt', 'decrypt']);

//   // encrypt the text with the secret key
//   const ciphertext = await crypto.subtle.encrypt({
//       name: 'AES-GCM',
//       iv
//   }, secretKey, encodedPlaintext);
  
//   // return the encrypted text "ciphertext" and the IV
//   // encoded in base64
//   return ({
//       ciphertext: Buffer.from(ciphertext).toString('base64'),
//       iv: Buffer.from(iv).toString('base64')
//   });
// }

// some plaintext you want to encrypt
// const plaintext = 'The quick brown fox jumps over the lazy dog';

// create or bring your own base64-encoded encryption key
// const key = Buffer.from(password.value).toString('base64');

// encryption
// const { ciphertext, iv } = await encryptSymmetric(privateKey, key);
  
//   // encrypt and store the private key
//   let encrypted_private_key = crypto.subtle.encrypt({
//       name: "RSA-OAEP",
//     },
//     key,
//     encoded_message)

const encryptedData = await encryptSymmetric(privateKey, password.value);

    localStorage.setItem("proxyAccount", JSON.stringify(
        encryptedData
    ));

  const account = privateKeyToAccount(privateKey);

  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  });

  console.log(client);

  proxyAddress.value = client.account.address;

  emit("init", client);
};
</script>
