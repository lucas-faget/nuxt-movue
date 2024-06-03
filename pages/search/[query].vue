<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { searchMovies } from "~/services/movies";

const isEmptyOrWhiteSpaces = (str: string): boolean => {
    return str.trim().length === 0;
};

const route = useRoute();

const query = ref<string>(route.params.query as string);
const movies = ref<Movie[]>([]);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);
const isPending = ref<boolean>(true);

async function getMovies(page: number) {
    try {
        if (!isEmptyOrWhiteSpaces(query.value)) {
            const data: MovieList = (await searchMovies(query.value.trim(), page)) as MovieList;
            movies.value = data.results;
            totalPages.value = data.total_pages;
            totalResults.value = data.total_results;
        } else {
            movies.value = [];
            totalPages.value = 0;
            totalResults.value = 0;
        }
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies(1);
</script>

<template>
    <section class="p-8 flex flex-col gap-8">
        <MovieCatalog
            title="Movie Search Results"
            :movies="movies"
            :total-pages="totalPages"
            :total-results="totalResults"
            @change-page="getMovies"
        />
    </section>
</template>
