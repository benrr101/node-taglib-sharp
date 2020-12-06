import * as TypeMoq from "typemoq";

import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {SeekOrigin} from "../../src/stream";

export default {
    getFile: (data: ByteVector): File => {
        const mockFile = TypeMoq.Mock.ofType<File>();
        let position = 0;
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
    }
};
