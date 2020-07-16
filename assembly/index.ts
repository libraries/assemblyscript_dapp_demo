import {
    pvmLoadArgs,
    pvmRet,
    pvmSetStorage,
    pvmGetStorage,
    pvmDebug,
} from "./env";

const MAX_COMMAND_LEN = 100

export function _start(): i64 {
    let argsBuf = pvmLoadArgs()
    let argsStr = String.UTF8.decode(argsBuf.buffer, true)
    if (argsStr.length > MAX_COMMAND_LEN) {
        pvmRet(Uint8Array.wrap(String.UTF8.encode("args too long", true)))
        return 1
    }
    let argsArr = argsStr.split(" ")
    if (argsArr.length < 2) {
        pvmRet(Uint8Array.wrap(String.UTF8.encode("wrong args, should be like 'set [key] [value]' or 'get [key]'", true)))
        return 1
    }
    if (argsArr[0] == "set") {
        if (argsArr.length != 3) {
            pvmRet(Uint8Array.wrap(String.UTF8.encode("wrong args, should be like 'set [key] [value]' or 'get [key]'", true)))
            return 1
        }
        pvmSetStorage(Uint8Array.wrap(String.UTF8.encode(argsArr[1], true)), Uint8Array.wrap(String.UTF8.encode(argsArr[2], true)))
        pvmDebug("set success")
    } else if (argsArr[0] == "get") {
        let r = pvmGetStorage(Uint8Array.wrap(String.UTF8.encode(argsArr[1], true)))
        pvmRet(r)
        pvmDebug("get success")
    } else {
        pvmRet(Uint8Array.wrap(String.UTF8.encode("wrong args, should be like 'set [key] [value]' or 'get [key]'", true)))
        return 1
    }
    return 0
}
