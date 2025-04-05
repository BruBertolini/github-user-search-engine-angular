import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { LoadingSpinnerModule } from '../shared/components/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [SearchComponent, DetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    LoadingSpinnerModule

  ],
  providers: [UsersService]
})
export class UsersModule { }
