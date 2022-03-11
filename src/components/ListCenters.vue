<template>
  <Transition appear>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          @click="showDetail(cId)"
          class="accordion-button"
          :class="current === cId && clicked ? '' : 'collapsed'"
          type="button"
        >
          {{ city }}
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ show: current === cId && clicked }"
      >
        <div class="accordion-body">
          <strong>Pocet doktorov: </strong>
          {{ doctors }} <br />
          <strong>Pocet zaockovanych:</strong>
          {{ count }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'VacCenter',
  props: {
    cId: Number,
    city: String,
    doctors: Number,
    count: Number,
  },
  setup() {
    const state = reactive({
      clicked: false,
      current: 0 as number,
    })

    // show visible
    const showDetail = (id: number) => {
      state.clicked = !state.clicked
      state.current = id
    }

    return {
      ...toRefs(state),
      showDetail,
    }
  },
})
</script>
