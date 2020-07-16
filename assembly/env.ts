// System call provides the services of the blockchain to the user dapp via Application Program Interface(API).
export declare function syscall(n: i64, a: i64, b: i64, c: i64, d: i64, e: i64, f: i64, mode: i64): i64

const SYSCODE_DEBUG = 2000
const SYSCODE_LOAD_ARGS = 2001
const SYSCODE_RET = 2002
const SYSCODE_ASSERT = 2003
const SYSCODE_CYCLE_LIMIT = 3000
const SYSCODE_IS_INIT = 3001
const SYSCODE_ORIGIN = 3002
const SYSCODE_CALLER = 3003
const SYSCODE_ADDRESS = 3004
const SYSCODE_BLOCK_HEIGHT = 3005
const SYSCODE_CYCLE_USED = 3006
const SYSCODE_CYCLE_PRICE = 3007
const SYSCODE_EXTRA = 3008
const SYSCODE_TIMESTAMP = 3009
const SYSCODE_EMIT_EVENT = 3010
const SYSCODE_TX_HASH = 3011
const SYSCODE_TX_NONCE = 3012
const SYSCODE_GET_STORAGE = 4000
const SYSCODE_SET_STORAGE = 4001
const SYSCODE_CONTRACT_CALL = 4002
const SYSCODE_SERVICE_CALL = 4003
const SYSCODE_SERVICE_WRITE = 4004
const SYSCODE_SERVICE_READ = 4005

export function pvmDebug(msg: string): void {
    let strEncoded = String.UTF8.encode(msg, true)
    syscall(SYSCODE_DEBUG, changetype<usize>(strEncoded), 0, 0, 0, 0, 0, 0b100000)
}

export function pvmAssert(statement: i32, msg: string): void {
    let strEncoded = String.UTF8.encode(msg, true)
    syscall(SYSCODE_ASSERT, statement, changetype<usize>(strEncoded), 0, 0, 0, 0, 0b010000)
}

export function pvmLoadArgs(): Uint8Array {
    let r = new Uint8Array(1024);
    let l = syscall(SYSCODE_LOAD_ARGS, changetype<usize>(r.buffer), 0, 0, 0, 0, 0, 0b100000)
    return r.slice(0, i32(l))
}

export function pvmRet(data: Uint8Array): void {
    syscall(SYSCODE_RET, changetype<usize>(data.buffer), data.buffer.byteLength, 0, 0, 0, 0, 0b100000)
}

export function pvmCycleLimit(): i64 {
    return syscall(SYSCODE_CYCLE_LIMIT, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmCycleUsed(): i64 {
    return syscall(SYSCODE_CYCLE_USED, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmCyclePrice(): i64 {
    return syscall(SYSCODE_CYCLE_PRICE, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmOrigin(): Uint8Array {
    let r = new Uint8Array(1024)
    let l = syscall(SYSCODE_ORIGIN, changetype<usize>(r.buffer), 0, 0, 0, 0, 0, 0b100000)
    return r.slice(0, i32(l))
}

export function pvmCaller(): Uint8Array {
    let r = new Uint8Array(1024)
    let l = syscall(SYSCODE_CALLER, changetype<usize>(r.buffer), 0, 0, 0, 0, 0, 0b100000)
    return r.slice(0, i32(l))
}

export function pvmAddress(): Uint8Array {
    let r = new Uint8Array(1024)
    let l = syscall(SYSCODE_ADDRESS, changetype<usize>(r.buffer), 0, 0, 0, 0, 0, 0b100000)
    return r.slice(0, i32(l))
}

export function pvmIsInit(): i64 {
    return syscall(SYSCODE_IS_INIT, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmBlockHeight(): i64 {
    return syscall(SYSCODE_BLOCK_HEIGHT, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmExtra(extra: Uint8Array): i64 {
    return syscall(SYSCODE_EXTRA, changetype<usize>(extra.buffer), 0, 0, 0, 0, 0, 0b100000)
}

export function pvmTimestamp(): i64 {
    return syscall(SYSCODE_TIMESTAMP, 0, 0, 0, 0, 0, 0, 0b000000)
}

export function pvmEmitEvent(msg: Uint8Array): void {
    syscall(SYSCODE_EMIT_EVENT, changetype<usize>(msg.buffer), msg.buffer.byteLength, 0, 0, 0, 0, 0b100000)
}

export function pvmTxHash(tx_hash: Uint8Array): i64 {
    return syscall(SYSCODE_TX_HASH, changetype<usize>(tx_hash.buffer), 0, 0, 0, 0, 0, 0b100000)
}

export function pvmTxNonce(nonce: Uint8Array): i64 {
    return syscall(SYSCODE_TX_NONCE, changetype<usize>(nonce.buffer), 0, 0, 0, 0, 0, 0b100000)
}

export function pvmGetStorage(k: Uint8Array): Uint8Array {
    var r = new Uint8Array(1024)
    let l = syscall(
        SYSCODE_GET_STORAGE,
        changetype<usize>(k.buffer),
        k.byteLength,
        changetype<usize>(r.buffer),
        r.byteLength,
        0,
        0,
        0b101000
    )
    return r.slice(0, i32(l))
}

export function pvmSetStorage(k: Uint8Array, v: Uint8Array): void {
    syscall(
        SYSCODE_SET_STORAGE,
        changetype<usize>(k.buffer),
        k.byteLength,
        changetype<usize>(v.buffer),
        v.byteLength,
        0,
        0,
        0b101000
    )
}

export function pvmContractCall(addr: Uint8Array, args: Uint8Array): Uint8Array {
    var r = new Uint8Array(1024)
    let l = syscall(
        SYSCODE_CONTRACT_CALL,
        changetype<usize>(addr.buffer),
        changetype<usize>(args.buffer),
        args.byteLength,
        changetype<usize>(r.buffer),
        0,
        0,
        0b110100
    )
    return r.slice(0, i32(l))
}

export function pvmServiceCall(service: string, method: string, payload: Uint8Array): Uint8Array {
    let serviceEncoded = String.UTF8.encode(service, true)
    let methodEncoded = String.UTF8.encode(method, true)
    var r = new Uint8Array(1024)
    let l = syscall(
        SYSCODE_SERVICE_CALL,
        changetype<usize>(serviceEncoded),
        changetype<usize>(methodEncoded),
        changetype<usize>(payload.buffer),
        payload.byteLength,
        changetype<usize>(r.buffer),
        0,
        0b111010
    )
    return r.slice(0, i32(l))
}

export function pvmServiceWrite(service: string, method: string, payload: Uint8Array): Uint8Array {
    let serviceEncoded = String.UTF8.encode(service, true)
    let methodEncoded = String.UTF8.encode(method, true)
    var r = new Uint8Array(1024)
    let l = syscall(
        SYSCODE_SERVICE_WRITE,
        changetype<usize>(serviceEncoded),
        changetype<usize>(methodEncoded),
        changetype<usize>(payload.buffer),
        payload.byteLength,
        changetype<usize>(r.buffer),
        0,
        0b111010
    )
    return r.slice(0, i32(l))
}

export function pvmServiceRead(service: string, method: string, payload: Uint8Array): Uint8Array {
    let serviceEncoded = String.UTF8.encode(service, true)
    let methodEncoded = String.UTF8.encode(method, true)
    var r = new Uint8Array(1024)
    let l = syscall(
        SYSCODE_SERVICE_READ,
        changetype<usize>(serviceEncoded),
        changetype<usize>(methodEncoded),
        changetype<usize>(payload.buffer),
        payload.byteLength,
        changetype<usize>(r.buffer),
        0,
        0b111010
    )
    return r.slice(0, i32(l))
}
