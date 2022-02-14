import $axios from '../plugins/axios'

class FinancialService {
	getFinancialRecords() {
		return $axios.get('/financialRecords.json')
			.then((res) => {
				return res.data;
			});
	}

	getFinancialGroups() {
		return $axios.get('/financialGroups.json')
			.then((res) => {
				return res.data;
			});
	}

}

export default new FinancialService();
