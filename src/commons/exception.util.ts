import { BadRequestException } from "@nestjs/common";

export class ExceptionsUtil {
    public static handle (err: any) {
        const util = require('util');
        const msg = 'Ocorreu um erro! Detalhes:';
        console.error(err);
        if (err?.response?.data) {
            throw new BadRequestException(`${msg} ${util.inspect(err.response.data)}`);
        }
        if (err?.response?.body) {
            throw new BadRequestException(`${msg} ${util.inspect(err?.response?.body)}`);
        }
        if (err?.response?.message) {
            throw new BadRequestException(`${msg} ${util.inspect(err?.response?.message)}`);
        }
        if (err?.response) {
            throw new BadRequestException(`${msg} ${util.inspect(err?.response)}`);
        }
        if (err?.message) {
            throw new BadRequestException(`${msg} ${err?.message}`);
        }
        throw new BadRequestException(`${msg} ${util.inspect(err)}}`);
    }
}