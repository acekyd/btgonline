<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'active' | 'completed' | 'offseason' | 'upcoming' | 'partial' | 'failed' | 'archived' | 'default'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

const variantClasses: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  completed: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  offseason: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  partial: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  failed: 'bg-[#E30613] text-white',
  archived: 'bg-gray-700 text-gray-300',
  default: 'bg-[#001D3D] text-white',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
}

const badgeClasses = computed(() => {
  return [
    'inline-flex items-center font-bold uppercase tracking-wide rounded-full',
    variantClasses[props.variant] ?? variantClasses.default,
    sizeClasses[props.size] ?? sizeClasses.md,
  ].join(' ')
})
</script>
