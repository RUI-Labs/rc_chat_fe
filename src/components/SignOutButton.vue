<template>
  <Button variant="outline" class="bg-stone-600 border-stone-500 text-stone-50" @click="logoutSIWE()">Sign Out</Button>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { config } from "@/wagmiConfig";
import { disconnect } from "@wagmi/core";

const logoutSIWE = async () => {
  let response = await fetch("/api/logout.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let data = await response.json();
    console.log(data);
    disconnect(config);
    window.location.reload();
  }
};
</script>
