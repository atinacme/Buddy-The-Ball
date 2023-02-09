import Config from '../../Config';
import HttpRequest from './HttpRequest';

const baseUrl = Config.REACT_APP_BASE_URL;

const CreateAgendaService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createAgenda`, data);
};

const GetAgendaByDateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/getAgendaByDate`, data);
};

const UpdateAgendaService = async (id, data) => {
    return await HttpRequest("POST", `${baseUrl}/updateAgenda/${id}`, data);
};

export { CreateAgendaService, GetAgendaByDateService, UpdateAgendaService };