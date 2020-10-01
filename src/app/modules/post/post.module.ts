import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import {MaterialModule} from '@app/shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from '@app/modules/post/pages';

import {
  FormComponent
} from '@app/modules/post/components';

import {PostResolver} from '@app/modules/post/services';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    PostResolver
  ]
})
export class PostModule { }
