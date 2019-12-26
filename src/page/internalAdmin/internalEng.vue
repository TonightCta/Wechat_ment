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
          <el-input type="primary" size="medium" placeholder="请输入工程师联系方式" style="width:300px;"></el-input>
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
          <el-input type="primary" placeholder="请输入工程师名称" style="width:300px;"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
        </li>
      </ul>
    </div>
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
      <div class="" style="minHeight:500px;">
        <el-row class="colorChange" v-for="(eng,indexEng) in engList" :key="indexEng">
          <el-col :span="2"><div class="eng_list">{{eng.num+1}}</div></el-col>
          <el-col :span="3"><div class="eng_list">{{eng.name}}</div></el-col>
          <el-col :span="3"><div class="eng_list">
            <span v-if="eng.state==0">兼职</span>
            <span v-else>全职</span>
          </div></el-col>
          <el-col :span="4" v-if="eng.applyTime!=null&&eng.livePlace!=''"><div class="eng_list">{{eng.applyTime}}</div></el-col>
          <el-col :span="4" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="3" v-if="eng.livePlace!=null&&eng.livePlace!=''"><div class="eng_list">{{eng.livePlace}}</div></el-col>
          <el-col :span="3" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="3" v-if="eng.expert!=null&&eng.export!=''"><div class="eng_list">{{eng.expert}}</div></el-col>
          <el-col :span="3" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="2"><div class="eng_list">
            <i class="el-icon-s-order" @click="engSkill(indexEng)"></i>
          </div></el-col>
          <el-col :span="2" v-if="eng.state!=null&&eng.state!=''"><div class="eng_list">
            <span v-show="eng.state==1" class="pubSpan" style="background:#C93625;color:white;">已通过</span>
            <span v-show="eng.state==2" class="pubSpan" style="background:#666;color:white;">审核中</span>
            <span v-show="eng.state==3" class="pubSpan" style="background:#ccc;color:#333;">已驳回</span>
          </div></el-col>
          <el-col :span="2" v-else><div class="eng_list">-</div></el-col>
          <el-col :span="2"><div class="eng_list">
            <i class="el-icon-edit" @click="editEng(indexEng)"></i>
            <i class="el-icon-delete" style="color:black;"></i>
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
            <li>{{editMes.phone}}</li>
            <li>
              <span v-if="editMes.type==1">兼职</span>
              <span v-else>全职</span>
            </li>
            <li>{{editMes.time}}</li>
            <li>{{editMes.skill}},IT</li>
            <li>123</li>
            <li>{{editMes.place}}</li>
            <li>{{editMes.place}}</li>
            <li>
              <viewer :images="editMes.picList">
                <img v-for="(skillPic,index) in editMes.picList"
                :key="'Skill'+index" :src="skillPic" alt=""
                style="width:240px;height:120px;cursor:pointer;border:1px solid #C93625;border-radius:8px;margin-left:10px;"
                >
              </viewer>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editEngBox = false" size="medium">驳回申请</el-button>
          <el-button type="primary" @click="editEngBox = false" size="medium">通过申请</el-button>
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
            value:'1',
            label:'兼职',
          },
          {
            value:'2',
            label:'全职',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
      },
      currentPage3:0,//分页器指定页数
      editEngBox:false,//编辑工程师盒子
      editMes:{
        name:null,
        type:1,
        time:null,
        place:null,
        skill:null,
        picList:[],
        state:1,
        picList:[]
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getEngList(){//获取工程师列表
      let _vm=this;
      let formdata=new FormData();
      formdata.append('page',_vm.page)
      _vm.$axios.post(_vm.url+'/ict/engineer/findListByCondition',formdata,{
        headers:{
          'Authorization':_vm.token
        }
      }).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.length=_vm.page*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
          });
          _vm.engList=res.data.data.content;
        }
      })
    },
    editEng(index){//编辑工程师
      this.editMes=this.engList[index]
      this.editEngBox=true;
    },
    engSkill(index){
      this.engSkillList=this.engList[index].skillPic;
      this.engSkillBox=true;
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
    border-bottom:1px solid #eee;
    padding-bottom: 40px;
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
}
</style>
