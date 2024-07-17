<script setup lang="ts">
const isNavigationOpen = ref<boolean>(true);

const toggleHandler = () => {
    isNavigationOpen.value = !isNavigationOpen.value;
};
const links = [
    {
        label: "Now Playing",
        to: "/now-playing",
    },
    {
        label: "Popular",
        to: "/popular",
    },
    {
        label: "Top Rated",
        to: "/top-rated",
    },
    {
        label: "Upcoming",
        to: "/upcoming",
    },
];
</script>

<template>
    <div>
        <AppHeader />
        <div class="min-h-screen flex relative">
            <VerticalNavigation :isOpen="isNavigationOpen" @toggle="toggleHandler" />
            <section class="w-full mt-16" :class="isNavigationOpen ? 'ml-52' : 'ml-16'">
                <div class="flex flex-col gap-8 p-8">
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-center">
                            <UHorizontalNavigation :links="links" />
                            <ULink
                                :to="`/movies${$route.path}`"
                                active-class="text-primary"
                                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <div class="flex gap-2 items-center">
                                    <span class="whitespace-nowrap">View all</span>
                                    <UIcon name="i-heroicons-arrow-right" />
                                </div>
                            </ULink>
                        </div>
                        <slot />
                    </div>
                </div>
            </section>
        </div>
        <div :class="isNavigationOpen ? 'ml-52' : 'ml-16'">
            <AppFooter />
        </div>
    </div>
</template>
