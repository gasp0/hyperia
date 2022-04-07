<template>
	<div>
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<div class="container-md">
				<a
					class="navbar-brand"
					href="#"
				>Hyperia Hospital</a>
				<button
					class="navbar-toggler"
					type="button"
					@click="dropdown = !dropdown"
				>
					<span class="navbar-toggler-icon" />
				</button>

				<div
					class="collapse navbar-collapse"
					:class="{ show: dropdown }"
				>
					<ul class="navbar-nav mr-auto">
						<li class="nav-item active">
							<router-link
								to="/"
								class="nav-link"
								@click="responsive"
							>
								Úvod
							</router-link>
						</li>
						<li class="nav-item">
							<router-link
								to="/add"
								class="nav-link"
								@click="responsive"
							>
								Pridaj pacienta
							</router-link>
						</li>
						<li class="nav-item">
							<router-link
								to="/patients"
								class="nav-link"
								@click="responsive"
							>
								Patients
							</router-link>
						</li>
						<li class="nav-item">
							<router-link
								to="/centers"
								class="nav-link"
								@click="responsive"
							>
								Centers
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container-md">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    name: 'App',
    data: function (): object {
        return {
            dropdown: false,
        }
    },
    mounted: function () {
        window.addEventListener('resize', this.responsive)
    },
    methods: {
        responsive: function () {
            window.innerWidth > 767 ? (this.dropdown = true) : (this.dropdown = false)
        },
    },

    // setup() {
    //   const state = reactive({
    //     dropdown: false,
    //   })

    //   // Just to have reactive navbar
    //   const responsive = () => {
    //     window.innerWidth > 767
    //       ? (state.dropdown = true)
    //       : (state.dropdown = false)
    //   }

    //   window.addEventListener('resize', responsive)

    //   return {
    //     ...toRefs(state),
    //     responsive,
    //   }
    // },
})
</script>
