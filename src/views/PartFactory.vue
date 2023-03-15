<template >
  <div class="grid px-3">
    <div class="col-12">
      <div class="grid">
        <div class="col-12 pb-0">
          <bread-crumb :breadCump="[{name:'Bo\'limlar', path:''}]"></bread-crumb>
        </div>
        <div class="col-12 y-0 py-0">
          <span class="xl:text-base lg:text-base text-sm font-semibold"
            >Bo'limlar
            <span class="text-base text-primary pl-2">
              ({{ totalDepartment }})</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="grid">
            <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-6 flex">
              <InputText
                type="text"
                v-model="searchPartName"
                placeholder="Nomi orqali qidiruv"
                class="p-inputtext-sm"
                @keyup.enter="searchByName()"
              />
              <!-- <Chip class="font-bold uppercase text-green-700 bg-green-100 text-sm mx-2" label="Vakansiya - 12"  />
              <Chip class="font-bold uppercase text-red-700 bg-red-100 text-sm mx-2" label="Sverx - 13"  /> -->
            </div>
            <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-download"
                label=""
                class="p-button-success p-button-sm mr-2"
                @click="dowload_department_stuff()"
                v-tooltip.bottom="`Shtat jadvalini yuklash`"
                :loading="download_loading"
              ></Button>
              <Button
                icon="pi pi-sitemap"
                label="Biriktirish"
                class="p-button-warning p-button-sm mr-2 xl:block lg:block md:block hidden"
                @click="addStuff()"
                v-tooltip.bottom="`Bo'limga shtat lavozim biriktirish`"
              ></Button>
              <Button
                icon="pi pi-plus"
                label="Qo'shish"
                class="p-button-info p-button-sm xl:block lg:block md:block hidden"
                @click="addItemPart()"
                v-tooltip.bottom="`Yangi bo'lim qo'shish`"
              ></Button>

              <Button
                icon="pi pi-sitemap"
                class="p-button-warning p-button-sm mr-2 xl:hidden lg:hidden md:hidden "
                @click="addStuff()"
                v-tooltip.bottom="`Bo'limga shtat lavozim biriktirish`"
              ></Button>
              <Button
                icon="pi pi-plus"
                class="p-button-info p-button-sm xl:hidden lg:hidden md:hidden "
                @click="addItemPart()"
                v-tooltip.bottom="`Yangi bo'lim qo'shish`"
              ></Button>
            </div>
          </div>
    </div>
    <div class="col-12 py-0" v-show="!loader">
      <DataTable
        ref="dt"
        :value="departmentList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
        v-model:selection="selectitem" selectionMode="multiple"
        v-show="departmentList.length !== 0"
      >
      <Column style="min-width:30px; width:36px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              No
            </div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-sm font-normal">
              {{ slotProps.data.number }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 16rem">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Bo'lim nomi</div>
          </template>
          <template #body="slotProps">
            <div
              class="
              text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-medium
              "
            >
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>

        <Column class="py-0" style="min-width: 200px; width: 200px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
              Bo'sh/Ortiqcha ish o'rinlari
            </div>
          </template>
          <template #body="slotProps">
            <div class="grid">
              <div
                class="
                  col-6
                  text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-medium
                  flex align-items-center
                  justify-content-center
                "
              >
                <div class="text-center" v-show="slotProps.data.vakan != 0">
                  <Chip
                    :label="slotProps.data.vakan.toString()"
                    class="custom-chip"
                  />
                </div>
                <div v-show="slotProps.data.vakan == 0" class="text-center">
                  {{ slotProps.data.vakan }}
                </div>
              </div>
              <div
                class="
                  col-6
                  text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-medium
                  flex align-items-center
                  justify-content-center
                "
              >
                <div class="text-center" v-show="slotProps.data.sverx != 0">
                  <Chip
                    :label="slotProps.data.sverx.toString()"
                    class="custom-chip-red"
                  />
                </div>
                <div v-show="slotProps.data.sverx == 0" class="text-center">
                  {{ slotProps.data.sverx }}
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column style="min-width: 50px; width: 80px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Plan</div>
          </template>
          <template #body="slotProps">
            <div
              class="
              text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-medium
                text-center text-blue-500
              "
            >
              {{ slotProps.data.plan }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 110px; width: 110px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Xodimlar soni</div>
          </template>
          <template #body="slotProps">
            <div
              class="
              text-sm
                sm:text-sm
                md:text-sm
                lg:text-base
                xl:text-base
                font-medium
                text-center
              "
            >
              {{ slotProps.data.cadries_count }}
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 150px; width: 150px">
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <view-button-v
                v-tooltip.bottom="`Biriktirilgan shtatlarni ko'rish`"
                :icon="'pi-eye'"
                @click="
                  goDepartmentStuff(slotProps.data.id, slotProps.data.name)
                "
              ></view-button-v>
              <view-button-v
                v-tooltip.bottom="`Xodimlarni ko'rish`"
                :icon="'pi-users'"
                @click="
                  goDepartmentCadry(slotProps.data.id, slotProps.data.name)
                "
              ></view-button-v>
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editItemPart($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemPart($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
            v-show="totalDepartment > 10"
            :total_page="totalDepartment"
            :page="params.page"
            :per_page="params.per_page"
            @pagination="changePagination($event)"
          ></table-pagination>
        </template>
      </DataTable>
      <NoDataComponent  v-show="departmentList.length == 0"></NoDataComponent>
    </div>
    <div class="col-12 py-0" v-show="loader">
      <department-loader></department-loader>
    </div>
    <div class="col-12">
      <Toast position="bottom-right" />
      <Dialog
        v-model:visible="partDialog"
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
            {{ partDialogType ? "Bo'lim qo'shish" : "Bo'limni tahrirlash" }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Bo'lim nomi</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model="partDetails.name"
              :class="{ 'p-invalid': errorInput && submitPart }"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEdit()"
              />
            </div>
          </div>
        </template>
      </Dialog>

      <Dialog
        v-model:visible="stuffDialog"
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
            Bo'limga shtat lavozim biriktirish
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Bo'limni tanlang</h6>
            <Dropdown
              v-model="department"
              :options="Dep_List"
              optionLabel="name"
              :filter="true"
              placeholder="Tanlang"
              class="w-full"
              :class="{ 'p-invalid': errorDepartment && stuffsubmited }"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Shtat lavozimni tanlang</h6>
            <Dropdown
              v-model="stuff"
              :options="StuffList"
              optionLabel="name"
              :filter="true"
              placeholder="Tanlang"
              class="w-full"
              :class="{ 'p-invalid': errorStuff && stuffsubmited }"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">
              Lavozimga mos klassifikatorni tanlang
            </h6>
            <Dropdown
              v-model="classic"
              :options="Class_List"
              optionLabel="name_uz"
              :filter="true"
              @filter="get_Classifikator"
              :filterFields="['code_staff']"
              placeholder="Tanlang"
              class="w-full"
            >
              <template #value="slotProps">
                <div
                  class=""
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name_uz }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div >
                  <div>{{ slotProps.option.name_uz }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">To'liq shtat lavozim nomi</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model.trim="full_stuff"
              :autoResize="true"
              rows="1"
              :class="{ 'p-invalid': errorFullStuff && stuffsubmited }"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Plan</h6>
            <InputText
              type="text"
              class="w-full"
              placeholder="Kiriting"
              id="adressStreet"
              v-model="stuf_plan"
              :class="{ 'p-invalid': errorPlan && stuffsubmited }"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addStuffItem()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import TablePagination from "../components/Pagination/TablePagination.vue";
import DeleteButton from "../components/buttons/DeleteButton.vue";
import EditButton from "../components/buttons/EditButton.vue";
import ViewButtonV from "../components/buttons/ViewButtonV.vue";
import DepartmentService from "../service/servises/DepartmentService";
import DepartmentStuffService from "@/service/servises/DepartmentStuffService";
import DepartmentLoader from "../components/loaders/DepartmentLoader.vue";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb.vue";
import NoDataComponent from "../components/EmptyComponent/NoDataComponent.vue";
import EksportService from "@/service/servises/EksportService";
export default {
  components: {
    DeleteButton,
    EditButton,
    ViewButtonV,
    TablePagination,
    DepartmentLoader,
    BreadCrumb,
    NoDataComponent,
  },
  data() {
    return {
      selectitem:null,
      loader: false,
      download_loading:false,
      searchPartName: null,
      totalDepartment: 0,
      partDialog: false,
      partDialogType: true,
      part_id: null,
      partDetails: {
        name: "",
      },
      params: {
        page:localStorage.getItem("page_4")? Number(localStorage.getItem("page_4")) : 1,
        per_page:localStorage.getItem("per_page_4")? Number(localStorage.getItem("per_page_4")) : 10,
        search: null,
      },

      departmentList: [],
      submitPart: false,

      stuffDialog: false,
      stuff: "",
      department: "",
      full_stuff: "",
      stuf_plan: null,

      StuffList: [],
      stuff_params: {
        search: null,
        page: 1,
        per_page: 1000,
      },
      Class_List: [],
      classic: "",
      Dep_List: [],
      department_params: {
        search: null,
        page: 1,
        per_page: 1000,
      },
      


      stuffsubmited: false,
    };
  },
  methods: {
    get_Department(params, loader) {
      this.controlLoader(loader);
      DepartmentService.get_Department(params)
        .then((res) => {
          this.totalDepartment = res.data.departments.pagination.total;
          let cadrList = [];
          let number = (this.params.page - 1) * this.params.per_page;
          res.data.departments.data.forEach((item) => {
            number++;
            item.number = number;
            cadrList.push(item);
          });
          this.departmentList = res.data.departments.data;
          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
          this.controlLoader(false);
        });
    },
    addItemPart() {
      this.submitPart = false;
      this.partDialogType = true;
      this.partDetails.name = "";
      this.controlPartDialog(true);
    },
    editItemPart(event) {
      this.submitPart = false;
      this.partDialogType = false;
      this.part_id = event.id;
      (this.partDetails.name = event.name), this.controlPartDialog(true);
    },

    addAndEdit() {
      this.submitPart = true;
      if (this.partDetails.name.length) {
        let data = {
          name: this.partDetails.name,
        };
        this.controlPartDialog(false);
        if (this.partDialogType) {
          DepartmentService.create_Department({ data })
            .then((res) => {
              this.get_Department(this.params, false);
              this.get_DepartmentList(this.department_params);
              this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Yaratildi",
                life: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          DepartmentService.update_Department({
            id: this.part_id,
            data,
          })
            .then((res) => {
              this.get_Department(this.params, false);
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

    deleteItemPart(id) {
      DepartmentService.delete_Department({ id })
        .then((res) => {
          this.get_Department(this.params, false);
          this.get_DepartmentList(this.department_params);
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
    searchByName(){
      this.params.search = this.searchPartName;
      this.get_Department(this.params, true);
    },

    changePagination(event) {
      this.params.page = event.page;
      this.params.per_page = event.per_page;
      this.get_Department(this.params, true);
      localStorage.setItem("page_4", event.page)
      localStorage.setItem("per_page_4", event.per_page)
    },
    goDepartmentStuff(id, name) {
      this.$router.push({ name: "departmentstuff", params: { id, name } });
    },
    goDepartmentCadry(id, name) {
      this.$router.push({ name: "departmentcadry", params: { id, name } });
    },

    addStuff() {
      this.stuffsubmited = false;
      this.department = null;
      this.classic = ""; 
      this.stuff = null;
      this.stuf_plan = "";
      this.full_stuff = "";
      this.controlstuffDialog(true);
    },
    addStuffItem() {
      this.stuffsubmited = true;
      if (
        this.department &&
        this.stuff &&
        this.full_stuff.length > 0 &&
        this.stuf_plan.length <= 4
      ) {
        let id = this.department.id;
        let data = {
          staff_id: this.stuff.id,
          rate: this.stuf_plan,
          classification_id: this.classic? this.classic.code_staff : null,
          staff_full: this.full_stuff,
        };
        DepartmentStuffService.create_DepartmentStuff({ id, data })
          .then((res) => {
            this.get_Department(this.params, false);
            this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "Biriktirildi",
              life: 2000,
            });
          })
          .catch((error) => {
            console.log(error);
          });

        this.controlstuffDialog(false);
      }
    },

    checkStuff(item) {},

    get_StuffList() {
      DepartmentService.get_StuffList(this.stuff_params)
        .then((res) => {
          this.StuffList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_DepartmentList(params) {
      DepartmentService.get_Department(params)
        .then((res) => {
          this.Dep_List = res.data.departments.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_Classifikator(search = "1") {
     search = search.value? search.value : "1", 
        DepartmentService.get_Classifikator({ search })
          .then((res) => {
            this.Class_List = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      
    },
    dowload_department_stuff(){
      let now_date = new Date();
      let year = now_date.getFullYear();
      let month = now_date.getMonth() + 1;
      let day = now_date.getDate()
      EksportService
      this.download_loading = true;
      EksportService.export_department().then((response) => {
                console.log(response);
                var fileURL = window.URL.createObjectURL(new Blob([response.data], {
                    type:
                        'application/excelx'
                }));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `Shtat jadval(${day>10? day : '0'+day}-${month>10? month :'0'+month}-${year}).xlsx`);
                document.body.appendChild(fileLink);
                fileLink.click();
                document.body.removeChild(fileLink);
                this.download_loading = false;
            })
    },
    

    controlPartDialog(item) {
      this.partDialog = item;
    },
    controlstuffDialog(item) {
      this.stuffDialog = item;
    },
    controlLoader(item) {
      this.loader = item;
    },
  },
  computed: {
    errorInput() {
      if (this.partDetails.name.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    errorStuff() {
      if (!this.stuff) {
        return true;
      } else {
        return false;
      }
    },
    errorDepartment() {
      if (!this.department) {
        return true;
      } else {
        return false;
      }
    },
    errorFullStuff() {
      if (this.full_stuff.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    errorPlan() {
      if (this.stuf_plan.length == 0 || this.stuf_plan.length > 4) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.get_StuffList();
    this.get_Department(this.params, true);
    this.get_DepartmentList(this.department_params);
    this.get_Classifikator();
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