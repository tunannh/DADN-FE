export { };

declare global {
    interface IbackendResponse {
        error?: string | string[];
        status?: number | string;
        gardener_id?: number;
        garden_id?: number;
        detail?: string | string[];
        data?: any;
    }
}