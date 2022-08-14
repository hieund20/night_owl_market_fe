import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
