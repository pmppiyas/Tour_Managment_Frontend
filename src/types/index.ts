export type { ILogin, ISendOtp, IVerify } from "./auth.types";
import { type ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IError {
  status: number;
  data: {
    message?: string;
    error?: {
      statusCode?: number;
    };
    success?: boolean;
    stack?: string;
  };
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    icon: ComponentType;
  }[];
}
