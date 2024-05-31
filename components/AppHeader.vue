<script setup lang="ts">
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
</script>

<template>
    <nav class="absolute top-0 lef-0 w-full h-16 px-8 flex justify-between items-center">
        <ul class="flex gap-8">
            <li class="hover:text-primary" v-for="link in links">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
        </ul>
        <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color="white"
            :trailing="false"
            placeholder="Search..."
        />
    </nav>
</template>
