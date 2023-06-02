<template>
    <div id="two"></div>
</template>
<script setup lang="ts">
import Two from 'two.js';
import { onMounted } from 'vue';
onMounted(() => {
    const two = new Two({
        fullscreen: true,
        autostart: true
    }).appendTo(document.getElementById('two')!);
    const points = two.makePoints(
        two.width / 2,
        two.height / 2,
        two.width / 2 + 20,
        two.height / 2,
        two.width / 2 + 40,
        two.height / 2
    );
    points.size = 10;
    points.fill = "#00AEFF";
})
</script>