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

  // type will determian which modal / dispatch to activate
  // type === 'login' || 'signup' || 'forgotPassword' || 'submitNewPassword'
  async function handleAuth (type) {
    const authStatus = await store.dispatch(`auth/${type}`, {
      user: form.value
    })

    switch (authStatus) {
      case 'verify':
        this.hideModal(`${type}Modal`) // Hide login modal
        return this.showModal('verifyModal') // Show verfiy code modal
      case 'success':
        return this.hideModal(`${type}Modal`)
      case 'submitNewPassword' :
        this.hideModal('forgotPasswordModal')
        return this.showModal('submitNewPasswordModal')
      case 'passwordReset' :
        this.hideModal('submitNewPasswordModal')
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

  async function forgotPasswordStart () {
    this.hideModal('loginModal')
    this.showModal('forgotPasswordModal')
  }

  watch(async () => {
    if (root.$route.query.code) {
      const code = root.$route.query.code
      await store.dispatch('auth/signinSlack', { code })
    }
  })

  return { handleAuth, logout, requestNewCode, form, formSuccess, forgotPasswordStart }
}
