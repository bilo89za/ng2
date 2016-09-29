import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WsModule } from '../ws/ws.module';
// Ws Demo Components
import { WsDemoComponent } from './ws-demo.component';
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { PointDemoComponent } from './point-demo/point-demo.component';
import { BBoxDemoComponent } from './bbox-demo/bbox-demo.component';
import { DateTimeDemoComponent } from './datetime-demo/datetime-demo.component';
import { SelectDemoComponent } from './select-demo/select-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { TabsDemoComponent } from './tabs-demo/tabs-demo.component';
import { ToastDemoComponent } from './toast-demo/toast-demo.component';
import { TestingComponent } from './testing/testing.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        WsModule
    ],
    declarations: [
        WsDemoComponent,
        AutocompleteDemoComponent,
        BBoxDemoComponent,
        DateTimeDemoComponent,
        ModalDemoComponent,
        LoaderDemoComponent,
        PointDemoComponent,
        SelectDemoComponent,
        TabsDemoComponent,
        ToastDemoComponent,
        TestingComponent,
    ],
    exports: [
        WsDemoComponent,
        AutocompleteDemoComponent,
        BBoxDemoComponent,
        DateTimeDemoComponent,
        ModalDemoComponent,
        LoaderDemoComponent,
        PointDemoComponent,
        SelectDemoComponent,
        TabsDemoComponent,
        ToastDemoComponent,
        TestingComponent,
    ]
    // bootstrap: [
    //     WsDemoComponent
    // ]
})
export class WsDemoModule {
}