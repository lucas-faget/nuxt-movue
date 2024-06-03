<template>
    <div class="flex flex-col gap-8">
        <span class="text-4xl">{{ $attrs.title }}</span>
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
        <slot />
        <hr class="h-px border-0 bg-gray-400 dark:bg-gray-700" />
    </div>
</template>
