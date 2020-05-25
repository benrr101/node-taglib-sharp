import * as fs from "fs";

export default class Utilities {
    public static deleteBestEffort(path: string) {
        try {
            fs.unlinkSync(path);
        } catch {
            // Ignore failed deletions
        }
    }
}
