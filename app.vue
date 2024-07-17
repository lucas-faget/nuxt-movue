<script setup lang="ts">
const isNavigationOpen = ref<boolean>(true);

const toggleHandler = () => {
    isNavigationOpen.value = !isNavigationOpen.value;
};
</script>

<template>
    <div class="flex flex-col min-h-screen font-text bg-neutral-900">
        <NuxtLayout>
            <NuxtPage />
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
