import axios from 'axios'

const BASE_REST_API_URL = 'http://127.0.0.1:8080/scorecalculation'


class UserService {
    getuserCreateMode(){
        axios.get(BASE_REST_API_URL+'/users')
    }
}

export default new UserService()