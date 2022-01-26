<script setup lang="ts">
const request = useRequest()
const token = useToken()
const router = useRouter()

const loading = ref(false)
const formData = reactive({
	name: "",
	username: "",
	password: "",
	passwordConfirmation: "",
	email: "",
})

const errors = reactive({
	name: [],
	username: [],
	password: [],
	email: [],
})

const register = ({ target: form }) => {
	loading.value = true
	const body = new FormData(form)
	errors.name = []
	errors.username = []
	errors.password = []
	errors.email = []

	if (body.get("name").length < 1) {
		errors.name = ["Name is required"]
	}

	if (body.get("username").length < 1) {
		errors.username = ["Username is required"]
	}

	if (body.get("password").length < 1) {
		errors.password = ["Password is required"]
	}

	if (body.get("password") !== body.get("password_confirmation")) {
		errors.password = ["Password confirmation does not match"]
	}

	request("/register", {
		method: "POST",
		body,
	})
		.then((data) => {
			token.value = data.token
			router.push("/")
		})
		.catch(({ errors: error }) => {
			["name", "username", "password", "email"].forEach((field) => {
				const fieldError = error.find((e) => e.field === field)
				if (fieldError) {
					errors[field] = [fieldError.message]
				}
			})
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
						class="box column is-half is-four-fifths-tablet p-5"
						@submit.prevent="register"
						legend="Register"
					>
						<Input
							label="Name"
							name="name"
							type="text"
							placeholder="John"
							:errors="errors.name"
							v-model="formData.name"
							required
						/>

						<Input
							label="Username"
							name="username"
							type="text"
							placeholder="john23"
							v-model="formData.username"
							:errors="errors.username"
							required
						/>

						<div class="field">
							<label class="label">Password</label>

							<div class="field-body">
								<Input
									name="password"
									type="password"
									placeholder="Password"
									:errors="errors.password"
									v-model="formData.password"
									required
								/>

								<Input
									name="password_confirmation"
									type="password"
									placeholder="Password confirmation"
									v-model="formData.passwordConfirmation"
									required
								/>
							</div>
						</div>

						<Input
							label="Email"
							name="email"
							type="email"
							placeholder="john@example.com"
							:errors="errors.email"
							v-model="formData.email"
						/>

						<div class="buttons is-right">
							<button :class="['button is-success', { 'is-loading': loading }]">
								Register
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>
