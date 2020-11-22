**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / "src/file"

# Module: "src/file"

## Index

### Enumerations

* [FileAccessMode](../enums/_src_file_.fileaccessmode.md)
* [ReadStyle](../enums/_src_file_.readstyle.md)

### Classes

* [File](../classes/_src_file_.file.md)

### Type aliases

* [FileTypeConstructor](_src_file_.md#filetypeconstructor)
* [FileTypeResolver](_src_file_.md#filetyperesolver)

## Type aliases

### FileTypeConstructor

Ƭ  **FileTypeConstructor**: {}

___

### FileTypeResolver

Ƭ  **FileTypeResolver**: (abstraction: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), mimetype: string, style: [ReadStyle](../enums/_src_file_.readstyle.md)) => [File](../classes/_src_file_.file.md)

Delegate is used for intervening in [File.createFromPath](../classes/_src_file_.file.md#createfrompath) by resolving the filetype before
any standard resolution operations.

**`param`** File to be read.

**`param`** MimeType of the file.

**`param`** How to read media properties from the file

**`returns`** New instance of [File](../classes/_src_file_.file.md) or `undefined` if the resolver could not be matched

**`description`** A FileTypeResolver is one way of altering the behavior of
    [File.createFromPath](../classes/_src_file_.file.md#createfrompath) When [File.createFromPath](../classes/_src_file_.file.md#createfrompath) is called, the registered
    resolvers are invoked in reverse order in which they were registered. The resolver may then
    perform any operations necessary, including other type-finding methods. If the resolver
    returns a new [File](../classes/_src_file_.file.md) it will instantly be returned, by [File.createFromPath](../classes/_src_file_.file.md#createfrompath). If
    it returns `undefined`, [File.createFromPath](../classes/_src_file_.file.md#createfrompath) will continue to process. If the resolver
    throws an exception, it will be uncaught. To register a resolver, use
    [File.addFileTypeResolver](../classes/_src_file_.file.md#addfiletyperesolver).
