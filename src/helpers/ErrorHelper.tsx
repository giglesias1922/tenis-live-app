import axios, { AxiosError } from "axios";

export default function  getErrorMessage(error:unknown)
{
    if (axios.isAxiosError<{ message: string }>(error)) {
        return error.response?.data?.message || "Error inesperado de Axio"
      } else if (error instanceof Error) {
        return error.message;
      } else {
        return "Error inesperado";
      }
}