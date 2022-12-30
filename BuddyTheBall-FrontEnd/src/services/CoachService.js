import HttpFileRequest from "./HttpFileRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const CoachPhotoUploadService = async (data) => {
    console.log(data);
    return await HttpFileRequest("POST", `${baseUrl}/uploadCustomerPhotos`, data);
};

export { CoachPhotoUploadService };