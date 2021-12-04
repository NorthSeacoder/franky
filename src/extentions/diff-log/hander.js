import getGit, {logOption} from '@common/utils/git';

export const getLogsInRange = async ({tags, from, to}) => {
    const git = getGit();
    const logOpt = {
        from,
        to,
        ...logOption
    };
    const {all} = await git.log(logOpt);
    const commitReg = new RegExp(`${tags.split(',').join('|')}`, 'i'); //TODO:改成多个 tag 筛选
    return all.filter(({msg}) => commitReg.test(msg.match(/\[(.*)\]/g)[0])); //只取[]内匹配 tag
};

export const getCommitByhash = async (hash) => {
    const git = getGit();
    const logOpt = {
        ...logOption,
        [hash]: null,
        n: 1
    };
    const res = await git.log(logOpt);
    return res;
};

export const getRevertCommit = async (reverts) => {
    return await Promise.all(
        reverts
            .filter(({msg}) => /^Revert/.test(msg)) //排除 revert 后又 pick 的情况
            .map(async ({body, summary}) => {
                const [hash] = body.match(/[0-9a-f]{40}/);
                const {latest} = await getCommitByhash(hash);
                const {diff} = latest;
                return {...latest, revertSummary: summary.replace(/..[0-9a-f]{6}.\n/, diff)};
            })
    );
};
