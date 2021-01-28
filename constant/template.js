exports.getTemplate=  ({name,time,langId,LastModifiedTime})=>{
const map={
    'javascript':
`/*
 * @Author: ${name}
 * @Date: ${time}
 * @Last Modified by: ${name}
 * @Last Modified time: ${LastModifiedTime}
 */

`,
"vue":
`<!-- @Author ${name} -->
<!-- @Date: ${time} -->
<!-- @Last Modified by: ${name} -->
<!-- @Last Modified time: ${LastModifiedTime} -->

`
}
return map[langId]||'//'
}