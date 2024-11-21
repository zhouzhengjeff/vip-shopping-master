<template>
  <div class="search">
    <van-nav-bar left-arrow title="商品搜索" @click-left="$router.go(-1)"/>

    <van-search v-model="keyword" clearable placeholder="请输入搜索关键词" show-action>
      <template #action>
        <div @click="handleSearch(keyword)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearHistory()"/>
      </div>
      <div class="list">
        <div v-for="(item,index) in searchHistory" :key="index" class="list-item"
             @click="handleSearch(item)">{{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getSearchHistoryList, setSearchHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchHistory: getSearchHistoryList(),
      keyword: ''
    }
  },
  methods: {
    handleSearch (keyword) {
      const index = this.searchHistory.findIndex((item) => {
        return item === keyword
      })
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(keyword)
      setSearchHistoryList(this.searchHistory)
      this.$router.push(`/searchList?search=${keyword}`)
    },

    clearHistory () {
      this.searchHistory = []
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
