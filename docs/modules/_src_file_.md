**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / "src/file"

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

*Defined in src/file.ts:70*

___

### FileTypeResolver

Ƭ  **FileTypeResolver**: (abstraction: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md),mimetype: string,style: [ReadStyle](../enums/_src_file_.readstyle.md)) => [File](../classes/_src_file_.file.md)

*Defined in src/file.ts:68*

Delegate is used for intervening in {@see File.createFromPath} by resolving the filetype before
any standard resolution operations.

**`param`** File to be read.

**`param`** MimeType of the file.

**`param`** How to read media properties from the file

**`returns`** New instance of {@see File} or `undefined` if the resolver could not be matched

**`description`** A FileTypeResolver is one way of altering the behavior of
    {@see File.createFromPath} When {@see File.createFromPath} is called, the registered
    resolvers are invoked in reverse order in which they were registered. The resolver may then
    perform any operations necessary, including other type-finding methods. If the resolver
    returns a new {@see File} it will instantly be returned, by {@see File.createFromPath}. If
    it returns `undefined`, {@see File.createFromPath} will continue to process. If the resolver
    throws an exception, it will be uncaught. To register a resolver, use
    {@see File.addFileTypeResolver}.
