<template>
  <b-navbar
    id="navbar"
    toggleable="lg"
    class="navbar-expand-lg w-100 mb-2 mt-n3 mt-lg-0 bg-white d-flex justify-content-between sticky-top align-items-center pb-0 pb-lg-4 px-5"
    style="min-height: 70px;"
  >
    <a href="https://esteemed.io/" class="shift_right">
      <img class="logo" src="../assets/imgs/logo/esteemed-bw-logo.svg" alt="" />
    </a>

    <b-navbar-toggle
      target="nav-collapse"
      style="margin-top:-0.625rem;"
      @click="toggleButton"
    >
      <BIconList
        scale="1.5"
        class="hamburger_icon"
        :class="buttonActive ? 'hamburger_icon-active' : null"
      />
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <router-link
        class=" pt-3 text-center mx-auto ml-5 mx-lg-5 shift_right"
        :to="currentPage === '/talent-home' ? '/' : '/talent-home'"
      >
        <p>
          {{
            currentPage === '/talent-home'
              ? 'Show Recruiter Home'
              : 'Show Talent Home'
          }}
        </p>
      </router-link>

      <div class="ml-auto">
        <div
          v-if="state.auth.authStatus"
          class="d-flex flex-column flex-lg-row justify-content-center align-items-lg-start shift_left"
        >
          <div
            v-for="(item, $index) in menu"
            class="mx-lg-4 mx-auto d-flex justify-content-center"
            :key="$index"
          >
            <router-link
              class="d-flex flex-row flex-lg-column align-items-center mx-auto my-3 my-lg-0  w-100 py-2 py-lg-0"
              :to="
                item.ref === 'profile'
                  ? item.path + state.auth.user.username
                  : item.path
              "
            >
              <img
                width="30px"
                class="d-block mx-0 mx-lg-auto mb-0 mb-lg-1 mr-3 mr-lg-0"
                :src="require(`../assets/imgs/logo/${item.img}`)"
                alt=""
              />
              <small class="align-items-center">{{ item.title }}</small>
            </router-link>
          </div>

          <div class="mx-auto mx-lg-2 ml-5 mb-3 mb-lg-0 d-block">
            <BaseButton class="btn btn-primary btn__nav" @click="logout()">
              Logout
            </BaseButton>
          </div>
        </div>

        <div
          v-else
          class="d-flex flex-column flex-lg-row justify-content-center align-items-lg-start shift_left"
        >
          <BaseButton
            class="btn btn-secondary mr-5 btn__nav"
            @click="showModal('loginModal')"
          >
            Login
          </BaseButton>
          <BaseButton
            class="btn btn-secondary mr-5 btn__nav"
            @click="showModal('signupModal')"
          >
            Signup
          </BaseButton>
          <router-link :to="{ name: 'TalentFeed' }">
            <BaseButton class="btn btn-secondary  btn__nav"
              >Get Started Here</BaseButton
            >
          </router-link>
        </div>
      </div>
    </b-collapse>

    <!------------------ Modals ------------------>
    <BaseModalWraper
      v-for="(item, $index) in formFields"
      :key="$index"
      :modalTitle="item.title"
      :ref="item.ref"
      :modalRef="item.ref"
      content-class="job_modal"
      body-class="job_modal small_screen_modal"
      dialog-class="small_screen_modal"
    >
      <template v-slot:header="slotProps">
        <div class="h2">{{ slotProps.modalTitle }}</div>
      </template>
      <template v-slot:form>
        <ul class="form_list">
          <BaseInput
            v-for="(fieldItem, $i) in item.fields"
            :key="$i"
            :label="fieldItem.label"
            v-model="form[fieldItem.ref]"
            :type="fieldItem.type"
            class="form-group"
          />
        </ul>
      </template>

      <template v-slot:button="slotProps">
        <BaseButton
          @click.prevent="handleAuth(item.type)"
          class="btn btn-primary m-0 btn-block mt-4 modal_btn"
        >
          <div>{{ slotProps.modalTitle }}</div>
        </BaseButton>

        <!-- <a
          class="ml-4"
          v-if="item.type !== 'verify'"
          href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=${ID HERE}"
        >
          <img
            alt="Sign in with Slack"
            class="mt-2"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="
              https://platform.slack-edge.com/img/sign_in_with_slack.png    1x,
              https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x
            "
          />
        </a> -->
        <!-- <BaseButton
          v-if="item.type === 'login'"
          class="d-block"
          @click="showModal('signupModal')"
        >
          Signup
        </BaseButton> -->

        <p
          v-if="state.auth.authError"
          class="d-block mt-2 pl-5 pt-2 text-danger"
        >
          {{ state.auth.authError }}
        </p>
      </template>
    </BaseModalWraper>
    <!------------------ Modals ------------------>
  </b-navbar>
</template>

<script>
import { getState } from '@/use/getState'
import { ref, watch, onMounted } from '@vue/composition-api'
import { modalMixin } from '@/mixins/modalMixin'
import { authForm } from '@/forms'
import store from '@/store'
// import { BIconList } from 'bootstrap-vue'

export default {
  name: 'NavBar',
  mixins: [modalMixin],
  // components: { BIconList },
  setup(_, { root }) {
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      verifyCode: ''
    })

    const buttonActive = ref(false)

    async function handleAuth(type) {
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

    async function logout() {
      await store.dispatch('auth/logout')
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }

    function toggleButton() {
      buttonActive.value = !buttonActive.value
    }

    onMounted(() => {
      document.addEventListener('scroll', fromTop)
    })

    function fromTop() {
      const fromTop = window.scrollY
      const nav = document.getElementById('navbar')
      if (
        !Array.from(nav.classList).includes('shrink') &&
        fromTop > 58 &&
        window.outerWidth > 991
      ) {
        nav.classList.add('shrink')
      }
      if (
        (Array.from(nav.classList).includes('shrink') && fromTop < 60) ||
        window.outerWidth < 991
      ) {
        nav.classList.remove('shrink')
      }
    }

    watch(async () => {
      if (root.$route.query.code) {
        const code = root.$route.query.code
        await store.dispatch('signinSlack', { code })
      }
    })

    const formFields = ref(authForm)

    const menu = [
      {
        img: 'search.svg',
        path: '/talent-feed',
        title: 'Talent',
        ref: 'talent'
      },
      { img: 'briefcase.svg', path: '/jobs', title: 'Hiring', ref: 'jobs' },
      {
        img: 'profileRound.svg',
        path: '/profile/',
        title: 'My Profile',
        ref: 'profile'
      }
    ]

    return {
      ...getState(root),
      form,
      menu,
      handleAuth,
      logout,
      formFields,
      toggleButton,
      buttonActive
    }
  },
  computed: {
    currentPage() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
@media (max-width: 992px) {
  ul > li {
    padding: 2.5rem 0;
    border-top: rgba(0, 0, 0, 0.2) 1px solid;
    width: 100%;
  }
  ul > li:last-child {
    border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
  }
}
</style>
