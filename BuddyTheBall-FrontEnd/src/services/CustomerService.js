import HttpRequest from "./HttpRequest";
import Config from "../../Config";

const baseUrl = Config.REACT_APP_BASE_URL;

const GetCustomersService = async () => {
    return await HttpRequest("GET", `${baseUrl}/getCustomers`, null);
};

const GetCustomerWithSchoolIdService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getCustomerWithSchoolId/${id}`, null);
};

const GetParticularCustomerPhotosService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularCustomerPhotos/${id}`, null);
};

const GetParticularCustomerService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularCustomer/${id}`, null);
};

const GetCustomerParticularPhotoService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getParticularPhoto/${id}`, null);
};

const UpdateCustomerPhotosOnMessageService = async (id, data) => {
    return await HttpRequest("POST", `${baseUrl}/updateCustomerPhotosOnMessage/${id}`, data);
};

const CreateAndUpdateMessageService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/createAndUpdateMessage`, data);
};

const GetMessagesBySenderIdService = async (id) => {
    return await HttpRequest("GET", `${baseUrl}/getMessagesBySenderId/${id}`, null);
};

const GetMessagesBySenderIdReceiverIdService = async (sender_id, receiver_id) => {
    return await HttpRequest("GET", `${baseUrl}/getMessagesBySenderIdReceiverId/${sender_id}/${receiver_id}`, null);
};

export {
    GetCustomersService, GetCustomerWithSchoolIdService, GetParticularCustomerPhotosService, GetParticularCustomerService,
    GetCustomerParticularPhotoService, UpdateCustomerPhotosOnMessageService, CreateAndUpdateMessageService, GetMessagesBySenderIdService,
    GetMessagesBySenderIdReceiverIdService
};