import { commonErrors} from '../constants';

interface ServerErrorOptions {
  error: string,
  message: string,
  statusCode: number
}

function ServerError(this: any, options?: ServerErrorOptions) {
  Error.call(this);
  Error.captureStackTrace(this);

  this.name = commonErrors.SERVER_ERROR;
  this.message = options?.message || 'Error on Server';
  this.serverErrorName = options?.error || commonErrors.SERVER_ERROR;
  this.statusCode = options?.statusCode || null;
}

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

export default ServerError;
