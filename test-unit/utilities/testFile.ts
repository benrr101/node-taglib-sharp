import * as TypeMoq from "typemoq";

import TestConstants from "../testConstants";
import TestStream from "./testStream";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {IStream, SeekOrigin} from "../../src/stream";
import {IFileAbstraction} from "../../src/fileAbstraction";

export type TestFileAbstraction = IFileAbstraction & {allBytes: ByteVector};
export default {
    mockFile: (): File => { return TypeMoq.Mock.ofType<File>().object; },
    getFile: (data: ByteVector|number[]): File => {
        const mockFile = TypeMoq.Mock.ofType<File>();
        let position = 0;

        const dataBv = data instanceof ByteVector
            ? data
            : ByteVector.fromByteArray(data);

        mockFile.setup((f) => f.length).returns(() => dataBv.length);
        mockFile.setup((f) => f.seek(TypeMoq.It.isAnyNumber(), <SeekOrigin>TypeMoq.It.isAny()))
            .returns((p: number, o: SeekOrigin) => {
                switch (o || SeekOrigin.Begin) {
                    case SeekOrigin.Begin:
                        position = Math.min(dataBv.length, p);
                        break;
                    case SeekOrigin.Current:
                        position = Math.min(dataBv.length, position + p);
                        break;
                    case SeekOrigin.End:
                        position = Math.min(dataBv.length, dataBv.length + p);
                        break;
                }
            });
        mockFile.setup((f) => f.readBlock(TypeMoq.It.isAnyNumber()))
            .returns((s: number) => {
                if (position + s > dataBv.length) {
                    s = dataBv.length - position;
                }
                if (s <= 0) {
                    return ByteVector.empty();
                }

                const output = dataBv.subarray(position, s);
                position += s;
                return output;
            });
        mockFile.setup((f) => f.position)
            .returns(() => {
                return position;
            });
        mockFile.setup((f) => f.mode);

        return mockFile.object;
    },
    getFileAbstraction: (data: ByteVector): TestFileAbstraction => {
        return {
            name: TestConstants.name,
            get allBytes(): ByteVector { return data; },
            get readStream(): IStream { return new TestStream(data, false); },
            get writeStream(): IStream { return new TestStream(data, true); },
            closeStream: (stream: IStream): void => { stream.close(); }
        };
    }
};
