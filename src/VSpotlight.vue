<template>
  <div class='bg-container' :style="{ background: `url(${background}) no-repeat ${position}` }">
    <div class="spotlight"></div>
  </div>
</template>
<script>
export default {
  name: 'VSpotlight',
  props: {
    background: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'center',
      required: false,
    },
  },
  data() {
    return {
      spotlight: null,
      spotlightSize: 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)',
    };
  },
  mounted() {
    const t = this;
    t.spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', e => {
      t.updateSpotlight(e);
    });
    window.addEventListener('mousedown', e => {
      if (e.which === 1) {
        t.spotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px)';
        t.updateSpotlight(e);
      }
    });
    window.addEventListener('mouseup', e => {
      t.spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)';
      t.updateSpotlight(e);
    });
  },
  methods: {
    updateSpotlight(e) {
      const t = this;
      t.spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX /
        window.innerWidth *
        100}% ${e.pageY / window.innerHeight * 100}%, ${t.spotlightSize}`;
    },
  },
};
</script>
<style scoped>
.bg-container {
  background-size: cover;
  height: 100vh;
}
.spotlight {
  position: absolute;
  height: 100vh;
  width: 100vh;
  background-image: radial-gradient(
    circle,
    transparent 160px,
    rgba(0, 0, 0, 0.85) 200px
  );
}
</style>
