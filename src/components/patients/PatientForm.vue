<template>
	<div class="col-md-6">
		<form
			class="row g-3"
			@submit.prevent="$emit('updatePatient')"
		>
			<div class="col-lg-6">
				<label
					for="vacCentre"
					class="form-label"
				>Zmeniť vakcinačné centrum</label>
				<select
					id="vacCentre"
					class="form-select"
					:value="vCen"
					@input="$emit('select-v-cen', +$event.target.value)"
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

			<div class="col-lg-6">
				<label
					for="vacType"
					class="form-label"
				>Zmeniť druh vakcíny</label>
				<select
					id="vacType"
					class="form-select"
					:value="vType"
					@input="$emit('select-v-type', $event.target.value)"
				>
					<option
						v-for="vaccine in vacUsed"
						:key="vaccine.id"
					>
						{{ vaccine }}
					</option>
				</select>
			</div>

			<div class="col-lg-6 d-none">
				<label
					for="vacNumber"
					class="form-label"
				>Vaccination number</label>
				<input
					id="vacNumber"
					type="text"
					class="form-control"
					:value="vNum"
					@input="$emit('select-v-num', $event.target.value)"
				>
			</div>

			<div class="col-md-12 d-flex flex-row-reverse">
				<button
					type="button"
					class="btn btn-danger"
					@click="$emit('deletePatient')"
				>
					Delete
				</button>
				<button
					type="submit"
					class="btn btn-primary"
				>
					Edit
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    name: 'ShowPatientInfo',
    props: {
        pId: Number,
        vacUsed: Object,
        centers: Object,
        vCen: Number || String,
        vType: String,
        vNum: Number,
    },
    emits: ['vacChange','select-v-cen','select-v-num','select-v-type','deletePatient','updatePatient'],
    //   setup() {
    //     const state = reactive({})

//     return {
//       ...toRefs(state),
//     }
//   },
})
</script>
