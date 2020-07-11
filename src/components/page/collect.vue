<template>

    <div class="all" style="width: 80%;margin:0 auto;margin-top: 10px">
        <el-card class="header">
            <div style="width: 120px;margin: 0 auto;text-align: center;margin-top: 40px">
                <img :src="user.pic" width="100px" height="100px" style="border-radius:50px" alt="">
            </div>
            <div class="" style="width: 20%;margin: 0 auto;text-align: center;margin-top: 10px">
                <span style="font-size: 25px;
                font-weight: 600;
                color: #fff;
                background: transparent;
                text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);">
                {{user.name}}
                </span>
                <br>
                <span style="
                font-size: 15px;
                background: transparent;
                color: #fff;
                text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);">
                    {{user.des}}
                </span>
            </div>
<!--            <div class="touxiang"></div>-->
<!--            <span class="username">-->
<!--				<br />-->
<!--				蜷缩<br />-->
<!--				<span class="qianming">-->
<!--					这是我的第一个个人主页。-->
<!--				</span>-->
<!--			</span>-->
        </el-card>
        <div class="main">
            <div class="left" style="width: 70%">
                <div class="tweet" v-for="item in tableData.content">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="input-head">
                            <div class="tweet-user-info">
                                <div class="tweet-avatar">
                                    <div class="block"><el-avatar :size="50" :src="item.pic"></el-avatar></div>
                                </div>
                                <div class="tweet-user-name">
                                    <div style="font-size: 17px;font-weight: bold;">{{item.name}}</div>
                                    <div style="font-size: 13px;color: #99a2aa;">{{item.sendTime}}</div>
                                </div>
                            </div>
                            <div class="weiquan" v-if="item.tag==1"><img src="../../styles/weiquan.png" height="50px" width="auto"/></div>
                        </div>
                        <div class="tweet-content" style="font-size: 17px;">
                            {{item.content}}
                        </div>
                        <div  v-if="item.source!=null" :body-style="{ padding: '0px' }" style="background-color:#F7F7F7;padding-bottom: 5px" >
                            <div v-if="item.source.weiboId!=0">
                                <div class="input" >
                                    <div class="tweet-user-info">
                                        <div class="tweet-user-name" style="margin-left: 14px">
                                            <div style="font-size: 14px;font-weight: bold;">@{{item.source.name}}</div>
                                            <div style="font-size: 11px;color: #99a2aa;">{{item.source.sendTime}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tweet-content" style="font-size: 14px;">
                                    {{item.source.content}}
                                </div>
                            </div>
                            <div v-else>
                                <div class="input" >
                                    <div class="tweet-user-info">
                                        <div class="tweet-user-name" style="margin-left: 14px">
                                            <!--                                        <div style="font-size: 14px;font-weight: bold;">@{{item.source.name}}</div>-->
                                            <!--                                        <div style="font-size: 11px;color: #99a2aa;">{{item.source.sendTime}}</div>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="tweet-content" style="font-size: 14px;">
                                    该内容已被删除
                                </div>
                            </div>
                        </div>
                        <div class="tweet-bottom" style="margin-top: 20px;color: #99a2aa;margin-bottom: 10px">
                            <div class="icon" @click="resend(item)" style="cursor:pointer;"><img src="../../styles/分享.png" height="20" width="20"/><span>转发</span></div>
                            <div class="icon" @click="handle(item.weiboId)" style="cursor:pointer;"><img src="../../styles/评论.png" height="20" width="20"/>{{item.commentCount}}</div>
                            <div class="icon" v-if="item.isLiked==0" @click="addLike(item.weiboId)" style="cursor:pointer;"><img src="../../styles/点赞.png" height="20" width="20"/>{{item.likeCount}}</div>
                            <div class="icon" v-else @click="calLike(item.weiboId)" style="cursor:pointer;"><img src="../../styles/已点赞.png" height="20" width="20"/>{{item.likeCount}}</div>
                            <div class="icon" @click="deleteWeibo(item)" style="cursor:pointer;"><img src="../../styles/删除.png" height="20" width="20"/><span>删除</span></div>
                        </div>
                        <!--                    <div class="comments" style="background-color: #F7F7F7;padding-bottom: 20px" >-->
                        <!--                        <div class="comment-input" style="margin: 30px">-->
                        <!--                            <el-input placeholder="请输入评论" v-model="input3" class="input-with-select" style="margin-top: 20px">-->
                        <!--                                <el-button slot="append" icon="el-icon-edit-outline"></el-button>-->
                        <!--                            </el-input>-->
                        <!--                        </div>-->
                        <!--                        <div>-->
                        <!--                            <div class="comment" >-->
                        <!--                                <div class="comment-user-info">-->
                        <!--                                    <div class="comment-avatar">-->
                        <!--                                        <div class="block"><el-avatar :size="30" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar></div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="name">-->
                        <!--                                        <div class="comment-user-name">-->
                        <!--                                            <div style="font-size: 14px;font-weight: bold;">曹隆翔</div>-->
                        <!--                                            <div style="font-size: 11px;color: #99a2aa;">2020-10-26</div>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                                <div class="comment-content" style="margin-left: 30px;margin-top: 5px;font-size: 14px;">-->
                        <!--                                    这是一条评论-->
                        <!--                                </div>-->

                        <!--                            </div>-->
                        <!--                            <div style="width: 80%;margin: 0 auto;border-bottom: 1px solid #e5e9ef;margin-top: 5px"></div>-->
                        <!--                        </div>-->

                        <!--&lt;!&ndash;                        <div class="tweet-bottom" style="margin-top: 5px">&ndash;&gt;-->

                        <!--&lt;!&ndash;                            <router-link :to="{name:   'comicDetail', params: {id: 1}}">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                <div class="icon"><img src="../../styles/评论.png" height="20" width="20"/>评论</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;                            </router-link>&ndash;&gt;-->
                        <!--&lt;!&ndash;                            <div class="icon"><img src="../../styles/点赞.png" height="20" width="20"/>点赞</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;                        </div>&ndash;&gt;-->
                        <!--                    </div>-->
                    </el-card>
                </div>
            </div>
            <el-card class="right" style="width: 28%;height: 130px;margin-top: 20px;font-size: 14px;font-weight: bold;padding-bottom: 20px;">
                <div class="bottom">
<!--                    <div class="info-1">-->
<!--                        <div class="info-bottom-title"><span>关注</span></div>-->
<!--                        <div class="info-bottom-num">3</div>-->
<!--                    </div>-->
<!--                        <div class="info-1">-->
<!--                            <div class="info-bottom-title"><span>粉丝</span></div>-->
<!--                            <div class="info-bottom-num">3</div>-->
<!--                        </div>-->
                        <div class="info-1">
                        <div class="info-bottom-title"><span>动态</span></div>
                        <div class="info-bottom-num">{{tableData.totalElements}}</div>
                    </div>
                </div>
                <div class="border" style="margin-top:20px;border-bottom: 1px solid #e5e9ef;width: 80%;margin: 0 auto"></div>
                <div style="text-align: left;margin: 0 auto;width: 70%">
                    <div style="margin-top: 10px">
                        <i class="el-icon-lollipop"  v-if="user.birth!=null"> 生日：{{user.birth.slice(0,10)}}</i>
                        <i class="el-icon-lollipop"  v-else> 生日：未知</i>
                    </div>
                    <div style="margin-top: 10px">
                        <i class="el-icon-user"  > 性别：{{user.gender}}</i>
                    </div>

                </div>
            </el-card>
        </div>
        <div class="bottom">

        </div>
        <el-dialog title="评论" :visible.sync="memberVisible" width="40%">
            <div class="comments" style="padding-bottom: 5px" >
                <div class="comment-input" style="margin-bottom: 30px">
                    <el-input placeholder="请输入评论" v-model="writeComment" class="input-with-select" style="margin-top: 20px">
                        <el-button slot="append" icon="el-icon-edit-outline" @click="sendComment"></el-button>
                    </el-input>
                </div>
                <div>
                    <div class="comment" v-for="c in comment">
                        <div class="comment-user-info">
                            <div class="comment-avatar">
                                <div class="block"><el-avatar :size="30" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar></div>
                            </div>
                            <div class="name">
                                <div class="comment-user-name">
                                    <div style="font-size: 14px;font-weight: bold;">@{{c.name}}</div>
                                    <div style="font-size: 11px;color: #99a2aa;">{{c.sendTime}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="comment-content" style="margin-left: 30px;margin-top: 5px;font-size: 14px;">
                            {{c.content}}
                        </div>

                    </div>
                    <div style="width: 80%;margin: 0 auto;border-bottom: 1px solid #e5e9ef;margin-top: 5px"></div>

                </div>

                <!--                        <div class="tweet-bottom" style="margin-top: 5px">-->

                <!--                            <router-link :to="{name:   'comicDetail', params: {id: 1}}">-->
                <!--                                <div class="icon"><img src="../../styles/评论.png" height="20" width="20"/>评论</div>-->
                <!--                            </router-link>-->
                <!--                            <div class="icon"><img src="../../styles/点赞.png" height="20" width="20"/>点赞</div>-->
                <!--                        </div>-->
            </div>
        </el-dialog>
        <el-dialog title="转发" :visible.sync="retweetVisible" width="40%">
            <div class="comments" style="padding-bottom: 5px" >
                <div class="comment-input" style="margin-bottom: 30px">
                    <div class="input"><img src="../../styles/title.jpg" height="25" width="auto"/>
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="retweet">
                        </el-input>
                    </div>
                    <div style="text-align: right;margin-right: 15px;margin-bottom: 15px" ><el-button type="primary" round @click="handleRe()">发送</el-button></div>
                </div>

                <!--                        <div class="tweet-bottom" style="margin-top: 5px">-->

                <!--                            <router-link :to="{name:   'comicDetail', params: {id: 1}}">-->
                <!--                                <div class="icon"><img src="../../styles/评论.png" height="20" width="20"/>评论</div>-->
                <!--                            </router-link>-->
                <!--                            <div class="icon"><img src="../../styles/点赞.png" height="20" width="20"/>点赞</div>-->
                <!--                        </div>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: 'search',
        data() {
            return {
                tableData:[],
                total:20,
                keyword: '',
                currentPage:1,
                pageSize:10,
                items:null,
                writeComment:'',
                sendcontent:"",
                pageSize:10,
                currentPage:1,
                tweet:'',
                comment:[],
                retweet:'',
                retweetVisible:false,
                topics:[{
                    title:'#火箭少女101#'
                },{
                    title:'#创造101#'
                }]
                ,
                memberVisible:false,
                tableData:[],
                source:null,
                commentWId:0,
                user:null
            }
        },
        created(){
            var id=localStorage.getItem("id")
            this.getData(id)
            this.getUserInfo()
        },
        methods:{
            handle(wId){
                this.getCommentByWeiboId(wId)
                this.memberVisible=true
                this.commentWId=wId

            },
            getUserInfo(){
                this.$axios.get('/getUserInfo',{ params: {
                        userId:localStorage.getItem("id")
                    }}
                ).then(comics_response =>{
                    this.user=comics_response.data.data
                })
            },
            getData(id){
                this.$axios.get('/getMyWeibo',{ params: {
                        userId:id,
                        pageSize: this.pageSize,
                        currentPage:this.currentPage
                    }}
                ).then(comics_response =>{
                    this.tableData=comics_response.data.data
                    console.log(this.tableData)
                })
            },
            getCommentByWeiboId(wId){
                this.$axios.get('/getAllCommentByWeiboId',{ params: {
                        weiboId:wId,
                        pageSize: this.pageSize,
                        currentPage:this.currentPage
                    }}
                ).then(comics_response =>{
                    this.comment=comics_response.data.data.content
                    console.log(this.comment)
                })
            },
            send(){
                let params = new FormData()
                params.append('userId', localStorage.getItem("id"))
                params.append('content', this.sendcontent)
                this.$axios.post('/sendWeibo',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('发送成功');
                        this.getData(localStorage.getItem("id"))
                    }
                    else{
                        this.$message.error('发送失败')
                    }
                })
            },
            resend(item){
                if (item.source==null){
                    this.retweet=""
                    this.source=item.weiboId
                }
                else{
                    this.retweet="//@"+item.name+": "+item.content
                    this.source=item.source.weiboId
                }
                this.retweetVisible=true
                // let params = new FormData()
                // params.append('userId', localStorage.getItem("id"))
                // params.append('content', this.sendcontent)
                // this.$axios.post('/sendWeibo',params).then(successResponse =>{
                //     if (successResponse.data.code===200){
                //         this.$message.success('发送成功');
                //         this.getData(localStorage.getItem("id"))
                //     }
                //     else{
                //         this.$message.error('发送失败')
                //     }
                // })
            },
            handleRe(){
                let params = new FormData()
                params.append('userId', localStorage.getItem("id"))
                params.append('content', this.retweet)
                params.append('source', this.source)
                this.$axios.post('/sendWeibo',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('发送成功');
                        this.getData(localStorage.getItem("id"))
                    }
                    else{
                        this.$message.error('发送失败')
                    }
                })
            },
            sendComment(){
                let params = new FormData()
                params.append('userId', localStorage.getItem("id"))
                params.append('content', this.writeComment)
                params.append('weiboId', this.commentWId)
                this.$axios.post('/sendComment',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('发送成功');
                        this.getData(localStorage.getItem("id"))
                        this.writeComment=''
                        this.getCommentByWeiboId(this.commentWId)

                    }
                    else{
                        this.$message.error('发送失败')
                    }
                })
            },
            addLike(id){
                let params = new FormData()
                params.append('userId', localStorage.getItem("id"))
                params.append('weiboId', id)
                this.$axios.post('/addLike',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('点赞成功');
                        this.getData(localStorage.getItem("id"))


                    }
                    else{
                        this.$message.error('点赞失败')
                    }
                })
            },
            calLike(id){
                let params = new FormData()
                params.append('userId', localStorage.getItem("id"))
                params.append('weiboId', id)
                this.$axios.post('/cancelLike',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('取消成功');
                        this.getData(localStorage.getItem("id"))


                    }
                    else{
                        this.$message.error('点赞失败')
                    }
                })
            },
            deleteWeibo(item){
                let params = new FormData()
                params.append('weiboId', item.weiboId)
                this.$axios.post('/delWeibo',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.$message.success('删除成功');
                        this.getData(localStorage.getItem("id"))


                    }
                    else{
                        this.$message.error('删除失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-info{
        width: 120px;
        display: flex;
        justify-content: center;
    }
    .avatar{
        margin-right: 10px;
    }
    .user-name{
        margin-top: 10px;
    }
    .header{
        height: 270px;
        margin: 0 auto;
        background: url("../../styles/banner.jpg") no-repeat;
        background-size:100%;
    }
    .main{
        display: flex;
        justify-content: space-between;
    }
    .tweet-avatar{
        margin-top: 10px;
        margin-right: 10px;
    }
    .tweet-user-name{
        margin-top: 15px;
    }
    .tweet-user-info{
        width: 250px;
        display: flex;
        justify-content: center;
    }
    .tweet-content{
        margin-top: 10px;
        margin-left: 95px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .tweet-bottom{
        width: 300px;
        display: flex;
        justify-content: center;
        margin-left: 60px;
        margin-bottom: 20px;
    }
    .icon{
        margin-right: 20px;
    }
    .tweet{
        margin-top: 20px;
    }
    .dashboard-container{
        justify-content: center;
        display: flex;
    }
    .notice-card{
        width: 300px;
        margin-bottom: 20px;
    }
    .item{
        margin-left: 13px;
        display: flex;
        justify-content: left;
    }
    .comment{
        display: flex;
        justify-content: center;
    }

    .comment-avatar{
    }
    .comment-user-name{
    }
    .comment-user-info{
        margin-left:47px;
        width: 100px;
        display: flex;
        justify-content: space-between;
    }
    .comment-content{
        width: 450px;
        margin-right: 20px;
    }
    .comment-card{
        margin-top: 10px;
    }
    .bottom{
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
    .info-1{
        text-align: center;
        width: 60px;
    }
    .input-head{
        display: flex;
        justify-content: space-between;
    }
    .weiquan{
        margin-top: 10px;
        margin-right: 30px;
    }
    .touxiang {
        width: 100px;
        height: 100px;
        margin: auto;
        background: url(https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png) no-repeat center;
        background-size: 100% 100%;
        border-radius: 99px;
        border: 4px solid #fff;
    }
    .username {
        font-family: "微软雅黑";
        font-size: 25px;
        font-weight: 600;
        color: #fff;
        background: transparent;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
    .qianming {
        font-family: "微软雅黑";
        font-size: 15px;
        background: transparent;
        color: #fff;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
</style>
