<template>
  <div class="git-report-page">
    <!-- Header -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat class="bg-primary text-white">
          <q-card-section>
            <div class="text-h5 text-weight-bold">
              <q-icon name="icon-mat-analytics" class="q-mr-sm" />
              Git Analytics Dashboard
            </div>
            <div class="text-subtitle2">
              <q-icon name="icon-mat-track_changes" class="q-mr-sm" />
              Track your team's development progress
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-12">
        <q-card flat class="bg-white filter-card">
          <q-card-section>
            <div class="row q-col-gutter-md items-center">
              <div class="col-md-3 col-sm-6 col-xs-12">
                <q-select v-model="store.repoConfig.repo" :options="store.repos" option-label="label"
                  option-value="value" label="Repository" map-options outlined dense @update:model-value="onRepoChange">
                  <template v-slot:prepend>
                    <q-icon name="icon-mat-code" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12">
                <q-input v-model="store.params.from" label="From Date" type="date" outlined dense>
                  <template v-slot:prepend>
                    <q-icon name="icon-mat-event" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12">
                <q-input v-model="store.params.to" label="To Date" type="date" outlined dense>
                  <template v-slot:prepend>
                    <q-icon name="icon-mat-event" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12">
                <q-select v-model="store.params.branch" label="Branch" :options="store.branch" outlined dense>
                  <template v-slot:prepend>
                    <q-icon name="icon-mat-account_tree" />
                  </template>
                </q-select>
              </div>
            </div>
            <!-- Refresh Button -->
            <div class="row justify-end q-mt-md">
              <q-btn color="primary" icon="icon-mat-refresh" label="Refresh Data" @click="store.getGitReport"
                :loading="store.loading">
                <q-tooltip>Refresh data git berdasarkan filter</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="row q-col-gutter-md q-mt-md">
      <!-- Contributors Summary -->
      <div class="col-md-4 col-sm-12">
        <q-card flat class="bg-white full-height">
          <q-card-section>
            <div class="text-h6 q-mb-md">
              <q-icon name="icon-mat-group" class="q-mr-sm text-primary" />
              Team Contributors
            </div>
            <div class="contributors-list q-gutter-y-md">
              <q-card flat v-for="contributor in sortedContributors" :key="contributor.name"
                class="contributor-card q-pa-sm" bordered>
                <div class="row items-center no-wrap">
                  <q-avatar size="50px">
                    <img :src="contributor.avatar">
                  </q-avatar>
                  <div class="col q-ml-md">
                    <div class="text-weight-bold">{{ contributor.name }}</div>
                    <div class="row q-gutter-x-md text-grey-7">
                      <div>
                        <q-icon name="icon-mat-code" size="xs" />
                        <span class="text-weight-medium">{{ contributor.weeklyCommits }}</span> commits
                      </div>
                      <div>
                        <q-icon name="icon-mat-add_circle" size="xs" class="text-positive" />
                        {{ contributor.additions }}
                      </div>
                      <div>
                        <q-icon name="icon-mat-remove_circle" size="xs" class="text-negative" />
                        {{ contributor.deletions }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Commit History -->
      <div class="col-md-8 col-sm-12">
        <q-card flat class="bg-white">
          <q-card-section>
            <div class="text-h6 q-mb-md row items-center justify-between">
              <div>
                <q-icon name="icon-mat-history" class="q-mr-sm text-primary" />
                Commit History
              </div>

              <!-- Export buttons -->
              <div class="row q-gutter-sm">
                <q-btn flat dense color="green" icon="icon-mat-file_download" label="Excel" @click="exportToExcel"
                  :loading="exporting" :disable="!store.commits?.length">
                  <q-tooltip>Export ke Excel</q-tooltip>
                </q-btn>
                <q-btn flat dense color="red" icon="icon-mat-picture_as_pdf" label="PDF" @click="exportToPDF"
                  :loading="exporting" :disable="!store.commits?.length">
                  <q-tooltip>Export ke PDF</q-tooltip>
                </q-btn>
              </div>
            </div>

            <!-- Loading state -->
            <div v-if="store.loading" class="column items-center justify-center" style="min-height: 200px">
              <q-spinner-dots color="primary" size="40px" />
              <div class="text-grey q-mt-sm">Mengambil data commit...</div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!store.commits?.length" class="column items-center justify-center q-pa-md"
              style="min-height: 200px">
              <div class="text-center">
                <q-icon name="icon-mat-source" size="64px" class="text-grey-4 empty-state-icon" />
                <div class="text-subtitle1 text-grey-8 q-mt-md">
                  Belum Ada History Commit
                </div>
                <div class="text-caption text-grey-6 q-mt-sm">
                  Tidak ditemukan commit pada rentang tanggal
                  <div class="text-weight-bold text-primary">
                    {{ store.params.from }} - {{ store.params.to }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Commit list when data exists -->
            <div v-else class="commit-list q-gutter-y-sm">
              <q-card v-for="commit in store.commits" :key="commit.hash" bordered flat class="commit-item">
                <q-card-section>
                  <div class="row items-start no-wrap">
                    <!-- Left side: Avatar and branch indicator -->
                    <div class="col-auto q-pr-md">
                      <q-avatar size="40px">
                        <img :src="getAuthorAvatar(commit.author)">
                      </q-avatar>
                      <div class="branch-line"></div>
                    </div>

                    <!-- Middle: Commit info -->
                    <div class="col">
                      <div class="text-weight-bold text-primary">{{ commit.message }}</div>

                      <!-- Add author name -->
                      <div class="text-caption q-mt-xs">
                        <q-icon name="icon-mat-person" size="xs" class="q-mr-xs" />
                        <span class="text-weight-medium">{{ commit.author }}</span>
                      </div>

                      <!-- Stats -->
                      <div class="row q-gutter-x-md q-mt-sm">
                        <div class="stats-chip">
                          <q-icon name="icon-mat-add_circle" size="xs" class="text-positive" />
                          <span class="text-caption q-ml-xs">{{ commit.additions || 0 }}</span>
                          <q-tooltip>
                            {{ commit.additions || 0 }} baris kode ditambahkan
                          </q-tooltip>
                        </div>
                        <div class="stats-chip">
                          <q-icon name="icon-mat-remove_circle" size="xs" class="text-negative" />
                          <span class="text-caption q-ml-xs">{{ commit.deletions || 0 }}</span>
                          <q-tooltip>
                            {{ commit.deletions || 0 }} baris kode dihapus
                          </q-tooltip>
                        </div>
                        <div class="stats-chip">
                          <q-icon name="icon-mat-description" size="xs" />
                          <span class="text-caption q-ml-xs">{{ commit.files || 0 }} files</span>
                          <q-tooltip>
                            {{ commit.files || 0 }} file dimodifikasi dalam commit ini
                          </q-tooltip>
                        </div>
                      </div>

                      <!-- Updated date and time display -->
                      <div class="flex q-gutter-sm q-mt-xs">
                        <div class="text-caption text-weight-medium text-primary">
                          {{ humanDate(commit.date) }}
                          <q-tooltip>
                            Tanggal commit
                          </q-tooltip>
                        </div>
                        <div class="text-caption text-grey-7">
                          <q-icon name="icon-mat-access_time" size="xs" />
                          {{ formatJam(commit.date) }}
                          <q-tooltip>
                            Waktu commit
                          </q-tooltip>
                        </div>
                      </div>
                    </div>

                    <!-- Right: Actions and DateTime -->
                    <div class="col-auto">
                      <div class="row q-gutter-x-sm justify-end">
                        <q-btn flat round dense color="primary" icon="icon-mat-visibility"
                          @click="openCommitUrl(commit.url)">
                          <q-tooltip>
                            Buka commit di GitHub
                          </q-tooltip>
                        </q-btn>
                        <q-btn flat round dense color="deep-purple" icon="icon-mat-info"
                          @click="showCommitDetail(commit.hash)">
                          <q-tooltip>
                            Lihat detail perubahan
                          </q-tooltip>
                        </q-btn>
                      </div>

                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Commit Detail Dialog -->
    <q-dialog v-model="showDetail" persistent>
      <q-card style="width: 700px; max-width: 90vw">
        <q-bar class="bg-primary text-white">
          <div class="text-weight-bold">Commit Details</div>
          <q-space />
          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="scroll" style="max-height: 80vh">
          <div v-if="commitDetail" class="row q-col-gutter-md">
            <div class="col-12">
              <q-card flat class="bg-white">
                <q-card-section>
                  <div class="text-h6 q-mb-md">Changed Files</div>
                  <div class="row q-col-gutter-md">
                    <div v-for="file in commitDetail.files" :key="file.filename" class="col-12">
                      <q-card bordered flat class="file-card">
                        <q-card-section>
                          <div class="text-weight-medium">{{ file.filename }}</div>
                          <div class="row q-gutter-x-md q-mt-sm">
                            <q-chip dense :color="getStatusColor(file.status)" text-color="white"
                              :label="file.status" />
                            <q-chip dense color="positive" text-color="white" icon="icon-mat-add"
                              :label="file.additions" />
                            <q-chip dense color="negative" text-color="white" icon="icon-mat-remove"
                              :label="file.deletions" />
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGitReportStore } from 'src/stores/git/gitReport'
import { useQuasar } from 'quasar'
import { onMounted, onUnmounted } from 'vue'
import { humanDate, formatJam } from 'src/modules/formatter'
import { exportFile } from 'quasar'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'

const store = useGitReportStore()
const showDetail = ref(false)
const commitDetail = ref(null)
const $q = useQuasar()
const exporting = ref(false)

function getStatusColor(status) {
  const colors = {
    'modified': 'blue',
    'added': 'positive',
    'removed': 'negative',
    'renamed': 'purple'
  }
  return colors[status] || 'grey'
}

function getAuthorAvatar(author) {
  const contributor = store.contributors.find(c => c.name === author)
  return contributor?.avatar || 'https://cdn.quasar.dev/img/avatar.png'
}

function openCommitUrl(url) {
  window.open(url, '_blank')
}

async function showCommitDetail(hash) {
  commitDetail.value = await store.getCommitDetail(hash)
  showDetail.value = true
}

function copyToClipboard(hash) {
  navigator.clipboard.writeText(hash)
  // Optional: Add notification using Quasar
  $q.notify({
    message: 'Commit hash copied to clipboard',
    color: 'positive',
    icon: 'icon-mat-check_circle',
    position: 'top'
  })
}

// Computed property untuk sorted contributors
const sortedContributors = computed(() => {
  return [...store.contributors].sort((a, b) => b.weeklyCommits - a.weeklyCommits)
})

// Load initial data

// Set dark mode for this page only
onMounted(() => {
  $q.dark.set(false) // Memastikan mode light aktif
  // Promise.all([
  store.initGit()
  store.getBranches()
  store.getGitReport()
  // ])

})

// Restore previous dark mode setting when leaving the page
onUnmounted(() => {
  $q.dark.set(false) // atau sesuai setting default aplikasi
})

// Fungsi untuk export ke Excel
async function exportToExcel() {
  try {
    exporting.value = true

    // Format data untuk excel
    const excelData = store.commits.map(commit => ({
      'Date': humanDate(commit.date),
      'Time': formatJam(commit.date),
      'Author': commit.author,
      'Message': commit.message,
      'Additions': commit.additions || 0,
      'Deletions': commit.deletions || 0,
      'Files Changed': Array.isArray(commit.files) ? commit.files?.length : 0,
      'Commit Hash': commit.hash,
      'URL': commit.url
    }))

    // Buat workbook dan worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(excelData)

    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Git Commits')

    // Generate file excel
    const fileName = `git-commits-${store.params.from}-to-${store.params.to}.xlsx`
    XLSX.writeFile(wb, fileName)

    $q.notify({
      message: 'Export Excel berhasil',
      color: 'positive',
      icon: 'icon-mat-check_circle'
    })
  } catch (error) {
    console.error('Export Excel error:', error)
    $q.notify({
      message: 'Gagal export ke Excel',
      color: 'negative',
      icon: 'icon-mat-error'
    })
  } finally {
    exporting.value = false
  }
}

// Fungsi untuk export ke PDF
async function exportToPDF() {
  try {
    exporting.value = true

    const doc = new jsPDF()
    const lineHeight = 7
    let y = 15

    // Add title
    doc.setFontSize(16)
    doc.setTextColor(33, 150, 243) // Primary color
    doc.text('Git Commit Report', 14, y)

    // Add period
    y += 10
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Period: ${store.params.from} to ${store.params.to}`, 14, y)

    // Add commits
    y += 10
    store.commits.forEach((commit, index) => {
      if (y > 270) { // Check if near page bottom
        doc.addPage()
        y = 15
      }

      // Commit number and date
      doc.setFontSize(11)
      doc.setTextColor(33, 150, 243)
      doc.text(`#${index + 1} - ${humanDate(commit.date)} ${formatJam(commit.date)}`, 14, y)

      // Author
      y += lineHeight
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(`Author: ${commit.author}`, 14, y)

      // Message
      y += lineHeight
      const message = commit.message?.length > 60
        ? commit.message.substring(0, 60) + '...'
        : commit.message
      doc.text(`Message: ${message}`, 14, y)

      // Stats
      y += lineHeight
      doc.text(`Added: ${commit.additions || 0} | Deleted: ${commit.deletions || 0} | Files: ${Array.isArray(commit.files) ? commit.files?.length : 0}`, 14, y)

      y += lineHeight + 3 // Extra space between commits
    })

    // Save PDF
    const fileName = `git-commits-${store.params.from}-to-${store.params.to}.pdf`
    doc.save(fileName)

    $q.notify({
      message: 'Export PDF berhasil',
      color: 'positive',
      icon: 'icon-mat-check_circle'
    })
  } catch (error) {
    console.error('Export PDF error:', error)
    $q.notify({
      message: 'Gagal export ke PDF',
      color: 'negative',
      icon: 'icon-mat-error'
    })
  } finally {
    exporting.value = false
  }
}

async function onRepoChange(newRepo) {
  // console.log('newRepo', newRepo);
  store.repoConfig.repo = newRepo?.value
  if (store.repoConfig.repo === 'api.laborat') {
    store.params.branch = 'sigarang'
  }
  await store.getBranches() // Get new branches for selected repo
  // store.getGitReport() // Refresh report data
}
</script>
<style lang="scss" scoped>
.filter-input {
  .q-field__control {
    background: white;
  }
}

.contributor-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.commit-list {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2196F3;
    border-radius: 3px;
  }
}

.commit-item {
  transition: all 0.2s ease;
  border-left: 3px solid #2196F3;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.15);
  }

  // Tambahan style untuk tanggal dan waktu
  .text-primary {
    color: #1976D2 !important;
  }
}

.branch-line {
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #2196F3 50%, transparent);
  margin-left: 19px;
  margin-top: 4px;
}

.stats-chip {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 12px;

  .q-icon {
    font-size: 16px;
  }
}

.file-card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
}

.monospace {
  font-family: monospace;
}

.empty-state-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
<style lang="scss">
.git-report-page {
  background: $grey-2;
  min-height: 100vh;
  padding: 20px;

  .filter-card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .contributor-card {
    background: #ffffff;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .q-card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .empty-state-icon {
    animation: float 3s ease-in-out infinite;
    opacity: 0.7;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
}
</style>
