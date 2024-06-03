<script setup lang="ts">
const query = ref<string>("");

const links = [
    {
        label: "Home",
        to: "/",
    },
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
    await navigateTo(`/search/${query.value.trim()}`);
}
</script>

<template>
    <nav class="absolute top-0 lef-0 w-full h-16 px-8 flex justify-between items-center">
        <ul class="flex gap-8">
            <li class="hover:text-primary" v-for="link in links">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
        </ul>
        <UInput
            size="lg"
            v-model="query"
            name="q"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            @keyup.enter="submitSearch"
        >
            <template #trailing>
                <UButton
                    v-show="query !== ''"
                    color="gray"
                    variant="link"
                    icon="i-heroicons-x-mark-20-solid"
                    :padded="false"
                    @click="query = ''"
                />
            </template>
        </UInput>
    </nav>
</template>
