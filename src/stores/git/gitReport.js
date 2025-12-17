import { defineStore } from 'pinia'
import { date } from 'quasar'
import axios from 'axios'
import { useAplikasiStore } from '../app/aplikasi'

export const useGitReportStore = defineStore('git-report', {
  state: () => ({
    loading: false,
    commits: [],
    contributors: [],
    branch: [
      'master'
    ],
    repos: [
      {
        label: 'Frontend SIMRS',
        value: 'simrs-v3'
      },
      {
        label: 'Backend SIMRS',
        value: 'api.laborat'
      },
      {
        label: 'Frontend Website',
        value: 'web-rsudmochsaleh'
      },
      {
        label: 'Backend Website',
        value: 'api.webmochsaleh'
      },
      {
        label: 'XENTER Mobile',
        value: 'simrs-mobile'
      }
    ],
    params: {
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      branch: 'master'
    },
    repoConfig: {
      owner: 'cvudumbarainformatika',
      repo: 'simrs-v3',
      baseURL: 'https://api.github.com',
      token: null
    }
  }),

  getters: {
    sortedContributors() {
      return [...this.contributors].sort((a, b) => b.weeklyCommits - a.weeklyCommits)
    }
  },

  actions: {

    initGit() {
      const app = useAplikasiStore()
      this.repoConfig.owner = app?.git?.owner
      this.repoConfig.token = app?.git?.token

    },

    async getGitReport() {
      this.loading = true
      const { owner, repo, baseURL, token } = this.repoConfig

      try {
        const gitApi = axios.create({
          baseURL,
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })

        // Get commits data
        const commitsResponse = await gitApi.get(
          `/repos/${owner}/${repo}/commits`,
          {
            params: {
              since: `${this.params.from}T00:00:00Z`,
              until: `${this.params.to}T23:59:59Z`,
              sha: this.params.branch
            }
          }
        )

        // Fetch detailed commit information
        const commitPromises = commitsResponse.data.map(async commit => {
          const detailResponse = await gitApi.get(`/repos/${owner}/${repo}/commits/${commit.sha}`)
          return {
            hash: commit.sha.substring(0, 7),
            date: date.formatDate(commit.commit.author.date, 'YYYY-MM-DD HH:mm'),
            author: commit.commit.author.name,
            email: commit.commit.author.email,
            message: commit.commit.message,
            url: commit.html_url,
            additions: detailResponse.data.stats.additions,
            deletions: detailResponse.data.stats.deletions,
            files: detailResponse.data.files?.length
          }
        })

        this.commits = await Promise.all(commitPromises)

        // Add retry logic for contributors stats
        let retryCount = 0
        let statsResponse

        while (retryCount < 3) {
          statsResponse = await gitApi.get(
            `/repos/${owner}/${repo}/stats/contributors`
          )

          // Check if we got valid data
          if (statsResponse.data && statsResponse.data?.length > 0) {
            break
          }

          // If no data, wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000))
          retryCount++
        }

        this.contributors = Array.isArray(statsResponse.data) ? statsResponse.data.map(contributor => ({
          name: contributor.author.login,
          avatar: contributor.author.avatar_url,
          totalCommits: contributor.total,
          weeklyCommits: contributor.weeks.reduce((acc, week) => {
            if (new Date(week.w * 1000) >= new Date(this.params.from) &&
              new Date(week.w * 1000) <= new Date(this.params.to)) {
              return acc + week.c
            }
            return acc
          }, 0),
          additions: contributor.weeks.reduce((acc, week) => acc + week.a, 0),
          deletions: contributor.weeks.reduce((acc, week) => acc + week.d, 0)
        })) : []

        // If still no contributors data after retries, try fallback method
        if (this.contributors?.length === 0) {
          // Get unique contributors from commits
          const uniqueContributors = new Map()

          for (const commit of this.commits) {
            if (!uniqueContributors.has(commit.email)) {
              uniqueContributors.set(commit.email, {
                name: commit.author,
                email: commit.email,
                totalCommits: 1,
                weeklyCommits: 1,
                additions: commit.additions || 0,
                deletions: commit.deletions || 0
              })
            } else {
              const contributor = uniqueContributors.get(commit.email)
              contributor.totalCommits++
              contributor.weeklyCommits++
              contributor.additions += (commit.additions || 0)
              contributor.deletions += (commit.deletions || 0)
            }
          }

          this.contributors = Array.from(uniqueContributors.values())
        }

      } catch (error) {
        console.error('Error fetching git report:', error)
        this.commits = []
        this.contributors = []
      } finally {
        this.loading = false
      }
    },

    async getCommitDetail(hash) {
      const { owner, repo, baseURL, token } = this.repoConfig

      try {
        const gitApi = axios.create({
          baseURL,
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })

        const response = await gitApi.get(
          `/repos/${owner}/${repo}/commits/${hash}`
        )

        return {
          files: response.data.files.map(file => ({
            filename: file.filename,
            status: file.status,
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes
          })),
          stats: response.data.stats
        }
      } catch (error) {
        console.error('Error fetching commit detail:', error)
        return null
      }
    },

    async getBranches() {
      const { owner, repo, baseURL, token } = this.repoConfig
      try {
        const gitApi = axios.create({
          baseURL,
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })

        const response = await gitApi.get(
          `/repos/${owner}/${repo}/branches`
        )

        this.branch = response.data.map(branch => branch.name)
        // Set default branch if current branch doesn't exist in new repo
        if (!this.branch.includes(this.params.branch)) {
          this.params.branch = this.branch[0]
        }
      } catch (error) {
        console.error('Error fetching branches:', error)
        this.branch = ['master'] // fallback to master if error
      }
    }
  }
})
