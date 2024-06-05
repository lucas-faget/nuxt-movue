<template>
    <div class="flex flex-col gap-8">
        <UDivider :label="$attrs.title" />
        <slot />
        <UDivider />
    </div>
</template>
