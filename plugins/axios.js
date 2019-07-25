// plugins/axios.js
export default function (args) {
  const {$axios, redirect} = args
  $axios.onRequest(config => {
  })
  $axios.onResponse(response => {
    if (process.browser) {
      //判断是否为客户端
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
    } else if (code === 404) {
    }
  })
}
