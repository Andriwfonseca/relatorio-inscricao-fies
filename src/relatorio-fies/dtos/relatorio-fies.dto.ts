import { ApiProperty } from "@nestjs/swagger";

export class RelatorioFiesDto {
    @ApiProperty()
    public page: number;

    @ApiProperty()
    public perPage: number;
}