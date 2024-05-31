<script setup lang="ts">
import { MovieListGroup } from "~/types/MovieListGroup";
import type { Movie } from "~/types/Movie";
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
} from "~/services/movies";

const props = defineProps<{
    group: MovieListGroup;
}>();

const movies = ref<Movie[]>([]);
const isPending = ref<boolean>(true);

const page = ref<number>(1);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);

async function getMovies() {
    try {
        let data: any = null;
        switch (props.group) {
            case MovieListGroup.NowPlaying:
                data = await fetchNowPlayingMovies(page.value);
                break;
            case MovieListGroup.TopRated:
                data = await fetchTopRatedMovies(page.value);
                break;
            case MovieListGroup.Upcoming:
                data = await fetchUpcomingMovies(page.value);
                break;
            default:
                data = await fetchPopularMovies(page.value);
        }
        movies.value = data.results;
        totalPages.value = data.total_pages;
        totalResults.value = data.total_results;
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
    } finally {
        isPending.value = false;
    }
}

getMovies();

watch(page, () => {
    getMovies();
});
</script>

<template>
    <section class="flex flex-col gap-8">
        <div>
            <UPagination
                size="lg"
                v-model="page"
                :max="8"
                :page-count="totalPages"
                :total="totalResults"
                show-last
                show-first
            />
        </div>
        <div>
            <MovieList :movies="movies" />
        </div>
        <div>
            <UPagination
                size="lg"
                v-model="page"
                :max="8"
                :page-count="totalPages"
                :total="totalResults"
                show-last
                show-first
            />
        </div>
    </section>
</template>
