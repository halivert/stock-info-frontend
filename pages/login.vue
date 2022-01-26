<script setup lang="ts">
const request = useRequest()
const router = useRouter()
const token = useToken()

const username = ref("")
const password = ref("")
const loading = ref(false)

const errors = reactive({
	username: [],
	password: [],
})

watch([username, password], () => {
	errors.username = []
	errors.password = []
})

const login = ({ target }) => {
	loading.value = true
	errors.username = []
	errors.password = []

	if (username.value.length < 1) errors.username = ["Username is required"]
	if (password.value.length < 1) errors.password = ["Password is required"]

	const body = new FormData(target)

	request("/login", {
		method: "POST",
		body,
	})
		.then(({ data, error }) => {
			if (error.value) {
				errors.username = [""]
				errors.password = [error.value.data.error]
				return
			}

			token.value = data.value.token
			router.push("/")
		})
		.finally(() => {
			loading.value = false
		})
}
</script>

<template>
	<div class="hero is-fullheight-with-navbar">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<Form
						class="box column is-half p-5"
						@submit.prevent="login"
						legend="Login"
					>
						<Input
							label="Username"
							v-model="username"
							name="username"
							autofocus
							:errors="errors.username"
							required
						/>

						<Input
							label="Password"
							v-model="password"
							name="password"
							type="password"
							:errors="errors.password"
							required
						/>

						<div class="buttons is-right">
							<button :class="['button is-primary', { 'is-loading': loading }]">
								Log in
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>
