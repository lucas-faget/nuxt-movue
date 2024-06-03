<script setup lang="ts">
import type { Movie } from "~/types/Movie";

const props = defineProps<{
    page?: number;
    movies: Movie[];
    totalPages: number;
    totalResults: number;
}>();

const activePage = ref<number>(props.page ?? 1);

const isMovieListEmpty = computed(() => {
    return props.movies.length === 0;
});

const pageCount = computed(() => {
    return Math.ceil(props.totalResults / props.totalPages);
});

const emits = defineEmits(["changePage"]);

watch(activePage, () => {
    emits("changePage", activePage.value);
});
</script>

<template>
    <section class="flex flex-col gap-8">
        <div>
            <UPagination
                size="lg"
                v-model="activePage"
                :max="8"
                :page-count="pageCount"
                :total="totalResults"
                show-last
                show-first
            />
        </div>
        <div>
            <MovieList v-if="!isMovieListEmpty" :movies="movies" />
            <span v-else>No results found.</span>
        </div>
        <div>
            <UPagination
                size="lg"
                v-model="activePage"
                :max="8"
                :page-count="pageCount"
                :total="totalResults"
                show-last
                show-first
            />
        </div>
    </section>
</template>
