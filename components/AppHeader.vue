<script setup lang="ts">
const searchQuery = ref<string>("");

const links = [
    {
        label: "Now Playing",
        to: "/movies/now-playing",
    },
    {
        label: "Popular",
        to: "/movies/popular",
    },
    {
        label: "Top Rated",
        to: "/movies/top-rated",
    },
    {
        label: "Upcoming",
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
    <nav class="absolute top-0 lef-0 w-full h-16 pl-60 pr-4 flex justify-between items-center z-30">
        <ul class="flex gap-8 max-lg:hidden">
            <li class="hover:text-primary" v-for="link in links">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
        </ul>

        <UInput
            class="ml-auto max-sm:hidden"
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
