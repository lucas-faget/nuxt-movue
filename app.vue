<script setup lang="ts">
const isNavigationOpen = ref<boolean>(true);

const toggleHandler = () => {
    isNavigationOpen.value = !isNavigationOpen.value;
};
</script>

<template>
    <div class="flex flex-col min-h-screen font-text">
        <NuxtLayout>
            <div class="min-h-screen flex relative">
                <VerticalNavigation :isOpen="isNavigationOpen" @toggle="toggleHandler" />
                <NuxtPage :class="isNavigationOpen ? 'ml-52' : 'ml-16'" />
            </div>
        </NuxtLayout>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
