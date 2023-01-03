import HttpFileRequest from "./HttpFileRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;
console.log("baseurl--->", baseUrl);

const CoachPhotoUploadService = async (data) => {
    return await HttpFileRequest("POST", `${baseUrl}/uploadCustomerPhotos`, data);
};

export { CoachPhotoUploadService };