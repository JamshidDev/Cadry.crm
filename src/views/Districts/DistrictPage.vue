<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid">
                <div class="col-12 pb-0">
                    <bread-crumb
                        :breadCump="[{ name: 'Viloyatlar', path: '/admin/country-zone' }, { name: 'Shtatlar', path: '' },]"></bread-crumb>
                </div>
                <div class="col-12 y-0 pt-0 pb-1">
                    <span class=" text-sm  xl:text-lg lg:text-base font-semibold"> <span class="text-blue-600">{{
                        department_name }}</span>
                        dagi tumanlar ro'yhati
                    </span>
                </div>
            </div>
        </div>

        <div class="col-12 pt-1" v-show="!loader">
            <DataTable ref="dt" :value="DepStuffList" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-show="totalItem" v-model:selection="selectitem" selectionMode="single">
                <Column style="min-width:30px; width:36px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
                            No
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class=" text-sm
                         w-full
                          text-center
                          font-normal">
                            {{ slotProps.data.number }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 16rem">
                    <template #header>
                        <div class="text-800 font-semibold">Tuman nomi</div>
                    </template>
                    <template #body="slotProps">
                        <div class="
                        text-sm
                          sm:text-sm
                          md:text-sm
                          lg:text-base
                          xl:text-base
                          font-normal
                        ">
                            {{ slotProps.data.name }}
                        </div>
                    </template>
                </Column>

                <Column :exportable="false" style="min-width: 120px; width: 120px">
                    <template #header>
                        <div class="text-800 font-semibold">Amallar</div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <view-button-v v-tooltip.bottom="`Xodimlarni ko'rish`" :icon="'pi-users'"
                                @click="goCadry(slotProps.data.id, slotProps.data.staff_fullname)"></view-button-v>
                            <edit-button :editItem="slotProps.data" @editEvent="editStuff($event)"></edit-button>
                            <delete-button :deleteItem="slotProps.data.id"
                                @deleteAcceptEvent="deleteItemDepStuff($event)"></delete-button>
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalItem > 10" :total_page="totalItem"
                        @pagination="changePagination($event)"></table-pagination> </template>
            </DataTable>
            <no-data-component v-show="totalItem < 1"></no-data-component>
        </div>

        <div class="col-12 pt-1" v-show="loader">
            <department-stuff-loader></department-stuff-loader>
        </div>
        <div class="col-12">
            <Toast position="bottom-right" />
            <Dialog v-model:visible="stuffDialog" :breakpoints="{
                '1960px': '30vw',
                '1600px': '40vw',
                '1200px': '70vw',
                '960px': '80vw',
                '640px': '90vw',
            }" :style="{ width: '50vw' }" :modal="true">
                <template #header>
                    <h6 class="uppercase text-lg text-blue-500 font-medium">
                        Tumanni tahrirlash
                    </h6>
                </template>
                <div class="grid pt-2">



                    <div class="col-12">
                        <h6 class="mb-2 pl-2 text-500">Tuman nomi</h6>
                        <InputText type="text" class="w-full font-semibold" placeholder="Kiriting" id="adressStreet"
                            v-model="stuf_plan" :class="{ 'p-invalid': errorPlan && stuffsubmited }" />
                    </div>
                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-secondary p-button-sm" @click="addStuffItem()" />
                        </div>
                    </div>
                </template>
            </Dialog>
        </div>
    </div>
</template>
<script>
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import EditButton from "@/components/buttons/EditButton.vue";
import ViewButtonV from "@/components/buttons/ViewButtonV.vue";
import DepartmentStuffService from "@/service/servises/DepartmentStuffService.js";
import DepartmentStuffLoader from "@/components/loaders/DepartmentStuffLoader.vue";
import DepartmentService from "@/service/servises/DepartmentService.js";
import CountryZone from "@/service/servises/Country-zone.js";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import NoDataComponent from "@/components/EmptyComponent/NoDataComponent.vue";
import TablePagination from "@/components/Pagination/TablePagination.vue";
export default {
    components: {
        DeleteButton,
        EditButton,
        ViewButtonV,
        TablePagination,
        DepartmentStuffLoader,
        BreadCrumb,
        NoDataComponent,
    },
    data() {
        return {
            selectitem: null,
            totalItem: 0,
            loader: false,
            DepStuffList: [],
            searchPartName: null,
            department_name: "",
            params: {
                search: null,
                page: localStorage.getItem("page_21") ? Number(localStorage.getItem("page_21")) : 1,
                per_page: localStorage.getItem("per_page_21") ? Number(localStorage.getItem("per_page_21")) : 10,
            },

            stuffDialog: false,
            dep_stuff_id: null,
            stuf_plan: null,

            stuffsubmited: false,



        };
    },
    computed: {

        errorPlan() {
            if (!this.stuf_plan) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        get_District(id, params, loader) {
            this.controlLoader(loader);
            CountryZone.get_District({ region_id: id, params })
                .then((res) => {
                    this.totalItem = res.data.cities.pagination.total
                    if (res.data.cities.pagination.total < 10) {
                        localStorage.setItem("page_21", '1');
                        localStorage.setItem("per_page_21", '10');
                        this.params.page =1;
                        this.params.per_page =10;
                    }
                    let number = (this.params.page - 1) * this.params.per_page;
                    res.data.cities.data.forEach((item) => {
                        number++;
                        item.number = number;
                    });
                    this.DepStuffList = res.data.cities.data;
                    this.controlLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        },




        editStuff(event) {
            this.dep_stuff_id = event.id;
            this.stuf_plan = event.name;
            this.controlstuffDialog(true)

        },
        addStuffItem() {
            this.stuffsubmited = true
            if (this.stuf_plan) {
                let id = this.dep_stuff_id;
                let data = {
                    name: this.stuf_plan,
                    region_id: this.$route.params.id,
                }
                CountryZone.update_District({ city_id: id, data }).then((res) => {
                    this.get_District(this.$route.params.id, this.params, false);
                    this.$toast.add({
                        severity: "success",
                        summary: "Muvofaqqiyatli bajarildi",
                        detail: "Tahrirlandi",
                        life: 2000,
                    });
                })
                this.controlstuffDialog(false)
            }

        },
        deleteItemDepStuff(id) {
            CountryZone.delete_District({ city_id: id }).then((res) => {

                this.get_District(this.$route.params.id, this.params, false);
                this.$toast.add({
                    severity: "success",
                    summary: "Muvofaqqiyatli bajarildi",
                    detail: "O'chirildi",
                    life: 2000,
                });
            }).catch((error) => {
                console.log(error);
            })
        },
        get_StuffList() {
            DepartmentService.get_StuffList(this.stuff_params).then((res) => {
                this.StuffList = res.data.data
            }).catch((error) => {
                console.log(error);
            })
        },

        goPush() {
            this.$router.push("/admin/partfactory");
        },

        goCadry(id, name) {
            this.$router.push({
                name: "departmentstuffcadry", params: {
                    id, name,
                    depId: this.$route.params.id,
                    depName: this.$route.params.name,
                }
            });
        },
        searchByName() {
            console.log(this.searchPartName);
        },
        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_District(this.$route.params.id, this.params, true);
            localStorage.setItem("page_21", event.page)
            localStorage.setItem("per_page_21", event.per_page)
        },

        controlLoader(item) {
            this.loader = item;
        },
        controlstuffDialog(item) {
            this.stuffDialog = item
        },
    },
    created() {
        this.department_name = this.$route.params.name;
        this.get_District(this.$route.params.id, this.params, true);
    },
};
</script>
<style lang="scss" scoped>
.p-chip.custom-chip {
    background: var(--green-500);
    color: var(--primary-color-text);
}

.p-chip.custom-chip-red {
    background: var(--red-500);
    color: var(--primary-color-text);
}
</style>