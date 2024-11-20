import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5281";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        ;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function get(url) {
    return await axios.get(url)
        .then(function (response) {
            console.log('response', response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function remove(url) {
    return await axios.delete(url)
        .then(function (response) {
            console.log('response', response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function update(url, data) {
    return await axios.put(url, data)
        .then(function (response) {
            console.log('response', response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


export const add = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data; // מחזיר את התוכן של התגובה
  } catch (error) {
    throw error; // זורק שגיאה אם יש בעיה בבקשה
  }
};