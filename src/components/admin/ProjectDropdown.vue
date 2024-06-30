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
import { onMounted, defineProps, toRefs, watch, h, ref } from "vue";

const props = defineProps(["wallet","projectSlug"]);
const { wallet, projectSlug } = toRefs(props);

const projects = ref([])



const currentProject = ref("Select Project")

onMounted(async () => {
        
    let _projects = await fetch(`/api/projects.json?owner=${wallet?.value}`)
    projects.value = await _projects.json()

    
  // projects.value = await fetch(`/api/projects.json?owner=${wallet?.value}`)


        // window?.swup?.hooks?.on('page:view', (visit) => {
        //     console.log('New page loaded:', visit.to.url);
        //     renderCurrentProject()
        // });

        renderCurrentProject()
})

const renderCurrentProject = () => {
  // return projects.value.find((project: any) => project.token_symbol === wallet?.value)

  let path = window.location.pathname

  
  let projectSlug = path.match(/\/admin\/project\/([^\/]*)/)?.[1]
  

  let project = projects.value.find((project: any) => String(project.token_name).toUpperCase() === String(projectSlug).toUpperCase())


  // return project ? project.token_name : "Select Project"
  currentProject.value = project ? project.token_name : "Select Project"
}

</script>

<template>
  <div class="w-full">
    <DropdownMenu>
    <DropdownMenuTrigger class="w-full">
        <Button variant="outline" class="flex justify-start items-center space-x-2 w-full bg-bremo-700 text-bremo-300 border-transparent hover:bg-bremo-600 hover:text-bremo-200">
            <iconify-icon icon="gravity-ui:nut-hex" class="text-bremo-100"></iconify-icon>
            <div>{{currentProject}}</div>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="'start'" class="bg-bremo-800 border-bremo-600 text-bremo-100">
      <DropdownMenuLabel class="text-white">Select Project</DropdownMenuLabel>
      <DropdownMenuSeparator class="bg-bremo-700" />
      <DropdownMenuItem @click="selectProject(project)" v-for="project in projects">{{ project.token_name }}</DropdownMenuItem>
      <DropdownMenuSeparator class="bg-bremo-700" />
      <DropdownMenuItem @click="newProject()">
          <iconify-icon icon="material-symbols:add" class="mr-2"></iconify-icon>
          <div>New</div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <NewProjectDialog :wallet=wallet ref="newProjectDialogRef"></NewProjectDialog>
  </div>
</template>
