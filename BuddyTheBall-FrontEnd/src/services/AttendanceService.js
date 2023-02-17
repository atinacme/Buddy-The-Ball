import Config from "../../Config";
import HttpRequest from "./HttpRequest";

const baseUrl = Config.REACT_APP_BASE_URL;

const CreateAttendanceService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createAttendance`, data);
};

export {
    CreateAttendanceService
};