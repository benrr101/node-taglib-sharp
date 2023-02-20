import AudioTrack from "./audioTrack";
import EbmlElement from "../../ebml/ebmlElement";
import EbmlParser from "../../ebml/ebmlParser";
import {MatroskaIds} from "../matroskaIds";
import {MatroskaTrackType, Track} from "./track";
import {VideoTrack} from "./videoTrack";

export default class TrackFactory {
    public static fromTrackElement(trackElement: EbmlElement): Track {
        // Read all the elements from the track
        const elements = EbmlParser.getAllElements(trackElement.getParser());

        // Parse the elements into a track object
        switch (elements.get(MatroskaIds.TRACK_TYPE)?.getSafeUint()) {
            case MatroskaTrackType.Audio:
                const audioElementParser = elements.get(MatroskaIds.AUDIO).getParser();
                const audioElements = EbmlParser.getAllElements(audioElementParser);
                return new AudioTrack(elements, audioElements);
            case MatroskaTrackType.Video:
                const videoElementParser = elements.get(MatroskaIds.VIDEO).getParser();
                const videoElements = EbmlParser.getAllElements(videoElementParser);
                return new VideoTrack(elements, videoElements);
            default:
                return new Track(elements);
        }
    }
}
