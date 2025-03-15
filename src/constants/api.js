import axios from 'axios'

const api = axios.create({
//baseURL:'http://66.29.149.122:3006',
baseURL: 'https://gutmanfoodsadmin.unitdtechnologies.com:3006',
//baseURL: 'http://localhost:3001',
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api