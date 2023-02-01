import AudioTrack from "./audioTrack";
import {EbmlTrackType, Track} from "./track";
import VideoTrack from "./videoTrack";
import {EbmlParser} from "../../ebml/ebmlParser";
import {MatroskaIds} from "../matroskaIds";

export default class TrackFactory {
    public static fromTrackEntry(parser: EbmlParser): Track {
        // Read all the elements from the track
        const trackElements = EbmlParser.getAllValues(parser.getParser());

        // Parse the elements into a track object
        switch (trackElements.get(MatroskaIds.TRACK_TYPE)?.getSafeUint()) {
            case EbmlTrackType.Audio:
                const audioElementParser = trackElements.get(MatroskaIds.AUDIO).getParser();
                const audioElements = EbmlParser.getAllValues(audioElementParser);
                return new AudioTrack(trackElements, audioElements);
            case EbmlTrackType.Video:
                const videoElementParser = trackElements.get(MatroskaIds.VIDEO).getParser();
                const videoElements = EbmlParser.getAllValues(videoElementParser);
                return new VideoTrack(trackElements, videoElements);
            default:
                return new Track(trackElements);
        }
    }
}
