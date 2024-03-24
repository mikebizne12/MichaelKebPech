import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [ComponentsModule, PipesModule],
  exports: [ComponentsModule, PipesModule],
})
export class SharedModule {}
