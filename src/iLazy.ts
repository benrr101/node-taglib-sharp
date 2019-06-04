export default interface ILazy {
    isLoaded: boolean;
    load(): void;
}
