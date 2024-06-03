<script setup lang="ts">
import type { Movie } from "~/types/Movie";

const page = ref<number>(1);

const props = defineProps<{
    title: string;
    movies: Movie[];
    totalPages: number;
    totalResults: number;
}>();

const isMovieListEmpty = computed(() => {
    return props.movies.length === 0;
});

const pageCount = computed(() => {
    return Math.ceil(props.totalResults / props.totalPages);
});

const emits = defineEmits(["changePage"]);

watch(page, () => {
    emits("changePage", page.value);
});
</script>

<template>
    <section class="flex flex-col gap-8">
        <span class="text-4xl">{{ title }}</span>
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
        <div>
            <UPagination
                size="lg"
                v-model="page"
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
                v-model="page"
                :max="8"
                :page-count="pageCount"
                :total="totalResults"
                show-last
                show-first
            />
        </div>
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
    </section>
</template>
