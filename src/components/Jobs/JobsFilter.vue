<template>
  <main class="p-4">
    <div class="pl-4 ">
      <ul class="ml-n3">
        <input
          placeholder="Search"
          v-model="selected.search"
          type="text"
          class="form-group d-block "
        />
      </ul>
      <div
        class="d-flex flex-lg-column flex-row justify-content-between justify-content-lg-start flex-wrap"
      >
        <b-form-group
          v-for="(item, $index) in choices"
          class="d-block"
          :key="$index"
          :label="item.title"
          v-slot="{ ariaDescribedby }"
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
        style="border:1px solid #231f20 !important"
        @click="reset"
        ><small>reset</small></BaseButton
      >
    </div>
  </main>
</template>

<script>
import { reactive, computed, watch } from '@vue/composition-api'
import { scrollToTop } from '@/helpers'
import store from '@/store'

export default {
  name: 'JobsFilter',
  setup() {
    const { selected, choices, reset } = radioButtons()

    return { selected, choices, reset }
  }
}

// Abstract function for future integration with other filter neeeds
function radioButtons() {
  const selected = reactive({
    address: 'Any',
    employmentType: 'Any',
    addressCity: 'Any',
    search: ''
  })

  const choices = computed(() => store.getters['jobs/getChoicesList'])

  const reset = function() {
    selected.address = 'Any'
    selected.employmentType = 'Any'
    selected.addressCity = 'Any'
    selected.search = ''
  }

  watch(selected, () => {
    store.dispatch('jobs/filterJobs', {
      selected: selected
    })
    scrollToTop()
  })

  return { choices, selected, reset }
}
</script>

<style scoped>
main {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
