<template>
  <div class="search">
    <van-nav-bar fixed left-arrow title="商品列表" @click-left="$router.go(-1)"/>

    <van-search
        :value="key"
        background="#ffffff"
        readonly
        shape="round"
        show-action
        @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o"/>
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格</div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getGoodsList } from '@/api/goods'

export default {
  name: 'SearchIndex',
  data () {
    return {
      page: 1,
      goodsList: []
    }
  },
  computed: {
    key () {
      return this.$route.query.search
    },
    categoryId () {
      return this.$route.query.categoryId
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    const params = {
      categoryId: this.categoryId,
      goodsName: this.key,
      page: this.page
    }
    const res = await getGoodsList(params)
    this.goodsList = res.data.list.data
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;

    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
