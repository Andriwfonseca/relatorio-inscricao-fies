import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch (exception: any, host: ArgumentsHost) {
        try {
            const util = require('util');
            console.error(`NEW ERROR....: ${new Date()}`);
            console.error(`Error....: ${util.inspect(exception)}`);
            console.error(`Callstack: ${exception?.stack}`);

            const ctx = host?.switchToHttp();
            if (ctx) {
                const request = ctx?.getRequest<any>();
                if (request) {
                    console.error(`Request......:`);
                    console.error(`    Headers..: ${util.inspect(request.headers)}`);
                    console.error(`    Url......: ${request.url}`);
                    console.error(`    Route....: ${util.inspect(request.route?.path)}`);
                    console.error(`    Method...: ${request.method}`);
                    console.error(`    Body.....: ${util.inspect(request.body)}`);
                    console.error(`    Params...: ${util.inspect(request.params)}`);
                    console.error(`    Query....: ${util.inspect(request.query)}`);
                }
                const response = ctx?.getResponse<Response>();
                if (response) {
                    console.error(`Response.....:`);
                    console.error(`    Body.....: ${util.inspect(response.body)}`);
                }
                const status =
                    exception instanceof HttpException
                        ? exception?.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;
                if (status) {
                    console.error(`--- Status...: ${util.inspect(status)}`);
                }
            }
        } catch (newError) {
            console.error(newError);
        }
        super.catch(exception, host);
    }
}