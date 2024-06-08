<script setup lang="ts">
import { format } from "date-fns";
import type { Movie } from "~/types/Movie";
import { getPosterUrl } from "~/services/movies";
import { PosterSize } from "~/types/PosterSize";

const props = defineProps<{
    movies: Movie[];
}>();
</script>

<template>
    <div class="flex flex-wrap gap-6">
        <template v-for="movie in movies" :key="movie.id">
            <NuxtLink :to="`/movies/${movie.id}`">
                <div class="w-40 flex flex-col gap-2 cursor-pointer">
                    <div>
                        <img
                            class="w-full"
                            :src="getPosterUrl(PosterSize.W154, movie.poster_path)"
                            :alt="movie.title"
                            onerror="this.onerror = null; this.src='poster-not-found.jpg'"
                        />
                    </div>
                    <p v-if="movie.title">{{ movie.title }}</p>
                    <p v-if="movie.release_date" class="text-sm text-gray-400">
                        {{ format(movie.release_date, "d MMM yyyy") }}
                    </p>
                </div>
            </NuxtLink>
        </template>
    </div>
</template>
