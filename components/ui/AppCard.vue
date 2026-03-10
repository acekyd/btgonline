<template>
  <component :is="as" :class="cardClasses" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'md',
  as: 'div',
})

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

const cardClasses = computed(() => {
  return [
    'card',
    props.hover ? 'hover-lift' : '',
    paddingClasses[props.padding] ?? paddingClasses.md,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>
