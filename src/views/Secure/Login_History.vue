<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid ">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Kirishlar', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 py-0 mt-2 flex justify-content-between w-full">
                    <div class="grid w-full px-0">
                        <div class="xl:col-8 lg:col-8 md:col-6 col-6 pl-3">
                            <span class="text-2xl font-semibold">Kirishlar tarixi
                                <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                            </span>
                        </div>
                        <div class="col-6 xl:col-4 lg:col-4 md:col-6 pr-0">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 pt-1 flex justify-content-between">
            <InputText type="text" v-model="params.search" placeholder="Qidiruv..." class="p-inputtext-sm"
                @keyup.enter="get_log_admin()" />
                <Dropdown v-model="params.status" :options="category_list" optionLabel="name" optionValue="id"
                                class="p-inputtext-sm " placeholder="Tanlang" @change="get_log_admin" />
        </div>

        <div class="col-12 py-0" v-show="!loader">
            <DataTable ref="dt" :value="table_list" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="single"
                v-show="table_list.length !== 0">
                <Column header="" style="min-width: 30px; width: 40px;">
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
                            F.I.O
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.fullname }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width: 100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Email
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.email }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width: 100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Sana
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">
                            {{ formatter.arrowDateFormat(slotProps.data.created_at) }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width:100px; width: 100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Browser
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.browser }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width: 100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Hudud
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.timezone }}</div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 200px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            IP Manzil
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.ipAddress }}</div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 140px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Mamlakat
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center font-medium text-sm">{{ slotProps.data.countryName }}</div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalPage > 10" :total_page="totalPage"
                        @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <NoDataComponent v-show="table_list.length == 0"></NoDataComponent>

        </div>
        <div class="col-12 py-0" v-show="loader">
            <med-loader></med-loader>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import NoDataComponent from '@/components/EmptyComponent/NoDataComponent.vue';
import MedLoader from '@/components/loaders/MedLoader.vue';
import TablePagination from '@/components/Pagination/TablePagination.vue';
import DeadlineService from '@/service/servises/DeadlineService';
import formatter from '@/util/formatter';

import SecureService from '../../service/servises/SecureService';

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
            table_list: [],
            selectitem: null,
            formatter,
            totalPage: 0,
            params: {
                page: 1,
                per_page: 10,
                search: null,
                status: null,

            },
            category_list:[
                {
                    name:"Kirishlar",
                    id:1
                },
                {
                    name:"Chiqishlar",
                    id:0
                },
            ]

        }
    },
    methods: {
        get_log_admin() {
            this.loader = true;
            SecureService.get_log_admin(this.params).then((res) => {
                console.log(res.data);
                this.totalPage = res.data.users.pagination.total;
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.users.data.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.table_list = res.data.users.data;
                this.loader = false;
            })
        },
        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_log_admin()
        },

    },
    created() {
        this.get_log_admin()
    }
}
</script>

<style lang="scss" scoped></style>