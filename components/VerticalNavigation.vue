<script setup lang="ts">
const isOpen = ref<boolean>(true);

const labelClass = computed(() => (isOpen.value ? "ml-2" : "hidden"));
const iconClass: string = "h-7 w-7";

const toggleNavigation = () => {
    isOpen.value = !isOpen.value;
};

const links = computed(() => [
    [
        {
            label: isOpen ? "Home" : "",
            labelClass: labelClass.value,
            icon: "i-heroicons-home",
            iconClass: iconClass,
            to: "/",
        },
    ],
    [
        {
            label: "Now Playing",
            labelClass: labelClass.value,
            icon: "i-heroicons-film",
            iconClass: iconClass,
            to: "/movies/now-playing",
        },
        {
            label: "Popular",
            labelClass: labelClass.value,
            icon: "i-heroicons-arrow-trending-up",
            iconClass: iconClass,
            to: "/movies/popular",
        },
        {
            label: "Top rated",
            labelClass: labelClass.value,
            icon: "i-heroicons-star",
            iconClass: iconClass,
            to: "/movies/top-rated",
        },
        {
            label: "Upcoming",
            labelClass: labelClass.value,
            icon: "i-heroicons-calendar-days",
            iconClass: iconClass,
            to: "/movies/upcoming",
        },
    ],
    [
        {
            label: "Search",
            labelClass: labelClass.value,
            icon: "i-heroicons-magnifying-glass",
            iconClass: iconClass,
            to: "/search",
        },
    ],
]);
</script>

<template>
    <aside :class="['aside', isOpen ? 'w-56' : 'w-16']" class="flex flex-col bg-slate-900">
        <div class="h-16 flex items-center px-3">
            <UIcon
                :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
                class="h-8 w-8 cursor-pointer"
                @click="toggleNavigation"
            />
        </div>
        <div class="mt-8 flex justify-center">
            <UVerticalNavigation :links="links" :class="isOpen ? 'w-11/12' : ''" />
        </div>
    </aside>
</template>

<style scoped>
.aside {
    transition: width 0.3s ease;
    overflow: hidden;
}
</style>
