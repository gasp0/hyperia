import patient from '@/types/patient'

const vacNumber = (data: []) => {
  const vNum =
    Math.max(...data.map((patient: patient) => patient.vaccination_number)) + 1
  console.log(vNum)
  return vNum
}

// const vacUsedList = (data: patient[]) => {
//   const vacTypes: string[] = data.map((p: patient) => p.vaccine_type)
//   const vacUsedState: string[] = [...new Set(vacTypes)]
//   return vacUsedState
// }

export default vacNumber
