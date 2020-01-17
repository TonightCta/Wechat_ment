<!-- 需求管理 -->
<template lang="html">
  <div class="demand_cus">
    <div class="dem_search">
      <ul>
        <li>主体类型:&nbsp;
          <el-select v-model="searchMes.engTypeText" placeholder="请选择" size="medium">
           <el-option
             v-for="item in searchMes.engTypeList"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
        </li>
        <li>&nbsp;&nbsp;手机号:&nbsp;
          <el-input type="primary" size="medium" placeholder="请输入工程师联系方式" style="width:200px;"></el-input>
        </li>
        <li>需求类型:&nbsp;
          <el-select v-model="searchMes.engTypeText" placeholder="请选择" size="medium">
           <el-option
             v-for="item in searchMes.engTypeList"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
        </li>
      </ul>
      <ul>
        <li>认证时间:&nbsp;
          <el-date-picker
            v-model="searchMes.joinTime"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            size="medium"
            style="width:120px;"
            >
          </el-date-picker>
          —
          <el-date-picker
            v-model="searchMes.lastTime"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="medium"
            style="width:120px;"
            >
          </el-date-picker>
        </li>
        <li>
          需求名称:&nbsp;
          <el-input type="primary" placeholder="请输入工程师名称" style="width:200px;"></el-input>
        </li>
        <li>
          项目状态:&nbsp;
          <el-select v-model="searchMes.engTypeText" placeholder="请选择" size="medium">
           <el-option
             v-for="item in searchMes.engTypeList"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
        </li>
      </ul>
      <p style="width:100%;textAlign:center;">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="searchDemand()">搜索</el-button>
      </p>
    </div>
    <p class="refreshIcon">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="top">
        <i class="el-icon-refresh" @click="refreshData()"></i>
      </el-tooltip>
    </p>
    <div class="dem_con">
      <el-row>
        <el-col :span="2"><div class="dem_title">序号</div></el-col>
        <el-col :span="2"><div class="dem_title">主体类型</div></el-col>
        <el-col :span="4"><div class="dem_title">名称</div></el-col>
        <el-col :span="5"><div class="dem_title">项目名称</div></el-col>
        <el-col :span="2"><div class="dem_title">联系方式</div></el-col>
        <el-col :span="3"><div class="dem_title">服务地址</div></el-col>
        <el-col :span="2"><div class="dem_title">发起时间</div></el-col>
        <el-col :span="2"><div class="dem_title">审核状态</div></el-col>
        <el-col :span="2"><div class="dem_title">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:500px;" v-loading="loadDemand">
        <el-row class="colorChange" v-for="(dem,indexDe) in demList" :key="indexDe">
          <el-col :span="2"><div class="dem_list">{{dem.num+1}}</div></el-col>
          <el-col :span="2"><div class="dem_list">
            <span v-if="dem.customerType==0">企业</span>
            <span v-else>个人</span>
          </div></el-col>
          <el-col :span="4"><div class="dem_list">{{dem.linkman}}</div></el-col>
          <el-col :span="5"><div class="dem_list">{{dem.projectName}}</div></el-col>
          <el-col :span="2"><div class="dem_list">{{dem.contact}}</div></el-col>
          <el-col :span="3"><div class="dem_list">{{dem.address}}</div></el-col>
          <el-col :span="2"><div class="dem_list">{{dem.createTime}}</div></el-col>
          <el-col :span="2"><div class="dem_list">
            <span v-show="dem.state==0" class="pubSpan" style="background:#C93625;color:white;">未审核</span>
            <span v-show="dem.state==1" class="pubSpan" style="background:#eee;color:#C93625;">已通过</span>
            <span v-show="dem.state==2" class="pubSpan" style="background:#C93625;color:white;">已委派</span>
            <span v-show="dem.state==3" class="pubSpan" style="background:green;color:white;">已开工</span>
            <span v-show="dem.state==4" class="pubSpan" style="background:#C93625;color:white;">已完工</span>
            <span v-show="dem.state==5" class="pubSpan" style="background:#C93625;color:white;">已付款</span>
            <span v-show="dem.state==-1" class="pubSpan" style="background:#ccc;color:#333;">已驳回</span>
          </div></el-col>
          <el-col :span="2"><div class="dem_list">
            <i class="el-icon-edit" @click="editDemand(indexDe)"></i>
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
         :page-size="100"
         layout="prev, pager, next, jumper"
         :total="1000">
       </el-pagination>
      </p>
    </div>
    <!-- 需求编辑 -->
    <div class="">
      <el-dialog
        title="需求编辑"
        :visible.sync="editDemBox"
        width="40%">
        <div class="editDem">
          <ul class="edit_title">
            <li>主体类型:</li>
            <li>名称:</li>
            <li>项目名称:</li>
            <li>项目类型:</li>
            <li>项目描述:</li>
            <li style="marginTop:92px;">联系人:</li>
            <li>联系方式:</li>
            <li>服务地址:</li>
            <li>发起时间:</li>
            <li>预算金额:</li>
            <li>设备品牌:</li>
            <li>备注:</li>
            <li>审核状态:</li>
          </ul>
          <ul class="edit_con">
            <li>
             {{editMes.type}}
            </li>
            <li>
             {{editMes.customerName}}
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入项目名称" size="medium" v-model="editMes.projectName"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入项目类型" size="medium" v-model="editMes.type"></el-input>
            </li>
            <li style="marginTop:15px;">
              <el-input type="textarea" :rows="6" style="width:330px;" placeholder="请输入项目描述" size="medium" v-model="editMes.content"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入联系人" size="medium" v-model="editMes.linkman"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入联系方式" size="medium" v-model="editMes.contact"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入服务地址" size="medium" v-model="editMes.address"></el-input>
            </li>
            <li>
              <el-date-picker
                v-model="editMes.startTime"
                type="date"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                size="medium"
                style="width:150px;"
                >
              </el-date-picker>
            </li>
            <li>
              <el-input type="primary" size="medium" style="width:120px;" placeholder="￥" v-model="editMes.minBudget"></el-input>
              —
              <el-input type="primary" size="medium" style="width:120px;" placeholder="￥" v-model="editMes.maxBudget"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入设备品牌" size="medium" v-model="editMes.brand"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入备注" size="medium" v-model="editMes.remark"></el-input>
            </li>
            <li>
              <el-button type="primary" size="medium" @click="passDemand()">审核通过</el-button>
              <el-button size="medium" @click="refuceDemand()">驳回</el-button>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDemBox = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" size="medium" @click="changeDemand()">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //临时数据
      aaa:null,

      //////
      currentPage3:0,
      searchMes:{
        engTypeText:null,//工程师类型筛选
        engTypeList:[
          {
            value:'1',
            label:'个人',
          },
          {
            value:'0',
            label:'企业',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        linkManNum:null,//联系人电弧
        demandName:null,//需求名称
      },
      editDemBox:false,//编辑需求盒子
      demList:[],
      token:null,//接口验证
      page:0,//当前页
      pageNum:0,//总页数
      editMes:{//编辑信息
        linkman:null,//联系人姓名
        projectName:null,//项目名称
        type:null,//项目类型
        category:null,//项目描述
        contact:null,//联系方式
        address:null,//服务地址
        startTime:null,//发起时间
        minBudget:null,//最小金额
        maxBudget:null,//最大金额
        content:null,//项目描述
        brand:null,//设备品牌
        remark:null,//项目备注
      },
      token:window.sessionStorage.getItem('token'),
      loadDemand:false,//加载动画
    }
  },
  created(){
    this.token=window.sessionStorage.getItem('token')
  },
  mounted(){
    this.getDemadnList()
  },
  methods:{
    refreshData(){//刷新数据
      this.getDemadnList();
      this.searchMes={
        engTypeText:null,//工程师类型筛选
        engTypeList:[
          {
            value:'1',
            label:'个人',
          },
          {
            value:'0',
            label:'企业',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
        linkManNum:null,//联系人电弧
        demandName:null,//需求名称
      }
    },
    searchDemand(){//搜索需求
      let _this=this;
      let formdata=new FormData();
      _this.loadDemand=true;
      if(_this.searchMes.engTypeText!=null&&_this.searchMes.engTypeText!=''){
        formdata.append('customerType',_this.searchMes.engTypeText)
      };
      if(_this.searchMes.demandName!=null&&_this.searchMes.demandName!=''){
        formdata.append('projectName',_this.searchMes.demandName)
      };
      if(_this.searchMes.linkManNum!=null&&_this.searchMes.linkManNum!=''){
        formdata.append('contact',_this.searchMes.linkManNum)
      };
      if(_this.searchMes.joinTime!=null&&_this.searchMes.joinTime!=''){
        formdata.append('startTimeMin',_this.searchMes.joinTime)
      };
      if(_this.searchMes.lastTime!=null&&_this.searchMes.lastTime!=''){
        formdata.append('startTimeMax',_this.searchMes.lastTime)
      };
      _this.$axios.post(_this.url+'/ict/demand/findListByCondition',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _this.loadDemand=false;
          _this.pageNum=res.data.data.totalPages*10;
          _this.length=_this.page*10;
          res.data.data.content.forEach((e)=>{
            _this.$set(e,'num',_this.length++);
          });
          _this.demList=res.data.data.content;
        }else{
          _this.loadDemand=false;
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _this.loadDemand=false;
        _this.$message.error('未知错误,请联系客服')
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getDemadnList(){//获取需求列表
      let _this=this;
      _this.loadDemand=true;
      let formdata=new FormData();
      formdata.append('page',_this.page);
      formdata.append('state',0);
      _this.$axios.post(_this.url+'/ict/demand/findListByCondition',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _this.loadDemand=false;
          _this.pageNum=res.data.data.totalPages*10;
          _this.length=_this.page*10;
          res.data.data.content.forEach((e)=>{
            _this.$set(e,'num',_this.length++);
          });
          _this.demList=res.data.data.content;
        }else{
          _this.loadDemand=false;
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _this.loadDemand=false;
        _this.$message.error('未知错误,请联系客服')
      })
    },
    editDemand(index){//编辑需求盒子
      this.editMes=this.demList[index]
      this.editDemBox=true;
    },
    changeDemand(){//提交修改需求信息
      let _this=this;
      if(_this.editMes.projectName==''){
        _this.$message.error('请输入项目名称')
      }else if(_this.editMes.type==''){
        _this.$message.error('请输入项目类型')
      }else if(_this.editMes.content==''||_this.editMes.content==null){
        _this.$message.error('请输入项目描述')
      }else if(_this.editMes.linkman==''){
        _this.$message.error('请输入项目联系人')
      }else if(_this.editMes.contact==''){
        _this.$message.error('请输入联系方式')
      }else if(_this.editMes.address==''){
        _this.$message.error('请输入项目服务地址')
      }else if(_this.editMes.startTime==''){
        _this.$message.error('请选择项目开始时间')
      }else if(_this.editMes.minBudget==''){
        _this.$message.error('请输入项目最小金额')
      }else if(_this.editMes.maxBudget==''){
        _this.$message.error('请输入项目最大金额')
      }else if(_this.editMes.brand==null||_this.editMes.brand==''){
        _this.$message.error('请输入设备品牌')
      }else if(_this.editMes.remark==null||_this.editMes.remark==''){
        _this.$message.error('请输入项目备注')
      }else{
        let formdata=new FormData();
        formdata.append('state',1)
        formdata.append('demandId',_this.editMes.id)
        formdata.append('projectName',_this.editMes.projectName)
        formdata.append('type',_this.editMes.type)
        formdata.append('category',_this.editMes.category)
        formdata.append('address',_this.editMes.address)
        formdata.append('linkman',_this.editMes.linkman)
        formdata.append('contact',_this.editMes.contact)
        formdata.append('startTime',_this.editMes.startTime)
        formdata.append('minBudget',_this.editMes.minBudget)
        formdata.append('maxBudget',_this.editMes.maxBudget);
        formdata.append('content',_this.editMes.content);
        formdata.append('remark',_this.editMes.remark);
        formdata.append('brand',_this.editMes.brand);
        _this.$axios.post(_this.url+'/ict/demand/edit',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          if(res.data.code==0){
            _this.$message.success('更新需求信息成功');
            _this.getDemadnList();
            _this.editDemBox=false;
          }else{
            _this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _this.$message.error('未知错误,请联系管理员')
        })
      }
    },
    passDemand(){//通过需求审核
      let _this=this;
      let formdata=new FormData();
      formdata.append('id',_this.editMes.id);
      formdata.append('state',1);
      _this.$axios.post(_this.url+'/ict/demand/updateState',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code==0){
          _this.$message.success('通过审核成功');
          _this.editDemBox=false;
          _this.getDemadnList();
          let formdataA=new FormData();
          formdataA.append('operatorId',res.data.data.operatorId)
          formdataA.append('title','犀牛小哥')
          formdataA.append('type','消息通知')
          formdataA.append('content','您的项目'+_this.editMes.projectName+'已通过平台审核！');
          this.$axios.post(this.url+'/ict/message/sendForOperator',formdataA).then((res)=>{
            if(res.data.code==0){

            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员')
          })
        }else{
          _this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _this.$message.error('未知错误,请联系管理员')
      })
    },
    refuceDemand(){//驳回审核
      let _this=this;
      let formdata=new FormData();
      formdata.append('id',_this.editMes.id);
      formdata.append('state',-1);
      _this.$axios.post(_this.url+'/ict/demand/updateState',formdata,{
        headers:{
          'Authorization':_this.token
        }
      }).then((res)=>{
        if(res.data.code==0){
          _this.$message.success('驳回审核成功');
          _this.editDemBox=false;
          _this.getDemadnList();
          let formdataA=new FormData();
          formdataA.append('operatorId',res.data.data.operatorId)
          formdataA.append('title','犀牛小哥')
          formdataA.append('type','消息通知')
          formdataA.append('content','您的项目'+_this.editMes.projectName+'未通过平台审核。');
          this.$axios.post(this.url+'/ict/message/sendForOperator',formdataA).then((res)=>{
            if(res.data.code==0){

            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员')
          })
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
.demand_cus{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  .dem_search{
    width: 100%;
    ul{
      width: 80%;
      margin:0 auto;
      display: flex;
      line-height: 80px;
      li{
        width: 50%;
      }
    }
  }
  .dem_con{
    width: 98%;
    margin:0 auto;
    margin-top:5px;
    .dem_title{
      line-height: 40px;
      background: #404040;
      color:white;
      text-align: center;
    }
    .colorChange:nth-of-type(even){
     background:#eee;
   }
    .dem_list{
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
  .editDem{
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
        line-height: 59px;
        box-sizing: border-box;
        padding-left:20px;
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
