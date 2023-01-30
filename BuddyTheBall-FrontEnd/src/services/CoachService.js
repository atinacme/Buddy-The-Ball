import Config from "../../Config";
import HttpRequest from "./HttpRequest";

const baseUrl = Config.REACT_APP_BASE_URL;

const CoachPhotoUploadService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/uploadCustomerPhotos`, data);
};

const GetAllCoachesService = async () => {
    return await HttpRequest("GET", `${baseUrl}/getCoaches`, null);
};

const GetParticularCoachService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularCoach/${id}`, null);
};

const GetCustomersOfParticularCoachService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getCustomersOfParticularCoach/${id}`, null);
};

const CoachUpdateService = async (userId, coachId, data) => {
    return await HttpRequest("PUT", `${baseUrl}/updateCoach/${userId}/${coachId}`, data);
};

export { CoachPhotoUploadService, GetAllCoachesService, GetParticularCoachService, GetCustomersOfParticularCoachService, CoachUpdateService };