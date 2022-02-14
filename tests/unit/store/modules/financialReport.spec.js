import Vuex from "vuex";

import {createLocalVue} from "@vue/test-utils";
import {cloneDeep} from "lodash";

import financialReport, {actionStates} from "@/store/modules/financialReport";
import FinancialService from "@/services/financial.service";

jest.mock("@/services/financial.service");

const apiResultForFinancialGroup = [
	{
		"id": "opafhhd",
		"groupStart": "2021-01-03T15:32:45Z",
		"groupEnd": "2021-01-17T15:32:44Z",
		"status": "closed",
		"sellerId": "banana-shop"
	},
	{
		"id": "r242ehd",
		"groupStart": "2021-01-17T15:32:45Z",
		"groupEnd": "2021-01-31T15:32:44Z",
		"status": "closed",
		"sellerId": "banana-shop"
	},
	{
		"id": "iurfysq",
		"groupStart": "2021-01-31T15:32:45Z",
		"groupEnd": "2021-02-13T15:32:44Z",
		"status": "closed",
		"sellerId": "banana-shop"
	}
];

const apiResult = [
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "principal",
		"currencyAmount": 4.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "tax",
		"currencyAmount": 0.39,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "wrapping",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "wrapping-tax",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "shipping",
		"currencyAmount": 0.61,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "charge",
		"subType": "shipping-tax",
		"currencyAmount": 0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "fee",
		"subType": "shipping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "fee",
		"subType": "wrapping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-03T16:33:42Z",
		"orderId": "ban-1",
		"type": "fee",
		"subType": "handling",
		"currencyAmount": -0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "principal",
		"currencyAmount": 4.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "tax",
		"currencyAmount": 0.39,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "wrapping",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "wrapping-tax",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "shipping",
		"currencyAmount": 0.61,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "charge",
		"subType": "shipping-tax",
		"currencyAmount": 0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "fee",
		"subType": "shipping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "fee",
		"subType": "wrapping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-06T07:21:31Z",
		"orderId": "ban-2",
		"type": "fee",
		"subType": "handling",
		"currencyAmount": -0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "principal",
		"currencyAmount": 4.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "tax",
		"currencyAmount": 0.39,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "wrapping",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "wrapping-tax",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "shipping",
		"currencyAmount": 0.61,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "charge",
		"subType": "shipping-tax",
		"currencyAmount": 0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "fee",
		"subType": "shipping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "fee",
		"subType": "wrapping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "2021-01-07T09:16:19Z",
		"orderId": "ban-3",
		"type": "fee",
		"subType": "handling",
		"currencyAmount": -0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "opafhhd",
		"postedDate": "",
		"orderId": "",
		"type": "serviceFee",
		"subType": "warehouse",
		"currencyAmount": -0.32,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "principal",
		"currencyAmount": 4.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "tax",
		"currencyAmount": 0.39,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "wrapping",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "wrapping-tax",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "shipping",
		"currencyAmount": 0.61,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "charge",
		"subType": "shipping-tax",
		"currencyAmount": 0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "fee",
		"subType": "shipping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "fee",
		"subType": "wrapping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "2021-01-18T09:16:19Z",
		"orderId": "ban-4",
		"type": "fee",
		"subType": "handling",
		"currencyAmount": -0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "r242ehd",
		"postedDate": "",
		"orderId": "",
		"type": "serviceFee",
		"subType": "warehouse",
		"currencyAmount": -0.12,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "principal",
		"currencyAmount": 4.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "tax",
		"currencyAmount": 0.39,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "wrapping",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "wrapping-tax",
		"currencyAmount": 0.0,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "shipping",
		"currencyAmount": 0.61,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "charge",
		"subType": "shipping-tax",
		"currencyAmount": 0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "fee",
		"subType": "shipping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "fee",
		"subType": "wrapping",
		"currencyAmount": -0.31,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "2021-02-02T09:16:19Z",
		"orderId": "ban-5",
		"type": "fee",
		"subType": "handling",
		"currencyAmount": -0.21,
		"currencyCode": "EUR"
	},
	{
		"groupId": "iurfysq",
		"postedDate": "",
		"orderId": "",
		"type": "serviceFee",
		"subType": "warehouse",
		"currencyAmount": -0.13,
		"currencyCode": "EUR"
	}
];

describe(`financialReport module`, () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	let store;

	beforeEach(() => {
		FinancialService.getFinancialRecords.mockReset();
		store = new Vuex.Store(cloneDeep(financialReport));
	});

	describe("fetchCalculatedDataForReport action", () => {
		it("sets currentState to LOADING when fetchCalculatedDataForReport is pending", async () => {
			expect(store.state.currentState).toBe(actionStates.INITIAL);

			const promise = store.dispatch("fetchCalculatedDataForReport");
			expect(store.state.currentState).toBe(actionStates.LOADING);
			await promise;
		});

		it("sets currentState to DATA_LOADED when fetchCalculatedDataForReport is successful", async () => {
			FinancialService.getFinancialRecords.mockResolvedValue(apiResult);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(store.state.currentState).toBe(actionStates.DATA_LOADED);
		});

		it("sets currentState to ERRORED when fetchCalculatedDataForReport is unsuccessful", async () => {
			FinancialService.getFinancialRecords.mockRejectedValue();
			await store.dispatch("fetchCalculatedDataForReport");

			expect(store.state.currentState).toBe(actionStates.ERRORED);
		});

		it("updates state.calculatedDataForReport with calculated data from API", async () => {
			FinancialService.getFinancialRecords.mockResolvedValue(apiResult);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(FinancialService.getFinancialRecords).toHaveBeenCalledTimes(1);
			expect(store.state.calculatedDataForReport).toStrictEqual([
					{
						"dataRanges": "1/2021",
						"productSales": "17.24",
						"shippingRevenue": "2.44",
						"otherIncome": "0.00",
						"cost": "-3.76",
						"totalSales": "19.68",
						"total": "15.92"
					},

					{
						"dataRanges": "2021",
						"productSales": "21.55",
						"shippingRevenue": "3.05",
						"otherIncome": "0.00",
						"cost": "-4.72",
						"totalSales": "24.60",
						"total": "19.88"
					},

					{
						"dataRanges": "2/2021",
						"productSales": "4.31",
						"shippingRevenue": "0.61",
						"otherIncome": "0.00",
						"cost": "-0.96",
						"totalSales": "4.92",
						"total": "3.96"
					}
				]
			);
		});

		it("updates state.calculatedDataForReport with calculated data from API (with more periods for calculation)", async () => {
			const resultFromApiWithMorePeriods = [
				{
					"groupId": "opafhhd",
					"postedDate": "2022-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "tax",
					"currencyAmount": 0.39,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2019-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "wrapping",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "wrapping-tax",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "shipping",
					"currencyAmount": 0.61,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "shipping-tax",
					"currencyAmount": 0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "fee",
					"subType": "shipping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "fee",
					"subType": "wrapping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-03T16:33:42Z",
					"orderId": "ban-1",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "tax",
					"currencyAmount": 0.39,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "wrapping",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "wrapping-tax",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "shipping",
					"currencyAmount": 0.61,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2020-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "charge",
					"subType": "shipping-tax",
					"currencyAmount": 0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "fee",
					"subType": "shipping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "fee",
					"subType": "wrapping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-06T07:21:31Z",
					"orderId": "ban-2",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "tax",
					"currencyAmount": 0.39,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "wrapping",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "wrapping-tax",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "shipping",
					"currencyAmount": 0.61,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "charge",
					"subType": "shipping-tax",
					"currencyAmount": 0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "fee",
					"subType": "shipping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-01-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "fee",
					"subType": "wrapping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "2021-05-07T09:16:19Z",
					"orderId": "ban-3",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "opafhhd",
					"postedDate": "",
					"orderId": "",
					"type": "serviceFee",
					"subType": "warehouse",
					"currencyAmount": -0.32,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "tax",
					"currencyAmount": 0.39,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "wrapping",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "wrapping-tax",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "shipping",
					"currencyAmount": 0.61,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "charge",
					"subType": "shipping-tax",
					"currencyAmount": 0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-02-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "fee",
					"subType": "shipping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "fee",
					"subType": "wrapping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "2021-01-18T09:16:19Z",
					"orderId": "ban-4",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "r242ehd",
					"postedDate": "",
					"orderId": "",
					"type": "serviceFee",
					"subType": "warehouse",
					"currencyAmount": -0.12,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "tax",
					"currencyAmount": 0.39,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "wrapping",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "wrapping-tax",
					"currencyAmount": 0.0,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "shipping",
					"currencyAmount": 0.61,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "charge",
					"subType": "shipping-tax",
					"currencyAmount": 0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "fee",
					"subType": "shipping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "fee",
					"subType": "wrapping",
					"currencyAmount": -0.31,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "",
					"orderId": "",
					"type": "serviceFee",
					"subType": "warehouse",
					"currencyAmount": -0.13,
					"currencyCode": "EUR"
				}
			];

			FinancialService.getFinancialRecords.mockResolvedValue(resultFromApiWithMorePeriods);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(FinancialService.getFinancialRecords).toHaveBeenCalledTimes(1);
			expect(store.state.calculatedDataForReport).toStrictEqual([
					{
						"dataRanges": "1/2022",
						"productSales": "4.31",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "4.31",
						"total": "4.31"
					},

					{
						"dataRanges": "2022",
						"productSales": "4.31",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "4.31",
						"total": "4.31"
					},

					{
						"dataRanges": "1/2021",
						"productSales": "12.93",
						"shippingRevenue": "2.44",
						"otherIncome": "0.00",
						"cost": "-3.24",
						"totalSales": "15.37",
						"total": "12.13"
					},

					{
						"dataRanges": "2021",
						"productSales": "17.24",
						"shippingRevenue": "3.05",
						"otherIncome": "0.00",
						"cost": "-4.72",
						"totalSales": "20.29",
						"total": "15.57"
					},

					{
						"dataRanges": "1/2019",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "0.00",
						"total": "0.00"
					},

					{
						"dataRanges": "2019",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "0.00",
						"total": "0.00"
					},

					{
						"dataRanges": "1/2020",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "0.00",
						"total": "0.00"
					},

					{
						"dataRanges": "2020",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "0.00",
						"totalSales": "0.00",
						"total": "0.00"
					},

					{
						"dataRanges": "5/2021",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "-0.21",
						"totalSales": "0.00",
						"total": "-0.21"
					},

					{
						"dataRanges": "2/2021",
						"productSales": "4.31",
						"shippingRevenue": "0.61",
						"otherIncome": "0.00",
						"cost": "-1.27",
						"totalSales": "4.92",
						"total": "3.65"
					}
				]
			);
		});

		it("Should add record to period when date is missing but correct group id is there", async () => {
			const resultFromApiWithMorePeriods = [
				{
					"groupId": "iurfysq",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "iurfysq",
					"postedDate": "",
					"orderId": "",
					"type": "serviceFee",
					"subType": "warehouse",
					"currencyAmount": -0.13,
					"currencyCode": "EUR"
				}
			];

			FinancialService.getFinancialRecords.mockResolvedValue(resultFromApiWithMorePeriods);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(FinancialService.getFinancialRecords).toHaveBeenCalledTimes(1);
			expect(store.state.calculatedDataForReport).toStrictEqual([
					{
						"dataRanges": "2/2021",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "-0.34",
						"totalSales": "0.00",
						"total": "-0.34"
					},

					{
						"dataRanges": "2021",
						"productSales": "0.00",
						"shippingRevenue": "0.00",
						"otherIncome": "0.00",
						"cost": "-0.34",
						"totalSales": "0.00",
						"total": "-0.34"
					},
				]
			);
		});

		it("Should not add record to period when date is missing but incorrect group id is there", async () => {
			const resultFromApiWithMorePeriods = [
				{
					"groupId": "TEST_MISSING_ID",
					"postedDate": "2021-02-02T09:16:19Z",
					"orderId": "ban-5",
					"type": "fee",
					"subType": "handling",
					"currencyAmount": -0.21,
					"currencyCode": "EUR"
				},
				{
					"groupId": "TEST_MISSING_ID",
					"postedDate": "",
					"orderId": "",
					"type": "serviceFee",
					"subType": "warehouse",
					"currencyAmount": -0.13,
					"currencyCode": "EUR"
				}
			];

			FinancialService.getFinancialRecords.mockResolvedValue(resultFromApiWithMorePeriods);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(FinancialService.getFinancialRecords).toHaveBeenCalledTimes(1);
			expect(store.state.calculatedDataForReport).toStrictEqual([]);
		});

		it("Should not add record to period when date is missing and also group id is missing", async () => {
			const resultFromApiWithMorePeriods = [
				{
					"groupId": "",
					"postedDate": "",
					"orderId": "ban-1",
					"type": "charge",
					"subType": "principal",
					"currencyAmount": 4.31,
					"currencyCode": "EUR"
				},
			];

			FinancialService.getFinancialRecords.mockResolvedValue(resultFromApiWithMorePeriods);
			FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

			await store.dispatch("fetchCalculatedDataForReport");

			expect(FinancialService.getFinancialRecords).toHaveBeenCalledTimes(1);
			expect(store.state.calculatedDataForReport).toStrictEqual([]
			);
		});

		it.each`
		  response
		  ${null}
		  ${undefined}
		  ${{}}
		`(
			"sets state.financialReport to an empty array when getFinancialRecords returns $response",
			async ({response}) => {
				FinancialService.getFinancialRecords.mockResolvedValue(response);
				FinancialService.getFinancialGroups.mockResolvedValue(apiResultForFinancialGroup);

				await store.dispatch("fetchCalculatedDataForReport");

				expect(store.state.calculatedDataForReport).toStrictEqual([]);
			}
		);
	});
});
