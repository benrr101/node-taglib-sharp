/**
 * Interface for objects that can (and should) be disposed after they are no longer needed.
 */
export interface IDisposable {
    /**
     * Disposes the current instance.
     */
    dispose(): void;
}

/**
 * Interface for objects that can be lazily loaded.
 */
export interface ILazy {
    /**
     * Gets whether the object has been loaded.
     */
    isLoaded: boolean;

    /**
     * Loads the object.
     */
    load(): void;
}
