<template>
  <div>
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import FooterBar from '@/components/FooterBar'
import { CronJob } from 'cron'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar
  },
  computed: {
    ...mapState({ user: state => state.auth.user })
  },
  methods: {
    ...mapActions(['loadContent', 'auth/fetchUser'])
  },
  async created() {
    const job = new CronJob('*/20 * * * *', async () => {
      await this.loadContent()
    })
    job.start()
    if (!this.user) {
      await this['auth/fetchUser']()
    }
    await this.loadContent()
  },
  watch: {
    user: function(n) {
      const { meta } = this.$route
      if (meta.requiresAuth && !n) {
        this.$router.push({ name: 'RecruiterHome' })
      }
    },
    $route(to, from) {
      if (to.path !== from.path) {
        window.scrollTo(0, 0)
      }
      if (to.meta.requiresAuth && !this.user) {
        this.$router.push({ name: 'RecruiterHome' })
      }
    }
  }
}
</script>
