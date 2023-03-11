<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Tabel', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 y-0 py-0">
                    <span class="text-2xl font-semibold">Tabel
                        <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                    </span>
                </div>


            </div>

        </div>
        <div class="col-12 flex flex-wrap gap-2">
            <Calendar v-model="current_month" view="month" dateFormat="mm/yy" @change="changeCalendar" />
            <Button icon="pi pi-download" label="Yuklash T-12" class="p-button-success p-button-sm"></Button>
            <Button icon="pi pi-download" label="Yuklash T-13" class="p-button-success p-button-sm"></Button>
        </div>
       
        <div class="col-12">
            <div class="tabel-cointer-box">
                <TabelList :tabel_value="type_val"></TabelList>
            </div>

        </div>
        <div class="col-12 flex flex-wrap gap-2">
            <Dropdown id="tabel_types" style="min-width:200px; width:400px" v-model="type_val" :options="get_category_list" :loading="get_category_list.length<1" optionLabel="fullname" :filter="true"
                placeholder="Tanlang" @change="changeType">
                <template #value="slotProps">
                    <div class="country-item country-item-value" v-if="slotProps.value">
                        <div>{{ slotProps.value.fullname }}</div>
                    </div>
                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="country-item">
                        <div>{{ slotProps.option.fullname }}</div>
                    </div>
                </template>
            </Dropdown>
            <InputNumber v-model="work_time" :disabled="work_time==0" inputId="withoutgrouping" :useGrouping="false" placeholder="Ish vaqti" />
        </div>
    </div>
</template>

<script>
import TabelList from "./components/TabelList.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import TabelService from '@/service/servises/TabelService';
import { mapGetters } from 'vuex';
export default {
    components: {
        BreadCrumb,
        TabelList,
    },
    data() {
        return {
            totalPage: 0,
            select_user_list: [],
            current_month: new Date(),
            type_val: null,
            work_time:8,

        }
    },
    computed:{
        ...mapGetters(["get_category_list",])
    },
    methods: {
        get_tabels() {
            TabelService.get_Tabels({
                year: '2023',
                month: '3'
            }).then((res) => {
                console.log(res.data);
            })
        },
        changeType(){
           this.work_time =  this.type_val.time;
        },
        changeCalendar(){
            console.log(current_month);
        }

    },
    created() {
        this.get_tabels()
    },


}
</script>

<style lang="scss" scoped>
.tabel-cointer-box {
    width: 100% !important;
    position: relative;
    max-width: 100% !important;
    overflow: auto;
    min-height: calc(100vh - 280px);
    max-height: calc(100vh - 280px);
    padding: 20px 0px;
    background-color: transparent;

    &::-webkit-scrollbar {
        width:6px !important;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 4px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #3B82F6;
        border-radius: 4px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #3B82F6;
        cursor: pointer !important;
    }
}
</style>