import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatorioFiesService } from 'src/relatorio-fies/services/relatorio-fies.services';

@Controller('poker')
@ApiTags('poker')
export class ViewController {
    constructor(
        private readonly relatorioFies: RelatorioFiesService
    ){}
    @Get('/')
    @Render('relatorio-fies/home')
    public async home () {          
        return {  layout: "template" };
    }

    @Get('/get-all')
    @Render('relatorio-fies/get-all')
    public async createUser () {   
        const viewModel = await this.relatorioFies.findAll(); 
        console.log(viewModel, 'viewModel')   
        return {  viewModel, layout: "template" };
    }
}