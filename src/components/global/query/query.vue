<template>
  <div>
    <el-collapse accordion class="topqwer">
      <el-collapse-item>
        <template slot="title">
          <div class="title_btn">
            <!-- 插槽放按钮 -->
            <slot name="btn"></slot>
            <el-button
              class="ml-10px"
              size="mini"
              type="primary"
              v-if="!_hideHistory"
              @click.stop="history"
              >修改记录</el-button
            >
          </div>
          <div @click.stop class="app-v-center collapse-title">
            <div
              v-for="(item, index) in queryPlanList"
              :key="index"
              v-show="index == 0"
            >
              <div class="neirong opoi" v-if="item.fieldDataType == 'STRING'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="input-outlined">
                  <input
                    v-model="form[item.fieldName]"
                    @blur="changes"
                    required
                  />
                  <label>{{ item.fieldDesc }}</label>
                  <div class="mark3" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz ziwujd" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="items in options.STRING"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'BOOLEAN'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes"
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    :class="[
                      form[item.fieldName] !== undefined
                        ? 'input-valid'
                        : 'input-none'
                    ]"
                    :placeholder="'请选择' + item.fieldDesc"
                  >
                    <el-option
                      v-for="items in typeOptions"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark2" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz ziwujd" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="items in options.BOOLEAN"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'DICT'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes"
                    filterable
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    :class="[
                      form[item.fieldName] == '' ||
                      form[item.fieldName] == undefined
                        ? 'input-none'
                        : 'input-valid'
                    ]"
                    multiple
                    :placeholder="'请选择' + item.fieldDesc"
                  >
                    <el-option
                      v-for="items in item.arr"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark2" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz ziwujd" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="items in options.DICT"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'DATE'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <el-date-picker
                  @change="changes"
                  v-model="form[item.fieldName]"
                  type="date"
                  :placeholder="'请选择' + item.fieldDesc"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span class="input-label5" v-if="form[item.fieldName]">{{
                  "请选择" + item.fieldDesc
                }}</span>
                <div class="mark2" @click="anniusBtn(item)">
                  &nbsp;&nbsp;&nbsp;
                </div>
                <div class="select_change xlxz ziwujd" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="items in options.DATE"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'NUMBER'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="input-outlined">
                  <input
                    @blur="changes"
                    v-model="form[item.fieldName]"
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    required
                  />
                  <label>{{ item.fieldDesc }}</label>
                  <div
                    class="mark2"
                    style="top: 2px; right: 0px"
                    @click="anniusBtn(item)"
                  >
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz ziwujd" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="items in options.NUMBER"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label">请选择</span> -->
                </div>
              </div>
            </div>
            <el-button
              icon="el-icon-search"
              type="primary"
              size="mini"
              @click.stop="queryInterface"
            ></el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click.stop="reset()"
            ></el-button>
          </div>
        </template>
        <div>
          <div class="app-v-end app-wrap pl-3">
            <div
              v-for="(item, index) in queryPlanList"
              :key="index"
              v-show="index !== 0"
              class="isufu"
            >
              <div class="neirong opoi" v-if="item.fieldDataType == 'STRING'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="input-outlined">
                  <input
                    v-model="form[item.fieldName]"
                    @blur="changes"
                    required
                  />
                  <label>{{ item.fieldDesc }}</label>
                  <div class="mark1" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    @change="changes"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.STRING"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'BOOLEAN'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes"
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    :class="[
                      form[item.fieldName] !== undefined
                        ? 'input-valid'
                        : 'input-none'
                    ]"
                  >
                    <el-option
                      v-for="items in typeOptions"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label2">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark5" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    @change="changes"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.BOOLEAN"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div
                class="neirong opoi"
                v-if="item.fieldDataType == 'DICT' && item.parentclass == true"
              >
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes($event, item, index)"
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    multiple
                    filterable
                    collapse-tags
                    :placeholder="'请选择' + item.fieldDesc"
                    :class="[
                      form[item.fieldName] == '' ||
                      form[item.fieldName] == undefined
                        ? 'input-none'
                        : 'input-valid'
                    ]"
                  >
                    <el-option
                      v-for="items in item.arr.filter(
                        e => e.parentCode == null
                      )"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label2">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark4" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.DICT"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div
                class="neirong opoi"
                v-if="item.fieldDataType == 'DICT' && item.subclasses == true"
              >
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes"
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    multiple
                    collapse-tags
                    filterable
                    :placeholder="'请选择' + item.fieldDesc"
                    :class="[
                      form[item.fieldName] == '' ||
                      form[item.fieldName] == undefined
                        ? 'input-none'
                        : 'input-valid'
                    ]"
                  >
                    <el-option
                      v-for="items in item.aubArr"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label2">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark4" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.DICT"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div
                class="neirong opoi"
                v-if="
                  item.fieldDataType == 'DICT' &&
                    item.subclasses == undefined &&
                    item.parentclass == undefined
                "
              >
                <div class="select_change ml-0mr-13px">
                  <el-select
                    @change="changes($event, item)"
                    v-model="form[item.fieldName]"
                    style="width: 200px"
                    multiple
                    collapse-tags
                    filterable
                    :placeholder="'请选择' + item.fieldDesc"
                    :class="[
                      form[item.fieldName] == '' ||
                      form[item.fieldName] == undefined
                        ? 'input-none'
                        : 'input-valid'
                    ]"
                  >
                    <el-option
                      v-for="items in item.arr"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <span class="input-label2">{{
                    "请选择" + item.fieldDesc
                  }}</span>
                  <div class="mark4" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    @change="changes($event, item)"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.DICT"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'DATE'">
                <!-- <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <el-date-picker
                  @change="changes"
                  @focus="riqichange(item)"
                  @blur="changes"
                  v-model="form[item.fieldName]"
                  type="date"
                  :placeholder="'请选择' + item.fieldDesc"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span class="input-label4" v-if="form[item.fieldName]">{{
                  "请选择" + item.fieldDesc
                }}</span>
                <div class="markdate" @click="anniusBtn(item)">
                  &nbsp;&nbsp;&nbsp;
                </div>
                <el-button
                  @click.stop="zjBtn(item)"
                  v-if="item.psodk"
                  size="mini"
                  class="zjyh"
                  icon="el-icon-circle-plus-outline"
                  circle
                ></el-button>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    @change="changes"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.DATE"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
              <div class="neirong opoi" v-if="item.fieldDataType == 'NUMBER'">
                <!--
                <div @click="anniusBtn(item)">
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
                <div class="input-outlined">
                  <input
                    @blur="changes"
                    @focus="riqichange(item)"
                    v-model="form[item.fieldName]"
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    required
                  />
                  <label>{{ item.fieldDesc }}</label>
                  <div class="mark1" @click="anniusBtn(item)">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <el-button
                  @click.stop="zjBtn(item)"
                  v-if="item.psodk"
                  size="mini"
                  class="zjyh"
                  icon="el-icon-circle-plus-outline"
                  circle
                ></el-button>
                <div class="select_change xlxz" v-if="item.ios">
                  <el-select
                    v-model="item.compareType"
                    @change="changes"
                    :class="[item.compareType ? 'input-valid' : 'input-none']"
                    placeholder="请选择"
                    class="select_change"
                  >
                    <el-option
                      v-for="items in options.NUMBER"
                      :key="items.code"
                      :label="items.desc"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                  <!-- <span class="input-label3">请选择</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Vue from "vue";
import eventBus from "../../static/editor/eventBus";
import { dict, dictall, getCompareTypes } from "../api/systemConfigIndex/index";
export default {
  name: "query",
  props: {
    queryPlanList: Array,
    hideHistory: { String, default: false }
  },
  computed: {
    _hideHistory() {
      if (this.hideHistory === "" || this.hideHistory === true) {
        return true;
      } else if (this.hideHistory === false) {
        return false;
      }
    }
  },
  data() {
    return {
      typeOptions: [
        {
          label: "是",
          value: true
        },
        {
          label: "否",
          value: false
        }
      ],
      options: {},
      form: {
        queryConditions: []
      }
    };
  },
  watch: {
    queryPlanList(newVal, oldVal) {
      console.log(oldVal, "oldValoldValoldVal");
      if (oldVal.length > 0) {
        // for (let i = 0; i < newVal.length; i++) {
        //   for (let p = 0; p < oldVal.length; p++) {
        //     if (newVal[i].columnName == oldVal[p].columnName) {
        //     } else {
        //       this.getoptionList();
        //       this.getDicts();
        //       return
        //     }
        //   }
        // }
        if (
          newVal[0].columnName == oldVal[0].columnName &&
          newVal[1].columnName == oldVal[1].columnName
        ) {
        } else {
          this.getoptionList();
          this.getDicts();
        }
      } else {
        this.getoptionList();
        this.getDicts();
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.queryPlanList.length; i++) {
      this.$set(this.queryPlanList[i], "ios", false);
      this.$set(this.queryPlanList[i], "psodk", false);
    }
  },
  methods: {
    history() {
      Vue.prototype.$modifyRecord.openDialog();
    },
    senderrtt() {
      let form2 = {
        queryConditions: []
      };
      for (let i = 0; i < this.queryPlanList.length; i++) {
        if (
          (this.form[this.queryPlanList[i].fieldName] != undefined &&
            this.form[this.queryPlanList[i].fieldName] != "" &&
            this.form[this.queryPlanList[i].fieldName] != null) ||
          this.queryPlanList[i].compareType == "IS_NULL" ||
          this.queryPlanList[i].compareType == "NOT_NULL"
        ) {
          let obj = {};
          obj.columnName = this.queryPlanList[i].columnName;
          obj.compareType = this.queryPlanList[i].compareType;
          obj.fieldName = this.queryPlanList[i].fieldName;
          obj.fieldDataType = this.queryPlanList[i].fieldDataType;
          obj.fieldValue = this.form[this.queryPlanList[i].fieldName];
          form2.queryConditions.push(obj);
        }
        // }
      }
      eventBus.$emit("share", form2);
    },
    riqichange(item) {
      this.$set(item, "psodk", true);
    },
    zjBtn(item) {
      console.log(item, "itmmmmmmm");
      this.$set(item, "psodk", false);
      let obj = {}
      let ppp = JSON.parse(JSON.stringify(item));
      ppp.compareType = "LESS_EQUAL";
      this.$set(ppp, "psodk", false);
      this.$set(ppp, "fieldName", item.fieldName + item.fieldName);
      obj = JSON.parse(JSON.stringify(ppp));
      ppp = {};
      ppp = JSON.parse(JSON.stringify(obj));
      this.queryPlanList.push(ppp);
    },
    anniusBtn(item) {
      item.ios = !item.ios;
      this.queryPlanList = [].concat(this.queryPlanList);
      this.$forceUpdate();
    },
    getDicts() {
      let arr = [];
      for (let i = 0; i < this.queryPlanList.length; i++) {
        if (this.queryPlanList[i].fieldDataType == "DICT") {
          arr.push(this.queryPlanList[i].dictClasses);
        }
      }
      let str = arr.join(",");
      let ioi = {
        dictClasses: str,
        getNameAndValue:true,
      };
      dict(ioi).then(res => {
        for (let p = 0; p < this.queryPlanList.length; p++) {
          if (this.queryPlanList[p].fieldDataType == "DICT") {
            this.$set(
              this.queryPlanList[p],
              "arr",
              res.data[this.queryPlanList[p].dictClasses]
            );
          }
        }
      });
    },
    reset() {
      this.form = {
        queryConditions: []
      };
      this.$emit("queryBtn", this.form);
    },
    changes(code, item, index) {
      this.$forceUpdate();
      this.senderrtt();
      if (item) {
        let aubArr = [];
        code.forEach(element => {
          for (let i = 0; i < item.arr.length; i++) {
            if (item.arr[i].parentCode == element) {
              aubArr.push(item.arr[i]);
            }
          }
        });
        Vue.set(this.queryPlanList[index + 1], "aubArr", aubArr);
      }
      this.queryPlanList = [].concat(this.queryPlanList)
    },
    clickDict(a, b) {
      console.log(a, b);
    },
    getoptionList() {
      if (this.queryPlanList[0] && this.queryPlanList[0].bianliang) {
        let params = {
          dictClasses: "logicalSymbol"
        };
        dict(params).then(res => {
          this.$set(this.options, "NUMBER", res.data.logicalSymbol);
          this.$set(this.options, "BOOLEAN", res.data.logicalSymbol);
          this.$set(this.options, "STRING", res.data.logicalSymbol);
          this.$set(this.options, "DICT", res.data.logicalSymbol);
          this.$set(this.options, "DATE", res.data.logicalSymbol);
          for (let i = 0; i < this.queryPlanList.length; i++) {
            if (this.queryPlanList[i].fieldDataType == "NUMBER") {
              this.queryPlanList[i].compareType = this.options.NUMBER[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "DATE") {
              this.queryPlanList[i].compareType = this.options.DATE[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "STRING") {
              this.queryPlanList[i].compareType = this.options.STRING[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "DICT") {
              this.queryPlanList[i].compareType = this.options.DICT[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "BOOLEAN") {
              this.queryPlanList[i].compareType = this.options.BOOLEAN[0].code;
            }
          }
        });
        this.$forceUpdate();
      } else {
        let params = {};
        getCompareTypes(params).then(res => {
          this.options = res.data;
          for (let i = 0; i < this.queryPlanList.length; i++) {
            if (this.queryPlanList[i].fieldDataType == "NUMBER") {
              this.queryPlanList[i].compareType = this.options.NUMBER[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "DATE") {
              this.queryPlanList[i].compareType = this.options.DATE[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "STRING") {
              this.queryPlanList[i].compareType = this.options.STRING[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "DICT") {
              this.queryPlanList[i].compareType = this.options.DICT[0].code;
            }
            if (this.queryPlanList[i].fieldDataType == "BOOLEAN") {
              this.queryPlanList[i].compareType = this.options.BOOLEAN[0].code;
            }
          }
        });
      }
    },
    queryInterface() {
      let form2 = {
        queryConditions: []
      };
      for (let i = 0; i < this.queryPlanList.length; i++) {
        if (
          (this.form[this.queryPlanList[i].fieldName] != undefined &&
            this.form[this.queryPlanList[i].fieldName] != "" &&
            this.form[this.queryPlanList[i].fieldName] != null) ||
          this.queryPlanList[i].compareType == "IS_NULL" ||
          this.queryPlanList[i].compareType == "NOT_NULL"
        ) {
          let obj = {};
          obj.columnName = this.queryPlanList[i].columnName;
          obj.compareType = this.queryPlanList[i].compareType;
          obj.fieldName = this.queryPlanList[i].fieldName;
          obj.fieldDataType = this.queryPlanList[i].fieldDataType;
          obj.fieldValue = this.form[this.queryPlanList[i].fieldName];
          form2.queryConditions.push(obj);
        }
        // }
      }
      this.$emit("queryBtn", form2);
    }
  }
};
</script>
<style lang="scss" scoped>
.forms {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.mr-2 {
  margin-right: 8px;
}
.dialog-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-outlined {
  width: 200px;
  height: 46px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.input-outlined input {
  outline: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  width: 200px;
  height: 32px;
  margin-top: 4px;
  padding: 10px 15px;
  color: #000;
  font-size: 14px;
  background-color: white;
}
.input-outlined input:focus + label,
.input-outlined input:valid + label {
  font-size: 12px;
  top: 3px;
  color: #c0c4cc;
  z-index: 99;
}
.input-outlined label {
  position: absolute;
  top: 18px;
  left: 15px;
  color: #c0c4cc;
  font-size: 14px;
  height: 16px;
  pointer-events: none;
  transition: all 0.3s;
}
.collapse-title {
  width: 340px;
}
.collapse-title {
  .neirong {
    align-items: center;
  }
  .input-outlined {
    height: 32px;
  }
  .input-outlined input {
    margin-top: 0px;
  }
  .input-outlined label {
    top: -8px;
  }
  .input-outlined input:focus + label,
  .input-outlined input:valid + label {
    top: -25px;
  }
}
.neirong {
  margin-right: 28px;
  min-height: 46px;
  display: flex;
  align-items: flex-end;
  position: relative;
}
.neirong >>> .el-input__inner {
  height: 32px !important;
}
.neirong .el-date-editor >>> .el-input__inner {
  width: 200px !important;
}
.neirong >>> .el-date-editor--date {
  width: 200px !important;
}
.neirong >>> .el-date-editor--year {
  width: 200px !important;
}
.neirong >>> .el-input__icon {
  line-height: 32px !important;
}
.el-select >>> .el-select__tags {
  max-width: 200px !important;
}
.el-select >>> .el-tag {
  max-width: 62% !important;
}
.title_btn {
  flex: 2;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.title_btn >>> button {
  margin-bottom: 1px;
  margin-top: 1px;
}
.title_btn >>> .el-upload {
  display: flex !important;
}
.title_btn >>> .app-v-center {
  flex-wrap: wrap;
}
.el-scrollbar__view {
  padding-top: 0;
  padding-bottom: 0;
}
.select_change {
  margin-right: 10px;
  width: 187px;
}
.ziwujd {
  position: absolute !important;
  right: -137px;
}
/**设置选择框 提示内容样式 */
.select_change >>> .el-input__inner::-webkit-input-placeholder {
  color: transparent;
}
.select_change {
  position: relative;
}
.input-label {
  position: absolute;
  color: #c0c4cc;
  left: 16px;
  top: 0px;
  pointer-events: none;
  z-index: 99;
}
.input-valid + .input-label {
  color: #c0c4cc;
  font-size: 12px;
  z-index: 99;
  transform: translate(0px, -15px);
  transition-duration: 0.3s;
}
/**结束 */
.input-label2 {
  position: absolute;
  color: #c0c4cc;
  left: 16px;
  top: 4px;
  pointer-events: none;
  z-index: 99;
}
.input-valid + .input-label2 {
  color: #c0c4cc;
  font-size: 12px;
  z-index: 0;
  transform: translate(0px, -17px);
  transition-duration: 0.3s;
  background-color: white;
}
.input-label3 {
  position: absolute;
  color: #c0c4cc;
  left: 25px;
  top: 4px;
  pointer-events: none;
  z-index: 99;
}
.input-valid + .input-label3 {
  color: #c0c4cc;
  font-size: 12px;
  z-index: 99;
  transform: translate(0px, -15px);
  transition-duration: 0.3s;
  background-color: white;
}
.input-label4 {
  position: absolute;
  color: #c0c4cc;
  left: 30px;
  top: 4px;
  pointer-events: none;
  z-index: 99;
}
.input-valid + .input-label4 {
  color: #c0c4cc;
  font-size: 12px;
  z-index: 99;
  transform: translate(0px, -15px);
  transition-duration: 0.3s;
  background-color: white;
}
.input-label5 {
  position: absolute;
  color: #c0c4cc;
  left: 30px;
  top: -16px;
  pointer-events: none;
  z-index: 99;
}
.topqwer >>> .el-collapse {
  margin: 10px;
}
.app-h-32px {
  height: 32px !important;
}
.ml-0mr-13px {
  margin-left: 0px !important;
  margin-right: 13px !important;
}
.el-select >>> .el-tag {
  z-index: 999;
}
.xlxz {
  margin-left: 10px;
  width: 107px !important;
  z-index: 100;
}
.xlxz >>> .el-input__inner {
  z-index: 100;
  background: #f4f5f6;
}
.isufu {
  width: 236px;
}
.xlxz >>> .select_change {
  width: 107px;
}
.xlxz >>> .el-select {
  width: 177% !important;
}
.testContent {
  width: 280px;
  height: 240px;
  padding: 20px;
  background: #f0f5e3;
}
.testContent div {
  float: left;
  padding: 12px;
  color: #178b00;
  margin: 6px;
  border: 1px solid #169a03;
}
.mark1 {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 15px;
  right: 1px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.mark2 {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 9px;
  right: -12px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.mark3 {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 1px;
  right: 1px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.mark4 {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 1px;
  right: -12px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.mark5 {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 1px;
  right: -12px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.markdate {
  /* 当渐变色起点设置为固定像素值时，角标大小不受标签div尺寸影响 */
  background-image: linear-gradient(225deg, #0091da 8px, #fff 8px);
  position: absolute;
  top: 15px;
  right: 9px;
  cursor: pointer;
  height: 10px;
  opacity: 0;
}
.mark1:hover {
  opacity: 1;
}
.mark2:hover {
  opacity: 1;
}
.mark3:hover {
  opacity: 1;
}
.mark4:hover {
  opacity: 1;
}
.mark5:hover {
  opacity: 1;
}
.markdate:hover {
  opacity: 1;
}
.zjyh {
  border: none;
}
.topqwer >>> .el-collapse-item__header {
  min-height: 47px;
  height: unset;
}
</style>
