import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetCustomerWithSchoolIdService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getCustomerWithSchoolId/${id}`, null);
};

const GetCustomerParticularPhotoService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularPhoto/${id}`, null);
};

const UpdateCustomerPhotosOnMessage = async (id, data) => {
    return await HttpRequest("POST", `${baseUrl}/updateCustomerPhotosOnMessage/${id}`, data);
};

export { GetCustomerWithSchoolIdService, GetCustomerParticularPhotoService, UpdateCustomerPhotosOnMessage };