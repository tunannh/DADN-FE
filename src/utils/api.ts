import axios from "@/utils/axios.customize";

// ****************************************************************************
// Authentication APIs
// ***************************************************************************
export const registerAPI = (name: string, email: string, password: string) => {
    const url = "/register";
    return axios.post(url, {
        name,
        email,
        password,
        garden_id: 1,
    });
}

export const loginAPI = (email: string, password: string) => {
    const url = "/login";
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
export const createDeviceAPI = (
    name: string,
    device_type: "sensor" | "actuator",
    sensor_type: "soil_moisture" | "temperature" | "humidity" | null,
    actuator_type: "pump" | "relay" | "lcd" | null,
    model: string | null,
    feed_key: string | null
) => {
    const url = "/devices/create";

    return axios.post(url, {
        name,
        device_type,
        sensor_type,
        actuator_type,
        model,
        feed_key,
    });
}

export const listDevicesAPI = () => {
    const url = "/devices";
    return axios.get(url);
}

export const deleteDeviceAPI = (device_id: string) => {
    const url = `/devices/${device_id}`;
    return axios.delete(url);
}

export const pumpStatusAPI = () => {
    const url = "/devices/pump/state";
    return axios.get(url);
}

export const changePumpStatusAPI = (action: string) => {
    const url = "/devices/pump/control";
    return axios.post(url, { action });
}

export const autoStatus = () => {
    const url = "/automation/status";
    return axios.get(url);
}

export const changeAutoStatus = (enabled: boolean) => {
    const url = "/automation";
    return axios.put(url, { enabled });
}


// ****************************************************************************
// history infor APIs
// ***************************************************************************
export const wateringHistoryAPI = () => {
    const url = "/irrigation-sessions";
    return axios.get(url);
}

export const logsAPI = (
    params?: {
        action?: string;
        event_type?: string;
        start_time?: string;
        end_time?: string;
        limit?: number;
        offset?: number;
    }
) => {
    return axios.get("/logs", {
        params,
    });
};

export const notificationAPI = () => {
    const url = "/notifications";
    return axios.get(url);
}


// ****************************************************************************
// Sensor Data APIs
// ***************************************************************************
export const sensorDataAPI = () => {
    const url = "/monitoring";
    return axios.get(url);
}

// ****************************************************************************
// get list threshold APIs
// ***************************************************************************
export const getThresholdAPI = () => {
    const url = "/thresholds";
    return axios.get(url);
}

// ****************************************************************************
// set threshold APIs
// ***************************************************************************
export const setThresholdAPI = (id: string, min_value: number, max_value: number) => {
    const url = `/thresholds/update/${id}`;
    return axios.put(url, {
        min_value,
        max_value,
    });
}

// ****************************************************************************
// users APIs
// ***************************************************************************
export const getUsersAPI = () => {
    const url = "/users";
    return axios.get(url);
}

export const deleteUserAPI = (user_id: string) => {
    const url = `/users/${user_id}`;
    return axios.delete(url);
}

export const getProfileAPI = () => {
    const url = "/users/me";
    return axios.get(url);
}