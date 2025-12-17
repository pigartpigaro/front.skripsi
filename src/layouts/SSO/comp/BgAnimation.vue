<template>
  <div>
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none"
      shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <!-- Kurangi jumlah wave layers -->
        <use xlink:href="#gentle-wave" x="48" y="0" class="wave wave1" />
        <use xlink:href="#gentle-wave" x="48" y="3" class="wave wave2" />
      </g>
    </svg>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.waves {
  position: absolute;
  top: 0;
  width: 100%;
  height: 10vh;
  transform: scaleY(-1);
  opacity: .6;
  will-change: transform; // Optimasi performance
}

.wave {
  fill: rgba(255, 255, 255, 0.3);
  animation: moveForever 15s cubic-bezier(.55, .5, .45, .5) infinite;
  will-change: transform;
}

.wave1 {
  animation-delay: -2s;
}

.wave2 {
  animation-delay: -4s;
  opacity: 0.5;
}

@keyframes moveForever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
