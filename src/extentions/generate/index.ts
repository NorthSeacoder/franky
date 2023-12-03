import {window, Uri} from 'vscode';
import {log} from '@utils/log';
import {camelCase, upperFirst} from '@utils/tools';
import {writeFile} from '@utils/file';

import {
    FieldTpl,
    OptionsTpl,
    VueIndexTpl,
    ReactIndexTpl,
    DetailModalTpl,
    EditModalTpl,
    ReactEditModalTpl
} from './templates';

interface GeneratorStrategy {
    generate: (uri: Uri, componentName: string) => Promise<void>;
}
class VueGeneratorStrategy implements GeneratorStrategy {
    async generate(uri: Uri, componentName: string): Promise<void> {
        const {path} = uri;
        const name = upperFirst(camelCase(componentName));
        await writeFile(`${path}/index.vue`, VueIndexTpl({name, componentName}));
        await writeFile(`${path}/constant/fields.ts`, FieldTpl());
        await writeFile(`${path}/constant/options.ts`, OptionsTpl());
        await this.generateModal(uri, name);
    }

    private async generateModal(uri: Uri, name: string): Promise<void> {
        const modalUri = Uri.file(`${uri.path}/modal`);
        await writeFile(`${modalUri.path}/edit-modal.vue`, EditModalTpl({name}));
        await writeFile(`${modalUri.path}/detail-modal.vue`, DetailModalTpl({name}));
    }
}
class ReactGeneratorStrategy implements GeneratorStrategy {
    async generate(uri: Uri): Promise<void> {
        const {path} = uri;

        await writeFile(`${path}/index.tsx`, ReactIndexTpl());
        await writeFile(`${path}/constant/fields.ts`, FieldTpl());
        await writeFile(`${path}/constant/options.ts`, OptionsTpl());
        await this.generateModal(uri);
    }

    private async generateModal(uri: Uri): Promise<void> {
        const {path} = uri;
        await writeFile(`${path}/modal/edit-modal.tsx`, ReactEditModalTpl());
    }
}

export const generatePage = async (uri: Uri, generatorStrategy: GeneratorStrategy) => {
    try {
      const componentName = await window.showInputBox({
        prompt: 'component-name in kebab-case',
      });
  
      if (!componentName) {
        return window.showErrorMessage('No component name passed');
      }
  
      const regex = /^[a-z]+(-[a-z]+)*$/;
      if (!regex.test(componentName)) {
        return window.showErrorMessage('component-name must be in kebab-case');
      }
  
      const compUri = Uri.file(`${uri.path}/${componentName}`);
      await generatorStrategy.generate(compUri, componentName);
    } catch (error) {
      log.debug(error);
    }
  };

  export const genVuePage = async (uri?: Uri) => {
    if (!uri) {
      return window.showErrorMessage('No file path found.');
    }
  
    const generatorStrategy = new VueGeneratorStrategy();
    await generatePage(uri, generatorStrategy);
  };

  export const genReactPage = async (uri?: Uri) => {
    if (!uri) {
      return window.showErrorMessage('No file path found.');
    }
  
    const generatorStrategy = new ReactGeneratorStrategy();
    await generatePage(uri, generatorStrategy);
  };
  

