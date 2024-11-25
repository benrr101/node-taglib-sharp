/**
 * General settings for the node-taglib-sharp libary.
 */
export default class Settings {
    private static _copyExistingTagsToNewDefaultTags: boolean = true;

    /**
     * Gets whether existing tags should be copied into newly created default tags.
     * If `true`, tags that already exist in the file will be copied into any newly created default
     * tags. If `false`, newly created default tags will be left empty.
     */
    public static get copyExistingTagsToNewDefaultTags(): boolean { return this._copyExistingTagsToNewDefaultTags; }

    /**
     * Sets whether existing tags should be copied into newly created default tags.
     * If `true`, tags that already exist in the file will be copied into any newly created default
     * tags. If `false`, newly created default tags will be left empty.
     */
    public static set copyExistingTagsToNewDefaultTags(value: boolean) {
        this._copyExistingTagsToNewDefaultTags = value;
    }
}
