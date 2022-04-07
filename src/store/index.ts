import { createStore } from 'vuex'
import patient from '@/types/patient'
import center from '@/types/center'

export const store = createStore({
    state: {
        centers: []  as center[],
        patients: [] as patient[],
        count: 0
    },
      
    mutations: {
        setCenters: function (state, centers): void {
            state.centers = centers;
        },
        setPatients: function(state, patients): void {
            state.patients = patients;
        },
        increment: function (state): void {
            state.count++
        },
        removePatient: function(state,id): void {
            state.patients = state.patients.filter((p: patient) => p.id != id)
        }
    },
      
    actions: {
        fetchAllCenters: function (context): Promise<void> {
            return fetch('https://hyperia-hospital.herokuapp.com/centers', {
                method: 'GET',
                headers: {
                    'x-hasura-admin-secret':
            'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
                }
            }).then((response) => response.json())
                .then((data) => {
                    context.commit("setCenters", data);
                })
                .catch((err) => console.error(err));

        },
        fetchAllPatients: function (context): Promise<void> {
            return fetch('https://hyperia-hospital.herokuapp.com/patients', {
                method: 'GET',
                headers: {
                    'x-hasura-admin-secret':
        'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
                }
            }).then((response) => response.json())
                .then((data) => {
                    context.commit("setPatients", data);
                })
                .catch((err) => console.error(err));

        },
    },
  
    getters: {
        centers: function (state): center[] {
            return state.centers;
        },
        patients: function (state): patient[] {
            return state.patients;
        },
        vacUsedList: function (state): string[] {
            return [...new Set(state.patients.map((p: patient) => p.vaccine_type))]
        },
        vacNumberLast: function (state): number {     
            return Math.max(...state.patients.map((patient: patient) => patient.vaccination_number)) + 1
        }
    }})

 
 