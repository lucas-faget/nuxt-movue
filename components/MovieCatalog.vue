<script setup lang="ts">
import type { Movie } from "~/types/Movie";

const page = defineModel();

const props = defineProps<{
    movies: Movie[];
    totalPages: number;
    totalResults: number;
}>();

const isMovieListEmpty = computed(() => props.movies.length === 0);

const pageCount = computed(() => Math.ceil(props.totalResults / props.totalPages));
</script>

<template>
    <section class="flex flex-col gap-8">
        <div>
            <UPagination
                class="max-md:hidden"
                size="lg"
                v-model="page"
                :max="7"
                :page-count="pageCount"
                :total="totalResults"
                show-last
                show-first
            />
            <UPagination
                class="md:hidden"
                size="sm"
                v-model="page"
                :max="5"
                :page-count="pageCount"
                :total="totalResults"
            />
        </div>
        <div>
            <MovieList v-if="!isMovieListEmpty" :movies="movies" />
            <span v-else>No results found.</span>
        </div>
        <div>
            <UPagination
                class="max-md:hidden"
                size="lg"
                v-model="page"
                :max="7"
                :page-count="pageCount"
                :total="totalResults"
                show-last
                show-first
            />
            <UPagination
                class="md:hidden"
                size="sm"
                v-model="page"
                :max="5"
                :page-count="pageCount"
                :total="totalResults"
            />
        </div>
    </section>
</template>
