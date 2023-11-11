<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const SIZE = 'transparent 160px, rgba(0, 0, 0, 0.9) 200px)';

  const spotlight = ref<HTMLElement | null>(null);
  const spotlightSize = ref(SIZE);

  onMounted(() => {
    window.addEventListener('mousemove', (e) => {
      updateSpotlight(e);
    });
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        spotlightSize.value = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px)';
        updateSpotlight(e);
      }
    });
    window.addEventListener('mouseup', (e) => {
      spotlightSize.value = SIZE;
      updateSpotlight(e);
    });
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', (e) => {
      updateSpotlight(e);
    });
    window.removeEventListener('mousedown', (e) => {
      updateSpotlight(e);
    });
    window.removeEventListener('mouseup', (e) => {
      spotlightSize.value = SIZE;
      updateSpotlight(e);
    });
  });

  const updateSpotlight = (e: MouseEvent) => {
    if (spotlight.value) {
      spotlight.value.style.backgroundImage = `radial-gradient(circle at ${
        (e.pageX / window.innerWidth) * 100
      }% ${(e.pageY / window.innerHeight) * 100}%, ${spotlightSize.value}`;
    }
  };
</script>

<template>
  <div
    ref="spotlight"
    class="radial pointer-events-none absolute h-screen w-screen"
  />
</template>

<style scoped>
  .pointer-events-none {
    pointer-events: none;
  }
  .absolute {
    position: absolute;
  }
  .w-screen {
    width: 100vw;
  }
  .h-screen {
    height: 100vh;
  }
  .radial {
    background-image: radial-gradient(
      circle,
      transparent 160px,
      rgba(0, 0, 0, 0.9) 200px
    );
  }
</style>
