/* eslint-disable vue/no-v-model-argument */
<template>
	<div class="row">
		<h1 class="ms-0 m-3">
			Patients
		</h1>
		<PatientFilter
			:vac-used="vacUsed"
			:centers="centers"
			:sort-order="sortOrder"
			:vac-type="vacType"
			:is-alergic="isAlergic"
			:vac-centre="vacCentre"
			@select-vac-centre="vacCentre = $event"
			@select-sort-order="sortOrder = $event"
			@select-is-allergic="isAlergic = $event"
			@select-vac-type="vacType = $event"
		/>

		<TransitionGroup
			name="list"
			tag="div"
			class="accordion"
		>
			<div
				v-for="patient in filteredPatients"
				:id="patient.id"
				:key="patient.id"
				class="accordion-item"
			>
				<Transition appear>
					<div :id="patient.id">
						<h2
							class="accordion-header vac"
							:class="patient.vaccine_type.replace('&', 'a').toLowerCase().slice(0, 3)"
						>
							<button
								class="accordion-button"
								:class="current === patient.id && clicked ? '' : 'collapsed'"
								type="button"
								@click="showPatientDetail(patient.id)"
							>
								{{ patient.first_name }} {{ patient.last_name }}
								<span
									v-if="patient.is_allergic"
									class="badge bg-danger ms-2"
								>!</span>
							</button>
						</h2>
						<div
							class="accordion-collapse collapse"
							:class="{ show: current === patient.id && clicked }"
						>
							<div class="accordion-body row">
								<PatientInfo
									:first-name="patient.first_name"
									:last-name="patient.last_name"
									:allergic="patient.is_allergic"
									:v-cen="patient.vaccination_centre"
									:v-type="patient.vaccine_type"
									:v-num="patient.vaccination_number"
									:centers="centers"
								/>
								<PatientForm
									:p-id="patient.id"
									:centers="centers"
									:vac-used="vacUsed"
									:v-cen="patient.vaccination_centre"
									:v-type="patient.vaccine_type"
									:v-num="patient.vaccination_number"
									@deletePatient="deletePatient(patient.id)"
									@updatePatient="updatePatient(patient.id)"
									@select-v-type="patient.vaccine_type = $event"
									@select-v-num="patient.vaccination_number = $event"
									@select-v-cen="patient.vaccination_centre = $event"
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
    computed,
} from 'vue'
// COMPONENTS
import PatientForm from '@/components/patients/PatientForm.vue'
import PatientInfo from '@/components/patients/PatientInfo.vue'
import PatientFilter from '@/components/patients/PatientFilter.vue'

// TYPES
import patient from '@/types/patient'
import patientOrder from '@/types/patientOrder'
// FUNCTIONS
//import vacUsedList from '@/composables/vacUsed'
import fetchPatientsUpdate from '@/composables/fetchPatientsUpdate'
import fetchPatientsDelete from '@/composables/fetchPatientsDelete'

export default defineComponent({
    name: 'PatientList',
    path: '/patients',
    components: { PatientInfo, PatientForm, PatientFilter },
    // provide: function (): object {
    //     return {
    //         vacUsedInj: computed(() => this.vacUsed),
    //     }
    // },
    data: function (): object {
        return {
            clicked: false,
            current: 0,
            showEdit: false,
            //      patients: [],
            sortOrder: 'vaccine_type' as patientOrder,
            //      centers: [],
            //      vacUsed: [] as string[],
            vacType: 'all',
            vacCentre: 'all',
            isAlergic: 'all',
        }
    },
    computed: {
        patients: function():patient {
            return  this.$store.state.patients   
        },
        centers: function():patient {
            return  this.$store.state.centers   
        },
        vacUsed: function():string[] {
            return  this.$store.getters.vacUsedList   
        },

        filteredPatients: function (): patient[] {
            return [...this.patients]
                .sort((a: patient, b: patient) => {
                    return a[this.sortOrder] > b[this.sortOrder] ? 1 : -1
                })
                .filter(
                    this.vacType === 'all'
                        ? () => {
                            return true
            		  }
                        : (patient: patient) => patient.vaccine_type === this.vacType
                )
                .filter(
                    this.isAlergic === 'all'
                        ? () => {
                            return true
            		  }
                        : this.isAlergic === 'true'
                            ? (patient: patient) => patient.is_allergic == true
                            : (patient: patient) => patient.is_allergic == false
                )
                .filter(
                    this.vacCentre === 'all'
                        ? () => {
                            return true
            		  }
                        : (patient: patient) => patient.vaccination_centre === +this.vacCentre
                )
        },
    },
    mounted: async function (): Promise<void> {
        // // GET PATIENTS
        // const patientsList = await fetchPatients()
        // const patientsData = await patientsList.json()
        // this.patients = patientsData
        //  this.vacUsed = vacUsedList(this.patients)

        // // GET CENTERS
        // const centersList = await fetchCenters()
        // const centersData = await centersList.json()
        // this.centers = centersData
    
        // GET PATIENTS FROM STORE      
        this.$store.dispatch('fetchAllPatients')
        // GET CENTERS FROM STORE      
        this.$store.dispatch('fetchAllCenters')
    },
    methods: {
        // show visible
        showPatientDetail: function (id: number): void {
            this.clicked = !this.clicked
            this.current = id
        },
        // Detete patient
        deletePatient: function (id: number): void {
            if (confirm('Naozaj chcete vymazat pacienta?')) {
                console.log(id)
                // FROM SERVER
                fetchPatientsDelete(id)
                // // FROM LIST OLD
                // this.patients = this.patients.filter((p: patient) => p.id != id)
                // FROM LIST VUEX
                this.$store.commit('removePatient', id)


                
            }
        },
        // Update DATA
        putBody: function (id: number): object {
            const currentPatient: patient[] = this.patients.filter(
                (patient: patient) => patient.id === id
            )
            let changedPatient = {
                vaccination_centre: currentPatient[0].vaccination_centre,
                vaccination_number: currentPatient[0].vaccination_number,
                vaccine_type: currentPatient[0].vaccine_type,
            }

            return changedPatient
        },
        // Update patient
        updatePatient: function (id: number): void {
            let patient = this.putBody(id)
            if (confirm('Naozaj chcete zmeniť údaje o pacientovi?')) {
                fetchPatientsUpdate(id, patient)
            }
        },
    },

    //  setup() {
    //     const state = reactive({
    //       clicked: false,
    //       current: 0,
    //       showEdit: false,
    //       patients: [],
    //       sortOrder: 'vaccine_type' as patientOrder,
    //       centers: [],
    //       vacUsed: [] as string[],
    //       vacType: 'all',
    //       vacCentre: 'all',
    //       isAlergic: 'all',
    //     })

    //     // Filtered List
    //     const filteredPatients = computed(() => {
    //       return [...state.patients]
    //         .sort((a: patient, b: patient) => {
    //           return a[state.sortOrder] > b[state.sortOrder] ? 1 : -1
    //         })

    //         .filter(
    //           state.vacType === 'all'
    //             ? () => {
    //                 return true
    //               }
    //             : (patient: patient) => patient.vaccine_type === state.vacType
    //         )
    //         .filter(
    //           state.isAlergic === 'all'
    //             ? () => {
    //                 return true
    //               }
    //             : state.isAlergic === 'true'
    //             ? (patient: patient) => patient.is_allergic == true
    //             : (patient: patient) => patient.is_allergic == false
    //         )
    //         .filter(
    //           state.vacCentre === 'all'
    //             ? () => {
    //                 return true
    //               }
    //             : (patient: patient) =>
    //                 patient.vaccination_centre === +state.vacCentre
    //         )
    //     })

    //     // Detete patient
    //     const deletePatient = (id: number) => {
    //       if (confirm('Naozaj chcete vymazat pacienta?')) {
    //         // FROM SERVER
    //         fetchPatientsDelete(id)
    //         // FROM LIST
    //         state.patients = state.patients.filter((p: patient) => p.id != id)
    //       }
    //     }

    //     // Update DATA
    //     const putBody = (id: number) => {
    //       const currentPatient: patient[] = state.patients.filter(
    //         (patient: patient) => patient.id === id
    //       )
    //       let changedPatient = {
    //         vaccination_centre: currentPatient[0].vaccination_centre,
    //         vaccination_number: currentPatient[0].vaccination_number,
    //         vaccine_type: currentPatient[0].vaccine_type,
    //       }

    //       return changedPatient
    //     }

    //     // Update patient
    //     const updatePatient = (id: number) => {
    //       let patient = putBody(id)
    //       if (confirm('Naozaj chcete zmeniť údaje o pacientovi?')) {
    //         fetchPatientsUpdate(id, patient)
    //       }
    //     }

    //     // show visible
    //     const showPatientDetail = (id: number) => {
    //       state.clicked = !state.clicked
    //       state.current = id
    //     }

    //     // get patients
    //     onMounted(async () => {
    //       // GET PATIENTS
    //       const patientsList = await fetchPatients()
    //       const patientsData = await patientsList.json()
    //       state.patients = patientsData

    //       state.vacUsed = vacUsedList(state.patients)

    //       // GET CENTERS
    //       const centersList = await fetchCenters()
    //       const centersData = await centersList.json()
    //       state.centers = centersData
    //     })

    //     // PROVIDE VAC USED
    //     provide(
    //       'vacUsed',
    //       computed(() => state.vacUsed)
    //     )

    //     return {
    //       ...toRefs(state),
    //       updatePatient,
    //       deletePatient,
    //       filteredPatients,
    //       showPatientDetail,
    //     }
    //   },
})
</script>
