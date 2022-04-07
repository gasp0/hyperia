import vacType from '@/types/vacType'

const fetchPatientsUpdate = (id: number, patient: vacType) =>
    fetch('https://hyperia-hospital.herokuapp.com/patients/' + id, {
        method: 'PUT',
        headers: {
            'x-hasura-admin-secret':
        'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
    })
        .then((response) => console.log(response))
        .catch((error) => {
            console.error('Error:', error)
        })

export default fetchPatientsUpdate
