<template>
  <div class="min-h-screen flex flex-col">
    <HeaderSection />
    <main class="flex-1">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>
