<script setup lang="ts">
// Private or public tokens that need to be specified after build using environment variables.
const runtimeConfig = useRuntimeConfig();
// Public tokens that are determined at build time, website configuration such as theme variant, title and any project config that are not sensitive.
const appConfig = useAppConfig();
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
