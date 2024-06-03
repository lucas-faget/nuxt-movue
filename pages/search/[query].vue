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
const activePage = ref<number>(1);
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

function handlePageChange(page: number) {
    activePage.value = page;
    getMovies(activePage.value);
}

function handleInputChange() {
    getMovies(activePage.value);
}

getMovies(activePage.value);
</script>

<template>
    <section class="p-8 flex flex-col gap-8">
        <NuxtLayout name="movies" title="Movie Search">
            <UInput
                size="md"
                v-model="query"
                name="q"
                placeholder="Search..."
                icon="i-heroicons-magnifying-glass-20-solid"
                autocomplete="off"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                @keyup.enter="handleInputChange"
            >
                <template #trailing>
                    <UButton
                        v-show="query !== ''"
                        color="gray"
                        variant="link"
                        icon="i-heroicons-x-mark-20-solid"
                        :padded="false"
                        @click="query = ''"
                    />
                </template>
            </UInput>
            <MovieCatalog
                :active-page="activePage"
                :movies="movies"
                :total-pages="totalPages"
                :total-results="totalResults"
                @change-page="handlePageChange"
            />
        </NuxtLayout>
    </section>
</template>
