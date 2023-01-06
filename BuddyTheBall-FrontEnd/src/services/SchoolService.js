import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetSchoolsService = async () => {
    return await HttpRequest("GET", `${baseUrl}/getSchools`, null);
};

const SchoolCreationService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createSchool`, data);
};

const GetParticularSchoolPhotosService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularSchoolPhotos/${id}`, null);
};


export { GetSchoolsService, SchoolCreationService, GetParticularSchoolPhotosService };