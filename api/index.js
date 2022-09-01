import axios from 'axios'

const baseUrl = 'https://esteemed-api-internal-ietro.ondigitalocean.app/'

const Api = axios.create({
  baseURL: baseUrl
})

export const jobs = {
  get: async () => await Api.get('/jobs'),

  postApplicant: async ({ applicant, job }) =>
    await Api.post('/upload-applicant', { applicant, job }),

  postResume: async ({ resume }) =>
    await Api.post('/upload-resume', resume, {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
    })
}
