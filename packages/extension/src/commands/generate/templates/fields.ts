export default (): string => {
  return `
import {defineFields} from '@yqg/type';

export default defineFields({
    name: {field: 'name', label: '名称'},
});
`;
};
