import path from 'path';
import fs from 'fs';

interface options {
    label: string;
    field: string;
}
export async function readPackageDetails(folderPath: string) {
    const subFolderDetail: options[] = [];
    try {
        const subFolders = await fs.promises.readdir(folderPath, {withFileTypes: true});
        for (const folder of subFolders) {
            if (folder.isDirectory()) {
                const packageJsonPath = path.join(folderPath, folder.name, 'package.json');
                try {
                    const packageJson = await fs.promises.readFile(packageJsonPath, 'utf-8');
                    const packageData = JSON.parse(packageJson);
                    subFolderDetail.push({
                        field: packageData.name,
                        label: packageData.name + '@' + packageData.version
                    });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                    if (err.code === 'ENOENT') {
                        // package.json does not exist in this folder
                        subFolderDetail.push({label: folder.name,field: folder.name});
                        console.log(`No package.json found in ${folder.name}.`);
                    } else {
                        console.log(`Error reading package.json in ${folder.name}:`, err);
                    }
                }
            }
        }
    } catch (err) {
        console.log('Error reading root directory:', err);
    }
    return subFolderDetail;
}
