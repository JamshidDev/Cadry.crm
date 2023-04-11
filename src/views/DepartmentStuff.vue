<template>

  <div class="grid px-3">
    <div class="col-12">
      <div class="grid">
        <div class="col-12 pb-0">
          <bread-crumb :breadCump="[{name:'Bo\'limlar', path:'/admin/partfactory'}, {name:'Shtatlar', path:''},]"></bread-crumb>
        </div>
        <div class="col-12 y-0 pt-0 pb-1">
          <span class=" text-sm  xl:text-lg lg:text-base font-semibold"
            > <span class="text-blue-600">{{ department_name }}</span>
                bo'limiga biriktirilgan shtat lavozimlari ro'yhati
          </span>
        </div>
        <!-- <div class="col-12 pb-0 pt-1">
              <InputText
                type="text"
                v-model="searchPartName"
                placeholder="Nomi orqali qidiruv"
                class="p-inputtext-sm"
                @keyup.enter="searchByName()"
              />
            </div> -->
      </div>
    </div>

    <div class="col-12 pt-1" v-show="!loader">
      <DataTable
        ref="dt"
        :value="DepStuffList"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        class="p-datatable-sm"
        stripedRows
        v-show="totalItem"
        v-model:selection="selectitem" selectionMode="single"
      >
        <Column  style="min-width:30px; width:36px">
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
            <div class="text-800 font-semibold">To'liq shtat lavozim nomi</div>
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
              {{ slotProps.data.staff_fullname }}
            </div>
          </template>
        </Column>

        <Column class="py-0" style="min-width: 50px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Plan</div>
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
              {{ slotProps.data.rate }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 50px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Fakt</div>
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
              <div v-show="slotProps.data.rate > slotProps.data.rate_sum">
                <Chip
                  :label="
                    (slotProps.data.rate - slotProps.data.rate_sum).toString()
                  "
                  class="mr-2 mb-2 custom-chip"
                />
              </div>
              <div v-show="slotProps.data.rate < slotProps.data.rate_sum">
                <Chip
                  :label="
                    (slotProps.data.rate_sum - slotProps.data.rate).toString()
                  "
                  class="mr-2 mb-2 custom-chip-red"
                />
              </div>
              <div v-show="slotProps.data.rate == slotProps.data.rate_sum">
                {{ slotProps.data.rate_sum }}
              </div>
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 120px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <view-button-v
                v-tooltip.bottom="`Xodimlarni ko'rish`"
                :icon="'pi-users'"
                @click="goCadry(slotProps.data.id, slotProps.data.staff_fullname )"
              ></view-button-v>
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editStuff($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemDepStuff($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination
            v-show="totalItem > 10"
            :total_page="totalItem"
            @pagination="changePagination($event)"
          ></table-pagination> </template
      >
    </DataTable>
    <no-data-component v-show="totalItem<1"></no-data-component>
    </div>

    <div class="col-12 pt-1" v-show="loader">
      <department-stuff-loader></department-stuff-loader>
    </div>
    <div class="col-12">
      <Toast position="bottom-right" />
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
                class="font-semibold"
                v-if="slotProps.value"
              >
                <div class="font-semibold">{{ slotProps.value.name }}</div>
              </div>
              <span class="font-semibold" v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="font-semibold">
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
                class="w-full font-semibold"
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
import BreadCrumb from '../components/BreadCrumb/BreadCrumb.vue';
import DeleteButton from '../components/buttons/DeleteButton.vue';
import EditButton from '../components/buttons/EditButton.vue';
import ViewButtonV from '../components/buttons/ViewButtonV.vue';
import NoDataComponent from '../components/EmptyComponent/NoDataComponent.vue';
import DepartmentStuffLoader
  from '../components/loaders/DepartmentStuffLoader.vue';
import TablePagination from '../components/Pagination/TablePagination.vue';
import DepartmentService from '../service/servises/DepartmentService';
import DepartmentStuffService from '../service/servises/DepartmentStuffService';

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
      selectitem:null,
      totalItem:0,
      loader: false,
      DepStuffList: [],
      searchPartName:null,
      department_name: "",
      params: {
        search:null,
        page: 1,
        per_page: 10,
      },

      stuffDialog:false,
      dep_stuff_id:null,
      stuff:"",
      full_stuff:"",
      stuf_plan:null,
      Class_List: [],
      classic: "",
      StuffList:[],
      stuffsubmited:false,
      stuff_params:{
        search:null,
        page:1,
        per_page:10,
      }


    };
  },
  computed: {
    errorStuff() {
      if (!this.stuff) {
        return true;
      } else {
        return false;
      }
    },
    errorFullStuff() {
      if (this.full_stuff?.length == 0 || !this.full_stuff ) {
        return true;
      } else {
        return false;
      }
    },
    errorPlan() {
      if (this.stuf_plan.length==0 || this.stuf_plan.length>4 ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    get_DepartmentStuff(id, params, loader) {
      this.controlLoader(loader);
      DepartmentStuffService.get_DepartmentStuff({ id, params })
        .then((res) => {
          let cadrList = [];
          this.totalItem = res.data.department.pagination.total
          let number = (this.params.page - 1) * this.params.per_page;
          res.data.department.data.forEach((item) => {
            number++;
            item.number = number;
            cadrList.push(item);
          });
          this.DepStuffList = res.data.department.data;
          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },


    

    editStuff(event){
      console.log(event);
      this.dep_stuff_id = event.id
      this.stuffsubmited = false
      this.stuff=event.staff_id
      this.stuf_plan=event.rate,
      this.classic = event.classification_id
      this.full_stuff=event.staff_fullname
      this.controlstuffDialog(true)

    },
    addStuffItem(){
      this.stuffsubmited = true
      if(this.stuff && this.full_stuff.length>0 && !this.stuf_plan.toString().length==0 && this.stuf_plan.toString().length<=4  ){
        let id = this.dep_stuff_id;
        let data = {
          staff_id:this.stuff.id,
          staff_full: this.full_stuff,
          classification_id: this.classic?.id,
          rate: this.stuf_plan
        }
        DepartmentStuffService.update_DepartmentStuff({id, data}).then((res)=>{
          this.get_DepartmentStuff(this.$route.params.id, false);
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
      DepartmentStuffService.delete_DepartmentStuff({id}).then((res)=>{

        this.get_DepartmentStuff(this.$route.params.id, false);

        this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "O'chirildi",
              life: 2000,
            });

            
      }).catch((error)=>{
        console.log(error);
      })
    },
    get_StuffList(){
      DepartmentService.get_StuffList(this.stuff_params).then((res)=>{
        this.StuffList = res.data.data
      }).catch((error)=>{
        console.log(error);
      })
    },

    goPush(){
      this.$router.push("/admin/partfactory");
    },

    goCadry(id, name){
      this.$router.push({name:"departmentstuffcadry", params:{
        id, name,
        depId:this.$route.params.id,
        depName:this.$route.params.name,
      }});
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
    searchByName(){
      console.log(this.searchPartName);
    },
    changePagination(event) {
      this.params.page = event.page;
      this.stuff_params.per_page = event.per_page;
      this.get_DepartmentStuff(this.$route.params.id,this.params ,true);
    },

    controlLoader(item) {
      this.loader = item;
    },
    controlstuffDialog(item){
      this.stuffDialog = item
    },
  },
  created() {
    this.department_name = this.$route.params.name;
    this.get_DepartmentStuff(this.$route.params.id,this.params ,true);
    this.get_StuffList()
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