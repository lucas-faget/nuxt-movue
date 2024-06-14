<script setup lang="ts">
import type { Movie } from "~/types/Movie";
const { $images } = useNuxtApp() as any;

defineProps<{
    movies: Movie[];
}>();
</script>

<template>
    <div>
        <UCarousel v-slot="{ item: movie }" :items="movies" arrows>
            <div class="relative mt-5">
                <UBadge
                    v-if="movie.vote_average"
                    size="lg"
                    color="amber"
                    class="badge-center absolute bg-amber-200 font-bold"
                    :ui="{ rounded: 'rounded-full' }"
                >
                    {{ movie.vote_average.toFixed(1) }}
                </UBadge>
                <img
                    :src="$images.getPosterUrl(movie.poster_path)"
                    width="200"
                    height="300"
                    draggable="false"
                />
            </div>
        </UCarousel>
    </div>
</template>

<style scoped>
.badge-center {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
