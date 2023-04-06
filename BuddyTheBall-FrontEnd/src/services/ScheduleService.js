import Config from '../../Config';
import HttpRequest from './HttpRequest';

const baseUrl = Config.REACT_APP_BASE_URL;

const CreateScheduleService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createSchedule`, data);
};

const GetScheduleByDateAndCoachService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/getScheduleByDateAndCoach`, data);
};

const GetScheduleByCoachService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getScheduleByCoach/${id}`, null);
};

const UpdateScheduleService = async (id, data) => {
    return await HttpRequest("POST", `${baseUrl}/updateSchedule/${id}`, data);
};

export { CreateScheduleService, GetScheduleByDateAndCoachService, GetScheduleByCoachService, UpdateScheduleService };