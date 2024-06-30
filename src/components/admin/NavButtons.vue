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

        <div v-if="visitStart" class="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
            <div class="w-[200px] h-[200px] bg-white/5 backdrop-blur-xl rounded-xl flex justify-center items-center flex-col">
                <img class="w-24 h-24 object-contain animate-bounce" src="/remo.svg" alt="">

                <p class="font-brand text-white ">Reaching More...</p>
            </div>
        </div>
        
        
    </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { onMounted, ref, toRefs } from "vue";

import ProjectDropdown from "@/components/admin/ProjectDropdown.vue";

const props = defineProps(["wallet"]);
const { wallet } = toRefs(props);

const projectSlug = ref(false);

const visitStart = ref(false)

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

    window.swup.hooks.on("visit:start", (visit) => {
        console.log("visit start", visit.to.url);
        visitStart.value = true;
        // renderCurrentProject();
    });

    window.swup.hooks.on("visit:end", (visit) => {
        console.log("visit end", visit.to.url);
        visitStart.value = false;
        // renderCurrentProject();
    });

    window.swup.hooks.on("visit:abort", (visit) => {
        console.log("visit abort", visit.to.url);
        visitStart.value = false;
        // renderCurrentProject();
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
