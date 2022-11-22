import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const SignInService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/auth/signin`, data);
};

export { SignInService };