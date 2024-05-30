<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import { fetchMovieById } from "~/services/movies";

const route = useRoute();

const movie = ref<Movie>({});
const isPending = ref<boolean>(true);

async function getMovieById() {
    try {
        const data = await fetchMovieById(route.params.id);
        movie.value = data;
    } catch (error) {
        console.error("Failed to fetch movie: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovieById();
</script>

<template>
    <section>
        <div v-if="movie && !isPending">
            <p>{{ movie.id }}</p>
            <p>{{ movie.title }}</p>
            <p>{{ movie.overview }}</p>
            <p>{{ movie.release_date }}</p>
            <p>{{ movie.vote_average }}</p>
        </div>
    </section>
</template>

<style>
.movie-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
