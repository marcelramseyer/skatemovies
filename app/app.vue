<script setup lang="ts">
import movies from '~/assets/data/skatemovies.json'
</script>

<template>
  <div>
    <header class="mx-auto max-w-2xl text-center my-16">
      <h1 class="text-8xl text-gray-800 font-bold m-auto">SkateMovies</h1>
      <div class="text-2xl italic text-gray-500 mt-2">Curated List of full-length skate movie classics, free to watch!
      </div>
    </header>
    <main>
      <ul class="text-lg flex gap-6 max-w-6xl m-auto">
        <li v-for="m in movies" :key="m.id">
          <!-- <img :src="`/images/${m.coverUrl}`" :alt="m.title" /> -->
          <NuxtImg :src="`/images/${m.coverUrl}`" class="rounded" :alt="m.title" width="400" format="webp"
            loading="lazy" />
          <div class="mt-2">{{ m.title }}</div>
          <div class="text-gray-500">{{ m.year }}</div>
        </li>
      </ul>
    </main>
  </div>
</template>
