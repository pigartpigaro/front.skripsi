<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-md">
      <!-- Left side tabs -->
      <div class="col-12 col-md-2">
        <q-card flat bordered class="settings-card">
          <q-tabs v-model="tab" vertical class="text-primary" active-color="primary" indicator-color="primary" dense>
            <q-tab name="general" no-caps>
              <template #default>
                <div class="row items-center q-gutter-x-sm">
                  <q-icon name="icon-mat-settings" />
                  <div>General</div>
                </div>
              </template>
            </q-tab>
            <q-tab name="alarms" no-caps>
              <template #default>
                <div class="row items-center q-gutter-x-sm">
                  <q-icon name="icon-mat-dashboard" />
                  <div>Alarms</div>
                </div>
              </template>
            </q-tab>
          </q-tabs>
        </q-card>
      </div>

      <!-- Right side content -->
      <div class="col-12 col-md-10">
        <q-card flat bordered class="settings-panel">
          <q-tab-panels v-model="tab" animated swipeable horizontal transition-prev="slide-right"
            transition-next="slide-left">
            <!-- General Settings -->
            <q-tab-panel name="general">
              <div class="text-h6 q-mb-md">General Settings</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="settings-item">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="icon-mat-language" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Language</q-item-label>
                        <q-item-label caption>Select your preferred language</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-select dense outlined v-model="language" :options="['English', 'Indonesian']" />
                      </q-item-section>
                    </q-item>
                  </q-card>
                </div>
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="settings-item">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="icon-mat-dark_mode" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Dark Mode</q-item-label>
                        <q-item-label caption>Toggle dark/light theme</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-toggle v-model="darkMode" color="primary" />
                      </q-item-section>
                    </q-item>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>

            <!-- Alarms Settings -->
            <q-tab-panel name="alarms">
              <AlarmPanel />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const tab = ref('general')
const language = ref('English')
const darkMode = ref(false)

const AlarmPanel = defineAsyncComponent(() => import('./settings/AlarmPanel.vue'))

</script>

<style lang="scss" scoped>
.settings-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

.settings-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  min-height: 400px;
}

.settings-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

// Dark mode overrides
.body--dark {

  .settings-card,
  .settings-panel,
  .settings-item {
    background: rgba(30, 30, 30, 0.7);
  }
}
</style>
