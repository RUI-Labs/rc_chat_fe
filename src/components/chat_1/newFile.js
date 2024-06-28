import { onMounted, watch } from "vue";
import { $showNewStampModal } from "@/stores/stamp_1";
import anime from "animejs/lib/anime.es.js";
import { show, hide, page } from "./NewStamp.vue";

onMounted(() => {
$showNewStampModal.subscribe(() => {
let value = $showNewStampModal.get();
// // open.value = $showNewStampModal.get()
// open.value = value
// console.log('open', value)
if (value) show();
else hide();
});

watch(page, () => {

switch (page.value) {

case 1: {

let tl = anime.timeline({
easing: 'easeOutExpo',
duration: 500,
autoplay: false
});

tl.add({
targets: "#1_1",
opacity: 1,
height: 'auto',
duration: 500,
delay: 100,
});

// tl.add({
//   targets: "#1_2",
//   opacity: 1,
//   height: 'auto',
//   duration: 500,
//   delay: 100,
// });
// tl.add({
//   targets: "#1_3",
//   opacity: 1,
//   height: 'auto',
//   duration: 500,
//   delay: 100,
// });
tl.play();



break;
}


}

});


});
