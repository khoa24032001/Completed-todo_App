import { axiosClient } from "./config";

export async function getData(url, params, headerConfigs = {}) {
    return await axiosClient({
        url,
        method: 'GET',
        params,
        headers: headerConfigs
    })
}

export async function getColorData(url, params, headerConfigs = {}) {
    return await axiosClient.get(url, {
        params,
        headers: headerConfigs
    })
}

export async function deleteData(url, params, headerConfigs = {}) {
    return await axiosClient.delete(url, {
        params,
        headers: headerConfigs
    })
}

export async function updateData(url, params, headerConfigs = {}) {
    return await axiosClient({
        url,
        method: 'PUT',
        params,
        headers: headerConfigs
    })
}

export async function addData(url, params, headerConfigs = {}) {
    return await axiosClient({
        url,
        method: 'POST',
        params,
        headers: headerConfigs
    })
}
