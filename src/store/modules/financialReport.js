import FinancialService from "@/services/financial.service";

const actionStates = {
	INITIAL: "INITIAL",
	LOADING: "LOADING",
	ERRORED: "ERRORED",
	NOT_FOUND: "NOT_FOUND",
	DATA_LOADED: "DATA_LOADED",
};

function getMonthAndYear(date) {
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return {month, year};
}

const formatToDecimalNumber = ((number) => Number.parseFloat(number).toFixed(2));

const parseDataForOnePeriod = ((readyDataForReport) => {
	readyDataForReport.productSales = formatToDecimalNumber(readyDataForReport.productSales);
	readyDataForReport.shippingRevenue = formatToDecimalNumber(readyDataForReport.shippingRevenue);
	readyDataForReport.otherIncome = formatToDecimalNumber(readyDataForReport.otherIncome);
	readyDataForReport.cost = formatToDecimalNumber(readyDataForReport.cost);

	let totalSales = Number.parseFloat(readyDataForReport.productSales) +
					 Number.parseFloat(readyDataForReport.shippingRevenue) +
					 Number.parseFloat(readyDataForReport.otherIncome);

	readyDataForReport.totalSales = formatToDecimalNumber(totalSales);

	let total = (Number.parseFloat(readyDataForReport.totalSales) + Number.parseFloat(readyDataForReport.cost))
	readyDataForReport.total = formatToDecimalNumber(total);

	return readyDataForReport;
});

const state = {
	currentState: actionStates.INITIAL,
	calculatedDataForReport: [],
	reportPeriods: null,
};

const getters = {
	getCalculatedDataForReport(state) {
		return state.calculatedDataForReport;
	},

	getCurrentState(state) {
		return state.currentState;
	},

	getReportPeriods(state) {
		return state.reportPeriods;
	},
};

const mutations = {
	setActionState(state, actionState) {
		state.currentState = actionState;
	},

	setCalculatedDataForReport(state, calculatedDataForReport) {
		state.calculatedDataForReport = calculatedDataForReport ?? [];
	},

	setReportPeriods(state, reportPeriods) {
		state.reportPeriods = reportPeriods ?? [];
	},
};

const actions = {
	async fetchCalculatedDataForReport(vuexContext) {
		vuexContext.commit("setActionState", actionStates.LOADING);

		let reportPeriods = new Set();

		try {
			let financialRecords = await FinancialService.getFinancialRecords();
			let financialGroups = await FinancialService.getFinancialGroups();

			financialRecords.forEach((financialRecord) => {
				let recordDate = new Date(financialRecord.postedDate);

				if (isNaN(recordDate)) {
					return;
				}

				let {month, year} = getMonthAndYear(recordDate);
				let monthForReport = month + "/" + year;

				reportPeriods.add(monthForReport);
				reportPeriods.add(year.toString());
			});

			let arr = Array.from(reportPeriods, (period) => {
				return {dataRanges: period};
			});
			let readyDataForReport;
			let readyArrayOfData = [];

			arr.map((recordForReport) => {
				let dataRanges = recordForReport.dataRanges;

				readyDataForReport = financialRecords.reduce(
					(acc, financialRecord) => {
						let recordDate = new Date(financialRecord.postedDate);

						//if date is missing try get date from financial group
						if (isNaN(recordDate)) {
							let resultGroup = financialGroups.find(oneGroupRecord => oneGroupRecord.id === financialRecord.groupId)
							recordDate = new Date(resultGroup.groupEnd);

							//check if again date is missing
							if (isNaN(recordDate)) {
								return acc;
							}
						}

						let {month, year} = getMonthAndYear(recordDate);
						let monthCurrentRecord = month + "/" + year;

						if (
							dataRanges === monthCurrentRecord ||
							dataRanges === monthCurrentRecord?.split("/")[1]
						) {
							if (
								financialRecord.type === "charge" &&
								financialRecord.subType === "principal"
							) {
								acc.productSales += financialRecord.currencyAmount;
								return acc;
							}

							if (
								financialRecord.type === "charge" &&
								financialRecord.subType === "shipping"
							) {
								acc.shippingRevenue += financialRecord.currencyAmount;
								return acc;
							}

							if (
								financialRecord.type === "charge" &&
								financialRecord.subType === "wrapping"
							) {
								acc.otherIncome += financialRecord.currencyAmount;
								return acc;
							}

							if (
								(financialRecord.type === "fee" &&
									(financialRecord.subType === "shipping" ||
										financialRecord.subType === "wrapping" ||
										financialRecord.subType === "handling")) ||
								(financialRecord.type === "serviceFee" &&
									financialRecord.subType === "warehouse")
							) {
								acc.cost += financialRecord.currencyAmount;
								return acc;
							}

							return acc;
						}

						return acc;
					},
					{
						dataRanges: dataRanges,
						productSales: 0,
						shippingRevenue: 0,
						otherIncome: 0,
						cost: 0,
						totalSales: 0,
						total: 0
					}
				);

				readyDataForReport = parseDataForOnePeriod(readyDataForReport);

				//push one calculated period
				readyArrayOfData.push(readyDataForReport);
			});

			vuexContext.commit("setCalculatedDataForReport", readyArrayOfData);
			vuexContext.commit("setActionState", actionStates.DATA_LOADED);
		} catch (e) {
			if (e && e.response && e.response.status === 404) {
				vuexContext.commit("setActionState", actionStates.NOT_FOUND);
			} else {
				console.log("e: " + e);
				vuexContext.commit("setActionState", actionStates.ERRORED);
			}
		}
	},
};

export {actionStates};
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
