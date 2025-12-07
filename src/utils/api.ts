import axios from "@/utils/axios.customize";

// ****************************************************************************
// Authentication APIs
// ***************************************************************************
export const registerAPI = (name: string, email: string, password: string) => {
    const url = "/auth/register";
    return axios.post(url, {
        name,
        email,
        password,
        garden_id: 1,
    });
}

export const loginAPI = (email: string, password: string) => {
    const url = "/auth/login";
    return axios.post(url, {
        username: email,
        password,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}


// ****************************************************************************
// Device APIs
// ***************************************************************************
export const createDeviceAPI = (access_token: string, name: string, device_type: "sensor" | "actuator",
    sensor_type: "soil_moisture" | "temperature" | "humidity" | null,
    actuator_type: "pump" | "relay" | "lcd" | null,
    model: string | null,
    status: "active" | "inactive" | "error",
    feed_key: string | null,
    garden_id: number) => {

    const url = "/devices";

    return axios.post(url, {
        name,
        device_type,
        sensor_type,
        actuator_type,
        model,
        status,
        feed_key,
        garden_id,
    }, {
        headers: {
            'Authorization': `bearer ${access_token}`,
        },
    });
}

export const deleteDeviceAPI = (access_token: string, device_id: number) => {
    const url = `/devices/${device_id}`;
    return axios.delete(url, {
        headers: {
            'Authorization': `bearer ${access_token}`,
        },
    });
}


// ****************************************************************************
// Watering History APIs
// ***************************************************************************
export const wateringHistoryAPI = (access_token: string) => {
    const url = "/dashboard/gardens/irrigation-sessions";
    return axios.get(url, {
        headers: {
            'Authorization': `bearer ${access_token}`,
        },
    });
}

