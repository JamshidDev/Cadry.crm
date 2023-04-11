<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid ">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Tavsiya etilganlar', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 py-0 mt-2 flex justify-content-between align-content-center w-full">
                    <div class="grid w-full px-0">
                        <div class="xl:col-10 lg:col-9 md:col-8 col-8 pl-3">
                            <span class="text-2xl font-semibold">Tavsiya etilgan nomzodlar
                                <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                            </span>
                        </div>
                        <div class="col-4 xl:col-2 lg:col-3 md:col-4 pr-0">
                            <!-- <Button icon="pi pi-qrcode" label="" v-tooltip.bottom="`silka olish`"
                                class="p-button-seecondary text-sm p-button-sm"></Button> -->
                            <SplitButton label="Silkani nusxalash" :model="btn_item_list"  icon="pi pi-copy"
                                @click="link_copy" severity="danger"
                                class="mb-2 w-full p-button-outlined font-normal p-button-secondary p-button-sm">
                            </SplitButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 py-0" v-show="!loader">
            <DataTable ref="dt" :value="table_items" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="single"
                v-show="table_items.length !== 0">
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
                <Column style="min-width: 50px; width: 50px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">Rasm</div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex justify-content-center">
                            <Image :src="slotProps.data.photo" :alt="slotProps.data.fullname" width="30" height="30"
                                preview />
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
                            {{ slotProps.data.fullname }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 120px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            SANA
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div
                            class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center">
                            <Chip :label="formatter.arrowDateFormat(slotProps.data.created_at)"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 110px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Amallar
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex justify-content-between">
                            <delete-button :deleteItem="slotProps.data.id"
                                @deleteAcceptEvent="ban_candidate($event)"></delete-button>
                            <view-button-v v-tooltip.left="`Ma'lumotlarni ko'rish`" :icon="'pi-eye'" @click="
                                view_details(slotProps.data.id)
                            "></view-button-v>
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalPage > 10" :total_page="totalPage"
                        @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <NoDataComponent v-show="table_items.length == 0"></NoDataComponent>

        </div>
        <div class="col-12 py-0" v-show="loader">
            <med-loader></med-loader>
        </div>
        <div class="col-12">
            <GenerateLink ref="generate_link_ref"></GenerateLink>
            <Toast position="bottom-right" />
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import ViewButtonV from '@/components/buttons/ViewButtonV.vue';
import NoDataComponent from '@/components/EmptyComponent/NoDataComponent.vue';
import MedLoader from '@/components/loaders/MedLoader.vue';
import TablePagination from '@/components/Pagination/TablePagination.vue';
import SlugService from '@/service/servises/SlugService';
import formatter from '@/util/formatter';

import GenerateLink from './components/GenerateLink.vue';

export default {
    components: {
        TablePagination,
        BreadCrumb,
        NoDataComponent,
        TablePagination,
        MedLoader,
        ViewButtonV,
        DeleteButton,
        GenerateLink,
    },
    data() {
        return {
            loader: false,
            deadline_list: [],
            category_list: [],
            category_val: {
                id: 2,
                name: "Passport muddatlari yaqinlashayotganlar "
            },
            selectitem: null,

            formatter,
            totalPage: 0,
            params: {
                page: 1,
                per_page: 10,
                category_id: 2,
            },

            btn_item_list: [
                {
                    label: 'Yangi silka yaratish',
                    icon: 'pi pi-sync',
                    command: () => {
                        this.generate_link()
                    }
                },
            ],
            link: '',
            table_items:[],
        }
    },
    methods: {
        get_slug_cadries(loading){
            this.loader = loading;
            SlugService.get_slug_cadries().then((res)=>{
                this.totalPage = res.data.slug_cadries.pagination.total;
                this.link = '' + window.location.origin + '/reception/' + res.data.slug;
                localStorage.setItem('reception-link', this.link)
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.slug_cadries.data.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.table_items = res.data.slug_cadries.data;
                this.loader = false;
            })
        },

        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_deadlines(this.params)
        },
        change_category(event) {
            this.params.category_id = this.category_val.id;
            this.params.page = 1;
            this.params.per_page = 10;
            this.get_deadlines(this.params)
        },

        ban_candidate(id) {
            SlugService.delete_slug_cadries({slug_cadry_id:id}).then(()=>{
                this.get_slug_cadries(false)
            })
        },
        view_details(id) {
            this.$router.push(`/admin/recomended/cadry/${id}`)
        },
        generate_link() {
            this.$refs.generate_link_ref.control_modal()
        },
        link_copy() {
            let store_link = localStorage.getItem('reception-link');
            if (store_link) {
                this.link = store_link;
                navigator.clipboard.writeText(this.link);
                this.$toast.add({
                    severity: "success",
                    summary: "Muvofaqqiyatli bajarildi",
                    detail: "Nusxalandi",
                    life: 2000,
                });
            } else {
                SlugService.generate_reception_link().then((res) => {
                    {
                        this.link = '' + window.location.origin + '/reception/' + res.data.url;
                        localStorage.setItem('reception-link', this.link)
                       
                    }
                })
            }

        }
    },
    created() {
        this.get_slug_cadries(true)
    }
}
</script>

<style lang="scss" scoped></style>