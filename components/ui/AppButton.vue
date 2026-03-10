<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-flex items-center justify-center">
      <svg
        class="animate-spin w-4 h-4 mr-1.5 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

const variantClasses: Record<string, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-navy',
  outline: 'btn btn-outline border-[#001D3D] text-[#001D3D] dark:border-white dark:text-white',
  ghost: 'inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-200 bg-transparent text-[#001D3D] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10',
}

const buttonClasses = computed(() => {
  const base = variantClasses[props.variant] ?? variantClasses.primary
  const size = sizeClasses[props.size] ?? sizeClasses.md
  const disabledClass = props.disabled || props.loading
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : ''

  // For primary/secondary/outline we use the .btn base which already sets padding,
  // so only inject the size override for non-btn-based variants.
  if (props.variant === 'ghost') {
    return [base, size, disabledClass].filter(Boolean).join(' ')
  }
  return [base, size, disabledClass].filter(Boolean).join(' ')
})
</script>
