<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid ">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Turniket', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 py-0 mt-2 flex justify-content-between w-full">
                    <div class="grid w-full px-0">
                        <div class="col-12 pl-3">
                            <span class="text-2xl font-semibold">Turniket
                                <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                            </span>
                        </div>
                        <div class="col-6 xl:col-3 lg:col-4 md:col-6 col-12 pr-0">
                            <InputText type="text" class="w-full p-inputtext-sm" placeholder="Qidiruv"
                                v-model="params.search" @keyup.enter="get_deadlines()" />
                        </div>
                        <div class="col-6 xl:col-3 lg:col-4 md:col-6 col-12 pr-0">
                            <Calendar class="w-full p-inputtext-sm" :manualInput="true" v-model="date.datetime1"
                                hourFormat="24" showTime dateFormat="dd/mm/yy" v-maska="'##/##/####'"
                                placeholder="Sana dan..." />
                        </div>
                        <div class="col-6 xl:col-3 lg:col-4 md:col-6 col-12 pr-0">
                            <Calendar class="w-full p-inputtext-sm" :manualInput="true" v-model="date.datetime2"
                                hourFormat="24" showTime dateFormat="dd/mm/yy" v-maska="'##/##/####'"
                                placeholder="Sana gacha..." />
                        </div>
                        <div class="col-6 xl:col-3 lg:col-4 md:col-6 col-12 pr-0 flex justify-content-between">
                            <Dropdown v-model="params.status" :options="status_list" optionLabel="name" optionValue="id"
                                class="p-inputtext-sm w-8" placeholder="Kategoriyani tanlang" @change="get_deadlines()" />
                            <Button @click="get_deadlines()" icon="pi pi-search" size="small" severity="primary" />
                            <Button @click="clear_filter()" icon="pi pi-filter-slash" size="small" severity="danger" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 py-0">
            <DataTable ref="dt" :value="deadline_list" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="single" :loading="loader">
                <Column header="" style="min-width: 30px; width: 36px">
                    <template #header>
                        <div class="text-800 text-sm font-medium">No</div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center text-sm font-normal">
                            {{ slotProps.data.number }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width:100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            F.I.SH
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base font-normal">
                            {{ slotProps.data.name }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 100px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            STATUS
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex justify-content-center w-full">
                            <Chip :label="slotProps.data.status == 'IN' ? 'KIRISH' : 'CHIQISH'"
                                :class="slotProps.data.status == 'IN' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'"
                                class="mr-2 mb-2 text-sm  font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 60px; width: 120px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            SANA
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div
                            class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center">
                            <Chip :label="slotProps.data.date"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 60px; width: 120px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            VATQ
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div
                            class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center">
                            <Chip :label="slotProps.data.time"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium " />
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalPage > 10" :total_page="totalPage"
                        @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <!-- <NoDataComponent v-show="deadline_list.length == 0"></NoDataComponent> -->

        </div>
        <div class="col-12 py-0" v-show="false">
            <med-loader></med-loader>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import NoDataComponent from '@/components/EmptyComponent/NoDataComponent.vue';
import MedLoader from '@/components/loaders/MedLoader.vue';
import TablePagination from '@/components/Pagination/TablePagination.vue';
import Turnicated from '@/service/servises/Turnicated';
import formatter from '@/util/formatter';

export default {
    components: {
        TablePagination,
        BreadCrumb,
        NoDataComponent,
        TablePagination,
        MedLoader,
    },
    data() {
        return {
            loader: false,
            deadline_list: [],
            status_list: [{
                name: 'KIRISH',
                id: "IN"
            },
            {
                name: 'CHIQISH',
                id: "OUT"
            }
            ],
            selectitem: null,

            formatter,
            totalPage: 0,
            date: {
                datetime1: null,
                datetime2: null,
            },
            params: {
                page: 1,
                per_page: 10,
                status: null,
                search: null,
                datetime1: null,
                datetime2: null,
            }
        }
    },
    methods: {
        get_deadlines() {
            this.loader = true;
            this.params.datetime1 = this.date.datetime1 ? this.formatter.outDateFormatter(this.date.datetime1) : null;
            this.params.datetime2 = this.date.datetime2 ? this.formatter.outDateFormatter(this.date.datetime2) : null;
            let params = this.params;
            Turnicated.get_Turnicateds(params).then((res) => {
                this.totalPage = res.data.cadries.pagination.total;
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.cadries.data.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.deadline_list = res.data.cadries.data;
                this.category_list = res.data.categories;
                this.loader = false;
            })

        },


        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_deadlines(this.params)
        },
        change_calendar() {
            this.params.datetime1 = this.date.datetime1 ? this.formatter.outDateFormatter(this.date.datetime1) : null;
            this.params.datetime2 = this.date.datetime2 ? this.formatter.outDateFormatter(this.date.datetime2) : null;
            this.get_deadlines()
        },
        clear_filter() {
            this.date.datetime1 = null;
            this.date.datetime2 = null;
            this.params.datetime1 = null;
            this.params.datetime2 = null;
            this.params.search = null;
            this.params.status = null;
            this.get_deadlines()
        },
    },
    mounted() {
        this.get_deadlines();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours()>9? date.getHours() : '0' + date.getHours(); 
        let minute = date.getMinutes()>9? date.getMinutes() : '0' + date.getMinutes();
        let second = date.getSeconds()>9? date.getSeconds() : '0' + date.getSeconds();

        
    }
}
</script>

<style lang="scss" scoped></style>