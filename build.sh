cd /src/wasc
./build.sh

cd /src/assemblyscript_dapp_demo
npm run asbuild

cd /src/assemblyscript_dapp_demo/build
/src/wasc/build/wasc -v --save --platform ckb_vm_assemblyscript --gcc /src/wasc/third_party/ckb-riscv-gnu-toolchain/build/bin/riscv64-unknown-elf-gcc  optimized.wat
