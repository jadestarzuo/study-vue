<template>
  <div class="admin">
    <img :src="`${publicPath}assets/logo.png`" alt="logo">
    <!-- 弹窗组件 -->
    <!-- <message :show.sync="show" class="success"> -->
    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{ slotProps.title }}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>
        新增课程成功!
      </template>
    </message>

    <!-- <message :show.sync="showWarn" class="warning"> -->
    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>
        请输入课程名称!
      </template>
    </message>

    <!-- 新增课程 -->
    <CourseAdd v-model="course" @add-course="addCourse"></CourseAdd>
    <!-- 课程列表 -->
    <CourseList :courses="courses"></CourseList>
  </div>
</template>

<script>
import Vue from "vue";
import CourseList from "@/components/CourseList.vue";
import CourseAdd from "@/components/CourseAdd.vue";
import Message from "@/components/Message.vue";
import { getCourses } from "@/api/course.js";
// 总线
Vue.prototype.$bus = new Vue();

export default {
  components: {
    Message,
    CourseAdd,
    CourseList,
  },
  data() {
    return {
      title: "开课吧购物车",
      course: "",
      courses: [],
      totalCount: 0,
      // show: false,
      // showWarn: false,
      price: 0,
      publicPath: process.env.BASE_URL
    };
  },
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
    // 批量更新商品价格
    this.batchUpdate();
  },
  methods: {
    addCourse() {
      if (this.course) {
        // 添加course到数组
        this.courses.push({ name: this.course });
        this.course = "";

        // 显示提示信息
        // this.show = true
        this.$refs.msgSuccess.toggle();
      } else {
        // 显示错误信息
        // this.showWarn = true
        this.$refs.msgWarning.toggle();
      }
    },
    batchUpdate() {
      this.courses.forEach((c) => {
        this.price = 800
        this.$set(c, "price", this.price);
        // Vue.set(c, 'price', this.price)
      });
    },
  },
};
</script>
<style lang="scss">
a {
  color: $color;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>