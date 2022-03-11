<template>
  <div class="about">
    <h1 class="ms-0 m-3">Vaccination centers</h1>
    <div class="row">
      <div class="col-sm-4">
        <label for="vacCentre" class="form-label">Zoradiť podľa</label>

        <select
          id="vacCentre"
          class="form-select"
          v-model="sortOrder"
          @click="showFilter"
        >
          <option value="vaccination_centre" selected>Názvu centra</option>
          <option value="available_doctors">Dostupných doktorov</option>
          <option value="vaccinations_count">Zaočkovaných pacientov</option>
        </select>
      </div>

      <div class="col-sm-8 p-3">
        <TransitionGroup name="list" tag="div" class="accordion">
          <ListCenters
            v-for="center in filteredCenters"
            :key="center.id"
            :city="center.vaccination_centre"
            :cId="center.id"
            :doctors="center.available_doctors"
            :count="center.vaccinations_count"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import fetchCenters from '@/composables/fetchCenters'
import Center from '@/types/center'
import CenterOrder from '@/types/centerOrder'
import ListCenters from '@/components/ListCenters.vue'

export default defineComponent({
  name: 'CenterList',
  path: '/centers',
  components: {
    ListCenters,
  },
  setup() {
    const state = reactive({
      clicked: false,
      current: null,
      centers: [],
      sortOrder: 'vaccination_centre' as CenterOrder,
    })

    const filteredCenters = computed(() => {
      return [...state.centers].sort((a: Center, b: Center) => {
        return a[state.sortOrder] > b[state.sortOrder] ? 1 : -1
      })
    })

    const showFilter = () => {
      console.log(state.sortOrder)
    }
    // get centers
    onMounted(async () => {
      // GET CENTERS
      const centersList = await fetchCenters()
      const centersData = await centersList.json()
      state.centers = centersData
    })

    return {
      ...toRefs(state),
      showFilter,
      filteredCenters,
    }
  },
})
</script>

<style scoped>
.moving {
  transition: all 1s ease;
  -webkit-transition: all 1s ease;
}
</style>
