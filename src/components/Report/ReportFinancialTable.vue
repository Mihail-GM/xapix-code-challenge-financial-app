<template>
	<div id="financial-table-container" class="mb-16">
		<div id="financial-table-loading" v-if="actionState === 'LOADING'">
			<v-progress-linear
				indeterminate
				color="green"
			/>

			<div class="d-flex justify-center align-center pa-10">
				Loading... Please wait
			</div>
		</div>

		<v-alert
			v-else-if="actionState === 'ERRORED'"
			id="financial-table-errored"
			dense
			outlined
			type="error"
		>
			There was an error when loading data. Please try again later.
		</v-alert>

		<v-data-table
			v-else
			id="financial-table"
			:headers="headers"
			:items="financial"
			sort-by="primary_contact_email"
			class="elevation-2 px-10 text-xl-h4"
		/>
		<small>*you can sort data by just clicking on the headers</small>
	</div>
</template>

<script>
	import {mapGetters} from "vuex";

	export default {
		name: "ReportFinancialTable",

		methods: {
			async getDataForReport() {
				await this.$store.dispatch('financialReport/fetchCalculatedDataForReport',);
			},
		},

		data() {
			return {
				headers: [
					{text: 'Period', align: 'start', sortable: true, value: 'dataRanges'},
					{text: 'Product Sales', align: 'start', sortable: true, value: 'productSales'},
					{text: 'Shipping Revenue', align: 'start', sortable: true, value: 'shippingRevenue'},
					{text: 'Other Income', align: 'start', sortable: true, value: `otherIncome`},
					{text: 'Total sales', align: 'start', sortable: true, value: `totalSales`},
					{text: 'Cost', align: 'start', sortable: true, value: `cost`},
					{text: 'Total', align: 'start', sortable: true, value: `total`},
				],
			}
		},

		computed: {
			...mapGetters(
				{
					financial: 'financialReport/getCalculatedDataForReport',
					actionState: 'financialReport/getCurrentState'
				}
			)
		},
		created() {
			this.getDataForReport();
		},
	}
</script>

<style scoped>

</style>