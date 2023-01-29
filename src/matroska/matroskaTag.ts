import MatroskaTagValue from "./matroskaTagValue";
import {MatroskaTagTarget} from "./matroskaTagTarget";

/**
 * Abstraction on that represents the combination of a Matroska simple tag and a tag target.
 * @remarks This is different from the tag concept in Matroska. This is a 1:1 relation between
 *     target and value while Matroska tags are 1:many relationship of target to tag. Therefore,
 *     the target must be cloned when constructing >1 tag with the same target.
 */
export default class MatroskaTag {
    private _simpleTag: MatroskaTagValue;
    private _target: MatroskaTagTarget;

    /**
     * Constructs and initializes a new instance using a simple tag and a target.
     * @param simpleTag Tag value to store in the instance
     * @param target Tag target that the tag instance applies to
     */
    public constructor(simpleTag: MatroskaTagValue, target: MatroskaTagTarget) {
        this._simpleTag = simpleTag;
        this._target = target;
    }

    /**
     * Value of the tag
     */
    public get simpleTag(): MatroskaTagValue { return this._simpleTag; }

    /**
     * Target that the tag value applies to
     */
    public get target(): MatroskaTagTarget { return this._target; }
}
