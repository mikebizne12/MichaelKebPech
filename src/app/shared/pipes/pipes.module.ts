import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTextPipe } from './search-text/search-text.pipe';

@NgModule({
  declarations: [SearchTextPipe],
  imports: [CommonModule],
  exports: [SearchTextPipe],
})
export class PipesModule {}
