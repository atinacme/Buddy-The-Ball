import Config from "../../Config";
import HttpRequest from "./HttpRequest";

const baseUrl = Config.REACT_APP_BASE_URL;

const CreateAndUpdateAttendanceService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createAndUpdateAttendance`, data);
};

const GetAttendanceByDateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/getAttendanceByDate`, data);
};

export {
    CreateAndUpdateAttendanceService, GetAttendanceByDateService
};