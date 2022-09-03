import { enableProdMode, InjectionToken } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { WasmModuleToken } from './app/wasm-injection-token';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const initWasm = import('rust-wasm/rust-wasm-bundle/rust_wasm_bg.wasm');

initWasm.then(WasmModule => {
  platformBrowserDynamic([ { provide : WasmModuleToken, useValue: WasmModule }]).bootstrapModule(AppModule)
  .catch(err => console.error(err));  
});

