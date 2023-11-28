import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('get-age/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório de idades",
        description: "Retorna um relatório de idades"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getAge (@Param("regiao") regiao: string) {
        regiao = regiao.toUpperCase();
        return this.relatorioFiesService.getAge(regiao);
    }

    @Get('get-genero/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório de generos",
        description: "Retorna um relatório de generos"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getGenero(regiao);
    }

    @Get('get-renda-familiar/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório de renda familiar",
        description: "Retorna um relatório de renda familiar"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getRendaFamiliar (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getRendaFamiliar(regiao);
    }

    @Get('get-idade-renda-percapta/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório trazendo idade e renda per capta dos inscritos",
        description: "Retorna um relatório trazendo idade e renda per capta dos inscritos"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getRendaPerCapta (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getRendaPerCapta(regiao);
    }

    @Get('get-etnia/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório de etnia",
        description: "Retorna um relatório de etnia"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getEtnia (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getEtnia(regiao);
    }

    @Get('get-ensino-medio-faixa-ano-etnia/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório ano de conclusão do ensino média por etnia",
        description: "Retorna um relatório ano de conclusão do ensino média por etnia"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getAnoEnsinoMediaEtnia (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getAnoEnsinoMediaEtnia(regiao);
    }

    @Get('get-melhores-notas-etnia/:etnia')
    @ApiOperation({
        summary: "Retorna a quantidade de candidatos com melhores notas do enem por região",
        description: "Retorna a quantidade de candidatos com melhores notas do enem por região"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getMelhoresNotasEtnia (@Param("etnia") etnia: string) {
        return this.relatorioFiesService.getMelhoresNotasEtnia(etnia);
    }

    @Get('get-pcd-etnia/:etnia')
    @ApiOperation({
        summary: "Retorna candidatos com PCD e separados por etnia",
        description: "Retorna candidatos com PCD e separados por etnia"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getPcdEtnia (@Param("etnia") etnia: string) {
        return this.relatorioFiesService.getPcdEtnia(etnia);
    }

    @Get('get-pcd-genero/:regiao')
    @ApiOperation({
        summary: "Retorna candidatos com PCD e separados por genêro",
        description: "Retorna candidatos com PCD e separados por genêro"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getPcdGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getPcdGenero(regiao);
    }

    @Get('get-pcd-area/:regiao')
    @ApiOperation({
        summary: "Retorna candidatos com PCD e área",
        description: "Retorna candidatos com PCD e área"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getAreaPcdPorEtniaERegiao (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getAreaPcdPorEtniaERegiao(regiao);
    }

    @Get('get-genero-area/:regiao')
    @ApiOperation({
        summary: "Retorna candidatos por Gênero e área",
        description: "Retorna candidatos por Gênero e área"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getAreaGeneroERegiao (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getAreaGeneroERegiao(regiao);
    }

    
    @Get('get-distribuicao-genero/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório de distribuição de gênero",
        description: "Retorna um relatório de distribuição de gênero"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getDistribuicaoGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getDistribuicaoGenero(regiao);
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