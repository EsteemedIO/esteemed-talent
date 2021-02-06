import { ref, watch } from '@vue/composition-api'
import store from '@/store'

export function authFlow (root) {
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    verifyCode: ''
  })
  const formSuccess = ref('')

  async function handleAuth (type) {
    const authStatus = await store.dispatch(`auth/${type}`, {
      user: form.value
    })
    if (authStatus === 'verify') {
      this.hideModal(`${type}Modal`)
      return this.showModal('verifyModal')
    }
    if (authStatus === 'success') {
      return this.hideModal(`${type}Modal`)
    }
  }

  async function logout () {
    await store.dispatch('auth/logout')
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  async function requestNewCode () {
    const msg = await store.dispatch('auth/requestNewCode', {
      email: form.value.email
    })
    if (msg) formSuccess.value = msg
  }

  watch(async () => {
    if (root.$route.query.code) {
      const code = root.$route.query.code
      await store.dispatch('auth/signinSlack', { code })
    }
  })

  return { handleAuth, logout, requestNewCode, form, formSuccess }
}
