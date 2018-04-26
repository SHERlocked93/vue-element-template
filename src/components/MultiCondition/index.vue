/**
* 创建于 2018/3/23
* 作者: SHERlocked93
* 功能: 多项条件选择组件
* TODO: 1. select还未设置500条限制
* TODO: 2. filterBy更新还未根据被依赖项更新而更新，目前是其他所有项更新就更新
*/


<template>
  <div class='multi-condition'>
    <!-- 查询条件的tags -->
    <div class='condition-tags'>
      <div class='condi-title'>{{config.conditionTagsTitle}}></div>
      
      <el-tag v-for='tag in seriesDataCollection'
              v-if='tag.selectedLabel'
              :key='tag.selectedLabel+tag.placeholder'
              @close='closeTag(tag)'
              :closable='!tag.alreadyParam'
              :disable-transitions='true'
              class='condi-tag'>
        {{tag.placeholder}}： {{tag.selectedLabel}}
      </el-tag>
    </div>
    
    <!--查询条件 series 单行条件 -->
    <div v-for='(serie, $index) in config.conditionSeries'
         v-if='serie.seriesSingle && showExpandRow(serie.seriesData[0]) && showDependOn(serie.seriesData[0])'
         :key='$index'
         class='condition-series'>
      
      <!-- 行标题 -->
      <div class='condi-title'>
        {{serie.seriesName}}:
        <span class='is-necessary' v-show='serie.isNecessary'>*</span>
      </div>
      
      <!-- 选项 -->
      <div class='select-items'
           :class='{"expand": expandRow(serie.seriesData[0])}'>
        <!-- 展开的查询条件 type = expand -->
        <div v-if='serie.seriesData[0].type==="expand"'
             :class='serie.seriesData[0].paramName + "-expand-hook"'
             class='condi-expand'>
          <a v-for='(item, $index) in serie.seriesData[0].selectItems'
             :key='$index'
             @click='updateConfig(serie.seriesData[0].currPath+".vmodel", item[serie.seriesData[0].dispValue])'
             class='expand-item'>
            {{item[serie.seriesData[0].dispLabel]}}
          </a>
        </div>
        
        <!--查询条件 时间 type = dateTimePicker -->
        <el-date-picker v-if='serieData.type==="dateTimePicker"'
                        v-for='(serieData, $index) in serie.seriesData'
                        v-model="serieData.vmodel"
                        :key='$index'
                        :picker-options='serieData.pickerOptions'
                        @change='updateDateTimeConfig(serieData.currPath+".vmodel", $event, serieData.format)'
                        class='codition-datepicker'
                        prefix-icon='el-icon-date'
                        format='yyyy-MM-dd HH'
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
        </el-date-picker>
      </div>
      
      <!-- 展开按钮 -->
      <div class='codi-expand-open'
           :class='serie.seriesData[0].paramName + "-entity-hook"'
           @click='toggleExpandRow(serie.seriesData[0])'>
        <!--v-show='showExpandBtn(serie.seriesData[0].paramName)'-->
        <i :class='expandRow(serie.seriesData[0]) ? "el-icon-arrow-up": "el-icon-arrow-down"'></i> 展开
      </div>
    </div>
    
    <!--查询条件 series 非单行条件 -->
    <div v-for='serie in config.conditionSeries'
         v-if='!serie.seriesSingle'
         class='condition-series'>
      <!-- 行标题 -->
      <div class='condi-title'>{{serie.seriesName}}:</div>
      
      <!-- 选项 -->
      <div class='select-items'>
        <!-- 普通选择框 type = select-->
        <el-select v-for='(serieData, $index) in serie.seriesData'
                   v-if='serieData.type==="select" && showDependOn(serieData)'
                   v-model="serieData.vmodel"
                   @change='updateConfig(serieData.currPath+".vmodel",$event)'
                   :key='$index+serieData.dispValue'
                   :placeholder="serieData.placeholder"
                   :value='serieData.selectedLabel'
                   class='condi-select'
                   filterable clearable>
          <el-option v-for="item in serieData.selectItems" v-if='serieData.selectItems'
                     :value="item[serieData.dispValue]"
                     :label="item[serieData.dispLabel]"
                     :key="item[serieData.dispValue]+item[serieData.dispLabel]"></el-option>
        </el-select>
      </div>
    </div>
  
  </div>
</template>

<script type='text/javascript'>
  import _ from 'lodash'
  import { formatTime1 } from 'utils'
  
  export default {
    name: 'MultiCondition',
    props: {
      config: { type: Object }           // 配置项
      /*  配置示例
      configDemo: [
        // series 1
        {
          seriesName: '机器人详细信息',
          seriesData: [
            {
              type: 'select',
              selectItems: null,
              selectItemsApi: '__API__',
              paramName: 'companyId',
              placeholder: '企业名称',
              dispValue: 'id',
              dispLabel: 'name',
              vmodel: null,
              currPath: 'conditionSeries[0].seriesData[0]',
              selectedLabel: null
            },
            {
              type: 'select',
              selectItems: null,
              selectItemsApi: '__API__',
              paramName: 'functionId',
              placeholder: '机器人功能',
              dispValue: 'paramValue',
              dispLabel: 'paramDesc',
              vmodel: null,
              currPath: 'conditionSeries[0].seriesData[1]',
              selectedLabel: null
            },
            {
              type: 'select',
              selectItems: null,
              selectItemsApi: '__API__',
              paramName: 'modelId',
              placeholder: '机器人型号',
              dispValue: 'paramValue',
              dispLabel: 'paramDesc',
              vmodel: null,
              currPath: 'conditionSeries[0].seriesData[2]',
              selectedLabel: null
            },
            {
              type: 'select',
              selectItems: null,
              selectItemsApi: '__API__',
              paramName: 'code',
              placeholder: '机器人编号',
              dispValue: 'id',
              dispLabel: 'code',
              vmodel: null,
              currPath: 'conditionSeries[0].seriesData[3]',
              showDependOn: 'conditionSeries[0].seriesData[1].vmodel||conditionSeries[0].seriesData[2].vmodel',
              filterBy: 'conditionSeries[0].seriesData[0].vmodel,conditionSeries[0].seriesData[1].vmodel,conditionSeries[0].seriesData[2].vmodel',
              selectedLabel: null
            }
          ]
        },
        // series 3 dateTimePicker 传入格式
        {
          seriesName: '日志查询时间',
          seriesData: [{
            type: 'dateTimePicker',
            vmodel: null,
            currPath: 'conditionSeries[2].seriesData[0]',
            placeholder: '起止时间',
            paramName1: 'beginTime',
            paramName2: 'endTime',
            selectedLabel: null
          }]
        },
        // series 4 expand
        {
          seriesName: '展开状态',
          seriesSingle: true,               // 一行只有一个条件
          seriesData: [{
            type: 'expand',
            selectItems: '__[]__',
            paramName: 'expandStatus',
            placeholder: '展开状态',
            dispValue: 'value',
            dispLabel: 'label',
            vmodel: null,
            currPath: 'conditionSeries[3].seriesData[0]',
            selectedLabel: null
          }]
        }]
      */
    },
    data() {
      return {
        seriesDataCollection: []
      }
    },
    watch: {
      /**
       * 监听是否有数据更改
       */
      'config.updateTimestamp'() {
        this.$nextTick(() => {
          this.initSelectItems()
          this.getSelectLabel()
          this.$emit('upload-params', this.generateParams(this.config))
          this.$emit('upload-data-collection', this.seriesDataCollection)
        })
      }
    },
    methods: {
      /**
       * 从selectItemsApi取数据到selectItems
       */
      initSelectItems() {
        this.config.conditionSeries
          .forEach(T1 => T1.seriesData
            .forEach(T2 => {
              this.showExpandBtn(T2.paramName)
              if (T2.type === 'dateTimePicker' || T2.alreadyParam) return
              if (T2.filterBy) {                            // 是依赖其他项更改而更改的项
                this.showDependOn(T2) && T2.selectItemsApi
                  .apply(null,
                    T2.filterBy.split(',')
                      .map(path => _.get(this.config, path))
                  )
                  .then(({ data: { dataList } }) => _.set(this.config, `${T2.currPath}.selectItems`, dataList))
              } else {                                     // 不是依赖其他项更改而更改的项
                if (_.isArray(T2.selectItems)) return
                if (T2.selectItemsApi) {
                  T2.selectItemsApi()
                    .then(({ data: { dataList } }) => _.set(this.config, `${T2.currPath}.selectItems`, dataList))
                }
              }
            })
          )
      },
      
      /**
       * 获取选项的label，用来显示tag
       */
      getSelectLabel() {
        this.seriesDataCollection = []
        _.cloneDeep(this.config).conditionSeries
          .forEach(T1 => T1.seriesData
            .forEach(T2 => {
              if (!T2.alreadyParam) {             // 是否已有默认值
                if (T2.vmodel !== null && T2.type === 'dateTimePicker') {          // 时间选择器
                  const { vmodel } = T2
                  this.$set(T2, 'selectedLabel', vmodel.length && `${vmodel[0].toLocaleString()} - ${vmodel[1].toLocaleString()}`)
                }
                if (T2.vmodel !== null && T2.type === 'select') {                  // 下拉选择
                  this.$set(T2, 'selectedLabel', T2.selectItems && T2.selectItems.find(T3 =>
                    T3[T2.dispValue] === T2.vmodel)[T2.dispLabel] || null)
                }
                if (T2.vmodel !== null && T2.type === 'expand') {                  // 展开选择
                  this.$set(T2, 'selectedLabel', T2.selectItems && T2.selectItems.find(T3 =>
                    T3[T2.dispValue] === T2.vmodel)[T2.dispLabel] || null)
                }
              }
              if (T1.isNecessary) this.$set(T2, 'isNecessary', true)
              T2.type === 'expand' && this.$set(T2, 'expandStatus', false)  // 展开选择的情况下的展开状态
              this.seriesDataCollection.push(T2)
            })
          )
        this.necessaryReadyc()
      },
      
      /**
       * 计算是否应该显示出来，目前只考虑了 只含&& 与 只含|| 的情况
       * @param serieData
       */
      showDependOn(serieData) {
        let show = true
        if (serieData.showDependOn && serieData.showDependOn.includes('&&')) {              // 只含&&
          serieData.showDependOn.split('&&').forEach(T => {
            if (!_.get(this.config, T)) show = false
          })
        }
        if (serieData.showDependOn && serieData.showDependOn.includes('||')) {              // 只含||
          show = false
          serieData.showDependOn.split('||').forEach(T => {
            if (_.get(this.config, T)) show = true
          })
        }
        return show
      },
      
      /**
       * 计算是否显示该expand行
       */
      showExpandRow(serieData) {
        const serieInfo = this.seriesDataCollection.find(T => T.paramName === serieData.paramName)
        return serieInfo && serieInfo.vmodel === null
      },
      
      /**
       * 计算是否显示展开按钮，按钮默认不显示
       * @param cls
       */
      showExpandBtn(cls) {
        setTimeout(() => {
          const btn = document.getElementsByClassName(cls + '-expand-hook')[0]
          const entity = document.getElementsByClassName(cls + '-entity-hook')[0]
          if (btn && entity) {
            if (btn.clientHeight > 50) entity.style.display = 'block'
            else entity.style.display = 'none'
          }
        }, 100)
      },
      
      /**
       * 计算展开状态
       */
      expandRow(serieData) {
        const serieInfo = this.seriesDataCollection.find(T => T.paramName === serieData.paramName)
        return serieInfo && serieInfo.expandStatus
      },
      
      /**
       * 切换展开状态
       */
      toggleExpandRow(serieData) {
        const serieInfo = this.seriesDataCollection.find(T => T.paramName === serieData.paramName)
        serieInfo.expandStatus = !serieInfo.expandStatus
      },
      
      /**
       * 关闭tag
       * @param tag
       */
      closeTag(tag) {
        this.updateConfig(`${tag.currPath}.vmodel`, null)
      },
      
      /**
       * 更新配置数据
       * @param path 路径
       * @param value 值
       */
      updateConfig(path, value) {
        _.set(this.config, path, value)
        this.$set(this.config, 'updateTimestamp', +new Date())
      },
      
      /**
       * 更新 dateTimePicker 配置数据
       * @param path
       * @param value
       * @param format {function} 格式化
       */
      updateDateTimeConfig(path, value, format) {
        if (!value) return
        const formatTime = value.map(T => format(T))
        !formatTime.every(T => T.getTime() === formatTime[0].getTime()) &&
        this.updateConfig(path, formatTime)
      },
      
      /**
       * 暴露: 选择结果
       * @param config
       */
      generateParams(config) {
        const result = {}
        this.seriesDataCollection
          .forEach(T => {
            if (T.vmodel === null) return
            if (T.type === 'dateTimePicker') {
              result[T.paramName1] = formatTime1(T.vmodel[0], 'yyyy-MM-dd hh:mm:ss')
              result[T.paramName2] = formatTime1(T.vmodel[1], 'yyyy-MM-dd hh:mm:ss')
            }
            if (T.paramName) {
              result[T.paramName] = T.vmodel
            }
          })
        return result
      },
      
      /**
       * 是否所有必选条件都已经选择
       */
      necessaryReadyc() {
        let ready = true
        this.seriesDataCollection.forEach(T => T.isNecessary && (ready = ready && !!T.vmodel))
        this.$emit('necessary-change', ready)
      }
    },
    mounted() {
      this.initSelectItems()
      this.getSelectLabel()
      this.$emit('upload-params', this.generateParams(this.config))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $border-color: #edf1f7;
  $red: #e24942;
  $blue: #07f;
  
  .multi-condition {
    
    .condition-tags, .condition-series {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
    }
    
    /* tags */
    .condition-tags {
      border: 1px solid $blue;
      margin-bottom: 9px;
      padding-left: 20px;
      
      .condi-tag {
        height: 24px;
        line-height: 22px;
        margin-top: 2px;
        margin-right: 20px;
        border: 1px solid #edf1f7;
        border-radius: 0;
        color: #7f7f7f;
        background-color: transparent;
        
        &:hover {
          border: 1px solid $red;
          color: $blue;
          
          /deep/ .el-tag__close {
            color: $red;
          }
        }
        
        /deep/ .el-tag__close {
          color: #edf1f7;
          font-size: 22px;
          margin-left: -4px;
          
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
    
    /* 查询条件 - 系列 */
    .condition-series {
      align-items: flex-start;
      padding-left: 20px;
      border-top: 1px solid $border-color;
      border-left: 1px solid $border-color;
      border-right: 1px solid $border-color;
      
      &:last-of-type {
        border-bottom: 1px solid $border-color;;
      }
      
      /* 时间选择框 */
      .codition-datepicker {
        margin-top: 7px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
      }
      
      /* 选项 */
      .select-items {
        height: 50px;
        overflow: hidden;
        flex-grow: 1;
        transition: all .4s ease-in-out;
        
        /* 是否是展开状态 */
        &.expand {
          height: auto;
          max-height: 175px;
          overflow-y: scroll;
        }
        
        /* 普通选择框 */
        .condi-select {
          margin: 7px 20px 7px 0;
        }
        
        /* 展开选项框 */
        .condi-expand {
          margin-right: 20px;
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          align-items: flex-start;
          flex-grow: 1;
          
          .expand-item {
            line-height: 50px;
            margin-right: 45px;
            color: #4a4a4a;
          }
          
        }
      }
      
      /* 展开按钮 */
      .codi-expand-open {
        width: 70px;
        flex-basis: 70px;
        flex-shrink: 0;
        text-align: center;
        margin-top: 17px;
        color: #4a4a4a;
        cursor: pointer;
        display: none;
      }
      
      &.is-necessary {
        border-color: $red;
      }
    }
    
    /* 左边标题 */
    .condi-title {
      width: 120px;
      line-height: 50px;
      flex-basis: 120px;
      flex-shrink: 0;
      position: relative;
      color: #7f7f7f;
      
      > .is-necessary {
        position: absolute;
        left: -10px;
        top: 0;
        color: $red;
      }
    }
    
  }
</style>
