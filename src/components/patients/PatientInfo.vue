<template>
  <div class="col-md-6">
    <div v-if="allergic" class="alert alert-danger" role="alert">
      Pozor! Pacient je alergický
    </div>

    <table class="table table-striped table-borderless">
      <tbody>
        <tr>
          <th scope="col">Meno:</th>
          <td>
            {{ firstName }}
          </td>
        </tr>
        <tr>
          <th scope="col">Priezvisko:</th>
          <td>{{ lastName }}</td>
        </tr>
        <tr>
          <th scope="col">Vakcinacne centrum:</th>
          <template v-for="center in centers" :key="center.id">
            <td v-if="center.id === vCen" class="w-50">
              {{ center.vaccination_centre }}
            </td>
          </template>
        </tr>
        <tr>
          <th scope="col">Vakcinacne cislo:</th>
          <td>{{ vNum }}</td>
        </tr>
        <tr class="border-0">
          <th scope="col">Vakcína</th>
          <td>{{ vType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'ShowPatientInfo',
  props: {
    firstName: String,
    lastName: String,
    allergic: Boolean,
    vCen: Number,
    vType: String,
    vNum: Number,
    centers: Object,
  },
  setup() {
    const state = reactive({})

    return {
      ...toRefs(state),
    }
  },
})
</script>
