import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '@/views/Profile'
import HomeRecruiter from '@/views/HomeRecruiter.vue'
import HomeTalent from '@/views/HomeTalent.vue'
import TalentFeed from '@/views/TalentMain'
import TalentFeedDisplay from '@/components/Talent/TalentFeedDisplay'
import Talent from '@/views/Talent'
import JobsFeed from '@/views/JobsMain'
import JobsFeedDisplay from '@/components/Jobs/JobsFeedDisplay'
import Job from '@/views/Job'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RecruiterHome',
    component: HomeRecruiter
  },
  {
    path: '/talent-home',
    name: 'TalentHome',
    component: HomeTalent
  },
  {
    path: '/talent-feed',
    name: 'TalentFeed',
    component: TalentFeed,
    children: [
      {
        path: '/talent-feed',
        name: 'TalentFeedDisplay',
        component: TalentFeedDisplay
      },

      {
        path: '/talent-feed/talent/:id',
        name: 'Talent',
        component: Talent
      }
    ]
  },
  {
    path: '/jobs',
    name: 'JobsFeed',
    component: JobsFeed,
    children: [
      {
        path: '/jobs',
        name: 'JobsFeedDisplay',
        component: JobsFeedDisplay
      },
      {
        path: '/jobs/:id',
        name: 'Job',
        component: Job
      }
    ]
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const user = store.state.auth.user
//   return next()
// })

export default router
