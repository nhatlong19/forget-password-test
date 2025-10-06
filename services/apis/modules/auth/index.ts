import { postMethod } from "@/services/apis/http-server";

export const forgotPassword = async (body: any) => {
  try {
    const response = await postMethod(`client/auth/forgot-password`, body);
    return response;
  } catch (error) {
    console.error("Error posting data: ", error);
    return error;
  }
};
