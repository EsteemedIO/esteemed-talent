<template>
  <b-navbar
    id="navbar"
    toggleable="lg"
    class="navbar-expand-lg w-100 mb-2 mt-n3 mt-lg-0 bg-white d-flex justify-content-between sticky-top align-items-center pb-0 pb-lg-2 px-lg-3 px-0 px-lg-5"
    style="min-height: 70px;"
  >
    <a href="https://esteemed.io/" class="pl-3 pl-lg-0">
      <img class="logo" src="../assets/imgs/logo/esteemed-bw-logo.svg" alt="" />
    </a>

    <b-navbar-toggle
      class="pr-3 pr-lg-0"
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

    <b-collapse
      id="nav-collapse"
      is-nav
      class="mt-3 mt-lg-0 px-4 px-lg-0 pb-4 pb-lg-0"
    >
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
            class="btn btn-secondary mr-lg-5 btn__nav"
            @click="showModal('loginModal')"
          >
            Login
          </BaseButton>
          <BaseButton
            class="btn btn-secondary mr-lg-5 btn__nav my-3 my-lg-0"
            @click="showModal('signupModal')"
          >
            Signup
          </BaseButton>

          <BaseButton class="btn btn-secondary btn__nav"
            ><router-link :to="{ name: 'TalentFeed' }"> </router-link>Get
            Started Here
          </BaseButton>
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
        <div class="d-flex justify-content-between">
          <BaseButton
            @click.prevent="handleAuth(item.type)"
            class="btn btn-primary m-0 btn-block mt-4 modal_btn"
          >
            <div>{{ slotProps.modalTitle }}</div>
          </BaseButton>
          <div class="mt-4" v-if="item.type === 'verify'">
            <a @click="requestNewCode()">resend code to {{ form.email }}</a>
          </div>
          <div class="mt-4 d-inline" v-if="item.type === 'login'">
            <a @click="forgotPasswordStart()">forgot password</a>
          </div>
        </div>
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
        <p v-if="state.auth.authError" class="d-block mt-2 pt-2 text-danger">
          {{ state.auth.authError }}
        </p>
        <p
          v-if="item.type === 'verify' && formSuccess && !state.auth.authError"
          class="d-block mt-2 pt-2 text-success"
        >
          {{ formSuccess }}
        </p>
      </template>
    </BaseModalWraper>
    <!------------------ Modals ------------------>
  </b-navbar>
</template>

<script>
import { ref } from '@vue/composition-api'
import { getState } from '@/use/getState'
import { authFlow } from '@/use/authFlow'
import { useModal } from '@/use/useModal'
import { scrollFeatures } from '@/use/scrollFeatures'
import { authForm as formFields } from '@/forms'

export default {
  name: 'NavBar',
  setup(_, { root }) {
    const buttonActive = ref(false) // For adding styles to mobile button

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

    function toggleButton() {
      buttonActive.value = !buttonActive.value
    }

    scrollFeatures()
    const { state } = getState(root)
    const { showModal, hideModal } = useModal()
    const {
      handleAuth,
      logout,
      requestNewCode,
      form,
      formSuccess,
      forgotPasswordStart
    } = authFlow(root)

    return {
      state,
      handleAuth,
      logout,
      requestNewCode,
      form,
      formSuccess,
      menu,
      formFields,
      toggleButton,
      buttonActive,
      showModal,
      hideModal,
      forgotPasswordStart
    }
  },
  computed: {
    currentPage() {
      return this.$route.path
    }
  }
}
</script>
