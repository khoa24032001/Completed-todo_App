import { getColorData } from "../query";

export function getColor(onSuccess, onError) {
    getColorData(`/colors`).then(response => {
        const colors = response.data.data;
        onSuccess?.(colors);
    }).catch(error => {
        onError?.(error);
    });
}