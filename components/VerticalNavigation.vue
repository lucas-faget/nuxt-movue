<script setup lang="ts">
const props = defineProps<{
    isOpen: boolean;
}>();

const labelClass = computed(() => (props.isOpen ? "ml-2" : "hidden"));
const iconClass: string = "h-7 w-7";

const links = computed(() => [
    [
        {
            label: "Home",
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
    <aside
        :class="[
            'transition-width duration-300 ease-in-out overflow-hidden',
            isOpen ? 'w-52' : 'w-16',
        ]"
        class="bg-black shrink-0 fixed top-0 left-0 z-40 h-full"
    >
        <div class="flex flex-col">
            <div
                :class="isOpen ? 'pl-4' : 'justify-center'"
                class="h-16 flex items-center group cursor-pointer"
                @click="$emit('toggle')"
            >
                <UIcon
                    :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
                    class="h-8 w-8 group-hover:scale-110 transform transition duration-300"
                />
            </div>
            <div class="mt-8 flex justify-center">
                <UVerticalNavigation :links="links" :class="isOpen ? 'w-11/12' : ''" />
            </div>
        </div>
    </aside>
</template>
