<script setup>
import movies from '~/assets/data/skatemovies.json'

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Skate Video Classics',
  description: 'A handpicked collection of legendary skate videos.',
  ogTitle: 'Skate Video Classics',
  ogDescription: 'A handpicked collection of legendary skate videos.',
  ogType: 'website',
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const perPage = 20
const page = computed(() => Number(route.query.page ?? 1))

const totalItems = movies.length
const totalPages = Math.ceil(totalItems / perPage)

const paginatedVideos = computed(() => {
  const start = (page.value - 1) * perPage
  return movies.slice(start, start + perPage)
})

watch(
  () => route.query.page,
  () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
)
</script>

<template>
  <div>
    <Header />
    <main class="mb-16">
      <ul
        class="text-base grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 m-auto px-4 gap-y-6">
        <li v-for="m in paginatedVideos" :key="m.id" class="p-2">
          <NuxtLink :to="m.sourceUrl"
            class="aspect-square group block transition-transform duration-150 active:scale-[0.99]">
            <div
              class="flex items-center justify-center overflow-hidden p-8 h-full bg-white/10 rounded border-gray-800">
              <img :src="`/images/${m.coverUrl}`"
                class="max-w-full max-h-full w-auto h-auto object-contain saturate-[.8] rounded group-hover:scale-[1.03] duration-300"
                :alt="m.title" width="400" loading="lazy" />
            </div>
          </NuxtLink>
          <div class="mt-2">
            <a :href="m.sourceUrl"
              class="text-gray-50 hover:text-gray-300 duration-300 leading-snug decoration-1 underline underline-offset-2">{{
                m.title }}</a>
            <div class="text-gray-400 leading-snug">{{ m.company }}</div>
          </div>
        </li>
      </ul>
    </main>
    <nav class="mx-auto text-center my-24">
      <NuxtLink v-for="p in totalPages" :key="p" :to="{ query: { page: p } }" :class="{ active: p === page }"
        class="md:text-xl text-lg py-2 px-4 m-1 bg-white/10 hover:bg-white/30 duration-300 rounded text-gray-100">
        {{ p }}
      </NuxtLink>
    </nav>
    <Footer />
  </div>
</template>

<style>
body {
  @apply bg-gray-950
}

h1 {
  font-family: Climate Crisis, sans-serif;
}

.active {
  @apply opacity-50;
}
</style>