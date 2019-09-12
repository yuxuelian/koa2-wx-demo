<template>
  <div class="container">
    <div>
      <logo/>
      <h1 class="title">
        {{title}}
      </h1>
      <h2 class="subtitle">
        My solid Nuxt.js project
      </h2>
      <div class="links">
        <a
        href="https://nuxtjs.org/"
        target="_blank"
        class="button--green"
        >
          Documentation
        </a>
        <a
        href="https://github.com/nuxt/nuxt.js"
        target="_blank"
        class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
export default {
  components: {
    Logo
  },
  async asyncData() {
    try {
      const res = await axios.get('/users/json')
      console.log(res)
      return {title: res.data.title}
    } catch (e) {
      console.log(e)
      return {title: '错误'}
    }
  },
  mounted() {
    console.log(axios)
    this.$axios.get('/proxy/comment/music?id=186016&limit=1').then((res) => {
      // console.log(res.data)
    })
    this.$axios.get('/users/json').then((res) => {
      // console.log(res.data)
    })

    // 最原始的http请求  所有框架都是基于这个封装
    let xhr = new XMLHttpRequest()
    xhr.open('get', '/users/json', true)
    xhr.send(null)
    xhr.onreadystatechange = () => {
      console.log('XMLHttpRequest 响应', xhr)
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
