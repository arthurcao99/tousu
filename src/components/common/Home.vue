<template>
    <div class="wrapper">
<!--        <v-head></v-head>-->
        <NavMenu></NavMenu>
<!--        <router-view></router-view>-->
<!--        <v-sidebar></v-sidebar>-->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import NavMenu from './nav.vue'
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags,
        NavMenu
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }

};
</script>
