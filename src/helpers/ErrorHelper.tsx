import axios, { AxiosError } from "axios";

export  function  getErrorMessage(error:unknown)
{
    if (axios.isAxiosError<{ message: string }>(error)) {
      console.log("error",error);
      console.log("response",error.response);

        return error.response?.data?.message || "Error inesperado de Axio"
      } else if (error instanceof Error) {
        return error.message;
      } else {
        return "Error inesperado";
      }
}