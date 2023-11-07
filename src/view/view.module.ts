import { Module } from "@nestjs/common";
import { ViewController } from "./controllers/view.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { RelatorioFiesModule } from "src/relatorio-fies/relatorio-fies.module";


@Module({
    imports: [PrismaModule, RelatorioFiesModule],
    controllers: [ViewController]
})
export class ViewModule { }