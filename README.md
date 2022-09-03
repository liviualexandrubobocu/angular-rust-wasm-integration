# Angular Rust Wasm Integration

## Prerequisites
Install Angular CLI with

```
npm i -g @angular/cli
```

Install Rust with Cargo

Install wasm pack

```
cargo install wasm-pack
```

## Step 1

Create an Angular application using:

```
ng new angular-rust-wasm-integration
```

## Step 2

Go into the directory folder and create a Rust library that we will eventually compile to WASM using:

```
cd angular-rust-wasm-integration
cargo new rust-wasm --lib
```

## Step 3
Add to package.json file

```
"build:wasm": "cd rust-wasm && wasm-pack build --target web --out-dir rust-wasm-bundle",
```

## Step 4

```
npm i ./rust-wasm/rust-wasm-bundle
```

## Step 5

Add to Cargo.toml file the following neccesary lines of configuration:

```
[lib]
crate-type=["cdylib"]

[dependencies]
wasm-bindgen = { version = "0.2", features = ["serde-serialize"] }
```

## Step 6

Add import for wasm bindgen inside the library by the following lines:

```
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
```

Write methods in lib.rs decorated with #[wasm_bindgen]

## Step 7

Run build command 

```
npm run build:wasm
```

## Step 8 
Write the integration code:

Create an injection Token in app/wasm-injection-token.ts

```
import { InjectionToken } from "@angular/core";

export const WasmModuleToken = new InjectionToken<string>('');
```

Import token in Angular

```
import { WasmModuleToken } from './app/wasm-injection-token';

```

Bootstrap your AppModule using dependency Injection after lazy loading the WasmModule with the dynamic imports file

```
const initWasm = import('rust-wasm/rust-wasm-bundle/rust_wasm_bg.wasm');

initWasm.then(WasmModule => {
  platformBrowserDynamic([ { provide : WasmModuleToken, useValue: WasmModule }]).bootstrapModule(AppModule)
  .catch(err => console.error(err));  
});

```
Inject the module wherever you need to use it via the injection token and then use the written Rust functions within your components

```
constructor(@Inject(WasmModuleToken) private wasmModule: any){}
  
ngOnInit() {
   this.addNumbers();
}
  
addNumbers(){
   this.sum = this.wasmModule.add(2,3);
}
```

Add an interpolated variable within the component template to reflect sum:

```
{{ sum }}
```


## Step 9

Run the application
```
npm run start
```
