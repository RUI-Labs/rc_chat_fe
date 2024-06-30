<script setup lang="ts">

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/admin/NewProjectDialog.vue";

const newProjectDialogRef  = ref<any>(null);

const selectProject = (project:any) => {
        window.location.href = "/admin/project/" + project.token_symbol
}

const newProject = () => {
  newProjectDialogRef.value.show();
};
import { onMounted, defineProps, toRefs, computed, h, ref } from "vue";

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);

const projects = ref([])

onMounted(async () => {
        projects.value = await fetch(`/api/projects.json?owner=${wallet?.value}`)
        .then(res => res.json())
})

const currentProject = computed(() => {
  // return projects.value.find((project: any) => project.token_symbol === wallet?.value)

  let path = window.location.pathname

  
  let projectSlug = path.match(/\/admin\/project\/([^\/]*)/)?.[1]
  

  let project = projects.value.find((project: any) => String(project.token_name).toUpperCase() === String(projectSlug).toUpperCase())


  return project ? project.token_name : "Select Project"
})

</script>

<template>
  <div class="w-full">
    <DropdownMenu>
    <DropdownMenuTrigger class="w-full">
        <Button variant="outline" class="flex justify-start items-center space-x-2 w-full bg-stone-700 text-stone-300 border-transparent hover:bg-stone-600 hover:text-stone-200">
            <iconify-icon icon="gravity-ui:nut-hex" class="text-stone-100"></iconify-icon>
            <div>{{currentProject}}</div>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="'start'" class="bg-stone-800 border-stone-600 text-stone-100">
      <DropdownMenuLabel class="text-white">Select Project</DropdownMenuLabel>
      <DropdownMenuSeparator class="bg-stone-700" />
      <DropdownMenuItem @click="selectProject(project)" v-for="project in projects">{{ project.token_name }}</DropdownMenuItem>
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
