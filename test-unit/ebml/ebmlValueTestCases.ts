export default {
    bool: [
        {bytes: [0x01], result: true},
        {bytes: [0x11], result: true},
        {bytes: [0x00], result: false}
    ],
    double: [
        {bytes: [0x40, 0x09, 0x21, 0xFB, 0x54, 0x2F, 0xE9, 0x38], result: 3.141592653},
        {bytes: [0x40, 0x49, 0x0F, 0xDB], result: 3.1415927410125732}
    ],
    doubleInvalid: [
        {bytes: new Array(2)}, // too short
        {bytes: new Array(9)}, // too long
        {bytes: new Array(6)}, // in between
    ],
    string: [
        {bytes: [0x61, 0x62, 0x63, 0x00, 0x61, 0x62, 0x63], result: "abc"},
        {bytes: [0x61, 0x62, 0x63, 0x61, 0x62, 0x63], result: "abcabc"}
    ],
    safeUint: [
        {bytes: [0xA1], result: 0xA1},
        {bytes: [0xA1, 0x00], result: 0xA100},
        {bytes: [0xA1, 0x00, 0x00], result: 0xA10000},
        {bytes: [0xA1, 0x00, 0x00, 0x00], result: 0xA1000000},
        {bytes: [0xA1, 0x00, 0x00, 0x00], result: 0xA1000000},
        {bytes: [0x1F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], result: 9007199254740991},
    ],
    ulong: [
        {bytes: [0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], result: BigInt("0x20000000000000")},
        {bytes: [0xA1, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xA1], result: BigInt("0xA1000000000000A1")},
    ],
    // @TODO: Did we need this?
    vint: [
        {bytes: [0xBB], result: 0x3B},
        {bytes: [0x6A, 0xAA], result: 0x2AAA},
        {bytes: [0x36, 0x7A, 0xA5], result: 0x167AA5},
        {bytes: [0x1C, 0x16, 0x7A, 0xA5], result: 0x0C167AA5},
        {bytes: [0x0E, 0x6C, 0x16, 0x7A, 0xA5], result: 0x66C167AA5},
        {bytes: [0x07, 0x28, 0x6C, 0x16, 0x7A, 0xA5], result: 0x03286C167AA5},
        {bytes: [0x03, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5], result: 0x0163286C167AA5},
        {bytes: [0x01, 0x0F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5], result: 0x0F63286C167AA5}
    ],
    vintInvalid: [
        {bytes: [0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A, 0xA5]}, // overflow
        {bytes: [0x01, 0x1F, 0x63, 0x28, 0x6C, 0x16, 0x7A]} // tew few
    ]
};
