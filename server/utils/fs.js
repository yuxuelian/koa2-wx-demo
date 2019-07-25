import fs from 'fs'
import path from 'path'

// 递归创建目录 同步方法
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    // 目录已经存在,直接返回
    return true;
  } else {
    // 否则递归创建
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
