<template>
  <div class="carcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event){
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      //  this.dispatch('cart.add',event.target);
        this.$emit('add', event.target);
      },
      decreaseCart(){
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style scoped lang="less" type="text/less">
  .carcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      .inner {
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
      }
      &.move-enter-active {
        transition: all .3s linear;
      }
      &.move-leave-active {
        transition: all .3s linear;;
      }
      &.move-enter, &.move-leave-to {
        transform: translate3d(24px, 0, 0);
        opacity: 0;
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220)
    }
  }

  /*动画*/


</style>
