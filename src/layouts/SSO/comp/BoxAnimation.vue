<template>
  <div class="bungkusbox">
    <div class="box" v-show="isVisible">
      <div v-for="i in 10" :key="i" class="animated-box" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Tambahkan composable untuk resize handler
const isVisible = ref(false)
const isReducedMotion = ref(false)

// Check reduced motion preference
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = mediaQuery.matches

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        isVisible.value = entry.isIntersecting
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px' // Add rootMargin for better UX
    }
  )

  const el = document.querySelector('.bungkusbox')
  if (el) observer.observe(el)

  return () => observer.disconnect()
})
</script>

<style lang="scss" scoped>
.bungkusbox {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; // Prevent interaction

  .box {
    position: relative;
    width: 100%;
    height: 100%;

    // Composite layer promotion
    transform: translate3d(0, 0, 0);
  }

  .animated-box {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 6px solid rgba(255, 255, 255, 0.8);
    border-radius: 30%;
    // Performance optimizations
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
    contain: layout style paint;

    // Add composite properties
    transform-style: preserve-3d;
    opacity: 0;
  }

  // Use CSS Custom Properties for animation values
  @for $i from 1 through 10 {
    .animated-box:nth-child(#{$i}) {
      --delay: #{random(5)}s;
      --duration: #{8 + random(10)}s;
      --start-position: #{random(100)}vh;

      top: var(--start-position);
      left: #{10% * $i};
      animation:
        float var(--duration) calc(-1 * var(--delay)) infinite linear,
        fade var(--duration) calc(-1 * var(--delay)) infinite linear;
    }
  }
}

// Split animations for better performance
@keyframes float {
  0% {
    transform: scale(0) translateY(0) rotate(0);
  }

  100% {
    transform: scale(1.3) translateY(-300px) rotate(360deg);
  }
}

@keyframes fade {

  0%,
  100% {
    opacity: 0;
  }

  20%,
  80% {
    opacity: 1;
  }
}

// Optimize for reduced motion
@media (prefers-reduced-motion: reduce) {
  .animated-box {
    animation: none !important;
    opacity: 0.5;
    transform: none !important;
  }
}

// Optimize for battery saving mode
@media (prefers-reduced-motion: reduce) and (update: slow) {
  .animated-box {
    display: none;
  }
}
</style>
