<script setup lang="ts">
import { MovieListGroup } from "~/types/MovieListGroup";

const group: MovieListGroup = MovieListGroup.TopRated;
</script>

<template>
    <div class="p-8 flex flex-col gap-8">
        <span class="text-4xl">Top Rated Movies</span>
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
        <MovieCatalog :group="group" />
    </div>
</template>
