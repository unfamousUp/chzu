<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {

    },
    mounted() {
      this.toLogin() // 默认跳转到登录页面
      // this.toIndex()
      // this.toContent()
      // this.toInstitutionManagement()
      // this.toWaitTo()
    },
    methods: {
      toLogin() {
        const name = "toLogin"
        this.$router.push({
          name: name
        })
      },
      toIndex() {
        const name = "toIndex"
        this.$router.push({
          name: name
        })
      },
      toContent() {
        const name = "toContent"
        this.$router.push({
          name: name
        })
      },
      toInstitutionManagement() {
        const name = "toInstitutionManagement"
        this.$router.push({
          name: name
        })
      },
      toWaitTo() {
        const name = "toWaitTo"
        this.$router.push({
          name: name
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  }
</style>