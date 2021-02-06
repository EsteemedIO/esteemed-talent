<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-10">
          <div class="esteemed-container p-2">
            <div class="row">
              <div class="col-2">
                <img
                  width="100%"
                  src="../assets/imgs/user-placeholder.jpg"
                  alt=""
                />
              </div>
              <div class="col-10">
                <p>Name {{ talent.name }}</p>
                <p>Job Title: {{ talent.title }}</p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus accusantium incidunt perferendis, doloribus tempora
                ullam, animi dolores natus eligendi nobis unde error asperiores
                rem numquam magnam aliquam. Magnam, optio repellendus.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-10">
          <div class="esteemed-container p-2">
            <div class="row">
              <div class="col-6">
                <p>resume</p>
              </div>
              <div class="col-3">
                <div>
                  <img
                    src="../assets/imgs/placeholder_img_mountain.png"
                    alt=""
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam nemo, deleniti, aut at autem hic vero libero molestiae
                  consequatur tenetur corrupti quia tempore, nihil earum illum
                  consequuntur quod eaque impedit.
                </p>
                <ol class="pl-3">
                  <li>lorem</li>
                  <li>ipsum</li>
                  <li>text</li>
                </ol>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam nemo, deleniti, aut at autem hic vero libero molestiae
                  consequatur tenetur corrupti quia tempore, nihil earum illum
                  consequuntur quod eaque impedit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam nemo, deleniti, aut at autem hic vero libero molestiae
                  consequatur tenetur corrupti quia tempore, nihil earum illum
                  consequuntur quod eaque impedit.
                </p>
              </div>
              <div class="col-3 img-col">
                <div>
                  <img src="../assets/imgs/user-placeholder.jpg" alt="" />
                </div>
                <div>
                  <img src="../assets/imgs/user-placeholder.jpg" alt="" />
                </div>
                <div>
                  <img src="../assets/imgs/user-placeholder.jpg" alt="" />
                </div>
                <div>
                  <img src="../assets/imgs/user-placeholder.jpg" alt="" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <BaseButton
                  @click="showModal('talentModal')"
                  class="btn btn-secondary ml-auto d-block"
                >
                  <div>click and see what happens</div>
                </BaseButton>
              </div>
              <div class="col-6">
                <button class="btn btn-primary">
                  click and see what happens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModalWraper
      :modalTitle="'hello ' + talent.name"
      modalRef="talentModal"
      ref="talentModal"
      content-class="job_modal"
      body-class="job_modal small_screen_modal"
      dialog-class="small_screen_modal"
    >
      <template v-slot:form>
        <p>{{ talent.about }}</p>
        Skills:
        <span v-for="(skill, $index) in talent.skills" :key="$index">
          {{ skill }}
        </span>
      </template>
      <template v-slot:button>
        <div class="mt-5">
          <BaseButton
            class="btn btn-primary mr-2"
            @click.prevent="doSomething()"
          >
            Yes I love them
          </BaseButton>
          <BaseButton class="btn btn-primary" @click.prevent="doSomething()">
            Nah, I don't love them
          </BaseButton>
        </div>
      </template>
    </BaseModalWraper>
  </div>
</template>

<script>
import { useModal } from '@/use/useModal'
export default {
  name: 'Talent',
  components: {},
  setup() {
    return useModal()
  },
  computed: {
    talent() {
      return this.$store.state.focusedTalent
    }
  },
  methods: {
    doSomething() {
      alert('hi')
    }
  },
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('getIndividualTalent', { id })
  }
}
</script>

<style scoped>
img {
  width: 100% !important;
}

.img-col > div {
  padding: 0 2em;
  margin: 0.5em 0;
}
</style>
