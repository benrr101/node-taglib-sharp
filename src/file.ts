export enum ReadStyle
{
    /// <summary>
    ///    The media properties will not be read.
    /// </summary>
    None = 0,

    // Fast = 1,

    /// <summary>
    ///    The media properties will be read with average accuracy.
    /// </summary>
    Average = 2,

    /// <summary>
    ///    Use the <see cref="PictureLazy"/> class in the
    ///    the property <see cref="Tag.Pictures"/>.
    ///    This will avoid loading picture content when reading the Tag.
    ///    Picture will be read lazily, when the picture content is
    ///    accessed.
    /// </summary>
    PictureLazy = 4
}