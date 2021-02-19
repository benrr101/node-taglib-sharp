/**
 * Indicates the type of data stored in a <see cref="ContentDescriptor" /> or <see cref="DescriptionRecord" /> object.
 */
export enum DataType {
    /**
     * The descriptor contains Unicode (UTF-16LE) text.
     */
    Unicode = 0,

    /**
     * The descriptor contains binary data.
     */
    Bytes = 1,

    /**
     * The descriptor contains a boolean value.
     */
    Bool = 2,

    /**
     * The descriptor contains a 4-byte DWORD value.
     */
    DWord = 3,

    /**
     * The descriptor contains a 8-byte QWORD value.
     */
    QWord = 4,

    /**
     * The descriptor contains a 2-byte WORD value.
     */
    Word = 5,

    /**
     * The descriptor contains a 16-byte GUID value.
     */
    Guid = 6
}
