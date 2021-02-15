# TagLib# for Node

| Master | Develop | Latest |
|--------|---------|--------|
|[![Build Status](https://ci.appveyor.com/api/projects/status/7hdfrbc4ecvvruwv/branch/master?svg=true)](https://ci.appveyor.com/project/benrr101/node-taglib-sharp/branch/master)|[![Build Status](https://ci.appveyor.com/api/projects/status/7hdfrbc4ecvvruwv/branch/develop?svg=true)](https://ci.appveyor.com/project/benrr101/node-taglib-sharp/branch/develop)|[![Build Status](https://ci.appveyor.com/api/projects/status/7hdfrbc4ecvvruwv?svg=true)](https://ci.appveyor.com/project/benrr101/node-taglib-sharp)
|[![Coverage Status](https://coveralls.io/repos/github/benrr101/node-taglib-sharp/badge.svg?branch=master)](https://coveralls.io/github/benrr101/node-taglib-sharp?branch=master)|[![Coverage Status](https://coveralls.io/repos/github/benrr101/node-taglib-sharp/badge.svg?branch=develop)](https://coveralls.io/github/benrr101/node-taglib-sharp?branch=develop)|[![Coverage Status](https://coveralls.io/repos/github/benrr101/node-taglib-sharp/badge.svg?latest)](https://coveralls.io/github/benrr101/node-taglib-sharp)

## Description
TagLib# is a .NET library that has been around for years. It provides a unified interface for
accessing metadata from a vast selection of media files. Until now there hasn't been a port of this
library for Node.js. This project is a mostly wholesale translation of the original TagLib#.

Note: A port of TagLib already exists for Node.js. Despite TagLib being the origin of TabLib#, it
is substantially lacking in the variety of media formats that can be handled. TagLib# greatly
improved on the original TagLib, hence why this project exists.

## Supported Tagging Formats (and File Formats)
* [APE](http://wiki.hydrogenaud.io/index.php?title=APE_key): `AAC`, `APE`, `M2A`, `MP1`, `MP2`, `MP3`
* [ID3v1](https://id3.org/ID3v1): `AAC`, `M2A`, `MP1`, `MP2`, `MP3`
* [ID3v2](https://id3.org/Developer%20Information): `AAC`, `AIF`, `AIFF`, `M2A`, `MP1`, `MP2`, `MP3`
* ... More coming soon

## Supported Codecs
* Advanced Audio Codec (AAC): `AAC`
* Audio Interchange Format (AIFF): `AIF`, `AIFF`
* MPEG-1/2 Audio: `M2A`, `MP1`, `MP2`, `MP3`
* MPEG-1/2 Video: `M2V`, `MPE`, `MPEG`, `MPG`, `MPV2`
* Monkey's Audio: `APE`
* ... More coming soon

## Installation
```
npm install --save node-taglib-sharp
```

## Getting Started
Getting started with node-taglib-sharp is surprisingly easy. The main entry point into the library
is via the `File` class.

```typescript
import {File} from "node-taglib-sharp";

const myFile = File.createFromPath("path/to/my/file.mp3");
```

The `File` class provides factory methods for generating instances of classes that inherit from
`File` to provide implementation specific to a file format (such as `ApeFile` providing support
for Monkey's Audio files). The `File` class has exposes the `properties` and `tag` properties to
allow manipulation of the tagging information and reading audio/video properties. 

See the docs for [the File class](docs/classes/_src_file_.file.md) for complete details of the
available properties.

```typescript
console.log(myFile.properties.audioBitrate);
console.log(myFile.tag.title);
```

The `Tag` base class provides a tagging-format agnostic interface to modify tag(s) on the file
object. Set tag properties as needed and they will be stored in a tagging format that is supported
by the file type. The changes can be easily written back to the file with `save()`.

See the docs for [the Tag class](docs/classes/_src_tag_.tag.md) for complete details of the fields
supported by the format-agnostic `Tag` class. 

```typescript
myFile.tag.title = "Time Won't Let Me Go";
myFile.tag.album = "The Sun And The Moon";
myFile.tag.performers = ["The Bravery"];
myFile.save();
myFile.dispose();
```

## Known Issues
* Maximum supported file size is 8192TB
  - Why is this an issue? 8192TB is yuuuuge! .NET implementation supports 8192PB file sizes.
  - The Node.js 12 [fs](https://nodejs.org/docs/latest-v12.x/api/fs.html) library only supports 
    `integer` types for position arguments, which safely goes up to `2^52 - 1`. Node 15 supports
    `number` or `biginteger` for position arguments which would increase supported sizes to 64-bit
    integers. Please create issue if this is a blocker.
    