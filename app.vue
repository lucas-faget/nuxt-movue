<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLayout>
            <div class="min-h-screen flex">
                <VerticalNavigation />
                <NuxtPage />
            </div>
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
