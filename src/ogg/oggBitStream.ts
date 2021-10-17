import IOggCodec from "./codecs/iOggCodec";
import OggPage from "./page";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";
import CodecFactory from "./codecs/codecFactory";

export default class OggBitStream {
    private _codec: IOggCodec;
    private _packetIndex: number;
    private _previousPacket: ByteVector;
    private _firstAbsoluteGranularPosition: number;

    public constructor(page: OggPage) {
        Guards.truthy(page, "page");

        // Assume that the first packet is completely enclosed. This should be sufficient for
        // codec recognition
        this._codec = CodecFactory.getCodec(page.packets[0]);
    }
}
