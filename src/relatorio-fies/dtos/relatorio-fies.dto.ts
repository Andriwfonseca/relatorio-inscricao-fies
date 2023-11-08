import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from 'class-validator';

export class RelatorioFiesDto {
    @ApiProperty()
    @IsInt()
    public page: number;

    @ApiProperty()
    @IsInt()
    public perPage: number;
}