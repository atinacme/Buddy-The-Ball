import axios from "axios";

const HttpFileRequest = async (method, url, data) => {
    const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};

export default HttpFileRequest;
