import axios from 'axios'
// import { jobs as jobsDb } from './db.js'
import { getToken } from '@/auth/cognitoAuth'

// const PRODUCTION_BACKEND = 'https://app.drupalcontractors.com:3000/'
// const DEVELOPMENT_BACKEND = 'http://localhost:3000/'

const baseUrl = 'https://app.drupalcontractors.com:3000/'
// process.env.NODE_ENV === 'production'
// ? PRODUCTION_BACKEND
// : DEVELOPMENT_BACKEND

const Api = axios.create({
  baseURL: baseUrl
})

Api.interceptors.request.use(async request => {
  const { jwtToken } = await getToken()
  request.headers.authorization = jwtToken
  return request
})

export const jobs = {
  get: async () =>
    Api.get('/jobs'),

  postApplicant: async ({ applicant, job }) =>
    Api.post('/upload-applicant', { applicant, job }),

  postResume: async ({ resume }) =>
    Api.post('/upload-resume',
      resume,
      { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }
    )
}

export const oauth = {
  slackToken: async ({ code }) => axios.get(`https://slack.com/api/oauth.v2.access?client_id={ID HERE}&client_secret={ID HERE}&code=${code}`),

  slackUser: async ({ token }) => {
    return axios.get('https://slack.com/api/users.identity', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

export const talent = {
  get: async () => axios.get('http://localhost:3000/get-all-talent')
}
