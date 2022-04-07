import patient from '@/types/patient'


const fetchPatientsSend = (patient: patient, clear: () => void,error: () => void) =>
    fetch('https://hyperia-hospital.herokuapp.com/patient-entry/', {
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
                clear()
            } else {
                error()
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })

export default fetchPatientsSend
