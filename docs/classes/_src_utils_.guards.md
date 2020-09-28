**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/utils"](../modules/_src_utils_.md) / Guards

# Class: Guards

## Hierarchy

* **Guards**

## Index

### Methods

* [betweenExclusive](_src_utils_.guards.md#betweenexclusive)
* [betweenInclusive](_src_utils_.guards.md#betweeninclusive)
* [byte](_src_utils_.guards.md#byte)
* [greaterThanInclusive](_src_utils_.guards.md#greaterthaninclusive)
* [int](_src_utils_.guards.md#int)
* [lessThanInclusive](_src_utils_.guards.md#lessthaninclusive)
* [notNullOrUndefined](_src_utils_.guards.md#notnullorundefined)
* [optionalByte](_src_utils_.guards.md#optionalbyte)
* [short](_src_utils_.guards.md#short)
* [truthy](_src_utils_.guards.md#truthy)
* [uint](_src_utils_.guards.md#uint)
* [ulong](_src_utils_.guards.md#ulong)

## Methods

### betweenExclusive

▸ `Static`**betweenExclusive**(`value`: number, `minValue`: number, `maxValue`: number, `name`: string): void

*Defined in src/utils.ts:5*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`minValue` | number |
`maxValue` | number |
`name` | string |

**Returns:** void

___

### betweenInclusive

▸ `Static`**betweenInclusive**(`value`: number, `minValue`: number, `maxValue`: number, `name`: string): void

*Defined in src/utils.ts:11*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`minValue` | number |
`maxValue` | number |
`name` | string |

**Returns:** void

___

### byte

▸ `Static`**byte**(`value`: number, `name`: string): void

*Defined in src/utils.ts:17*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`name` | string |

**Returns:** void

___

### greaterThanInclusive

▸ `Static`**greaterThanInclusive**(`value`: number, `lowerBound`: number, `name`: string): void

*Defined in src/utils.ts:23*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`lowerBound` | number |
`name` | string |

**Returns:** void

___

### int

▸ `Static`**int**(`value`: number, `name`: string): void

*Defined in src/utils.ts:29*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`name` | string |

**Returns:** void

___

### lessThanInclusive

▸ `Static`**lessThanInclusive**(`value`: number, `upperBound`: number, `name`: string): void

*Defined in src/utils.ts:35*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`upperBound` | number |
`name` | string |

**Returns:** void

___

### notNullOrUndefined

▸ `Static`**notNullOrUndefined**(`value`: any, `name`: string): void

*Defined in src/utils.ts:41*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`name` | string |

**Returns:** void

___

### optionalByte

▸ `Static`**optionalByte**(`value`: number \| undefined, `name`: string): void

*Defined in src/utils.ts:47*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number \| undefined |
`name` | string |

**Returns:** void

___

### short

▸ `Static`**short**(`value`: number, `name`: string): void

*Defined in src/utils.ts:54*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`name` | string |

**Returns:** void

___

### truthy

▸ `Static`**truthy**(`value`: object \| string, `name`: string): void

*Defined in src/utils.ts:60*

#### Parameters:

Name | Type |
------ | ------ |
`value` | object \| string |
`name` | string |

**Returns:** void

___

### uint

▸ `Static`**uint**(`value`: number, `name`: string): void

*Defined in src/utils.ts:66*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |
`name` | string |

**Returns:** void

___

### ulong

▸ `Static`**ulong**(`value`: BigInt.BigInteger, `name`: string): void

*Defined in src/utils.ts:72*

#### Parameters:

Name | Type |
------ | ------ |
`value` | BigInt.BigInteger |
`name` | string |

**Returns:** void
