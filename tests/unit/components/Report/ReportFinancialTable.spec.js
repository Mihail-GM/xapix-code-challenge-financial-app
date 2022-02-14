import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import {merge} from "lodash";

import ReportFinancialTable from "@/components/Report/ReportFinancialTable";
import financialReportStore from "@/store/modules/financialReport";

describe('ReportFinancialTable.vue', () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	let vuetify;
	let getters;

	beforeEach(() => {
		vuetify = new Vuetify();
	})

	function createStore(overrides) {
		let currentState = "DATA_LOADED";
		let financial = [
				{
					"dataRanges": "1/2021",
					"productSales": 17.24,
					"shippingRevenue": 2.44,
					"otherIncome": 0,
					"cost": -3.32,
					"totalSales": 19.68,
					"total": 16.36
				},
				{
					"dataRanges": "2021",
					"productSales": 21.55,
					"shippingRevenue": 3.05,
					"otherIncome": 0,
					"cost": -4.15,
					"totalSales": 24.6,
					"total": 20.45
				},
				{
					"dataRanges": "2/2021",
					"productSales": 4.31,
					"shippingRevenue": 0.61,
					"otherIncome": 0,
					"cost": -0.83,
					"totalSales": 4.92,
					"total": 4.09
				}
			]
		;

		getters = {
			getCurrentState: () => currentState,
			getCalculatedDataForReport: () => financial
		}

		const defaultStoreConfig = {
			modules: {
				financialReport: {
					namespaced: true,
					state: {
						currentState,
						financial,
					},
					getters: financialReportStore.getters,

				}
			}
		};

		return new Vuex.Store(merge(defaultStoreConfig, overrides));
	}

	const createWrapper = (overrides) => {
		const defaultMountingOptions = {
			localVue,
			vuetify,
			store: createStore(),

			mocks: {
				// Vue Router
				$router: {
					push: () => {
					}
				},
			},
		};

		return mount(ReportFinancialTable, merge(defaultMountingOptions, overrides))
	}

	it('should render component ', () => {
		const wrapper = createWrapper();

		expect(wrapper.is(ReportFinancialTable)).toBe(true);
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
