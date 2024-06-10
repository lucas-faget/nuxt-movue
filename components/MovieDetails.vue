<script setup lang="ts">
import { format } from "date-fns";

const props = defineProps<{
    movie: any;
}>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <p v-if="movie.title" class="text-6xl font-title">{{ movie.title }}</p>

        <UDivider v-if="movie.title" />

        <div
            v-if="movie.release_date || movie.runtime"
            class="flex justify-between items-center leading-none"
        >
            <div v-if="movie.release_date" class="flex flex-col items-center">
                <span class="text-4xl font-title">{{ format(movie.release_date, "yyyy") }}</span>
                <span class="text-md text-gray-400">{{ format(movie.release_date, "d MMM") }}</span>
            </div>
            <div v-if="movie.runtime">
                <span class="text-3xl font-title">{{ movie.runtime }}</span>
                <span class="text-md text-gray-400 ml-1">min</span>
            </div>
        </div>

        <UDivider v-if="movie.release_date || movie.runtime" />

        <div v-if="movie.genres && movie.genres.length > 0" class="flex gap-2 items-center">
            <UBadge v-for="genre in movie.genres" size="lg" color="white" variant="solid">
                {{ genre.name }}
            </UBadge>
        </div>

        <UDivider v-if="movie.genres && movie.genres.length > 0" />

        <p v-if="movie.overview" class="text-gray-400">{{ movie.overview }}</p>

        <UDivider v-if="movie.overview" />

        <div
            v-if="movie.vote_average || movie.origin_country"
            class="flex justify-between items-center"
        >
            <div v-if="movie.vote_average" class="flex gap-2 items-center">
                <UIcon class="w-6 h-6" name="i-heroicons-star" />
                <span>{{ movie.vote_average.toFixed(1) }}</span>
            </div>
            <div v-if="movie.origin_country" class="flex gap-2 items-center">
                <UIcon class="w-6 h-6" name="i-heroicons-globe-americas" />
                <UKbd size="md">{{ movie.origin_country[0] }}</UKbd>
            </div>
        </div>
    </div>
</template>
