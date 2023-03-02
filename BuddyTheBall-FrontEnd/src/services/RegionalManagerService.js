import Config from "../../Config";
import HttpRequest from "./HttpRequest";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetAllRegionalManagersService = async () => {
    return await HttpRequest("GET", `${baseUrl}/getRegionalManagers`, null);
};

const GetParticularRegionalManagerService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/findParticularRegionalManager/${id}`, null);
};

const RegionalManagerUpdateService = async (userId, regionalManagerId, data) => {
    return await HttpRequest("PUT", `${baseUrl}/updateRegionalManager/${userId}/${regionalManagerId}`, data);
};

export {
    GetAllRegionalManagersService, GetParticularRegionalManagerService, RegionalManagerUpdateService
};