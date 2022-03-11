const fetchPatients = (id: number) =>
  fetch('https://hyperia-hospital.herokuapp.com/' + id, {
    method: 'DELETE',
    headers: {
      'x-hasura-admin-secret':
        'lLOEeVcdpzO2PDD7e49fTuWxypPhtSIyytNkJh4fw7YANAxwc6HGyR1caq038S8Q',
    },
  }).then((res) => console.log(res))

export default fetchPatients
