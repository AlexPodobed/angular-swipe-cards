import {relative} from 'path';
import {Bundler} from 'scss-bundle';
import {writeFile} from 'fs-extra';

/** Bundles all SCSS files into a single file */
async function bundleScss() {
  const {found, bundledContent, imports} = await new Bundler()
    .Bundle('./src/lib/styles.scss');

  if (imports) {
    const cwd = process.cwd();

    const filesNotFound = imports
      .filter(x => !x.found)
      .map(x => relative(cwd, x.filePath));

    if (filesNotFound.length) {
      console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
      throw new Error('One or more SCSS imports failed');
    }
  }

  if (found) {
    await writeFile('./dist/styles.scss', bundledContent);
  }
}

bundleScss();
