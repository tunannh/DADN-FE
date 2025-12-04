import axios from "@/utils/axios.customize";

export const registerAPI = (email: string, name: string, password: string) => {
    const url = "/auth/register";
    return axios.post<IbackendResponse>(url, {
        email,
        name,
        password,
        garden_id: 1,
    });
}

export const loginAPI = (email: string, password: string) => {
    const url = "/auth/login";
    return axios.post<IbackendResponse>(url, {
        "grant-type": 'password',
        username: email,
        password,
    },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
}