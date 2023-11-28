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

    public async getAge(regiao: string) {
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
              data_nascimento: true,
              regiao_grupo_preferencia: true,
            },
            where: {
              regiao_grupo_preferencia: regiao,
            },
          });
          
          const dataWithAge = data.map(item => {
            const anoNascimento = new Date(item.data_nascimento).getFullYear();
            const idade = new Date().getFullYear() - anoNascimento;
            return {
              idade
            };
          });
          return dataWithAge;
    }

    public async getGenero(regiao: string) {
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                sexo: true,
                regiao_grupo_preferencia: true,
            },
            where: {
                regiao_grupo_preferencia: regiao,
            },
        });

        return data;
    }

    public async getEtnia(regiao: string) {        
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                etnia_cor: true,
                regiao_grupo_preferencia: true,
            },
            where: {
                regiao_grupo_preferencia: regiao,
            },
        });

        return data;
    }

    public async getRendaFamiliar(regiao: string) {        
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                renda_familiar_mensal_bruta: true,
                regiao_grupo_preferencia: true,
            },
            where: {
                regiao_grupo_preferencia: regiao,
            },
        });

        return data;
    }

    public async getRendaPerCapta(regiao: string) {        
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                renda_familiar_mensal_bruta: true,
                regiao_grupo_preferencia: true,
                data_nascimento: true,
            },
            where: {
                regiao_grupo_preferencia: regiao,
                renda_familiar_mensal_bruta: {
                    lt: 5000
                }
            },
        });

        const dataWithAge = data.map(item => {
            const anoNascimento = new Date(item.data_nascimento).getFullYear();
            const idade = new Date().getFullYear() - anoNascimento;
            return {
                renda_per_capta: item.renda_familiar_mensal_bruta,
                regiao: item.regiao_grupo_preferencia,
                idade: idade
            };
          });
          return dataWithAge;
    }

    public async getMelhoresNotasEtnia(etnia: string) {
        const data = await this.prisma.inscricao_fies.groupBy({
            by: ["regiao_grupo_preferencia"],
            where: {
                regiao_grupo_preferencia: {
                in: ["SUL", "NORTE", "CENTRO-OESTE", "SUDESTE", "NORDESTE"],
                },
                media_nota_enem: {
                gt: 650,
                },
                etnia_cor: etnia.toUpperCase()
            },
            _count: {
                regiao_grupo_preferencia: true,
            },
            });     
        return data;
    }

    public async getDistribuicaoGenero(regiao: string) {        
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
              data_nascimento: true,
              sexo: true,
              regiao_grupo_preferencia: true,
            },
            where: {
              regiao_grupo_preferencia: regiao,
            },
          });
          
          const dataWithAge = data.map(item => {
            const anoNascimento = new Date(item.data_nascimento).getFullYear();
            const idade = new Date().getFullYear() - anoNascimento;
            return {
                sexo: item.sexo,
                idade: idade
            };
          });
          return dataWithAge;
    }

    public async getAnoEnsinoMediaEtnia(regiao: string) {        
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                etnia_cor: true,
                ano_conclusao_ensino_medio: true,
                regiao_grupo_preferencia: true,
            },
            where: {
                regiao_grupo_preferencia: regiao,
            },
          });
          
          return data;
    }

    public async getPcdEtnia(etnia: string) {
        const data = await this.prisma.inscricao_fies.groupBy({
            by: ["regiao_grupo_preferencia"],
            where: {
                regiao_grupo_preferencia: {
                in: ["SUL", "NORTE", "CENTRO-OESTE", "SUDESTE", "NORDESTE"],
                },
                pessoa_deficiente: "Sim",
                etnia_cor: etnia.toUpperCase()
            },
            _count: {
                regiao_grupo_preferencia: true,
            },
            });     
        return data;
    }

    public async getPcdGenero(regiao) {
        const data = await this.prisma.inscricao_fies.findMany({
            select: {
                sexo: true,                
                data_nascimento: true
            },
            where: {
                regiao_grupo_preferencia: regiao,
                pessoa_deficiente: "Sim"
            },
          });
          
          const dataWithAge = data.map(item => {
            const anoNascimento = new Date(item.data_nascimento).getFullYear();
            const idade = new Date().getFullYear() - anoNascimento;
            return {
                sexo: item.sexo,
                idade: idade
            };
          });
          return dataWithAge;
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