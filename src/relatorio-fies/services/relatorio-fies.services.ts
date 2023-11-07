import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { dataCsv } from '../../utils/csv-data';

@Injectable()
export class RelatorioFiesService {
    constructor(private readonly prisma: prismaService) { }

    public async findAll () {
        return this.prisma.inscricao_fies.findMany();
    }

    public async importCsvAndPopulateTable () {   
        console.log('Iniciando carregamento do csv');
        try {
            for (const item of dataCsv) { 
                console.log(item, 'item')
            }
        } catch (error) {
            console.log(error, 'erro')
        }
        
        console.log('Processo finalizado com sucesso!!');        
    }
}