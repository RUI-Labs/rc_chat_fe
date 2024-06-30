<template>
    <div class="ml-2 flex justify-start items-center w-full space-x-2">

        <div class="w-full max-w-[200px]">
            <ProjectDropdown :wallet="wallet" :projectSlug="projectSlug" />
        </div>

        <template v-if="projectSlug">
            <Button @click="visitTab(button)" v-for="button in buttons" class="text-white hover:bg-bremo-700 hover:text-bremo-100" variant="ghost">
                {{ button.label }}
            </Button>


        </template>
        
        
    </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { onMounted, ref, toRefs } from "vue";

import ProjectDropdown from "@/components/admin/ProjectDropdown.vue";

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);

const projectSlug = ref(false);

const buttons = [
    { id: 1, label: "Campaigns", path: `` },
    { id: 2, label: "Users", path: `users` },
    { id: 3, label: "Chat", path: `chat` }
];

onMounted( async () => {

    // keep waiting for window.swup.hooks

    await new Promise((resolve) => {
        let waitSwup = setInterval(() => {
        if (window?.swup?.hooks) {
            console.log(":123:", "swup hooks found");
            clearInterval(waitSwup);
            resolve();
            
        }
    }, 100);
    });

    window.swup.hooks.on("page:view", (visit) => {
        console.log(":123:", visit.to.url);
        renderCurrentProject();
    });

    renderCurrentProject();
});

const renderCurrentProject = () => {
    let path = window.location.pathname;
    let _match = path.match(/\/admin\/project\/([^\/]*)/)?.[1];
    
    console.log(":123:", _match);

    projectSlug.value = false;

    projectSlug.value = _match ? _match : false;
};

const visitTab = (button) => {
    window.swup.navigate(`/admin/project/${projectSlug.value}/${button.path}`);
}
</script>
