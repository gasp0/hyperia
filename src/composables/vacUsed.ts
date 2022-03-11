import patient from '@/types/patient'

const vacUsedList = (data: patient[]) => {
  const vacTypes: string[] = data.map((p: patient) => p.vaccine_type)
  const vacUsedState: string[] = [...new Set(vacTypes)]
  return vacUsedState
}

export default vacUsedList
