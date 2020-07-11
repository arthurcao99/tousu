<template>
    <div class="dashboard-container">
        <div class="left">
            <div class="info-card">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../styles/banner.jpg" class="image" width="100%" height="100px">
                    <div style="padding: 14px;height: 100px;">
                        <div class="user-info">
                            <div class="avatar">
                                <div class="block"><el-avatar :size="50" :src="user.pic"></el-avatar></div>
                            </div>
                            <div class="user-name" style="font-size: 17px;font-weight: bold;">
                                <span>{{user.name}}</span>
                            </div>
                        </div>

                        <div class="bottom" style="font-size: 14px;font-weight: bold;">
                            <div class="info-1">
                                <div class="info-bottom-title"><span>关注</span></div>
                                <div class="info-bottom-num">3</div>
                            </div>
                            <div class="info-1">
                                <div class="info-bottom-title"><span>粉丝</span></div>
                                <div class="info-bottom-num">3</div>
                            </div>
                            <div class="info-1">
                                <div class="info-bottom-title"><span>动态</span></div>
                                <div class="info-bottom-num">{{count}}</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="center">
            <el-card style="margin-bottom: 15px">
                <div >
                    <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
            </el-card>
<!--            <button @click="handle">评论</button>-->
            <div class="send-tweet">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="input"><img src="../../styles/title.jpg" height="25" width="auto"/>
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="sendcontent">
                        </el-input>
                    </div>
                    <div style="text-align: right;margin-right: 15px;margin-bottom: 15px" ><el-button type="primary" round @click="send">发送</el-button></div>

                </el-card>
            </div>
            <div class="tweet" v-for="item in tableData">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="input-head">
                        <div class="tweet-user-info">
                            <div class="tweet-avatar">
                                <div class="block"><el-avatar :size="50" :src="item.pic"></el-avatar></div>
                            </div>
                            <div class="tweet-user-name">
                                <div style="font-size: 17px;font-weight: bold;cursor: pointer;" @click="toUser(item.userId)" >{{item.name}}</div>
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
                        <div class="icon" v-if="item.isLiked==0" @click="addLike(item.weiboId)"><img src="../../styles/点赞.png" height="20" width="20"/>{{item.likeCount}}</div>
                        <div class="icon" v-else @click="calLike(item.weiboId)"><img src="../../styles/已点赞.png" height="20" width="20"/>{{item.likeCount}}</div>
                    </div>
                </el-card>
            </div>
            <div style="text-align: center;margin-top: 10px">
                <el-pagination v-if="barVisible==true"
                        layout="prev, pager, next"
                        :page-count="total"
                        :current-page.sync="currentPage"
                        @current-change="getData">
                </el-pagination>
            </div>
        </div>
        <div class="right">
            <div class="notice">
                <div class="notice-card">
                    <el-card :body-style="{ padding: '0px' ,height:'150px'}" >
                        <div style="margin-left: 14px;margin-top: 10px ;margin-bottom: 5px;font-size: 17px;font-weight: bold;">公告栏</div>
                        <div style="text-align: center">
                            <img  src="https://i0.hdslb.com/bfs/album/6160f9ad45afa002cc05fa063145ebb5b28cb93c.jpg" class="image" width="90%" height="90%">
                        </div>
                    </el-card>
                </div>
            </div>
<!--            <div class="topics">-->
<!--                <div class="notice-card">-->
<!--                    <el-card :body-style="{ padding: '0px' ,height:'150px'}" >-->
<!--                        <div style="margin-left: 14px;margin-top: 10px ;margin-bottom: 5px;font-size: 17px;font-weight: bold;">话题</div>-->
<!--                        <div style="text-align: left">-->
<!--                            <div class="item" v-for="item in topics">-->
<!--                                <div class="icon"><img src="https://i0.hdslb.com/bfs/app-res/9b596b67468b8abf635cc6fe4b6b7feb727f22dc.png" alt="" style="width: 20px;height: 20px"></div>-->
<!--                                <div class="topic">{{item.title}}</div>-->
<!--                            </div>-->


<!--                        </div>-->

<!--                    </el-card>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <el-dialog title="评论" :visible.sync="memberVisible" width="40%">
            <div class="comments" style="padding-bottom: 5px" >
                <div class="comment-input" style="margin-bottom: 30px">
                    <el-input placeholder="请输入评论" v-model="writeComment" class="input-with-select" style="margin-top: 20px">
                        <el-button slot="append" icon="el-icon-edit-outline" @click="sendComment"></el-button>
                    </el-input>
                </div>
                <div>
                    <div class="comment" v-for="c in comment" style="margin-top: 5px">
                        <div class="comment-user-info">
                            <div class="comment-avatar">
                                <div class="block"><el-avatar :size="30" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar></div>
                            </div>
                            <div class="name">
                                <div class="comment-user-name">
                                    <div style="font-size: 14px;font-weight: bold;">{{c.name}}</div>
                                    <div style="font-size: 11px;color: #99a2aa;">{{c.sendTime.slice(0,10)}}</div>
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
        name: 'Dashboard',
        data() {
            return {
                barVisible:true,
                keyword:'',
                total:0,
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
                user:null,
                count:0

            }
        },
        created(){
            var id=localStorage.getItem("id")
            this.getData(id)
            this.getUserInfo()
            this.getMyData(id)
        },
        methods: {
            getMyData(id){
                this.$axios.get('/getMyWeibo',{ params: {
                        userId:id,
                        pageSize: this.pageSize,
                        currentPage:this.currentPage
                    }}
                ).then(comics_response =>{
                    this.count=comics_response.data.data.totalElements
                    // console.log(this.tableData)
                })
            },
            getUserInfo(){
                this.$axios.get('/getUserInfo',{ params: {
                        userId:localStorage.getItem("id")
                    }}
                ).then(comics_response =>{
                    this.user=comics_response.data.data
                })
            },
            handle(wId){
                this.getCommentByWeiboId(wId)
                this.memberVisible=true
                this.commentWId=wId

            },
            getData(){
                this.$axios.get('/getAllWeibo',{ params: {
                        userId:localStorage.getItem("id"),
                        pageSize: this.pageSize,
                        currentPage:this.currentPage
                    }}
                ).then(comics_response =>{
                    this.tableData=comics_response.data.data.content
                    this.total=comics_response.data.data.totalPages
                    console.log(this.total)
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
                        this.sendcontent=''
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
                        this.retweetVisible=false
                    }
                    else{
                        this.$message.error('发送失败')
                    }
                })
            },
            search(){
                let params = new FormData()
                params.append('keyword', this.keyword)
                params.append('userId', localStorage.getItem("id"))
                params.append('currentPage', 1)
                params.append('pageSize', 100)
                this.$axios.post('/searchWeibo',params).then(successResponse =>{
                    if (successResponse.data.code===200){
                        this.tableData=successResponse.data.data.content
                        this.barVisible=false
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
            toUser(id){
                this.$router.push({name: 'userweibo', params: {id: id}})
            }

        }
    }
</script>

<style lang="scss" scoped>
    .left{
        width: 220px;
        margin: 10px;
    }
    .user-info{
        width: 120px;
        display: flex;
        justify-content: center;
    }
    .avatar{
        margin-top: -35px;
        margin-right: 10px;
    }
    .user-name{
        margin-top: -10px;
    }
    .bottom{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .info-1{
        text-align: center;
        width: 60px;
    }
    .center{
        width: 600px;
        margin: 10px;
    }
    .input{
        margin: 15px;
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
        /*margin-bottom: 20px;*/
    }
    .icon{
        margin-right: 20px;
    }
    .tweet{
        margin-top: 20px;
    }
    .right{
        width: 220px;
        margin: 10px;
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
    .input-head{
        display: flex;
        justify-content: space-between;
    }
    .weiquan{
        margin-top: 10px;
        margin-right: 30px;
    }

</style>
