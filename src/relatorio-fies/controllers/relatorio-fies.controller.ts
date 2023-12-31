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

    @Get('get-pcd-situacao-incricao/:regiao')
    @ApiOperation({
        summary: "Retorna a situação de inscrições no FIES dos candidatos com PCD",
        description: "Retorna a situação de inscrições no FIES dos candidatos com PCD"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getSituacaoInscricaoPcd (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getSituacaoInscricaoPcd(regiao);
    }

    @Get('get-genero-situacao-incricao/:regiao')
    @ApiOperation({
        summary: "Retorna a situação de inscrições no FIES dos candidatos por Gênero",
        description: "Retorna a situação de inscrições no FIES dos candidatos por Gênero"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getSituacaoInscricaoGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getSituacaoInscricaoGenero(regiao);
    }

    @Get('get-etnia-situacao-incricao/:regiao')
    @ApiOperation({
        summary: "Retorna a situação de inscrições no FIES dos candidatos por Etnia",
        description: "Retorna a situação de inscrições no FIES dos candidatos por Etnia"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getSituacaoInscricaoEtnia (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getSituacaoInscricaoEtnia(regiao);
    }

    @Get('get-curso-superior-etnia/:regiao')
    @ApiOperation({
        summary: "Retorna a quantidade de candidatos que concluiram curso superior por etnia e idade",
        description: "Retorna a quantidade de candidatos que concluiram curso superior por etnia e idade"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getCursoSuperiorEtnia (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getCursoSuperiorEtnia(regiao);
    }

    @Get('get-curso-superior-genero/:regiao')
    @ApiOperation({
        summary: "Retorna a quantidade de candidatos que concluiram curso superior por gênero e idade",
        description: "Retorna a quantidade de candidatos que concluiram curso superior por gênero e idade"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getCursoSuperiorGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getCursoSuperiorGenero(regiao);
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

    @Get('get-media-enem-etnia/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório com a média das notas do enem maior que 499 e filtrando por etnia",
        description: "Retorna um relatório com a média das notas do enem maior que 499 e filtrando por etnia"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getMediaNotasEnemEtnia (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getMediaNotasEnemEtnia(regiao);
    }

    @Get('get-media-enem-genero/:regiao')
    @ApiOperation({
        summary: "Retorna um relatório com a média das notas do enem maior que 499 e filtrando por genero",
        description: "Retorna um relatório com a média das notas do enem maior que 499 e filtrando por genero"
    })
    @ApiResponse({ status: 200, description: "" })
    public async getMediaNotasEnemGenero (@Param("regiao") regiao: string) {
        return this.relatorioFiesService.getMediaNotasEnemGenero(regiao);
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