<template>
  <v-github-icon url="https://github.com/vinayakkulkarni/v-spotlight" />
  <v-spotlight />
  <!-- Netlify Badge -->
  <div class="absolute bottom-4 right-4">
    <a
      href="https://app.netlify.com/sites/v-spotlight/deploys"
      aria-label="View deploys on Netlify"
      target="_blank"
      rel="noopener noreferrer"
      class="gray-400"
    >
      <img
        src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
  import { VGithubIcon } from 'v-github-icon';
  import { VSpotlight } from 'v-spotlight';
</script>

<style>
  @import 'v-github-icon/dist/v-github-icon.css';
  @import 'v-spotlight/dist/v-spotlight.css';
</style>
