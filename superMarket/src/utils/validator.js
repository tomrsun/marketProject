/* 工具函数 */ 
// 验证密码 (以字母开头，长度在3~6之间，只能包含字符、数字和下划线)
export function passwordReg(val) {
    const reg = /^[a-zA-Z]\w{2,5}$/;
    return reg.test(val)
}
