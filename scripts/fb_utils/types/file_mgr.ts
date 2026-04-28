// describes a file entry in the database
export interface File {
    id: string;
    description: string;

    // NOTE: files shared using identity bound sharing means that the file can
    // only be accessed by specific e-mail addresses
    isUsingIdentityBoundSharing: boolean;
    sharedWithEmails: string[];

    storagePath: string;
}

interface ExportedFields {
    // NOTE: the download URL is always provided as we consider the fact that
    // if someone can reach a file, it means they have authorized access to it
    // WARN: this implies perfecting the permission system to avoid dumping
    // file descriptors when identity bound sharing is enabled for instance
    downloadUrl: string;
    shareableLink: string;
    filename: string;
}

// describes a file out of the database, hence facing the user with features
// like sharing and downloading
export type ExportedFile = ExportedFields & Omit<File,
    "isUsingIdentityBoundSharing" | "sharedWithEmails" | "storagePath">;

// describes a file out of the database but when requested by an admin
// NOTE: this type definition is valid only when the api endpoint is targeted
// using an admin account
export type ExtendedFile = File & ExportedFields;
