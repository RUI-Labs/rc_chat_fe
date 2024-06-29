<template>

    <div>
        <div @click="newProject()">
            <slot ></slot>

        </div>

        <NewProjectDialog :wallet=wallet ref="newProjectDialogRef"></NewProjectDialog>
    </div>

</template>

<script setup>

import { ref, toRefs } from "vue";

import NewProjectDialog from "@/components/admin/NewProjectDialog.vue";

const newProjectDialogRef  = ref(null);

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);

const newProject = () => {
  newProjectDialogRef.value.show();
};

</script>