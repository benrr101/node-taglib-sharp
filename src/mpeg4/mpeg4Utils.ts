import Mpeg4BoxHeader from "./mpeg4BoxHeader";

/**
 * Collection of utilities for interacting with MPEG4 files.
 * @internal
 */
export default class Mpeg4Utils {
    /**
     * Adds a parent to the end of an existing list of parents.
     * @param parents A {@link Mpeg4BoxHeader[]} object containing an existing list of parents.
     * @param current A {@link Mpeg4BoxHeader} object to add to the list.
     * @returns Mpeg4BoxHeader[] List of parents, including the added header.
     */
    public static addParent(parents: Mpeg4BoxHeader[], current: Mpeg4BoxHeader): Mpeg4BoxHeader[] {
        const boxes: Mpeg4BoxHeader[] = [];

        if (parents) {
            boxes.push(...parents);
        }

        boxes.push(current);

        return boxes;
    }
}
