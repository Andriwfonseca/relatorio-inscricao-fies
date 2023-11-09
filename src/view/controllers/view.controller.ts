import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatorioFiesDto } from 'src/relatorio-fies/dtos/relatorio-fies.dto';
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

    @Get('/get-all-paginated')
    @Render('relatorio-fies/get-all')
    public async findAllPaginated () {   
        const dto: RelatorioFiesDto = {
            page: 1,
            perPage: 100
        }
        const viewModel = await this.relatorioFies.findAllPaginated(dto); 
        console.log(viewModel, 'viewModel')   
        return {  viewModel, layout: "template" };
    }
}