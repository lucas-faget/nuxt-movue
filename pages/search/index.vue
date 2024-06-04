<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Movie } from "~/types/Movie";
import type { MovieList } from "~/types/MovieList";
import { searchMovies } from "~/services/movies";

const isEmptyOrWhiteSpaces = (str: string): boolean => {
    return str.trim().length === 0;
};

const route = useRoute();

const searchQuery = ref<string>((route.query.q as string) ?? "");
const page = ref<number>(1);
const movies = ref<Movie[]>([]);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);
const isPending = ref<boolean>(true);

async function getMovies() {
    try {
        if (!isEmptyOrWhiteSpaces(searchQuery.value)) {
            const data: MovieList = (await searchMovies(
                searchQuery.value.trim(),
                page
            )) as MovieList;
            page.value = data.page;
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

function handleSearchQueryInput() {
    page.value = 1;
    getMovies();
}

getMovies();

watch(page, () => {
    getMovies();
});
</script>

<template>
    <section class="p-8 flex flex-col gap-8">
        <NuxtLayout name="movies" title="Movie Search">
            <UInput
                size="md"
                v-model="searchQuery"
                name="q"
                placeholder="Search..."
                icon="i-heroicons-magnifying-glass-20-solid"
                autocomplete="off"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                @keyup.enter="handleSearchQueryInput"
            >
                <template #trailing>
                    <UButton
                        v-show="searchQuery !== ''"
                        color="gray"
                        variant="link"
                        icon="i-heroicons-x-mark-20-solid"
                        :padded="false"
                        @click="searchQuery = ''"
                    />
                </template>
            </UInput>
            <MovieCatalog
                v-model="page"
                :movies="movies"
                :total-pages="totalPages"
                :total-results="totalResults"
            />
        </NuxtLayout>
    </section>
</template>
