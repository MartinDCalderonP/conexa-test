import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { businessUrl } from "../config";

const api = axios.create({
  baseURL: businessUrl + "/user",
});

export const get = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (err) {
    return err.response;
  }
};
