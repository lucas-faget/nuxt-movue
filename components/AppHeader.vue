<script setup lang="ts">
const searchQuery = ref<string>("");

const links = [
    {
        label: "Now Playing",
        icon: "i-heroicons-film",
        to: "/movies/now-playing",
    },
    {
        label: "Popular",
        icon: "i-heroicons-arrow-trending-up",
        to: "/movies/popular",
    },
    {
        label: "Top Rated",
        icon: "i-heroicons-star",
        to: "/movies/top-rated",
    },
    {
        label: "Upcoming",
        icon: "i-heroicons-calendar-days",
        to: "/movies/upcoming",
    },
];

async function submitSearch() {
    const query: string = searchQuery.value.trim();
    if (query) {
        await navigateTo({ path: "/search", query: { q: query } });
    } else {
        await navigateTo({ path: "/search" });
    }
}
</script>

<template>
    <nav class="absolute top-0 lef-0 w-full h-16 pl-56 pr-4 flex justify-between items-center z-30">
        <UHorizontalNavigation :links="links" class="max-md:hidden" />

        <UInput
            class="ml-auto w-64 max-lg:hidden"
            size="md"
            v-model="searchQuery"
            name="q"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            @keyup.enter="submitSearch"
        >
            <template #trailing>
                <UButton
                    v-show="searchQuery !== ''"
                    color="gray"
                    variant="link"
                    icon="i-heroicons-x-mark-20-solid"
                    :padded="false"
                    @click="searchQuery = ''"
                />
            </template>
        </UInput>
    </nav>
</template>
