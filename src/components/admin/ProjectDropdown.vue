<script setup lang="ts">

import { ref } from 'vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/admin/NewProjectDialog.vue";

const newProjectDialogRef  = ref(null);

const newProject = () => {
  newProjectDialogRef.value.show();
};

</script>

<template>
  <div class="w-full">
    <DropdownMenu>
    <DropdownMenuTrigger class="w-full">
        <Button variant="outline" class="flex justify-start items-center space-x-2 w-full">
            <iconify-icon icon="gravity-ui:nut-hex" class=""></iconify-icon>
            <div>project name</div>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="'start'">
      <DropdownMenuLabel>Select Project</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="newProject()">
          <iconify-icon icon="material-symbols:add" class="mr-2"></iconify-icon>
          <div>New</div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <NewProjectDialog ref="newProjectDialogRef"></NewProjectDialog>
  </div>
</template>