<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
			<div class="d-flex align-center">
				<v-icon x-large class="mx-3">mdi-card-text-outline</v-icon>

				<v-toolbar-title>
					SALES REPORT
				</v-toolbar-title>

				<v-spacer></v-spacer>
			</div>
		</v-app-bar>

		<v-main class="d-flex align-center justify-center">
			<v-container>
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>

	export default {
		name: 'App',
	};
</script>
