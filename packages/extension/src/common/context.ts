export interface Context {
    active: boolean;
    login: boolean;
    name: string;
}

export const ctx = {
    active: false,
    login: false,
    name: 'franky'
} as Context;
