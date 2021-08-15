import * as TypeMoq from "typemoq";

import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {IStream, SeekOrigin} from "../../src/stream";
import {IFileAbstraction} from "../../src/fileAbstraction";
import TestStream from "./testStream";

export default {
    getFile(data: ByteVector): File {
        const mockFile = TypeMoq.Mock.ofType<File>();
        let position = 0;
        mockFile.setup((f) => f.length).returns(() => data.length);
        mockFile.setup((f) => f.seek(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()))
            .returns((p, o) => {
                switch (o) {
                    case SeekOrigin.Begin:
                        position = Math.min(data.length, position);
                        break;
                    case SeekOrigin.Current:
                        position = Math.min(data.length, position + p);
                        break;
                    case SeekOrigin.End:
                        position = Math.min(data.length, data.length + p);
                        break;
                }
                position = p;
            });
        mockFile.setup((f) => f.readBlock(TypeMoq.It.isAnyNumber()))
            .returns((s) => {
                if (position + s > data.length) {
                    s = data.length - position;
                }
                if (s <= 0) {
                    return ByteVector.empty();
                }

                const output = data.mid(position, s);
                position += s;
                return output;
            });
        mockFile.setup((f) => f.position)
            .returns(() => {
                return position;
            });

        return mockFile.object;
    },
    getFileAbstraction(data: ByteVector): IFileAbstraction {
        return {
            name: "test_file",
            get readStream(): IStream { return new TestStream(data, false); },
            get writeStream(): IStream { return new TestStream(data, true); },
            closeStream(stream: IStream): void { stream.close(); }
        };
    }
};
