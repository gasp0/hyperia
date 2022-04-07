<template>
	<div>
		<div class="col-sm-8 p-3">
			<div class="row">
				<label
					for="vacCentre"
					class="col-form-label col-sm-7"
				>Zoradiť podľa</label>
				<div class="col-sm-5">
					<select
						id="vacCentre"
						class="form-select"
						:value="sortOrder"
						@change="$emit('select-sort-order', $event?.target?.value)"
					>
						<option
							value="last_name"
							selected
						>
							Priezviska
						</option>
						<option value="vaccine_type">
							Typu vakcíny
						</option>
						<option value="vaccination_number">
							Čísla vakcinácie
						</option>
					</select>
				</div>

				<label
					for="vacType"
					class="col-form-label col-sm-7"
				>Filtruj podľa vakcíny</label>

				<div class="col-sm-5">
					<select
						id="vacType"
						class="form-select"
						:value="vacType"
						@change="$emit('select-vac-type', $event?.target?.value)"
					>
						<option
							value="all"
							selected
						>
							Všetky
						</option>
						<option
							v-for="vaccine in vacUsed"
							:key="vaccine.id"
						>
							{{ vaccine }}
						</option>
					</select>
				</div>

				<label
					for="vacCentre"
					class="col-form-label col-sm-7"
				>Alergickosť pacienta</label>

				<div class="col-sm-5">
					<select
						id="vacType"
						class="form-select"
						:value="isAlergic"
						@change="$emit('select-is-allergic', $event?.target?.value)"
					>
						<option
							value="all"
							selected
						>
							Všetky
						</option>
						<option
							value="true"
							selected
						>
							Ano
						</option>
						<option
							value="false"
							selected
						>
							Nie
						</option>
					</select>
				</div>

				<label
					for="vacCentre"
					class="col-form-label col-sm-7"
				>Filtruj podľa vakcinačného centra</label>

				<div class="col-sm-5">
					<select
						id="vacCentre"
						class="form-select"
						:value="vacCentre"
						@change="$emit('select-vac-centre', $event?.target?.value)"
					>
						<option
							value="all"
							selected
						>
							Všetky
						</option>
						<option
							v-for="center in centers"
							:key="center.id"
							:value="center.id"
						>
							{{ center.vaccination_centre }}
						</option>
					</select>
				</div>
			</div>
		</div>
		<div class="col-sm-4 p-3">
			<PatientLegend />
		</div>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import PatientLegend from '@/components/patients/PatientLegend.vue'

export default defineComponent({
    name: 'PatientsFilter',
    components: { PatientLegend },
    props: {
        vacUsed: Array,
        centers: Object,
        sortOrder: String,
        vacType: String,
        isAlergic: String,
        vacCentre: String,
    },
})
</script>
