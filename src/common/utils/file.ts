import {Uri, workspace} from 'vscode';

export async function writeFile(path: string, content: string) {
    return workspace.fs.writeFile(Uri.file(path), new Uint8Array(Buffer.from(content)));
}
export async function readDirectory(path: string) {
    try {
        const directory = await workspace.fs.readDirectory(Uri.file(path));
        return directory;
    } catch {
        return null;
    }
}
export async function directoryToAdd(uri: Uri, directory: string) {
    const {path} = uri;
    if (path.endsWith(directory)) {
        return path;
    }
    return path.concat(`/${directory}`);
}
