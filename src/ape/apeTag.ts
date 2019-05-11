import {ApeFooter, ApeFooterFlags} from "./apeFooter";
import {ApeItem} from "./apeItem";
import {ByteVector} from "../byteVector";
import {Tag} from "../tag";
import {ArrayUtils, Guards} from "../utils";

/**
 * Class extends {@see Tag} to provide a representation of an APEv2 tag which can be read and
 * written to disk.
 */
export default class ApeTag extends Tag {
    private static readonly _pictureItemNames = [
        "Cover Art (other)",
        "Cover Art (icon)",
        "Cover Art (other icon)",
        "Cover Art (front)",
        "Cover Art (back)",
        "Cover Art (leaflet)",
        "Cover Art (media)",
        "Cover Art (lead)",
        "Cover Art (artist)",
        "Cover Art (conductor)",
        "Cover Art (band)",
        "Cover Art (composer)",
        "Cover Art (lyricist)",
        "Cover Art (studio)",
        "Cover Art (recording)",
        "Cover Art (performance)",
        "Cover Art (movie scene)",
        "Cover Art (colored fish)",
        "Cover Art (illustration)",
        "Cover Art (band logo)",
        "Cover Art (publisher logo)",
        "Embedded Object"
    ];

    private readonly _items: ApeItem[] = [];
    private _footer: ApeFooter;

    public get headerPresent(): boolean { return (this._footer.flags & ApeFooterFlags.HeaderPresent) !== 0; }
    public set headerPresent(val: boolean) {
        if (val) {
            this._footer.flags |= ApeFooterFlags.HeaderPresent;
        } else {
            this._footer.flags &= ~ApeFooterFlags.HeaderPresent;
        }
    }

    // #region Public Methods

    /**
     * Adds the contents of an array of strings to the value stored in a specified item.
     * @param key Key of the item to store the value in.
     * @param value Text values to add.
     */
    public addMultipleStringValue(key: string, value: string[]): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value || value.length === 0) {
            return;
        }

        // Add existing values of the item first
        const index = this.getItemIndex(key);
        const values = [];
        if (index >= 0) {
            values.push(... this._items[index].toStringArray());
        }

        // Add the new values to the item
        values.push(... value);

        // Add the item if it doesn't already exist, replace it with a new one if it does
        const item = ApeItem.fromMultipleStrings(key, values);
        if (index >= 0) {
            this._items[0] = item;
        } else {
            this._items.push(item);
        }
    }

    /**
     * Adds a new item to this tag as a single numeric value. If both {@param n} and {@param count}
     * are provided, the value will be stored as "n/count". If only {@param n} is provided, the
     * value will be stored as just "n". If both {@param n} and {@param count} are 0, the item item
     * will be removed.
     * @param key Key of the item to store the value in.
     * @param n Numeric value to store. If {@param count} is also provided, this will be the
     *     numerator of the fraction to store.
     * @param count Optionally, the denominator of the fraction to store.
     */
    public addNumericValue(key: string, n: number, count: number = 0): void {
        Guards.notNullOrUndefined(key, "key");
        Guards.uint(n, "n");
        Guards.uint(count, "count");

        if (n === 0 && count === 0) {
            return;
        }

        if (count !== 0) {
            this.addSingleStringValue(key, `${n}/${count}`);
        } else {
            this.addSingleStringValue(key, n.toString());
        }
    }

    /**
     * Adds a single string to the specified item in this tag.
     * @param key Key of the item to add.
     * @param value Value for the item to add.
     */
    public addSingleStringValue(key: string, value: string): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value) {
            return;
        }

        this.addMultipleStringValue(key, [value]);
    }

    /**
     * Gets a specified item from the current instance.
     * @param key Key for locating the requested {@see ApeItem}.
     * @returns The requested {@see ApeItem} if the specified {@param key} exists, `undefined`
     *  otherwise.
     */
    public getItem(key: string): ApeItem {
        Guards.notNullOrUndefined(key, "key");
        return this._items.find((i) => i.key.toUpperCase() === key.toUpperCase());
    }

    /**
     * Checks if an item exists in the current instance.
     * @param key Key of the item to check.
     */
    public hasItem(key: string): boolean {
        Guards.notNullOrUndefined(key, "key");
        return this.getItemIndex(key) >= 0;
    }

    /**
     * Renders the current instance as a raw APEv2 tag.
     */
    public render(): ByteVector {
        const data = this._items.reduce((bv, e) => { bv.addByteVector(e.render()); return bv; }, ByteVector.fromSize(0));

        this._footer.itemCount = this._items.length;
        this._footer.tagSize = (data.length + ApeFooter.size);
        this.headerPresent = true;

        data.insertByteVector(0, this._footer.renderHeader());
        data.addByteVector(this._footer.renderFooter());
        return data;
    }

    /**
     * Removes the items with a specified key from the current instance.
     * @param key Key of the item to remove from the current instance.
     */
    public removeItem(key: string): void {
        Guards.notNullOrUndefined(key, "key");
        ArrayUtils.remove<ApeItem>(this._items, (e) => e.key.toUpperCase() === key.toUpperCase());
    }

    /**
     * Stores the contents of an array of strings in a specified item. If {@param value} is falsy
     * or empty, the item will be removed.
     * @param key Key of the item to store the value in.
     * @param value Text to store in the item.
     */
    public setMultipleStringValue(key: string, value: string[]): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value || value.length === 0) {
            this.removeItem(key);
            return;
        }

        const item = ApeItem.fromMultipleStrings(key, value);
        const index = this.getItemIndex(key);
        if (index >= 0) {
            this._items[index] = item;
        } else {
            this._items.push(item);
        }
    }

    /**
     * Sets the value of an existing item to this tag as a single numeric value. If both {@param n}
     * and {@param count} are provided, the value will be stored as "n/count". If only {@param n}
     * is provided, the value will be stored as just "n".
     * @param key Key of the item to store the value in.
     * @param n Numeric value to store. If {@param count} is also provided, this will be the
     *     numerator of the fraction to store.
     * @param count Optionally, the denominator of the fraction to store.
     */
    public setNumericValue(key: string, n: number, count: number = 0): void {
        Guards.notNullOrUndefined(key, "key");
        Guards.uint(n, "n");
        Guards.uint(count, "count");

        if (n === 0 || count === 0) {
            this.removeItem(key);
        } else if (count !== 0) {
            this.setSingleStringValue(key, `${n}/${count}`);
        } else {
            this.setSingleStringValue(key, n.toString());
        }
    }

    /**
     * Sets the value of an existing item in this tag vith a single string as the value. If
     * {@param value} is falsy, the item will be removed.
     * @param key Key of the item to add.
     * @param value Value for the item to add.
     */
    public setSingleStringValue(key: string, value: string): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value) {
            this.removeItem(key);
        }

        this.setMultipleStringValue(key, [value]);
    }

    /**
     * Adds an item to the current instance, replacing an existing item with the same key.
     * @param item {@see ApeItem} to add to the current instance.
     */
    public setItem(item: ApeItem): void {
        Guards.truthy(item, "item");

        const index = this.getItemIndex(item.key);
        if (index >= 0) {
            this._items[index] = item;
        } else {
            this._items.push(item);
        }
    }

    // #endregion
}
