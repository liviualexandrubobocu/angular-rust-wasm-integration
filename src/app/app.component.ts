import { Component, Inject, OnInit } from '@angular/core';
import { WasmModuleToken } from './wasm-injection-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rust-wasm-integration';
  sum = 0;

  constructor(@Inject(WasmModuleToken) private wasmModule: any){
  }
  
  ngOnInit() {
    this.addNumbers();
  }
  
  addNumbers(){
    this.sum = this.wasmModule.add(2,3);
  }
}
