<script setup lang="ts">

import { ref } from 'vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/admin/NewProjectDialog.vue";

const newProjectDialogRef  = ref(null);

const newProject = () => {
  newProjectDialogRef.value.show();
};
import { defineProps, toRefs, computed, h, ref } from "vue";

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);
console.log(16, wallet.value)

</script>

<template>
  <div class="w-full">
    <DropdownMenu>
    <DropdownMenuTrigger class="w-full">
        <Button variant="outline" class="flex justify-start items-center space-x-2 w-full bg-stone-700 text-stone-300 border-transparent hover:bg-stone-600 hover:text-stone-200">
            <iconify-icon icon="gravity-ui:nut-hex" class="text-stone-100"></iconify-icon>
            <div>project name</div>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="'start'" class="bg-stone-800 border-stone-600 text-stone-100">
      <DropdownMenuLabel class="text-white">Select Project</DropdownMenuLabel>
      <DropdownMenuSeparator class="bg-stone-700" />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuSeparator class="bg-stone-700" />
      <DropdownMenuItem @click="newProject()">
          <iconify-icon icon="material-symbols:add" class="mr-2"></iconify-icon>
          <div>New</div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <NewProjectDialog :wallet=wallet ref="newProjectDialogRef"></NewProjectDialog>
  </div>
</template>
