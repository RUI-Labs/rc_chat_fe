<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
const props = defineProps(['text'])
const { text } = toRefs(props)
</script>

<template>
  <TooltipProvider :delayDuration="0">
    <Tooltip>
      <TooltipTrigger>
        <slot></slot>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ text }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>