<template >
  <div class="grid px-3">
    <div class="col-12">
      <div class="grid">
        <div class="col-12 pb-0">
          <bread-crumb
            :breadCump="[{ name: 'Ta\'tillar', path: '' }]"
          ></bread-crumb>
        </div>
        <div class="col-12 y-0 py-0">
          <span class="text-2xl font-semibold"
            >Hozirda ta'tildagi xodimlar
            <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
          </span>
        </div>
      </div>
    </div>

    <div class="col-12 py-0">
      <div class="grid py-0">
        <div class="col-12 flex justify-content-between">
          <InputText
            type="text"
            v-model="searchPartName"
            placeholder="Qidiruv..."
            class="p-inputtext-sm"
            @keyup.enter="searchByName()"
          />
        <div class="flex gap-2">
          <Button
                      icon="pi pi-cloud-download"
            class="p-button-success p-button-sm "
            @click="export_Data_toExcel()"
            v-tooltip.bottom="`Ma'lumotlarni yuklash`"
          ></Button>
          <Button
            icon="pi pi-plus"
            label="Qo'shish"
            class="p-button-info p-button-sm"
            @click="addItemVacation()"
            v-tooltip.bottom="`Xodimni ta'tilga yuborish`"
          ></Button>
        </div>
        </div>
      
      </div>
    </div>

    <div class="col-12 pt-0" v-show="!loader">
      <DataTable
        ref="dt"
        :value="vacation_cadryList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
        v-show="vacation_cadryList.length !== 0"
      >
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
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Rasm
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-content-center">
              <Image
                :src="slotProps.data.cadry.photo"
                alt="Rasm yo'q"
                width="30"
                height="30"
                preview
              />
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 200px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              F.I.SH
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-800 text-sm lg:text-base xl:text-base">
              {{ slotProps.data.cadry.fullname }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 100px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Bo'lim
            </div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-normal
              "
            >
              {{ slotProps.data.cadry.department }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 150px; width: 200px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Ta'til turi
            </div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                sm:text-sm
                md:text-md
                lg:text-lg
                xl:text-lg
                font-normal
              "
            >
              <Chip
                :label="vacationName(slotProps.data.status_decret)"
                class="mr-2 mb-2 text-sm text-cyan-700 bg-cyan-100 font-normal"
              />
            </div>
          </template>
        </Column>

        <Column style="min-width: 50px; width: 110px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Qachondan
            </div>
          </template>
          <template #body="slotProps">
            <div
              class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
            >
              <Chip
                :label="formatter.arrowDateFormat(slotProps.data.date1)"
                class="
                  mr-2
                  mb-2
                  text-sm text-purple-700
                  bg-purple-100
                  font-medium
                "
              />
            </div>
          </template>
        </Column>

        <Column style="min-width: 50px; width: 110px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Qachongacha
            </div>
          </template>
          <template #body="slotProps">
            <div
              class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
            >
              <Chip
                :label="formatter.arrowDateFormat(slotProps.data.date2)"
                class="
                  mr-2
                  mb-2
                  text-sm text-purple-700
                  bg-purple-100
                  font-medium
                "
              />
            </div>
          </template>
        </Column>

        <Column style="min-width: 100px; width: 300px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Ta'til davri
            </div>
          </template>
          <template #body="slotProps">
            <div
              class="
                text-sm
                lg:text-base
                xl:text-base
                text-center
                font-normal
                flex
                justify-content-evenly
              "
            >
              <div>
                {{
                  slotProps.data.period1? formatter.arrowDateFormat(slotProps.data.period1) : ""
                }}
              </div>
              <div>
                {{
                  slotProps.data.period2 ? formatter.arrowDateFormat(slotProps.data.period2) : ""
                }}
              </div>
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 80px; width: 100px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Amallar
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemVacation($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemVacation($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
            v-show="totalPage > 10"
            :total_page="totalPage"
            @pagination="changePagination($event)"
          ></table-pagination>
        </template>
      </DataTable>
      <NoDataComponent  v-show="vacation_cadryList.length == 0"></NoDataComponent>
      
    </div>
    <div class="col-12" v-show="loader">
      <vacation-loader></vacation-loader>
    </div>

    <div class="col-12">
      <Toast position="bottom-right" />
      <Dialog
        v-model:visible="med_dialog"
        :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <template #header>
          <h6 class="uppercase text-lg text-blue-500 font-medium">
            {{
              med_dialodType
                ? " Xodimni ta'tilga yuborish "
                : "Ta'til ma'lumotlarini tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Ta'til turini tanlang</h6>
            <Dropdown
              v-model="v$.status_decret.$model"
              :class="{ 'p-invalid': v$.status_decret.$invalid && submitted }"
              :options="vacationList"
              optionLabel="name"
              optionValue="id"
              placeholder="Tanlang"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Xodimni tanlang</h6>
            <Dropdown
              v-model="v$.cadry.$model"
              :class="{ 'p-invalid': v$.cadry.$invalid && submitted }"
              :options="search_cadryList"
              optionLabel="fullname"
              :filter="true"
              @filter="true"
              placeholder="Tanlang"
              class="w-full"
            >
              <template #value="slotProps">
                <div class="font-semibold" v-if="slotProps.value">
                  <div>{{ slotProps.value.fullname }}</div>
                </div>
                <span v-else class="font-semibold">
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.fullname }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="v$.date1.$model"
              :class="{ 'p-invalid': v$.date1.$invalid && submitted }"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="v$.date2.$model"
              :class="{ 'p-invalid': v$.date2.$invalid && submitted }"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-12">
            <Divider align="center" type="dashed" class="py-0 my-0">
              <b class="font-medium text-500">Ta'til davri</b>
            </Divider>
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="period_date1"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="period_date2"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Prikaz raqami</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model="command_number"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditVacation(!v$.$invalid)"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>

    <div class="col-12" v-show="false">
      <download-excel
        :data="jsonData"
        :fields="json_fields"
        name="Ta'tildagi xodimlar.xls"
        ref="vacation_table"
      >
      </download-excel>
    </div>
  </div>
</template>
<script>
import VacationLoader from "@/components/loaders/VacationLoader.vue";
import TablePagination from "../components/Pagination/TablePagination.vue";
import formatter from "../util/formatter";
import DeleteButton from "../components/buttons/DeleteButton.vue";
import EditButton from "../components/buttons/EditButton.vue";
import VacationService from "../service/servises/VacationService";
import { globalValidate } from "../validation/vuevalidate";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb.vue";
import NoDataComponent from "../components/EmptyComponent/NoDataComponent.vue";
export default {
  components: {
    EditButton,
    DeleteButton,
    TablePagination,
    VacationLoader,
    BreadCrumb,
    NoDataComponent,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      formatter,
      searchPartName: null,
      loader: false,

      vacation_cadryList: [],
      search_cadryList: [],
      vacationList: [],
      vacation_cadry_id: null,

      date1: "",
      date2: "",
      period_date1: "",
      period_date2: "",
      status_decret: "",
      command_number: "",
      cadry: "",
      alldays: 0,

      med_dialog: false,
      med_dialodType: true,

      params: {
        page: 1,
        per_page: 10,
        search: null,
      },

      search_params: {
        page: 1,
        per_page: 10000,
        search: "A",
      },
      totalPage: 0,
      submitted: false,

      jsonData: [],
      json_fields: {
        "F.I.SH": "cadry.fullname",
        "Bo'lim": "cadry.department",
        "Ta'til turi": {
          field: "status_decret", // nested attribute supported
          callback: (value) => {
            return value == 1? "Bola parvarish ta'tili" : "Mehnat ta'tili";
          },
        },
        Qachondan: {
          field: "date1", // nested attribute supported
          callback: (value) => {
            return this.formatter.arrowDateFormat(value);
          },
        },
        Qachongacha: {
          field: "date2", // nested attribute supported
          callback: (value) => {
            return this.formatter.arrowDateFormat(value);
          },
        },
        "Ta'til davri (dan)": {
          field: "period1", // nested attribute supported
          callback: (value) => {
            if(value){
              return this.formatter.outDateFormatter(value);
            }else{
              return "Kiritilmagan"
            }
            
          },
        },
        "Ta'til davri (gacha)": {
          field: "period2", // nested attribute supported
          callback: (value) => {
            if(value){
              return this.formatter.outDateFormatter(value);
            }else{
              return "Kiritilmagan"
            }
          },
        },
      },
    };
  },
  validations() {
    return {
      date1: globalValidate.date1,
      date2: globalValidate.date2,
      status_decret: globalValidate.status_decret,
      cadry: globalValidate.cadry,
    };
  },
  methods: {
    get_Vacations(params, loader) {
      this.controlLoader(loader);
      VacationService.get_CadryVacation(params)
        .then((res) => {
          this.totalPage = res.data.cadries.pagination.total;
          let cadrList = [];
          let number = (this.params.page - 1) * this.params.per_page;
          res.data.cadries.data.forEach((item) => {
            number++;
            item.number = number;
            cadrList.push(item);
          });
          this.vacation_cadryList = res.data.cadries.data;
          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_VacationList() {
      VacationService.get_VacationList()
        .then((res) => {
          this.vacationList = res.data.status_decret;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemVacation() {
      this.submitted = false;
      this.med_dialodType = true;
      this.status_decret = "";
      this.date1 = "";
      this.date2 = "";
      this.period_date1 = "";
      this.period_date2 = "";
      this.cadry = "";
      this.command_number = "";
      this.controlDialog(true);
    },

    editItemVacation(event) {
      this.submitted = false;
      this.med_dialodType = false;
      this.vacation_cadry_id = event.id;
      this.status_decret = event.status_decret;
      this.command_number = event.command_number ? event.command_number : "";
      this.date1 = this.formatter.interDateFormatter(event.date1);
      this.date2 = this.formatter.interDateFormatter(event.date2);
      this.period_date1 = event.period1
        ? this.formatter.interDateFormatter(event.period1)
        : "";
      this.period_date2 = event.period2
        ? this.formatter.interDateFormatter(event.period2)
        : "";
      this.cadry = event.cadry;
      this.controlDialog(true);
    },

    addAndEditVacation(valid) {
      this.submitted = true;
      if (valid) {
        this.controlDialog(false);
        let data = {
          command_number: this.command_number,
          status_decret: this.status_decret,
          cadry_id: this.cadry.id,
          period1: this.period_date1
            ? this.formatter.outDateFormatter(this.period_date1)
            : "",
          period2: this.period_date2
            ? this.formatter.outDateFormatter(this.period_date2)
            : "",
          date1: this.formatter.outDateFormatter(this.date1),
          date2: this.formatter.outDateFormatter(this.date2),
          alldays: this.countDay(this.date2, this.date1),
        };
        if (this.med_dialodType) {
          VacationService.create_CadryVacation({ data })
            .then((res) => {
              this.get_Vacations(this.params, false);
              this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Ta'tilga yuborildi",
                life: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          VacationService.update_CadryVacation({
            id: this.vacation_cadry_id,
            data,
          })
            .then((res) => {
              this.get_Vacations(this.params, false);
              this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Tahrirlandi",
                life: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    deleteItemVacation(id) {
      VacationService.delete_CadryVacation({ id })
        .then((res) => {
          this.get_Vacations(this.params, false);
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "O'chirildi",
            life: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changePagination(event) {
      this.params.page = event.page;
      this.params.per_page = event.per_page;
      this.get_Vacations(this.params, true);
    },
    vacationName(id) {
      return this.vacationList.length > 0
        ? this.vacationList.filter((item) => item.id == id)[0].name
        : "";
    },

    search_Cadry(event) {
      this.search_params.search = event.value;
      VacationService.search_Cadry(this.search_params)
        .then((res) => {
          this.search_cadryList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    searchByName() {
      this.params.search = this.searchPartName;
      this.get_Vacations(this.params, true);
    },

    countDay(date2, date1) {
      let mil_date2 = new Date(date2).getTime();
      let mil_date1 = new Date(date1).getTime();
      let distance = mil_date2 - mil_date1;
      return Math.round(distance / (1000 * 60 * 60 * 24));
    },
    export_Data_toExcel() {
      VacationService.get_CadryVacation({
        search: null,
        page: 1,
        per_page: 80000,
      }).then((res) => {
        console.log(res.data.cadries);
        this.jsonData = res.data.cadries.data;
        setTimeout(()=>{
          this.$refs.vacation_table.generate();
        }, 1000)
        
      });
     
    },

    controlDialog(item) {
      this.med_dialog = item;
    },
    controlLoader(item) {
      this.loader = item;
    },
  },
  created() {
    this.get_VacationList();
    this.get_Vacations(this.params, true);
    this.search_Cadry({ value: " " });
  },
};
</script>
<style lang="">
</style>