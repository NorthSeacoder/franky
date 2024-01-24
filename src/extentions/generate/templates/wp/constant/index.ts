export default () => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `
export const pre = (key: string) => \`Yard.info.\${key}\`;

const Fields = {
    key1: {
        label: "key",
        value: "value"
    }
}

export default Fields;
`
}