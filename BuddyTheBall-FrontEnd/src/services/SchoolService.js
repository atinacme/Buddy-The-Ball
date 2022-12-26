import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetSchoolsService = async () => {
    return await HttpRequest("GET", `${baseUrl}/getSchools`, null);
};

export { GetSchoolsService };