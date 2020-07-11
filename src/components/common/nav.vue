<template>
    <div id="NavMenu">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                router
        >

            <template v-for="item in navMenuData">
                <el-menu-item :index="item.index" v-if="!item.child">{{item.name}}</el-menu-item>

                <el-submenu :index="item.index" v-if="item.child">
                    <template slot="title">{{item.name}}</template>
                    <template v-for="item2 in item.child">
                        <el-menu-item :index="item2.index">{{item2.name}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <el-menu-item @click="logOut">退出登录</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NavMenu",
        data() {
            return {
                activeIndex: "dashboard",
                navMenuData: [
                    { index: "dashboard", name: "首页" },
                    { index: "collect", name: "个人主页" },
                    {
                        index:"manager",
                        name:"管理页面"
                    }

                ]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logOut(){
                localStorage.removeItem('ms_username');
                localStorage.removeItem('id');
                this.$router.push('/login');
            }
        },
        mounted(){
            console.log(this.activeIndex)
            console.log(this.$route.path)
            this.activeIndex = this.$route.path.substring(1,this.$route.path.length);

        }
    };
</script>

<style scoped>
</style>
