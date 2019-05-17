<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return {
      fetRouter:[
        {
          path:'/',
          redirect:'/index',
          children:[
            {
              path:'index',
              meta:{
                icon:'el-icon-s-cooperation',
                title:'代表团管理'
              }
            }
          ]
        },
        {
          path:'/paper',
          redirect:'/paper/allcert',
          meta:{
            icon:'el-icon-folder',
            title:'证件管理'
          },
          children:[
            {
              path:'allcert',
              meta:{
                icon:'',
                title:'所有证件申请管理'
              }
            },
            {
              path:'guest',
              meta:{
                icon:'',
                title:'嘉宾证申请管理'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
      // return this.fetRouter
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    // console.log(this.routes);
  }
}
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.el-submenu .el-menu{
  background: $navIsOpen !important;
}
.is-opened .el-submenu__title{
  background: $navIsOpen !important;
}
</style>
