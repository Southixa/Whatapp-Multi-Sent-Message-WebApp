import axios from 'axios';

export const sendWhatsappMessageApi = async (phoneNumber, message, config) => {
  try {
    const data = new URLSearchParams();
    data.append("token", config?.token);
    data.append("to", `+85620${phoneNumber}`);
    data.append("body", message);

    const urlConfig = {
      method: 'post',
      url: `https://api.ultramsg.com/${config?.instanceId}/messages/chat`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    const response = await axios(urlConfig);
    console.log("res of sendWhatsappMessageApi ==> ", response?.data);
    return response?.data;
  } catch (error) {
    console.error('error occurred in sendWhatsappMessage ==> ', error);
  }
};