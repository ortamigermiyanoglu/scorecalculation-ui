import axios from 'axios'

const BASE_USER_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation/users';
const BASE_CITY_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation/cities';
const BASE_SEGMENT_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation/scoresegment';
const BASE_INCOME_TRANCHE_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation/incometranche';
const BASE_SMS_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation/sms';

class UserService {
    getuserCreateModel(){
        return axios.get(BASE_USER_REST_API_URL+'/createmodel');
    }

    createUpdateUser(data){
        return axios.post(BASE_USER_REST_API_URL, data);
    }

    getCityScore(data){
        return axios.get(BASE_CITY_REST_API_URL, {params:data});
    }

    getSegmentScore(data){
        return axios.get(BASE_SEGMENT_REST_API_URL, {params:data});
    }

    getIncomeTrancheFactor(data){
        return axios.get(BASE_INCOME_TRANCHE_REST_API_URL, {params:data});
    }

    sendSms(data){
        return axios.post(BASE_SMS_REST_API_URL,data)
    }
}

export default new UserService()