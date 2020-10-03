import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderModule, ToolbarModule} from '@app/shared/components';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    ToolbarModule,
    HeaderModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class LayoutModule { }
