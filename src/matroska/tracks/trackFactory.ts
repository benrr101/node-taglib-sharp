import AudioTrack from "./audioTrack";
import EbmlElement from "../../ebml/ebmlElement";
import EbmlParser from "../../ebml/ebmlParser";
import VideoTrack from "./videoTrack";
import {MatroskaIds} from "../matroskaIds";
import {EbmlTrackType, Track} from "./track";

export default class TrackFactory {
    public static fromTrackElement(trackElement: EbmlElement): Track {
        // Read all the elements from the track
        const elements = EbmlParser.getAllElements(trackElement.getParser());

        // Parse the elements into a track object
        switch (elements.get(MatroskaIds.TRACK_TYPE)?.getSafeUint()) {
            case EbmlTrackType.Audio:
                const audioElementParser = elements.get(MatroskaIds.AUDIO).getParser();
                const audioElements = EbmlParser.getAllElements(audioElementParser);
                return new AudioTrack(elements, audioElements);
            case EbmlTrackType.Video:
                const videoElementParser = elements.get(MatroskaIds.VIDEO).getParser();
                const videoElements = EbmlParser.getAllElements(videoElementParser);
                return new VideoTrack(elements, videoElements);
            default:
                return new Track(elements);
        }
    }
}
