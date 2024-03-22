// https://www.npmjs.com/package/ts-import
import * as tsImport from 'ts-import'

const main = async () => {
  const filePath = `/home/user/file.ts`
  const asyncResult = await tsImport.load(filePath, {
    // allowConfigurationWithComments: false,
  });

  // Only available in version 4.
  // const syncResult = tsImport.loadSync(filePath)
};

void main();
