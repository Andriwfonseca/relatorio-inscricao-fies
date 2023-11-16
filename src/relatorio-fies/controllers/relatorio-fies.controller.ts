import { Body, Controller, Get, Post } from '@nestjs/common';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RelatorioFiesService } from '../services/relatorio-fies.services';
import { RelatorioFiesDto } from '../dtos/relatorio-fies.dto';

@Controller('relatorio-fies')
@ApiTags('relatorio-fies')
export class RelatorioFiesController {

    constructor(private readonly relatorioFiesService: RelatorioFiesService) {
    }

    @Post('find-all-paginated')
    @ApiOperation({
        summary: "Retorna o relatório paginado",
        description: "Retorna o relatório paginado"
    })
    @ApiResponse({ status: 200, description: "" })
    public async findAllPaginated (@Body() dto: RelatorioFiesDto) {
        return this.relatorioFiesService.findAllPaginated(dto);
    }

    @Get('get-age')
    @ApiOperation({
        summary: "Retorna um relatório de idades",
        description: "Retorna um relatório de idades"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getAge () {
        return this.relatorioFiesService.getAge();
    }

    @Get('import-csv')
    @ApiOperation({
        summary: "Importa o csv e popula a tabela com os dados do csv",
        description: "Importa o csv e popula a tabela com os dados do csv"
    })
    @ApiResponse({ status: 200, description: "" })
    public async importCsvAndPopulateTable () {
        return this.relatorioFiesService.importCsvAndPopulateTable();
    }
}