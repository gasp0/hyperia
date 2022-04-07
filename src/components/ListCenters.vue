<template>
	<Transition appear>
		<div class="accordion-item">
			<h2 class="accordion-header">
				<button
					class="accordion-button"
					:class="current === cId && clicked ? '' : 'collapsed'"
					type="button"
					@click="showDetail(cId)"
				>
					{{ city }}
				</button>
			</h2>
			<div
				class="accordion-collapse collapse"
				:class="{ show: current === cId && clicked }"
			>
				<div class="accordion-body">
					<strong>Pocet doktorov: </strong>
					{{ doctors }} <br>
					<strong>Pocet zaockovanych:</strong>
					{{ count }}
				</div>
			</div>
		</div>
	</Transition>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    name: 'VacCenter',
    props: {
        cId: Number,
        city: String,
        doctors: Number,
        count: Number,
    },
    data: function(): object {
	  return {
		  clicked: false,
		  current: 0 as number
	  }
    },
    methods: {
	  showDetail: function (id : number): void {
		 this.clicked = !this.clicked
		 this.current = id
	  }
    }

})
</script>
