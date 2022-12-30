import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetCustomerWithSchoolIdService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getCustomerWithSchoolId/${id}`, null);
};

export { GetCustomerWithSchoolIdService };