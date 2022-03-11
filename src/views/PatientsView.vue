<template>
  <div class="row">
    <h1 class="ms-0 m-3">Patients</h1>
    <PatientFilter
      :vacUsed="vacUsed"
      :centers="centers"
      :sortOrder="sortOrder"
      :vacType="vacType"
      :isAlergic="isAlergic"
      :vacCentre="vacCentre"
      v-model:sortOrder="sortOrder"
      v-model:isAlergic="isAlergic"
      v-model:vacCentre="vacCentre"
      v-model:vacType="vacType"
    />
    <TransitionGroup name="list" tag="div" class="accordion">
      <div
        class="accordion-item"
        v-for="patient in filteredPatients"
        :key="patient.id"
        :id="patient.id"
      >
        <Transition appear>
          <div :id="patient.id">
            <h2
              class="accordion-header vac"
              :class="
                patient.vaccine_type.replace('&', 'a').toLowerCase().slice(0, 3)
              "
            >
              <button
                @click="showPatientDetail(patient.id)"
                class="accordion-button"
                :class="current === patient.id && clicked ? '' : 'collapsed'"
                type="button"
              >
                {{ patient.first_name }} {{ patient.last_name }}
                <span v-if="patient.is_allergic" class="badge bg-danger ms-2"
                  >!</span
                >
              </button>
            </h2>
            <div
              class="accordion-collapse collapse"
              :class="{ show: current === patient.id && clicked }"
            >
              <div class="accordion-body row">
                <PatientInfo
                  :firstName="patient.first_name"
                  :lastName="patient.last_name"
                  :allergic="patient.is_allergic"
                  :vCen="patient.vaccination_centre"
                  :vType="patient.vaccine_type"
                  :vNum="patient.vaccination_number"
                  :centers="centers"
                />
                <PatientForm
                  :pId="patient.id"
                  :centers="centers"
                  :vacUsed="vacUsed"
                  :vCen="patient.vaccination_centre"
                  :vType="patient.vaccine_type"
                  :vNum="patient.vaccination_number"
                  v-model:vType="patient.vaccine_type"
                  v-model:vNum="patient.vaccination_number"
                  v-model:vCen="patient.vaccination_centre"
                  v-on:deletePatient="deletePatient(patient.id)"
                  v-on:updatePatient="updatePatient(patient.id)"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  provide,
} from 'vue'
// COMPONENTS
import PatientForm from '@/components/patients/PatientForm.vue'
import PatientInfo from '@/components/patients/PatientInfo.vue'
import PatientFilter from '@/components/patients/PatientFilter.vue'

// TYPES
import patient from '@/types/patient'
import patientOrder from '@/types/patientOrder'
// FUNCTIONS
import vacUsedList from '@/composables/vacUsed'
import fetchPatients from '@/composables/fetchPatients'
import fetchPatientsUpdate from '@/composables/fetchPatientsUpdate'
import fetchPatientsDelete from '@/composables/fetchPatientsDelete'
import fetchCenters from '@/composables/fetchCenters'

export default defineComponent({
  name: 'PatientList',
  path: '/patients',
  components: { PatientInfo, PatientForm, PatientFilter },
  setup() {
    const state = reactive({
      clicked: false,
      current: 0,
      showEdit: false,
      patients: [],
      sortOrder: 'vaccine_type' as patientOrder,
      centers: [],
      vacUsed: [] as string[],
      vacType: 'all',
      vacCentre: 'all',
      isAlergic: 'all',
    })

    // Filtered List
    const filteredPatients = computed(() => {
      return [...state.patients]
        .sort((a: patient, b: patient) => {
          return a[state.sortOrder] > b[state.sortOrder] ? 1 : -1
        })

        .filter(
          state.vacType === 'all'
            ? () => {
                return true
              }
            : (patient: patient) => patient.vaccine_type === state.vacType
        )
        .filter(
          state.isAlergic === 'all'
            ? () => {
                return true
              }
            : state.isAlergic === 'true'
            ? (patient: patient) => patient.is_allergic == true
            : (patient: patient) => patient.is_allergic == false
        )
        .filter(
          state.vacCentre === 'all'
            ? () => {
                return true
              }
            : (patient: patient) =>
                patient.vaccination_centre === +state.vacCentre
        )
    })

    // Detete patient
    const deletePatient = (id: number) => {
      if (confirm('Naozaj chcete vymazat pacienta?')) {
        // FROM SERVER
        fetchPatientsDelete(id)
        // FROM LIST
        state.patients = state.patients.filter((p: patient) => p.id != id)
      }
    }

    // Update DATA
    const putBody = (id: number) => {
      const currentPatient: patient[] = state.patients.filter(
        (patient: patient) => patient.id === id
      )
      let changedPatient = {
        vaccination_centre: currentPatient[0].vaccination_centre,
        vaccination_number: currentPatient[0].vaccination_number,
        vaccine_type: currentPatient[0].vaccine_type,
      }

      return changedPatient
    }

    // Update patient
    const updatePatient = (id: number) => {
      let patient = putBody(id)
      if (confirm('Naozaj chcete zmeniť údaje o pacientovi?')) {
        fetchPatientsUpdate(id, patient)
      }
    }

    // show visible
    const showPatientDetail = (id: number) => {
      state.clicked = !state.clicked
      state.current = id
    }

    // get patients
    onMounted(async () => {
      // GET PATIENTS
      const patientsList = await fetchPatients()
      const patientsData = await patientsList.json()
      state.patients = patientsData

      state.vacUsed = vacUsedList(state.patients)

      // GET CENTERS
      const centersList = await fetchCenters()
      const centersData = await centersList.json()
      state.centers = centersData
    })

    // PROVIDE VAC USED
    provide(
      'vacUsed',
      computed(() => state.vacUsed)
    )

    return {
      ...toRefs(state),
      updatePatient,
      deletePatient,
      filteredPatients,
      showPatientDetail,
    }
  },
})
</script>
