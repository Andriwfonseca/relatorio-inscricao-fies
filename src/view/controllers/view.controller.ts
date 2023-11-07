import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatorioFiesService } from 'src/relatorio-fies/services/relatorio-fies.services';

@Controller('relatorio-fies/view')
@ApiTags('relatorio-fies/view')
export class ViewController {
    constructor(
        private readonly relatorioFies: RelatorioFiesService
    ){}
    @Get('/home')
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