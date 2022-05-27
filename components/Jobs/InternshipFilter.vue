<template>
  <main class="p-4 search_box" style="max-height: 85vh">
    <div class="pl-4">
      <ul class="ml-n3">
        <input
          v-model="selected.search"
          placeholder="Search"
          type="text"
          class="form-group d-block"
          @change="filter"
        />
      </ul>
      <div
        class="d-flex flex-lg-column flex-row justify-content-between justify-content-lg-start flex-wrap"
      >
        <b-form-group
          v-for="(item, $index) in choices"
          :key="$index"
          v-slot="{ ariaDescribedby }"
          :label="item.title"
          class="d-block"
        >
          <b-form-radio-group
            v-model="selected[item.ref]"
            :options="item.options"
            :aria-describedby="ariaDescribedby"
            :name="`${item.title}-selection`"
            stacked
          ></b-form-radio-group>
        </b-form-group>
      </div>
      <BaseButton
        class="btn px-3 py-1"
        style="border: 1px solid #231f20 !important"
        @click="reset"
        ><small>reset</small></BaseButton
      >
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'InternshipFilter',
  data() {
    return {
      selected: {
        address: 'Any',
        employmentType: 'Internship',
        addressCity: 'Any',
        search: ''
      }
    }
  },
  computed: {
    choices() {
      const choices = this.$store.getters.getChoicesList

      return choices.slice(0, choices.length - 1)
    },
    loading() {
      return this.$store.state.loading
    }
  },
  watch: {
    selected: {
      immediate: true,
      deep: true,
      handler() {
        this.filterJobs({ selected: this.selected })
      }
    }
  },
  methods: {
    ...mapActions(['filterJobs']),
    reset() {
      this.selected.address = 'Any'
      this.selected.employmentType = 'Any'
      this.selected.addressCity = 'Any'
      this.selected.search = ''
    },
    filter() {
      this.filterJobs({ selected: this.selected })
    }
  }
}
</script>

<style scoped>
main {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}

.search_box {
  overflow: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.search_box::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.search_box {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
