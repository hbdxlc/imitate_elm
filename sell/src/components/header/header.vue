<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bullerin-title"></span>
      <span class="bulletin-text">
          {{seller.bulletin}}
        </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"
      >
    </div>
      <div v-show="datailShow" class="detail">
          <div class="detail-wrapper cleatfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="showHidder">X</div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../../components/star/star'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return{
        datailShow:false
      }
    },
    methods:{
      showDetail(){
          this.datailShow=true
      },
      showHidder(){
        this.datailShow=false
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components:{
        star
    }
  };
</script>
<style scoped lang="less" type="text/less">
  @import "../../assets/mixin";

  #header {
    position: relative;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
    .content-wrapper {
      padding: 24px 12px 18px 24px;
      font-size: 0px;
      position: relative;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            .bg-image('../components/header/brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            color: rgb(255, 255, 255);
            font-weight: bold;
            line-height: 18px;
          }
        }
        .description {
          margin-top: 8px;
          font-size: 12px;
          color: rgb(255, 255, 255);
          font-weight: 200;
          line-height: 12px;
        }
        .support {
          margin-top: 10px;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('../components/header/decrease_1');
            }
            &.discount {
              .bg-image('../components/header/discount_1');
            }
            &.guarantee {
              .bg-image('../components/header/guarantee_1');
            }
            &.invoice {
              .bg-image('../components/header/invoice_1');
            }
            &.special {
              .bg-image('../components/header/special_1');
            }
          }
          .text {
            font-size: 10px;
            color: rgb(255, 255, 255);
            font-weight: 200;
            line-height: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 10px;
          color: rgb(255, 255, 255);
        }
        i {
          font-size: 10px;
          margin-left: 2px;
          color: rgb(255,255,255);
          font-weight: 200;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, .2);
      .bullerin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        .bg-image('../components/header/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        margin-top: 8px;
        vertical-align: top;
      }
      .bulletin-text {
        font-size: 10px;
        font-weight: 200;
        margin: 0 4px;
        vertical-align: top;
      }
      i {
        position: absolute;
        font-size: 10px;
        right: 12px;
        line-height: 28px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      z-index: 100;
      top:0;
      left: 0;
      width:100%;
      height:100%;
      overflow: auto;
      background: rgba(7,17,27,.8);
      backdrop-filter: blur(10px);
      .detail-wrapper{
        min-height: 100%;
        width:100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            display: block;
            line-height: 16px;
            text-align: center;
            font-size:16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding:2px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width:80%;
            margin:28px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,.2);
            }
            .text{
              padding:0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports{
            width:80%;
            margin:0 auto;
            .support-item{
              padding:0 12px;
              margin-bottom: 12px;
              font-size:0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  .bg-image('../components/header/decrease_1');
                }
                &.discount {
                  .bg-image('../components/header/discount_2');
                }
                &.guarantee {
                  .bg-image('../components/header/guarantee_2');
                }
                &.invoice {
                  .bg-image('../components/header/invoice_2');
                }
                &.special {
                  .bg-image('../components/header/special_2');
                }
              }
              .text{
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width:80%;
            margin:0 auto;
            .content{
              padding:0 12px;
              line-height:24px;
              font-size:12px;
              text-indent: 24px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
  .cleatfix{
    display: inline-block;
    &:after{
      display: block;
      content: '.';
      height:0;
      line-height: 0;
      clear: both;
      visibility: hidden;
    }
  }

</style>
