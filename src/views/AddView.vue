<template>
  <div class="row">
    <h1 class="ms-0 m-3">Pridaj pacienta</h1>

    <div class="col-md-9 p-3">
      <form class="row g-3" @submit.prevent="sendData">
        <div class="col-md-6">
          <label for="firstName" class="form-label">Meno</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="firstName"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="lastName" class="form-label">Priezvisko</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="lastName"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="vacCentre" class="form-label"
            >Vyberte vakcinačné centrum</label
          >
          <select
            id="vacCentre"
            class="form-select"
            v-model="vacCentre"
            required
          >
            <option
              v-for="center in centers"
              :key="center.id"
              :value="center.id"
            >
              {{ center.vaccination_centre }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <label for="vacType" class="form-label">Vyberte vakcínu</label>
          <select id="vacType" class="form-select" v-model="vacType" required>
            <option v-for="vaccine in vacUsed" :key="vaccine.id">
              {{ vaccine }}
            </option>
          </select>
        </div>

        <div class="col-12">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="isAllergic"
              v-model="isAllergic"
            />
            <label class="form-check-label" for="isAllergic"
              >Patient is allergic</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <button type="submit" class="btn btn-primary mt-3">
              Add patient
            </button>
          </div>
          <div class="col-6">
            <Transition>
              <div v-if="added" class="alert alert-success" role="alert">
                Pacient úspešne pridaný
              </div>
            </Transition>
            <Transition>
              <div v-if="notAdded" class="alert alert-danger" role="alert">
                Nastala chyba, skúste ešte raz
              </div>
            </Transition>
          </div>
        </div>
      </form>
    </div>

    <div class="col-md-3 p-3">
      <div class="alert alert-warning">
        Form check iba cez CSS, zoznam vakcinačných centrier je fetchnutý,
        rovnako aj zoznam vakcín z vakcín ktoré sú uz nahraté pre iných
        pacientov :)
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import patient from '@/types/patient'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import vacUsedList from '@/composables/vacUsed'
import fetchCenters from '@/composables/fetchCenters'
import fetchPatients from '@/composables/fetchPatients'

export default defineComponent({
  name: 'AddPage',
  setup() {
    const state = reactive({
      firstName: '' as string,
      lastName: '' as string,
      vacCentre: '' as string,
      vacNumber: 0 as number,
      vacType: '' as string,
      isAllergic: false as boolean,
      added: false,
      notAdded: false,
      centers: [],
      patients: [],
      vacUsed: [] as string[],
    })

    // CREATE BODY
    const getBody = async () => {
      let lastNumber = await getVacNumber
      console.log('GET BODY' + lastNumber)
      let newPatient = {
        first_name: state.firstName,
        last_name: state.lastName,
        is_allergic: state.isAllergic,
        vaccination_centre: state.vacCentre,
        vaccination_number: lastNumber,
        vaccine_type: state.vacType,
      }

      return newPatient
    }

    // ADD FORM ERROR
    const errorForm = () => {
      state.notAdded = true
      setTimeout(() => {
        state.notAdded = false
      }, 2000)
    }

    // CLEAR FORM
    const clearForm = () => {
      state.firstName = ''
      state.lastName = ''
      state.vacCentre = ''
      state.vacType = ''
      state.isAllergic = false
      state.added = true
      setTimeout(() => {
        state.added = false
      }, 2000)
    }

    // SEND DATA
    const sendData = async () => {
      let patient = await getBody()
      console.log(patient)
      await fetch('https://hyperia-hospital.herokuapp.com/patient-entry/', {
        method: 'POST',
        headers: {
          'x-hasura-admin-secret':
            'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      })
        .then((response) => {
          if (response.ok) {
            console.log(response)
            clearForm()
          } else {
            errorForm()
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }

    // GET LAST VAC NUMBER + 1
    const vacNumber = (data: []) => {
      let vNum =
        Math.max(
          ...data.map((patient: patient) => patient.vaccination_number)
        ) + 1
      //  console.log(vNum)
      return vNum
    }

    // FETCH ACTUAL PATIENTS
    const getVacNumber = fetch(
      'https://hyperia-hospital.herokuapp.com/patients',
      {
        method: 'GET',
        headers: {
          'x-hasura-admin-secret':
            'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        state.vacUsed = vacUsedList(data)

        return vacNumber(data)
      })

    onMounted(async () => {
      // GET CENTERS
      const centersList = await fetchCenters()
      const centersData = await centersList.json()
      state.centers = centersData

      // GET PATIENTS
      const patientList = await fetchPatients()
      const patientData = await patientList.json()
      state.patients = patientData
    })

    return {
      ...toRefs(state),
      getBody,
      sendData,
    }
  },
})
</script>
