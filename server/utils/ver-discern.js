import axios from 'axios'
import FormData from 'form-data'
import fs from "fs"
/**
 * 验证码图片是base64的方式
 * @param file_base64
 * @returns {Promise<*>}
 */
async function base64VerDiscern(file_base64) {
  const data = {
    user: 'yuxuelian',
    pass: 'qwert12345',
    softid: '901498',
    codetype: '1004',
    file_base64
  }
  return (await axios.post('http://upload.chaojiying.net/Upload/Processing.php', data)).data.pic_str
}

/**
 * 验证码图片是文件的形式
 * @param filePath
 * @returns {Promise<*>}
 */
async function fileVerDiscern(filePath) {
  const param = new FormData()
  param.append('user', 'yuxuelian')
  param.append('pass', 'qwert12345');
  param.append('softid', '901498');
  param.append('codetype', '1004');
  param.append('userfile', fs.createReadStream(filePath));
  return (await axios({
    method: 'post',
    url: 'http://upload.chaojiying.net/Upload/Processing.php',
    data: param,
    headers: param.getHeaders()
  })).data.pic_str
}

export {
  base64VerDiscern,
  fileVerDiscern
}
