export interface CustomResponse {
    code:       string;
    message:    string;
    httpStatus: number;
}

export const successGetResponse : CustomResponse = {
    code:       'DATA_RECEIVED',
    message:    'resource data successfully received',
    httpStatus: 200,
};
  
export const successPostResponse : CustomResponse =  {
    code:       'SUCCESSFULLY_CREATED',
    message:    'resource created successfully',
    httpStatus: 201,
  };
  
  export const failedPostResponse : CustomResponse =  {
    code:       'FAILED_CREATED',
    message:    'resource creation failed',
    httpStatus: 400,
  };
  
  export const successPutResponse : CustomResponse =  {
    code:       'SUCCESSFULLY_UPDATED',
    message:    'resource updated successfully',
    httpStatus: 200,
  };
  
  export const successDeleteResponse : CustomResponse =  {
    code:       'SUCCESSFULLY_DELETED',
    message:    'resource deleted successfully',
    httpStatus: 200,
  };
  
  export const failedDeleteResponse : CustomResponse =  {
    code:       'FAILED_DELETED',
    message:    'failed to delete resource',
    httpStatus: 200,
  };
  
  export const unauthorizedResponse : CustomResponse =  {
    code:       'UNAUTHORIZED',
    message:    'unauthorized user',
    httpStatus: 401,
  };
  
  export const badResponse : CustomResponse =  {
    code:       'VALIDATION_ERROR',
    message:    'validation fired during execution',
    httpStatus: 400,
  };
  
  export const exceptionOccurredResponse : CustomResponse =  {
    code:       'EXCEPTION_OCCURRED',
    message:    'exception occurs during execution',
    httpStatus: 400,
  };
  
  export const notFoundResponse : CustomResponse =  {
    code:       'NOT_FOUND',
    message:    'resource not fond',
    httpStatus: 404,
  };
  
  export const permissionDeniedResponse : CustomResponse =  {
    code:       'PERMISSION_DENIED',
    message:    'User does not have enough permissions',
    httpStatus: 403,
  };
  