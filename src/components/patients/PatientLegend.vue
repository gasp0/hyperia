<template>
	<div>
		<h4>Legenda:</h4>
		<ul class="list-inline">
			<li
				v-for="vaccine in vacUsed"
				:key="vaccine.id"
				class="list-inline-item vac p-2"
				:class="vaccine.replace('&', 'a').toLowerCase().slice(0, 3)"
			>
				{{ vaccine }}
			</li>
		</ul>
		<p><span class="badge bg-danger ms-2">!</span> - pacient je alergický</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from 'vue'

export default defineComponent({
    Name: 'PatientLegendInfo',
    computed: {
        vacUsed: function():string[] {
            return  this.$store.getters.vacUsedList   
        },
    }
    // inject: ['vacUsedInj'],
    // data: function(): object {
    //   return {
    //         vacUsed: this.vacUsedInj}}  
    //   setup() {
    //     const state = reactive({})

//     const vacUsed = inject('vacUsed')
//     return {
//       ...toRefs(state),
//       vacUsed,
//     }
//   },
})
</script>
