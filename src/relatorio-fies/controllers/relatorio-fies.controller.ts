import { Controller, Get } from '@nestjs/common';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RelatorioFiesService } from '../services/relatorio-fies.services';

@Controller('relatorio-fies')
@ApiTags('relatorio-fies')
export class RelatorioFiesController {

    constructor(private readonly relatorioFiesService: RelatorioFiesService) {
    }

    @Get('/')
    @ApiOperation({
        summary: "Retorna o relatório completo",
        description: "Retorna o relatório completo"
    })
    @ApiResponse({ status: 200, description: "" })
    public async findAll () {
        return this.relatorioFiesService.findAll();
    }
}