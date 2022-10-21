import axios from 'axios';
import https from 'https'

export const axios_instance_apiMeraki = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_API_MERAKI}`,
});

axios_instance_apiMeraki.interceptors.request.use(
    async config => {
        config.httpsAgent = await new https.Agent({ rejectUnauthorized: false })
        config.headers = {
            "X-Cisco-Meraki-API-Key": process.env.API_KEY_MERAKI
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);
