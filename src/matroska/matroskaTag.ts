import MatroskaTagValue from "./matroskaTagValue";
import MatroskaTagTarget from "./matroskaTagTarget";

export default class MatroskaTag {
    private _simpleTag: MatroskaTagValue;
    private _target: MatroskaTagTarget;

    private constructor() { }

    public static fromReaderResults(simpleTag: MatroskaTagValue, target: MatroskaTagTarget): MatroskaTag {
        const tag = new MatroskaTag();

        tag._simpleTag = simpleTag;
        tag._target = target;

        return tag;
    }

    public get simpleTag(): MatroskaTagValue { return this._simpleTag; }

    public get target(): MatroskaTagTarget { return this._target; }
}
