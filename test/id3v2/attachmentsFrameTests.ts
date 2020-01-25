import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import {IPicture, PictureType} from "../../src/picture";
import TestConstants from "../testConstants";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {ByteVector} from "../../src/byteVector";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {IFileAbstraction} from "../../src/fileAbstraction";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;


