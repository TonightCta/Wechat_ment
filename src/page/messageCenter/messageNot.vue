<!-- 消息维护中心 -->
<template lang="html">
  <div class="message_center">
    <div class="message_con">
      <p>消息类型:&nbsp;&nbsp;&nbsp;
        <el-select v-model="msgTypeText" placeholder="请选择消息类型" size="medium" style="width:450px;">
          <el-option
            v-for="item in msgType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>
      <p>消息标题:&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="primary" size="medium" style="width:450px;" v-model="msgTitle" placeholder="请输入消息标题"></el-input></p>
      <p>消息内容:&nbsp;&nbsp;&nbsp;
        <el-input
          type="textarea"
          :rows="8"
          style="width:450px;"
          placeholder="请输入内容"
          v-model="msgCon">
        </el-input>
      </p>
      <p><el-button type="primary" size="medium" @click="subMsg()">提&nbsp;交</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msgType: [
        {
          value:'消息通知',
          label:'消息通知'
        },
        {
          value:'活动消息',
          label:'活动消息'
        }
      ],
      msgTypeText:null,//消息类型
      msgTitle:null,//消息标题
      msgCon:null,//消息内容
    }
  },
  methods:{
    subMsg(){//消息发布
      let _this=this;
      // console.log(_this.msgTypeText);
      if(_this.msgTypeText==null){
        _this.$message.error('请选择消息类型')
      }else if(_this.msgTitle==null||_this.msgTitle==''){
        _this.$message.error('请输入消息标题')
      }else if(_this.msgCon==null||_this.msgCon==''){
        _this.$message.error('请输入消息内容')
      }else{
        let formdata=new FormData();
        formdata.append('type',_this.msgTypeText)
        formdata.append('title',_this.msgTitle)
        formdata.append('content',_this.msgCon);
        _this.$axios.post(_this.url+'/ict/message/sendForAll',formdata).then((res)=>{
          if(res.data.code==0){
            _this.$message.success('发布成功');
            _this.msgTypeText=null;
            _this.msgTitle=null;
            _this.msgCon=null;
          }else{
            _this.$message.error(res.data.msg)
          }
        }).catch((err)=>{

        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message_center{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  .message_con{
    width: 70%;
    p{
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
