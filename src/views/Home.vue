<template>
	<div class="home">
		<div class="d-flex justify-center align-center flex-column">
			<h1 class="py-5">Sales report table</h1>
		</div>

		<ReportFinancialTable/>
	</div>
</template>

<script>
	import ReportFinancialTable from "../components/Report/ReportFinancialTable";

	export default {
		name: 'Home',

		components: {
			ReportFinancialTable,
		},
	}
</script>
