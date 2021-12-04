# franky

franky is a convenient toolkit.

## Features

### fileheader
Add notes to the file header, and supports automatic update file modification time.

support .vue and .js

0 config,franky will get author name from git config,

ctrl+alt+i You can insert comments in the head, ctrl+s After you save the file, and automatically update the time and author.

eg:
```js
.js/.ts
/*
 * @Author: git config.name
 * @Date: 2021-01-31 11:16:13
 * @Last Modified by: git config.name
 * @Last Modified time: 2021-01-31 16:46:45
 */

```
```
.vue

<!-- @author git config.name -->
<!-- @Date: 2021-01-31 16:58:14 -->
<!-- @Last Modified by: git config.name -->
<!-- @Last Modified time: 2021-01-31 16:12:26 -->

```
#### hot key

`ctrl+alt+i` You can insert comments in the head.\

### diffLog

匹配的远程分支命名格式:[项目名][tag] msg  
主要在自己公司用....

根据项目名与 tag 筛选相应的远程分支,选择对比分支后与 master 对比筛选出未上线 commits  

有两种展示方式:
 - commits + revert
 - 全commits:之前revert的original commit ,按提交时间排序