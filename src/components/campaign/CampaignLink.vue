<template>

    <button class="border px-4 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 duration-300 hover:scale-95 active:scale-75 flex justify-center items-center space-x-2 ">
        <iconify-icon icon="octicon:link-16"></iconify-icon>
        <span class="text-sm">{{ link_text }}</span>

    </button>

</template>

<script setup>

    import { toRefs } from 'vue'

    const props = defineProps(['link_text'])
    const { link_text } = toRefs(props)

</script>