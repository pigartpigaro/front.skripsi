<template>
  <div class="login-form full-height column flex-center text-white q-pa-lg">
    <div class="form q-mb-sm">
      <div class="text-h6 judul-form">
        REGISTER
      </div>
    </div>
    <div class="q-my-sm full-width">
      <q-form ref="myForm" class="q-pa-sm" @submit="onSubmit">
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
            <div>Already have an account?</div>
            <div>Login Now</div>
          </div>
        </div>
      </q-form>
    </div>
    <div class="app-v text-grey-4">
      app versi v{{ appVersion }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

import packageJson from '../../../../package.json'
const appVersion = ref(packageJson.version || '0.0.1')
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
  router.push({ name: 'login-mode', params: { mode: 'form-login' }, replace: true })
  // location.reload()
}
</script>
<style lang="scss" scoped>
.app-v {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.q-field__native {

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 9999s ease-in-out 0s;
  }

  // &input:-internal-autofill-previewed,
  // &input:-internal-autofill-selected{
  //   -webkit-box-shadow: none;
  // }

}
</style>
