<template>

    <div :class="[diameter?`w-[${diameter}px] h-[${diameter}px]`:'w-[200px] h-[200px]']" class=" border-4 border-black bg-white/50 rounded-full flex justify-center items-center pointer-events-none relative">
        
        <div class="w-full h-full flex justify-center items-center absolute">
            <div v-for="token in addressTokens" :style="`rotate:${token.angle}deg;${innerDiameter}`" class="absolute font-brand font-bold text-lg flex justify-start">{{ token.token }}</div>
        </div>

        <p class="text-4xl font-bold font-brand cursor-pointer">{{ name }}</p>

    </div>

</template>


<script setup>

    import { computed, defineProps, toRefs } from 'vue';

    const props = defineProps(['address','name','diameter']);
    const { address, name, diameter } = toRefs(props);

    const addressTokens = computed(() => {

        if(address.value) {
            /// chop address into characters
            let tokens = address.value?.split('');
            // we shall make the address circular
            // calculate the angle between each token by dividing 360 by the number of tokens
            let angle = 360 / tokens.length;
    
            // then calculate the rotated position of each token from the center of the circle
            tokens = tokens.map((token, index) => {
                let _angle = index * angle;
                return {
                    token,
                    angle:_angle
                };
            });
            return tokens;
        }
    });
    

    const innerDiameter = computed(() => {
        if(diameter.value) {
            return `height:${diameter.value * 0.95}px`;
        } else{
            return `height:270px`;
        }
    });

</script>