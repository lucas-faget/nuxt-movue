<script setup lang="ts">
const isNavigationOpen = ref<boolean>(true);

const toggleHandler = () => {
    isNavigationOpen.value = !isNavigationOpen.value;
};
</script>

<template>
    <div>
        <AppHeader />
        <div class="min-h-screen flex relative">
            <VerticalNavigation :isOpen="isNavigationOpen" @toggle="toggleHandler" />
            <section class="w-full mt-16" :class="isNavigationOpen ? 'ml-52' : 'ml-16'">
                <slot />
            </section>
        </div>
        <AppFooter />
    </div>
</template>
