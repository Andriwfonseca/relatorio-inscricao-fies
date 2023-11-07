import { Module } from "@nestjs/common";
import { RelatorioFiesService } from "./services/relatorio-fies.services";
import { RelatorioFiesController } from "./controllers/relatorio-fies.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [RelatorioFiesController],
    imports: [PrismaModule],
    providers: [RelatorioFiesService],
    exports: [RelatorioFiesService]
})
export class RelatorioFiesModule {}