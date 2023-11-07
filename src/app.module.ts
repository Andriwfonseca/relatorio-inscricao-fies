import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { RelatorioFiesModule } from './relatorio-fies/relatorio-fies.module';

@Module({
  imports: [
    RelatorioFiesModule,
    ViewModule
  ],
  providers: [],
})
export class AppModule { }
