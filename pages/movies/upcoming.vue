<script setup lang="ts">
import { MovieListGroup } from "~/types/MovieListGroup";

const group: MovieListGroup = MovieListGroup.Upcoming;
</script>

<template>
    <div class="p-8 flex flex-col gap-8">
        <span class="text-4xl">Upcoming Movies</span>
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
        <MovieCatalog :group="group" />
    </div>
</template>
