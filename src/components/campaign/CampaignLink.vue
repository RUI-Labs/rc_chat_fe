<template>

    <button @click="copy()" class="border px-4 pl-2 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 duration-300 active:scale-90 flex justify-center items-center space-x-2 bg-white ">

        <div :class="[copied?'opacity-100':'opacity-0', 'absolute flex justify-center items-center']" >
            <iconify-icon class="text-2xl" icon="octicon:check-16"></iconify-icon>
            <span class="ml-2 text-xl font-brand">Copied</span>
        </div>
        <div :class="[copied?'opacity-0':'opacity-100','flex justify-center items-center']">
            <iconify-icon class="text-2xl" icon="octicon:link-16"></iconify-icon>
            <span class="ml-3 text-lg font-brand">{{ link_text }}</span>
        </div>

    </button>

</template>

<script setup>

    import { toRefs } from 'vue'

    const props = defineProps(['link_text'])
    const { link_text } = toRefs(props)

    import { useClipboard } from '@vueuse/core'
    const { text, copy, copied, isSupported } = useClipboard({ source: link_text.value })

</script>