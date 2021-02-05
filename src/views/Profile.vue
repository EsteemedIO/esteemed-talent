<template>
  <div>
    <div class="container p-4">
      <div class="row">
        <div class="col-10">
          <div class="p-2">
            <div class="row">
              <div class="col-2">
                <img
                  width="100%"
                  src="../assets/imgs/user-placeholder.jpg"
                  alt=""
                />
              </div>
              <div class="col-10">
                <p>
                  {{ fullName }}
                </p>
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
    <div class="container mt-2 mb-5 p-4">
      <div class="row">
        <div class="col-10">
          <div class="p-2">
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
              <div class="col-3 img_col">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapGetters({ fullName: 'auth/getUserFullName' }),
    ...mapState({ user: state => state.auth.user })
  },
  created() {
    const id = this.$route.params.id
    if (this.user.username.toString() !== id) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
img {
  width: 100% !important;
}
.container {
  background-color: var(--bg-grey);
}
</style>
