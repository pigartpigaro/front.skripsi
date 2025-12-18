<template>
  <div class="full-height column flex-center items-center text-white">
    <div class="form">
      <div class="text-h6">
        REGISTER
      </div>
    </div>

    <div class="q-my-md full-width">
      <q-form ref="myForm" class="q-pa-md" @submit="onSubmit">
        <q-input v-model="form.name" color="white" label="Nama" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" autocorrect="off" autocapitalize="off"
          autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Nama</span>
          </template>
          <template #prepend>
            <q-icon name="icon-mat-person" />
          </template>
        </q-input>

        <q-input v-model="form.email" color="white" label="Email" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" autocorrect="off" autocapitalize="off"
          autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Email</span>
          </template>
          <template #prepend>
            <q-icon name="icon-mat-email" />
          </template>
        </q-input>


        <q-input v-model="form.username" color="white" label="Username" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" autocorrect="off" autocapitalize="off"
          autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Username</span>
          </template>
          <template #prepend>
            <q-icon name="icon-mat-person" />
          </template>
        </q-input>

        <q-input v-model="form.password" color="white" label="Password" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" :type="isPasw ? 'password' : 'text'"
          autocorrect="off" autocapitalize="off" autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Password</span>
          </template>
          <template #prepend>
            <q-icon name="icon-mat-key" />
          </template>
          <template #append>
            <q-icon :name="isPasw ? 'icon-mat-visibility_off' : 'icon-mat-visibility'" class="cursor-pointer"
              @click="isPasw = !isPasw" />
          </template>
        </q-input>

        <div class="row justify-between q-mt-lg">
          <q-btn push color="white" text-color="primary" label="Register" type="submit" :loading="storeAuth.loading" />

          <!-- <q-btn flat color="white" label="Kembali ke Login" @click="router.push({ name: 'login' })" /> -->
          <div class="column flex-center cursor-pointer f-12" :class="hoverred ? 'text-red' : 'text-grey-4'"
            @mouseover="hoverred = true" @mouseleave="hoverred = false" @click="goToLogin()">
            <div>Back to Login</div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

defineProps({
  register: {
    type: String,
    default: 'RSUD MOH SALEH'
  }
})

const router = useRouter()
const storeAuth = useAuthStore()
const hoverred = ref(false)
const isPasw = ref(true)
const myForm = ref(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function onSubmit() {
  storeAuth.register(form.value)
}

function goToLogin() {
  router.push({ name: 'login', params: { mode: 'login-mode' }, replace: true })
  // location.reload()
}
</script>
