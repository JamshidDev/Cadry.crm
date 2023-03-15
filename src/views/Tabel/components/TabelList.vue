<template>
    <div class="tabel-container">
        <table class="tabel-box" v-if="Tabel_days.length">
            <tr class="tabel-row tabel-row-header">
                <td class="tabel-col-header"><span>
                        F.I.SH
                    </span></td>
                <td class="tabel-col" v-for="(month_day, index) in get_tabel_days" :key="index"
                    :class="['Ya', 'Sh'].includes(month_day.weekday) && 'weekend_days'">

                    <div class="content-month">
                        <span>{{ month_day.day }}</span>
                        <span>{{ month_day.weekday }}</span>
                    </div>
                </td>
                <td class="tabel-col">
                    <div class="summ">
                        <span>Kun</span>
                        <span>soat</span>
                    </div>
                </td>
            </tr>
            <tr class="tabel-row" v-for="cadry in get_cadry_list" :key="cadry">
                <td class="tabel-col-header"> {{ cadry.fullname }}</td>
                <td class="tabel-col tabel-col-content content-element" v-for="(item, index) in cadry.days" :key="index"  v-tooltip.bottom="`${item.day} ${item.weekday}`"
                    :class="`content-bg-${item.type_work || '0'}`" @click="select_day(cadry.id, item.day)">
                    <div class="work_panel" v-if="item.type_work">
                        <span>{{ short_names.filter(a => a.id == item.type_work)[0].name }}</span>
                        <span v-if="item.work_time">{{ item.work_time }}</span>
                    </div>
                </td>
                <td class="tabel-col-sum">
                    <div class="total_summ">
                        <span>{{ total_sum(cadry.id).total_day }}</span>
                        <span>{{ total_sum(cadry.id).total_time }}</span>
                    </div>
                </td>

            </tr>
        </table>
        <ProgressBarLoader v-if="!Tabel_days.length" :min_height="'400px'"></ProgressBarLoader>
    </div>
</template>

<script>
import TabelService from '@/service/servises/TabelService';
import ProgressBarLoader from "@/components/loaders/ProgressBarLoader.vue";
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        ProgressBarLoader
    },
    data() {
        return {
            Tabel_days: [],
            Tabel_cadry: [],
            category_List:[],
            short_names: [
                {
                    id: 1,
                    name: 'I'
                },
                {
                    id: 2,
                    name: 'BC'
                },
                {
                    id: 3,
                    name: 'B'
                },
                {
                    id: 4,
                    name: 'K'
                },
            ]
        }
    },
    computed:{
        ...mapGetters(["get_tabel_days", "get_cadry_list", "get_category_val","get_category_list"])
    },
    watch:{
        get_category_val: {
      handler(newValue, oldValue) {
       console.log(newValue);
      },
      deep: true
    }
    },
    methods: {
        ...mapActions(["set_tabel_days", "set_category_list", "set_cadry_list"]),

        get_tabels() {
            TabelService.get_Tabels({
                year: '2023',
                month: '3'
            }).then((res) => {
                this.Tabel = res.data;
                this.Tabel_days = res.data.days;
                this.set_tabel_days(res.data.days)
                this.set_category_list(res.data.categories)
                this.set_cadry_list(res.data.cadries)
                this.Tabel_cadry = res.data.cadries;
            })
        },
        async select_day(cadry_id, day) {
            let index = this.Tabel_cadry.findIndex(cadry => cadry.id == cadry_id);
            let day_index = this.Tabel_cadry[index].days.findIndex(item => item.day == day);

            if (this.Tabel_cadry[index].days[day_index].type_work !== this.tabel_value.id && this.Tabel_cadry[index].days[day_index].work_time !== this.tabel_value.time) {
                this.Tabel_cadry[index].days[day_index].type_work = this.tabel_value.id;
                this.Tabel_cadry[index].days[day_index].work_time = this.tabel_value.time;
            } else {
                this.Tabel_cadry[index].days[day_index].type_work = null;
                this.Tabel_cadry[index].days[day_index].work_time = null;
                console.log(this.Tabel_cadry[index].days[day_index]);
            }

            return true

        },
        total_sum(cadry_id) {
            let days = this.Tabel_cadry.filter(cadry => cadry.id == cadry_id)[0].days;
            let total_day = 0;
            let total_time = 0;
            days.forEach((item) => {
                if ([1, 4].includes(item.type_work)) {
                    total_day++;
                    total_time = total_time + item.work_time
                }
            })

            return {
                total_day,
                total_time,
            }
            console.log(days);
        }

    },

    mounted() {
        this.get_tabels()
    }
}
</script>


<style lang="scss" scoped>

</style>


