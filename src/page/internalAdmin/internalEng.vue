<!-- 工程师认证 -->
<template lang="html">
  <div class="eng_about">
    <div class="eng_search">
      <ul>
        <li>工程师类型:&nbsp;
          <el-select v-model="searchMes.engTypeText" placeholder="请选择" size="medium">
           <el-option
             v-for="item in searchMes.engTypeList"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
        </li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机号:&nbsp;
          <el-input type="primary" size="medium" placeholder="请输入工程师联系方式" style="width:300px;" v-model="searchMes.engPhone"></el-input>
        </li>
      </ul>
      <ul>
        <li>&nbsp;&nbsp;&nbsp;认证时间:&nbsp;
          <el-date-picker
            v-model="searchMes.joinTime"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            size="medium"
            style="width:150px;"
            >
          </el-date-picker>
          —
          <el-date-picker
            v-model="searchMes.lastTime"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="medium"
            style="width:150px;"
            >
          </el-date-picker>
        </li>
        <li>
          工程师名称:&nbsp;
          <el-input type="primary" placeholder="请输入工程师名称" style="width:300px;" v-model="searchMes.engName"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="searchEng()">搜索</el-button>
        </li>
      </ul>
    </div>
    <p class="refreshIcon">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="top">
        <i class="el-icon-refresh" @click="refreshData()"></i>
      </el-tooltip>
    </p>
    <div class="eng_con">
      <el-row>
        <el-col :span="2"><div class="eng_title">序号</div></el-col>
        <el-col :span="3"><div class="eng_title">姓名</div></el-col>
        <el-col :span="3"><div class="eng_title">职位类型</div></el-col>
        <el-col :span="4"><div class="eng_title">认证提交时间</div></el-col>
        <el-col :span="3"><div class="eng_title">地址</div></el-col>
        <el-col :span="3"><div class="eng_title">擅长领域</div></el-col>
        <el-col :span="2"><div class="eng_title">证书</div></el-col>
        <el-col :span="2"><div class="eng_title">审核状态</div></el-col>
        <el-col :span="2"><div class="eng_title">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:500px;" v-loading="isLoadEng">
        <el-row class="colorChange" v-for="(eng,indexEng) in engList" :key="indexEng">
          <el-col :span="2"><div class="eng_list">{{eng.num+1}}</div></el-col>
          <el-col :span="3"><div class="eng_list">{{eng.name}}</div></el-col>
          <el-col :span="3"><div class="eng_list">
            <span v-if="eng.fullTime">全职</span>
            <span v-else>兼职</span>
            <!-- <span v-else>全职</span> -->
          </div></el-col>
          <el-col :span="4" v-if="eng.applyTime!=null&&eng.livePlace!=''"><div class="eng_list">{{eng.applyTime}}</div></el-col>
          <el-col :span="4" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="3" v-if="eng.livePlace!=null&&eng.livePlace!=''"><div class="eng_list">{{eng.livePlace}}</div></el-col>
          <el-col :span="3" v-else><div class="eng_list">-</div></el-col>
          <el-tooltip class="item" effect="dark" :content="eng.expert" placement="bottom" v-if="eng.expert!=null&&eng.export!=''">
            <el-col :span="3"><div class="eng_list" style="cursor:pointer;">{{eng.expert.substring(0,10)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="2"><div class="eng_list">
            <i class="el-icon-s-order" @click="engSkill(indexEng)"></i>
          </div></el-col>
          <el-col :span="2"><div class="eng_list">
            <span v-show="eng.state==2" class="pubSpan" style="background:#C93625;color:white;">已通过</span>
            <span v-show="eng.state==-1" class="pubSpan" style="background:#ccc;color:white;">已驳回</span>
            <span v-show="eng.state==0" class="pubSpan" style="background:#666;color:white;">未认证</span>
            <span v-show="eng.state==1" class="pubSpan" style="background:#999;color:white;">认证中</span>
          </div></el-col>
          <!-- <el-col :span="2" v-else><div class="eng_list">-</div></el-col> -->
          <el-col :span="2"><div class="eng_list">
            <i class="el-icon-edit" @click="editEng(indexEng)"></i>
            <i class="el-icon-delete" style="color:#ccc;"></i>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <div class="page_num"><!--分页器-->
      <p>
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page.sync="currentPage3"
         layout="prev, pager, next, jumper"
         :total="pageNum">
       </el-pagination>
      </p>
    </div>
    <div class=""><!--编辑工程师-->
      <el-dialog
        title="编辑工程师"
        :visible.sync="editEngBox"
        width="45%">
        <div class="edit_eng">
          <ul class="edit_title">
            <li>姓名:</li>
            <li>联系电话:</li>
            <li>职位类型:</li>
            <li>提交认证时间:</li>
            <li>擅长领域:</li>
            <li>服务类型:</li>
            <li>可接受服务区域:</li>
            <li>当前地址:</li>
            <li>资质证书:</li>
          </ul>
          <ul class="edit_con">
            <li>{{editMes.name}}</li>
            <li>
              <span v-if="editMes.phone!=null">{{editMes.phone}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <span>兼职</span>
              <!-- <span v-else>全职</span> -->
            </li>
            <li>
              <span v-if="editMes.applyTime!=null">{{editMes.applyTime}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <span v-if="editMes.expert!=null">{{editMes.expert}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <span v-if="editMes.serviceType!=null">{{editMes.serviceType}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <span v-if="editMes.receivingPlace">{{editMes.receivingPlace}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <span v-if="editMes.livePlace!=null">{{editMes.livePlace}}</span>
              <span v-else>-</span>
            </li>
            <li>
              <viewer :images="editMes.certificateVOList" v-if="editMes.certificateVOList!=null">
                <img v-for="(skillPic,index) in editMes.certificateVOList"
                :key="'Skill'+index" :src="url+'/'+skillPic.fileName" alt=""
                style="width:240px;height:120px;cursor:pointer;border:1px solid #C93625;border-radius:8px;margin-left:10px;"
                >
              </viewer>
              <span v-else>-</span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancenAuth()" size="medium">驳回认证</el-button>
          <el-button type="primary" @click="turnAuth()" size="medium">通过认证</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 工程师证书盒子 -->
    <div class="">
      <el-dialog
        title="工程师证书"
        :visible.sync="engSkillBox"
        width="35%">
        <div class="ensSkillBox">
          <ul>
            <li v-for="(engPic,indexSk) in engSkillList" :key="indexSk">
              <span>{{engPic.num}}、{{engPic.type}}</span>
              <viewer :images="engPic.picUrl">
                <img v-for="(skillS,index) in engPic.picUrl"
                :key="'Skill'+index" :src="skillS" alt=""
                style="width:240px;height:120px;cursor:pointer;border:1px solid #C93625;border-radius:8px;margin-left:10px;"
                >
              </viewer>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="engSkillBox = false">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchMes:{
        engTypeText:null,//工程师类型筛选
        engTypeList:[
          {
            value:'false',
            label:'兼职',
          },
          {
            value:'true',
            label:'全职',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        engPhone:null,//工程师手机号
        engName:null,//工程师姓名
      },
      currentPage3:0,//分页器指定页数
      editEngBox:false,//编辑工程师盒子
      editMes:{
        name:null,
        phone:1,
        applyTime:null,
        expert:null,
        serviceType:null,
        receivingPlace:[],
        livePlace:1,
        certificateVOList:[]
      },
      engList:[],
      engSkillBox:false,//工程师证书列表
      engSkillList:[
        {
          num:1,
          picUrl:['../../../static/img/skill_bg.png'],
          type:'网络高级工程师'
        },
        {
          num:2,
          picUrl:['../../../static/img/skill_bg.png'],
          type:'数通高级工程师'
        },
      ],
      token:null,//接口验证
      page:0,//当前页
      pageNum:10,//页码总数
      toekn:window.sessionStorage.getItem('token'),
      isLoadEng:false,//列表加载
    }
  },
  created(){
    this.token=window.sessionStorage.getItem('token')
  },
  mounted(){
    this.getEngList()
  },
  methods:{
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    refreshData(){
      this.getEngList();
      this.searchMes={
        engTypeText:null,//工程师类型筛选
        engTypeList:[
          {
            value:'false',
            label:'兼职',
          },
          {
            value:'true',
            label:'全职',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        engPhone:null,//工程师手机号
        engName:null,//工程师姓名
      }
    },
    searchEng(){//搜索工程师
      console.log(this.searchMes);
      let _vm=this;
      // if(){
      //   this.$message.error('请输入正确的手机号')
      // }else{
        this.isLoadEng=true;
        console.log(this.searchMes.engTypeText)
        let formdata=new FormData();
        formdata.append('page',this.page)
        if(this.searchMes.engName!=null&&this.engName!=''){
          formdata.append('realName',this.searchMes.engName)
        };
        if(this.searchMes.engPhone!=null&&this.engPhone!=''){
          formdata.append('phone',this.searchMes.engPhone)
        };
        if(this.searchMes.engTypeText!=null&&this.engTypeText!=''){
          formdata.append('fullTime',this.searchMes.engTypeText)
        };
        if(this.searchMes.joinTime!=null&&this.joinTime!=''){
          formdata.append('applyTimeMin',this.searchMes.joinTime)
        };
        if(this.searchMes.lastTime!=null&&this.lastTime!=''){
          formdata.append('applyTimeMax',this.searchMes.lastTime)
        };
        this.$axios.post(this.url+'/ict/engineer/findListByCondition',formdata,{
          headers:{
            'Authorization':this.token
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.code==0){
            _vm.isLoadEng=false;
            _vm.pageNum=res.data.data.totalPages*10;
            _vm.length=_vm.page*10;
            res.data.data.content.forEach((e)=>{
              _vm.$set(e,'num',_vm.length++);
            });
            _vm.engList=res.data.data.content;
          }else{
            _vm.isLoadEng=false;
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员')
          _vm.isLoadEng=false;
        })
      // }
    },
    getEngList(){//获取工程师列表
      let _vm=this;
      let formdata=new FormData();
      _vm.isLoadEng=true;
      formdata.append('page',_vm.page)
      _vm.$axios.post(_vm.url+'/ict/engineer/findListByCondition',formdata,{
        headers:{
          'Authorization':_vm.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _vm.isLoadEng=false;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.length=_vm.page*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
          });
          _vm.engList=res.data.data.content;
        }else{
          _vm.isLoadEng=false;
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        _vm.isLoadEng=false;
      })
    },
    editEng(index){//编辑工程师
      this.editMes=this.engList[index];
      console.log(this.editMes)
      this.editEngBox=true;
    },
    engSkill(index){//工程师证书盒子
      this.engSkillList=this.engList[index].skillPic;
      this.engSkillBox=true;
    },
    turnAuth(){//通过认证
      let formdata=new FormData();
      formdata.append('id',this.editMes.id);
      formdata.append('state',2);
      this.$axios.post(this.url+'/ict/engineer/updateState',formdata,{
        headers:{
          'Authorization':this.token
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code==0){
          this.getEngList();
          this.$message.success('已通过该工程师认证');
          this.editEngBox=false;
          let formdataA=new FormData();
          formdataA.append('operatorId',res.data.data.ictOperatorVO.id)
          formdataA.append('title','犀牛小哥')
          formdataA.append('type','消息通知')
          formdataA.append('content','您已通过平台工程师认证！');
          this.$axios.post(this.url+'/ict/message/sendForOperator',formdataA).then((res)=>{
            if(res.data.code==0){

            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员')
          })
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
        this.editEngBox=false;
      })
    },
    cancenAuth(){//驳回申请
      let formdata=new FormData();
      formdata.append('id',this.editMes.id);
      formdata.append('state',-1);
      this.$axios.post(this.url+'/ict/engineer/updateState',formdata,{
        headers:{
          'Authorization':this.toekn
        }
      }).then((res)=>{
        if(res.data.code==0){
          this.getEngList();
          this.$message.success('已驳回该工程师的认证')
          this.editEngBox=false;
          let formdataA=new FormData();
          formdataA.append('operatorId',res.data.data.ictOperatorVO.id)
          formdataA.append('title','犀牛小哥')
          formdataA.append('type','消息通知')
          formdataA.append('content','您未通过平台工程师认证。');
          this.$axios.post(this.url+'/ict/message/sendForOperator',formdataA).then((res)=>{
            if(res.data.code==0){

            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员')
          })
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.eng_about{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  .eng_search{
    width: 100%;
    ul{
      width: 70%;
      margin:0 auto;
      display: flex;
      line-height: 80px;
      li{
        width: 50%;
      }
    }
  }
  .eng_con{
    width: 98%;
    margin:0 auto;
    margin-top:5px;
    .eng_title{
      line-height: 40px;
      background: #404040;
      color:white;
      text-align: center;
    }
    .colorChange:nth-of-type(even){
     background:#eee;
   }
    .eng_list{
      line-height: 50px;
      text-align: center;
      font-size: 15px;
      i{
        color:#C93625;
        font-size: 20px;
        cursor:pointer;
      }
      .pubSpan{
        border-radius: 5px;
        font-size: 12px;
        padding: 4px;
      }
    }
  }
  .page_num{
    width: 100%;
    p{
      width: 100%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 20px;
    }
  }
  .edit_eng{
    width: 100%;
    margin:0 auto;
    display: flex;
    font-size: 16px;
    height: 450px;
    overflow: auto;
    .edit_title{
      width: 30%;
      li{
        line-height: 60px;
        text-align: right;
      }
    }
    .edit_con{
      width: 70%;
      li{
        line-height: 60px;
        box-sizing: border-box;
        padding-left:20px;
        img{

        }
      }
      li:last-child{
        margin-top:20px;
      }
    }
  }
  .ensSkillBox{
    width: 90%;
    margin:0 auto;
    ul{
      width: 100%;
      li{
        span{
          font-size: 16px;
        }
        img{
          margin-top: 20px;
        }
      }
    }
  }
  .refreshIcon{
    display: inline-block;
    width: 100%;
    border-bottom:1px solid #eee;
    padding-bottom: 3px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 15px;
    i{
      font-size: 36px;
      color:#C93625;
      cursor:pointer;
    }
  }
}
</style>
