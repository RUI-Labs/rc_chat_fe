<template>
    
    <div class="w-full flex justify-end items-center">
        <div v-if="noStamp" class="">
            <div class="space-y-4 justify-end items-end flex-col">
                <div>
                    <div class="flex justify-center items-center bg-yellow-400/20 text-yellow-700 p-2 rounded-full">
                        <iconify-icon icon="ic:round-warning"></iconify-icon>
                        &nbsp;
                        <div>You don't have a stamp!</div>
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <NewStamper @update="updateStamp()">
                        <button class="text-white bg-blue-500 rounded-xl px-8 py-4 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:ring-8 hover:ring-offset-4 duration-300 active:scale-90 text-xl">Create my Stamp (Free)</button>
                    </NewStamper>
                </div>
            </div>
        </div>

        <template v-else>
            <div>
                <div class="text-right p-4">
                    <p class="mb-4">Wallet</p>
                    <div class="flex justify-end items-center space-x-4">
                        <p class="text-xl font-brand font-bold">{{ address?.substr(0,6) }}...{{ address?.substr(-4) }}</p>
                        <Button @click="disconnectWallet()" variant="outline" class="text-sm p-0 px-2">Disconnect</Button>
                    </div>
                </div>
                <!-- <StampCircle :diameter="100" address="0xcB35ed9B8a830fA472931cc63a62793910c59270" name="jesse"></StampCircle> -->
            </div>
        </template>

    </div>
    
</template>


<script setup>

    import { computed, markRaw, onMounted, ref, watch } from "vue";
    import { reconnect, getAccount, watchConnections, disconnect } from "@wagmi/core";
    import { config } from "@/wagmiConfig";

    const noStamp = ref(true);

    import NewStamper from "@/components/NewStamper.vue";
    import StampCircle from "@/components/StampCircle.vue";
    import {Button} from "@/components/ui/button";

    const address = ref();

    const updateStamp = () => {
        address.value = (getAccount(config))?.address;
        noStamp.value = (getAccount(config))?.address ? false : true;
    };

    const disconnectWallet = async () => {
        await disconnect(config);
        updateStamp();
    }
    

</script>