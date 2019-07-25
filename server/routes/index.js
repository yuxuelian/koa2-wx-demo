// 路由
import Router from 'koa-router'
import path from 'path'
import {mkdirsSync} from '../utils/fs'
// form-data解析
import busboy from 'koa-busboy'
const uploadPath = path.join(__dirname, '../uploads')
// 创建上传保存的目录
mkdirsSync(uploadPath)
const index = Router()
const uploader = busboy({
  dest: uploadPath,
  // 设置保存文件的名字
  fnDestFilename: (fieldname, filename) => {
    const timestamp = new Date().getTime()
    const randomNum = Math.random().toString(10).slice(2, 8)
    return `${timestamp}-${randomNum}-${fieldname}-${filename}`
  }
})
// 测试接口
index.post('/receive', uploader, async (ctx) => {
  console.log('----------------------')
  ctx.response.status = 204
  ctx.response.body = null
})
export default index
