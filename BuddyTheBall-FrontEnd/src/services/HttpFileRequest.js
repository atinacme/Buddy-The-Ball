import axios from "axios";

const HttpFileRequest = async (method, url, data) => {
    const response = await axios({
        method: method,
        url: url,
        data: data,
    });
    return response;
};

export default HttpFileRequest;
