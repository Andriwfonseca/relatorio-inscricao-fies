import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";

@Injectable()
export class RelatorioFiesService {
    constructor(private readonly prisma: prismaService) { }

    public async findAll () {
        return this.prisma.inscricao_fies.findMany();
    }
}