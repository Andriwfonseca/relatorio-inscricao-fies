import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { dataCsv } from '../../utils/csv-data';
import { RelatorioFiesDto } from "../dtos/relatorio-fies.dto";

@Injectable()
export class RelatorioFiesService {
    constructor(private readonly prisma: prismaService) { }

    public async findAllPaginated(dto: RelatorioFiesDto) {
        const skip = (dto.page - 1) * dto.perPage;
        const totalCount = await this.prisma.inscricao_fies.count();
        const data = await this.prisma.inscricao_fies.findMany({
            skip,
            take: dto.perPage,
        });
    
        const hasNextPage = skip + dto.perPage < totalCount;
        const hasPreviousPage = skip > 0;
        const totalPages = Math.ceil(totalCount / dto.perPage);
    
        return {
            data,
            page: dto.page,
            hasNextPage,
            hasPreviousPage,
            totalPages,
            totalCount,
        };
    }

    public async getAge() {
        const data_nascimento = await this.prisma.inscricao_fies.findMany({
            select: {
              data_nascimento: true,
              regiao_grupo_preferencia: true,
            },
            where: {
              regiao_grupo_preferencia: "SUL",
            },
          });
          
          const data = data_nascimento.map(item => {
            const anoNascimento = new Date(item.data_nascimento).getFullYear();
            const idade = new Date().getFullYear() - anoNascimento;
            return {
              idade
            };
          });
          return data;
    }
    
    public async importCsvAndPopulateTable () {   
        console.log('Iniciando carregamento do csv');
        try {
            let count = 0;
            for (const item of dataCsv) { 
                const dataNascimentoParts = item.DatadeNascimento.split('/');
                const dataNascimento = new Date(
                    parseInt(dataNascimentoParts[2]),
                    parseInt(dataNascimentoParts[1]) - 1,
                    parseInt(dataNascimentoParts[0])
                );
                
                await this.prisma.inscricao_fies.create({
                    data: {
                        ano_processo_seletivo: item.Anodoprocessoseletivo,
                        semestre_processo_seletivo: item.Semestredoprocessoseletivo,
                        sexo: item.Sexo,
                        data_nascimento: dataNascimento,
                        uf_residencia: item['UFderesidência'],
                        municipio_residencia: item['Municipioderesidência'],
                        etnia_cor: item['Etnia/Cor'],
                        pessoa_deficiente: item['Pessoacomdeficiência?'],
                        ano_conclusao_ensino_medio: item['Anoconclusãoensinomédio'],
                        concluiu_curso_superior: item['Concluiucursosuperior?'],
                        numero_membros_grupo_familiar: parseInt(item['NºdemembrosGrupoFamiliar']),
                        renda_familiar_mensal_bruta: parseFloat(item.Rendafamiliarmensalbruta.replace(',', '.')),
                        regiao_grupo_preferencia: item['Regiãogrupodepreferência'],
                        uf: item.UF,
                        conceito_curso_gp: parseInt(item['ConceitodecursodoGP']),
                        area_conhecimento: item['Áreadoconhecimento'],
                        sub_area_conhecimento: item['Subáreadoconhecimento'],
                        nota_corte_grupo_preferencia: parseFloat(item['NotaCorteGrupoPreferência'].replace(',', '.')),
                        media_nota_enem: parseFloat(item['MédianotaEnem'].replace(',', '.')),
                        ano_enem: parseInt(item['AnodoEnem']),
                        redacao: parseInt(item['Redação']),
                        situacao_inscricao_fies: item['SituaçãoInscriçãoFies'],
                        percentual_financiamento: item.Percentualdefinanciamento !== '' ? parseFloat(item.Percentualdefinanciamento) : null,
                        semestre_financiamento: item.Semestredofinanciamento !== ' ' ? parseInt(item.Semestredofinanciamento) : null,
                        qtde_semestre_financiado: item.Qtdesemestrefinanciado !== ' ' ? parseInt(item.Qtdesemestrefinanciado) : null,
                    }
                });
                count++;
                console.log(item, 'item');
            }
        } catch (error) {
            console.error(error, 'erro');
        }
        
        console.log('Processo finalizado com sucesso!!');        
    }
}