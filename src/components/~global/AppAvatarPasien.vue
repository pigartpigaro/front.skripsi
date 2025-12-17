<template>
  <picture>
    <source :srcset="fotoWebp" type="image/webp">
    <q-img :src="foto" :ratio="withRatio ? ratio : null" :width="width" style="max-width: 100%;" loading="lazy">
      <slot />
    </q-img>
  </picture>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '60px' },
  pasien: { type: Object, default: null },
  ratio: { type: String, default: '1' },
  withRatio: { type: Boolean, default: false }
})

// Pisahkan logic untuk mendapatkan avatar path
const getAvatarPath = (gender, age) => {
  const paths = {
    Perempuan: {
      elder: 'Grandma',
      adult: 'Woman',
      young: 'YoungGirl',
      child: 'Childgirl',
      baby: 'Baby'
    },
    Laki: {
      elder: 'Granpa',
      adult: 'Man',
      young: 'Youngman',
      child: 'Childman',
      baby: 'Baby'
    }
  }

  const getAgeGroup = (age) => {
    if (age <= 5) return 'baby'
    if (age <= 15) return 'child'
    if (age <= 25) return 'young'
    if (age <= 59) return 'adult'
    return 'elder'
  }

  const gender_key = gender === 'Perempuan' || gender === 'perempuan' ? 'Perempuan' : 'Laki'
  const age_group = getAgeGroup(age)

  return paths[gender_key][age_group]
}

const getImagePath = (filename, format = 'jpg') => {
  const size = parseInt(props.width) <= 60 ? 'sm' : 'md'
  return new URL(`../../assets/avatar/${filename}-${size}.${format}`, import.meta.url).href
}

const avatarName = computed(() => {
  const perempuan = props.pasien?.kelamin === 'Perempuan' || props.pasien?.kelamin === 'perempuan'
  const usia = props.pasien?.usia
  const usiath = usia ? parseInt(usia.substring(0, 2)) : 25

  return getAvatarPath(perempuan ? 'Perempuan' : 'Laki', usiath)
})

const foto = computed(() => getImagePath(avatarName.value, 'jpg'))
const fotoWebp = computed(() => getImagePath(avatarName.value, 'webp'))
</script>
