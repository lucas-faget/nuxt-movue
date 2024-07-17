<script setup lang="ts">
import { format } from "date-fns";
import type { Movie } from "~/types/Movie";
const { $images } = useNuxtApp() as any;

defineProps<{
    movies: Movie[];
}>();
</script>

<template>
    <div>
        <UCarousel v-slot="{ item: movie }" :items="movies" arrows>
            <NuxtLink :to="`/movies/${movie.id}`">
                <div class="relative mt-5 group">
                    <div class="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                        <UBadge
                            v-if="movie.vote_average"
                            size="lg"
                            color="amber"
                            class="font-bold bg-amber-200"
                            :ui="{ rounded: 'rounded-full' }"
                        >
                            {{ movie.vote_average.toFixed(1) }}
                        </UBadge>
                    </div>
                    <div class="relative overflow-hidden">
                        <div
                            class="movie-details absolute bottom-0 w-full p-2 flex flex-col gap-1 bg-slate-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
                        >
                            <div class="text-lg font-title">{{ movie.title }}</div>
                            <div class="font-title text-gray-400">
                                {{ format(movie.release_date, "d MMM yyyy") }}
                            </div>
                        </div>
                        <img
                            :src="$images.getPosterUrl(movie.poster_path)"
                            width="200"
                            height="300"
                            draggable="false"
                        />
                    </div>
                </div>
            </NuxtLink>
        </UCarousel>
    </div>
</template>
