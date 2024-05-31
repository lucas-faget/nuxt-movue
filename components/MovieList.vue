<script setup lang="ts">
import type { Movie } from "~/types/Movie";
import { getPosterUrl } from "~/services/movies";
import { PosterSize } from "~/types/PosterSize";

defineProps<{
    movies: Movie[];
}>();
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <div class="w-40 flex flex-col gap-2" v-for="movie in movies" :key="movie.id">
            <div>
                <img :src="getPosterUrl(PosterSize.W154, movie.poster_path)" :alt="movie.title" />
            </div>
            <div>
                <p>{{ movie.title }}</p>
            </div>
            <div>
                <NuxtLink :to="`/movies/${movie.id}`">
                    <UButton color="white" variant="solid">Details</UButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
