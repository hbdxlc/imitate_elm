<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-tiem" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice"
                                                                  class="old">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"></shopcart>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>


</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  const ERR_OK=0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      let url = window.location.hostname;
      this.$axios.get('http://'+url+':9999/goods')
        .then(res => {
          var goods = res.data;
          if (goods.errno == ERR_OK) {
            this.goods = goods.goods;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      selectFood(food){
        this.selectedFood = food;
        this.$refs.food.show();
      },
      selectMenu(index, event){
        if (!event._constructed) {
          click:true
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300)
      },
      addFood(target){
        this._drop(target)
      },
      _drop(target){
        //体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../assets/mixin";

  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-tiem {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          z-index: 10;
          .text {
            .border-none();
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(rgba(7, 17, 27, .1));
          color: rgb(240, 20, 20);
          line-height: 14px;

          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('../components/goods/decrease_3');
            }
            &.discount {
              .bg-image('../components/goods/discount_3');
            }
            &.guarantee {
              .bg-image('../components/goods/guarantee_3');
            }
            &.invoice {
              .bg-image('../components/goods/invoice_3');
            }
            &.special {
              .bg-image('../components/goods/special_3');
            }
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9ddel;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, .1));
        &:last-child {
          .border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            font-weight: bold;
          }
          .desc {
            margin-bottom: 8px;
          }
          .desc, .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
          .extra {
            line-height: 10px;
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              font-weight: 700;
              line-height: 48px;
            }
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
          z-index: 200000;
        }
      }
    }
  }
</style>
