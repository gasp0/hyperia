interface Center {
  id: number
  vaccination_centre: string
  available_doctors: number
  vaccinations_count: number
  sortOrder: ['vaccination_centre' | 'available_doctors' | 'vaccinations_count']
}

export default Center
