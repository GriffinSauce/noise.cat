import axios from 'axios';

export default (...args) => axios(...args).then(({ data }) => data);
