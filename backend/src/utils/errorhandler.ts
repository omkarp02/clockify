class ErrorHander extends Error{
    constructor(message,public statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

export {ErrorHander}