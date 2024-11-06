import { ApiError } from "@/error/ApiError";
import { ClientError } from "@/error/ClientError";
import { ValidationError } from "@/error/ValidationError";
import { ApiResponseModel } from "@/type/ApiResponseModel";
import { NextResponse } from "next/server";
import { z } from "zod";

export const Utils = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateParameters: (zodObject: z.ZodObject<any>, data: any) => {
        const zodobj = zodObject.safeParse(data);
        if (zodobj.success) {
            return Promise.resolve(zodobj.data);
        } else {
            return Promise.reject(new ValidationError('Invalid parameters.'));
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleErrorResponse: (error: any) => {
        if (error instanceof ValidationError) {
            return NextResponse.json<ApiResponseModel<undefined>>({
                errorMsg: error.message ? error.message : 'Validation Failed',
                data: undefined
            }, {
                status: 400
            });
        } else if (error instanceof ClientError) {
            return NextResponse.json<ApiResponseModel<undefined>>({
                errorMsg: error.message,
                data: undefined
            }, {
                status: 400
            });
        } else if (error instanceof ApiError) {
            console.error(error.message);
            return NextResponse.json<ApiResponseModel<undefined>>({
                errorMsg: 'Api Failed',
                data: undefined
            }, {
                status: 500
            });
        } else {
            console.error(error);
            return NextResponse.json<ApiResponseModel<undefined>>({
                errorMsg: 'Server can\'t handle this request. If this error occurs constantly, reach out to the administrator.',
                data: undefined
            }, {
                status: 500
            });
        }
    }
}