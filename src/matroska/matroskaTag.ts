import MatroskaTagValue from "./matroskaTagValue";
import {MatroskaTagTarget} from "./matroskaTagTarget";
import {Guards} from "../utils";

/**
 * Abstraction on that represents the combination of a Matroska simple tag and a tag target.
 * @remarks This is different from the tag concept in Matroska. This is a 1:1 relation between
 *     target and value while Matroska tags are 1:many relationship of target to tag. Therefore,
 *     the target must be cloned when constructing >1 tag with the same target.
 */
export default class MatroskaTag {
    private _value: MatroskaTagValue;
    private _target: MatroskaTagTarget;

    /**
     * Constructs and initializes a new instance using a simple tag and a target.
     * @param value Tag value to store in the instance
     * @param target Tag target that the tag instance applies to
     */
    public constructor(value: MatroskaTagValue, target: MatroskaTagTarget) {
        Guards.truthy(value, "value");
        Guards.truthy(target, "target");

        this._value = value;
        this._target = target;
    }

    /**
     * Target that the tag value applies to
     */
    public get target(): MatroskaTagTarget { return this._target; }

    /**
     * Value of the tag
     */
    public get value(): MatroskaTagValue { return this._value; }
}
