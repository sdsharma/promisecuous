import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { HeaderComponent } from './header/header.component';
import { PeterTestComponent } from './peter-test/peter-test.component';
import { ProfileHeaderComponent } from './profileHeader/profileHeader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    PeterTestComponent,
    ProfileHeaderComponent
],
  exports: [
    CommonModule,
    HeaderComponent,
    PeterTestComponent,
    ProfileHeaderComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }

}
