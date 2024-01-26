export default () => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `
export const pre = (key: string) => \`Yard.info.\${key}\`;//TODO: i18n key,且更新此处

const Fields = {
    key1: {
        label: "key",
        value: "field"
    }
}

export default Fields;
`
}