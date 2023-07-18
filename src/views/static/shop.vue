<template>
    <div class="shops">连锁店CURD</div>
    <ul>
        <li v-for="(item, index) in shops" :key="item.id">{{ index }}:店名:{{ item.name }},面积{{ item.area }}<button
                @click="del(item, $event)">删除</button></li>
    </ul>
    <span v-for="n in 10">{{ n }}</span>
    <form action="#" @submit.prevent="onSubmit">
        <button>提交</button>
    </form>
    <h3>数据双向绑定（表单）{{ msg }}</h3>
    <input type="text" v-model.lazy="msg">
    <!--//选框绑定到同一个数组或集合的值-->
    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>

    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <!--单选按钮-->
    <div>Picked: {{ picked }}</div>

    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>

    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <!--选择器 单选-->
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <!--选择器 多选  multiple-->
    <div>Selected: {{ selecteds }}</div>

    <select v-model="selecteds" multiple>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            shops: [
                { id: 1, name: 'shopA', 'area': 1000 },
                { id: 2, name: 'shopB', 'area': 800 },
                { id: 3, name: 'shopC', 'area': 880 },
            ],
            msg: 'abc',
            checkedNames: [],
            selected: '',
            selecteds: [],
            picked: '',
            question: '',
            answer: 'Questions usually contain a question mark. ;-)'

        }
    },
    methods: {
        del(id, event) {
            console.log(id, event);
        },
        onSubmit() {
            console.log('submit')
        }
    },
    watch: {
        question:{
            handler(newQuestion,oldQuest){
                console.log(newQuestion,oldQuest)
            },
            deep: true,
        }
    }

});
</script>

<style lang="scss" scoped></style>
