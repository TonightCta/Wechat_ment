<!-- 企业认证管理 -->
<template lang="html">
  <div class="company_about">
    <div class="com_search">
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
          企业名称:&nbsp;
          <el-input type="primary" placeholder="请输入工程师名称" style="width:300px;" v-model="searchMes.comName"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="searchCom()">搜索</el-button>
        </li>
      </ul>
    </div>
    <p class="refreshIcon">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="top">
        <i class="el-icon-refresh" @click="refreshData()"></i>
      </el-tooltip>
    </p>
    <div class="company_con">
      <el-row>
        <el-col :span="2"><div class="com_title">序号</div></el-col>
        <el-col :span="5"><div class="com_title">企业名称</div></el-col>
        <el-col :span="3"><div class="com_title">认证提交时间</div></el-col>
        <el-col :span="2"><div class="com_title">开户行</div></el-col>
        <el-col :span="5"><div class="com_title">开户行账号</div></el-col>
        <el-col :span="3"><div class="com_title">营业执照</div></el-col>
        <el-col :span="2"><div class="com_title">审核状态</div></el-col>
        <el-col :span="2"><div class="com_title">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:550px;" v-loading="isLoadCom">
        <el-row class="colorChange" v-for="(com,indexCom) in comList" :key="indexCom">
          <el-col :span="2"><div class="com_list">{{com.num+1}}</div></el-col>
          <el-col :span="5" v-if="com.name!=null&&com.name!=''"><div class="com_list">{{com.name}}</div></el-col>
          <el-col :span="5" v-else><div class="com_list">-</div></el-col>
          <el-col :span="3" v-if="com.applyTime!=null&&com.applyTime!=''"><div class="com_list">{{com.applyTime}}</div></el-col>
          <el-col :span="3" v-else><div class="com_list">-</div></el-col>
          <el-tooltip  v-if="com.accountName!=null&&com.accountName!=''" class="item" effect="dark" :content="com.accountName" placement="top">
            <el-col :span="2"><div class="com_list">{{com.accountName.substring(0,5)}}...</div></el-col>
         </el-tooltip>
          <el-col :span="2" v-else><div class="com_list">-</div></el-col>
          <el-col :span="5" v-if="com.accountNumber!=null&&com.accountNumber!=''"><div class="com_list">{{com.accountNumber}}</div></el-col>
          <el-col :span="5" v-else><div class="com_list">-</div></el-col>
          <el-col :span="3" v-if="com.businessLicense!=null&&com.businessLicense!=''"><div class="com_list">
            <viewer :images="com.pic">
              <img v-for="(lic,index) in com.pic"
              :key="'Skill'+index" :src="url+'/'+lic" alt=""
              style="width:100px;height:40px;marginTop:5px;"
              >
            </viewer>
          </div></el-col>
          <el-col :span="3" v-else><div class="com_list">-</div></el-col>
          <el-col :span="2"><div class="com_list">
            <span v-show="com.state==2" class="pubSpan" style="background:#C93625;color:white;">已通过</span>
            <span v-show="com.state==-1" class="pubSpan" style="background:#ccc;color:white;">已驳回</span>
            <span v-show="com.state==0" class="pubSpan" style="background:#666;color:white;">未认证</span>
            <span v-show="com.state==1" class="pubSpan" style="background:#999;color:white;">认证中</span>
          </div></el-col>
          <el-col :span="2"><div class="com_list">
            <i class="el-icon-edit" @click="editCom(indexCom)"></i>
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

    <!-- 编辑企业弹框 -->
    <div class="">
      <el-dialog
        title="提示"
        :visible.sync="editComBox"
        width="45%">
        <div class="edit_com">
          <ul class="edit_title">
            <li>姓名:</li>
            <li>联系电话:</li>
            <li>提交认证时间:</li>
            <li>开户银行:</li>
            <li>开户行账号:</li>
            <li>营业执照:</li>
          </ul>
          <ul class="edit_con">
            <li>{{editMes.name}}</li>
            <li>{{editMes.phone}}</li>
            <li>{{editMes.time}}</li>
            <li>{{editMes.bank}}</li>
            <li>{{editMes.bankNum}}</li>
            <li>
              <viewer :images="editMes.pic">
                <img v-for="(lic,index) in editMes.pic"
                :key="'Skill'+index" :src="lic" alt=""
                style="width:240px;height:120px;cursor:pointer;border:1px solid #C93625;border-radius:8px;margin-left:10px;"
                >
              </viewer>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancenAuth()">驳回认证</el-button>
          <el-button type="primary" @click="turnAuth()">通过认证</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPage3:0,//分页器默认值在
      editComBox:false,//编辑企业
      searchMes:{//筛选信息
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        comName:null,//企业名称
      },
      editMes:{
        num:2,
        name:'北京xxx集团有限公司',
        time:'2019-08-09 16:50',
        phone:189856563256,
        bank:'中国银行',
        bankNum:621555545464546512345,
        pic:['../../../static/img/skill_bg.png'],
        state:2
      },
      comList:[],
      token:null,//接口验证
      page:0,//当前页
      pageNum:10,//总页码
      isLoadCom:false,//列表加载动画
    }
  },
  created(){
    this.token=window.sessionStorage.getItem('token')
  },
  mounted(){
    this.getComList()
  },
  methods:{
    refreshData(){//刷新数据
      this.getComList();
      this.searchMes={
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        comName:null,//企业名称
      }
    },
    searchCom(){//搜索企业
      let _this=this;
      _this.isLoadCom=true;
      let formdata=new FormData()
      if(_this.searchMes.joinTime!=null&&_this.searchMes.joinTime!=''){
        formdata.append('applyTimeMin',_this.searchMes.joinTime)
      };
      if(_this.searchMes.lastTime!=null&&_this.searchMes.lastTime!=''){
        formdata.append('applyTimeMax',_this.searchMes.lastTime)
      };
      if(_this.searchMes.comName!=null&&_this.searchMes.comName!=''){
        formdata.append('name',_this.searchMes.comName)
      };
      _this.$axios.post(_this.url+'/ict/customer/findListByCondition',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code==0){
          _this.pageNum=res.data.data.totalPages*10;
          _this.length=_this.page*10;
          res.data.data.content.forEach((e)=>{
            _this.$set(e,'num',_this.length++);
            _this.$set(e,'pic',[]);
            e.pic.push(e.businessLicense);
          });
          _this.isLoadCom=false;
          _this.comList=res.data.data.content;
        }else{
          _this.isLoadCom=false;
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(`当前页: ${val}`);
    },
    editCom(index){//企业详情
      this.editMes=this.comList[index];
      this.editComBox=true;
    },
    getComList(){//获取企业列表
      let $this=this;
      let formdata=new FormData();
      $this.isLoadCom=true;
      formdata.append('page',$this.page);
      $this.$axios.post($this.url+'/ict/customer/findListByCondition',formdata,{
        headers:{
          'Authorization':$this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          $this.pageNum=res.data.data.totalPages*10;
          $this.length=$this.page*10;
          res.data.data.content.forEach((e)=>{
            $this.$set(e,'num',$this.length++);
            $this.$set(e,'pic',[]);
            e.pic.push(e.businessLicense);
          });
          $this.isLoadCom=false;
          $this.comList=res.data.data.content;
        }else{
          $this.isLoadCom=false;
          $this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        $this.$message.error('未知错误,请联系管理员')
        $this.isLoadCom=false;
      })
    },
    turnAuth(){//通过认证
      let _this=this;
      let formdata=new FormData();
      formdata.append('id',_this.editMes.id);
      formdata.append('state',1);
      _this.$axios.post(_this.url+'/ict/customer/updateState',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _this.$message.success('已通过该企业认证');
          _this.getComList();
          _this.editComBox=false;
        }else{
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _this.$message.error('未知错误,请联系管理员')
        console.log(err)
      })
    },
    cancenAuth(){//驳回认证
      let _this=this;
      let formdata=new FormData();
      formdata.append('id',_this.editMes.id);
      formdata.append('state',-1);
      _this.$axios.post(_this.url+'/ict/customer/updateState',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _this.$message.success('已驳回该企业认证');
          _this.getComList();
          _this.editComBox=false;
        }else{
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _this.$message.error('未知错误,请联系管理员')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.company_about{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  .com_search{
    width: 100%;
    ul{
      width: 70%;
      margin:0 auto;
      display: flex;
      line-height:110px;
      li{
        width: 50%;
      }
    }
  }
  .company_con{
    width: 98%;
    margin:0 auto;
    margin-top:5px;
    .com_title{
      line-height: 40px;
      background: #404040;
      color:white;
      text-align: center;
    }
    .colorChange:nth-of-type(even){
     background:#eee;
   }
    .com_list{
      line-height: 45px;
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
  .edit_com{
    width: 100%;
    margin:0 auto;
    display: flex;
    font-size: 16px;
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
      }
      li:last-child{
        margin-top:20px;
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
