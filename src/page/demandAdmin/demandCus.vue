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
          需求名称:&nbsp;
          <el-input type="primary" placeholder="请输入工程师名称" style="width:300px;"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
        </li>
      </ul>
    </div>
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
      <div class="" style="minHeight:500px;">
        <el-row class="colorChange" v-for="(dem,indexDe) in demList" :key="indexDe">
          <el-col :span="2"><div class="dem_list">{{dem.num}}</div></el-col>
          <el-col :span="2"><div class="dem_list">
            <span v-if="dem.type==1">企业</span>
            <span v-else>个人</span>
          </div></el-col>
          <el-col :span="4"><div class="dem_list">{{dem.cusName}}</div></el-col>
          <el-col :span="5"><div class="dem_list">{{dem.name}}</div></el-col>
          <el-col :span="2"><div class="dem_list">{{dem.phone}}</div></el-col>
          <el-col :span="3"><div class="dem_list">{{dem.address}}</div></el-col>
          <el-col :span="2"><div class="dem_list">{{dem.time}}</div></el-col>
          <el-col :span="2"><div class="dem_list">
            <span v-show="dem.state==1" class="pubSpan" style="background:#C93625;color:white;">已通过</span>
            <span v-show="dem.state==2" class="pubSpan" style="background:#666;color:white;">审核中</span>
            <span v-show="dem.state==3" class="pubSpan" style="background:#ccc;color:#333;">已驳回</span>
          </div></el-col>
          <el-col :span="2"><div class="dem_list">
            <i class="el-icon-edit" @click="editDemBox=true"></i>
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
            <li style="marginTop:78px;">联系人:</li>
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
              <el-select v-model="searchMes.engTypeText" placeholder="请选择" size="medium">
               <el-option
                 v-for="item in searchMes.engTypeList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入名称" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入项目名称" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入项目类型" size="medium"></el-input>
            </li>
            <li>
              <el-input type="textarea" :rows="6" style="width:330px;" placeholder="请输入项目描述" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入联系人" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入联系方式" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入服务地址" size="medium"></el-input>
            </li>
            <li>
              <el-date-picker
                v-model="aaa"
                type="date"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                size="medium"
                style="width:150px;"
                >
              </el-date-picker>
            </li>
            <li>
              <el-input type="primary" size="medium" style="width:120px;" placeholder="￥"></el-input>
              —
              <el-input type="primary" size="medium" style="width:120px;" placeholder="￥"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入设备品牌" size="medium"></el-input>
            </li>
            <li>
              <el-input type="primary" style="width:330px;" placeholder="请输入备注" size="medium"></el-input>
            </li>
            <li>
              <el-button type="primary" size="medium">审核通过</el-button>
              <el-button size="medium">驳回</el-button>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDemBox = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="editDemBox = false" size="medium">提&nbsp;交</el-button>
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
            value:'2',
            label:'企业',
          }
        ],
        joinTime:null,//注册时间
        lastTime:null,//结束时间
      },
      editDemBox:false,//编辑需求盒子
      demList:[
        {
          num:1,
          type:1,
          cusName:'海绵宝宝',
          name:'北京XXXX项目',
          phone:18965555455,
          address:'北京XXXXXXXXXXX号',
          time:'2018-09-08 16:50',
          state:1
        },
        {
          num:1,
          type:2,
          cusName:'海绵宝宝',
          name:'北京XXXX项目',
          phone:18965555455,
          address:'北京XXXXXXXXXXX号',
          time:'2018-09-08 16:50',
          state:2
        },
        {
          num:1,
          type:1,
          cusName:'海绵宝宝',
          name:'北京XXXX项目',
          phone:18965555455,
          address:'北京XXXXXXXXXXX号',
          time:'2018-09-08 16:50',
          state:3
        },
      ]
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
}
</style>
