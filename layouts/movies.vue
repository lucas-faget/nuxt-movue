<template>
    <div class="flex flex-col gap-8">
        <UDivider :label="$attrs.title" size="sm" />
        <slot />
        <UDivider size="sm" />
    </div>
</template>
