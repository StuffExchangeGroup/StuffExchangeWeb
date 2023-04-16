import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { TrendingComponent } from './components/trending/trending.component';
import { NewestComponent } from './components/newest/newest.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeTemplateComponent } from './pages/home-template/home-template.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonComponentsModule } from 'src/app/common/components/components.module';


@NgModule({
    declarations: [
        CategoryComponent,
        TrendingComponent,
        NewestComponent,
        ExploreComponent,
        HomeTemplateComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxSpinnerModule,
        CommonComponentsModule
    ]
})
export class HomeModule { }
