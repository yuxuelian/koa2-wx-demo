import fs from 'fs'
// 路由
import Router from 'koa-router'
import path from 'path'
import {mkdirsSync} from '../utils/fs'
// form-data解析
import busboy from 'koa-busboy'
// 验证码识别
import {base64VerDiscern, fileVerDiscern} from '../utils/ver-discern'
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
  console.log(ctx.request.body)
  ctx.response.status = 204
  ctx.response.body = null
})
const uploader2 = busboy({
  dest: uploadPath,
  // 设置保存文件的名字
  fnDestFilename: () => 'pic_file',
})
// 验证码识别接口
index.post('/ver-discern', uploader2, async (ctx) => {
  try {
    let code_str;
    // 获取请求参数中的base64字符串
    const file_base64 = ctx.request.body.file_base64
    if (file_base64) {
      code_str = await base64VerDiscern(file_base64)
    } else {
      code_str = await fileVerDiscern(path.join(uploadPath, 'pic_file'))
    }
    // 返回结果
    ctx.response.body = {
      status: 'ok',
      code_str
    }
  } catch (e) {
    console.log(e)
    ctx.response.body = {
      status: 'error',
      msg: '解析失败'
    }
  }
})
export default index
