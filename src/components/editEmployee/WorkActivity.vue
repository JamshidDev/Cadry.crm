<template >
  <div class="grid card" v-if="barLoader">
    <div class="col-12">
      <progress-bar-loader></progress-bar-loader>
    </div>
  </div>
  <div class="grid card xl:p-4 lg:p-2 pt-4 px-0" v-if="!barLoader">
    <div class="col-12 py-1 px-0 mb-6" v-show="careerList.length == 0">
      <add-button
        :title="'Mehnat faoliyatini qo\'shish'"
        @click="addingCaarres()"
      ></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!careerList.length == 0">
      <DataTable
        :value="careerList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        @rowReorder="onRowReorder"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Mehnat faoliyati
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addingCaarres()"
              />
            </div>
          </div>
        </template>
        <Column
          :rowReorder="true"
          style="min-width: 30px; width: 50px"
          class="text-center"
          :reorderableColumn="false"
        />
        <Column style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div class="text-center cursor-pointer font-semibold">
              {{Formatter.arrowDateFormat(slotProps.data.date1)  }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 100px">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div class="text-center cursor-pointer font-semibold">
              {{ Formatter.arrowDateFormat(slotProps.data.date2)  }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 20rem">
          <template #header>
            <div class="text-800 font-semibold">Lavozim</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.staff_name }}
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 100px; width: 150px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
              <edit-button
                :editItem="slotProps.data"
                @editEvent="editCareer($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteCareer($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-12">
      <Dialog
        v-model:visible="careerDialog"
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
              careerDialogType ? "Ma'lumot qo'shish" : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
            <!-- <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="stuff_date1"
              v-model="careerDialogdate1"
              v-maska="'####'"
            /> -->
            <Calendar
            class="w-full"
            :manualInput="true"
            id="new_cadry_positionDate"
            v-model="careerDialogdate1"
            v-maska="'##/##/####'"
            placeholder="Sanani tanlang"
            dateFormat="dd/mm/yy"
            :showButtonBar="true"
          />
          
          </div>
          <div class="col-12 sm:col-6 md:col-6 lg:col-6 xl:col-6">
            <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
            <!-- <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Yilni kiriting"
              id="stuff_date2"
              v-model="careerDialogdate2"
              v-maska="'####'"
            /> -->
            <Calendar
            class="w-full"
            :manualInput="true"
            id="new_cadry_positionDate"
            v-model="careerDialogdate2"
            v-maska="'##/##/####'"
            placeholder="Sanani tanlang"
            dateFormat="dd/mm/yy"
            :showButtonBar="true"
          />

          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Lavozim</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Lavozim to'liq nomini kiriting"
              id="stuff_name"
              v-model="careerDialogname"
              :autoResize="true"
              rows="5"
              cols="20"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addingAndEdit()"
              />
            </div>
          </div>
        </template>
      </Dialog>
      <Toast position="bottom-right" />
    </div>
  </div>
</template>
<script>
import DeleteButton from "../buttons/DeleteButton.vue";
import EditButton from "../buttons/EditButton.vue";
import employeeCarreer from "../../service/servises/employeeCarreer";
import ProgressBarLoader from "../loaders/ProgressBarLoader.vue";
import AddButton from "../buttons/AddButton.vue";
import Formatter from "@/util/formatter";
export default {
  components: {
    DeleteButton,
    EditButton,
    ProgressBarLoader,
    AddButton,
  },
  data() {
    return {
      Formatter,
      barLoader: false,
      careerList: [],
      careerDialog: false,
      careerDialogType: true,
      career_id: null,
      careerDialogdate1: "",
      careerDialogdate2: "",
      careerDialogname: "",
    };
  },
  methods: {
    get_CadryCareers(id, loader) {
      this.controlBarLoader(loader);
      employeeCarreer
        .get_CadryCareers({ id })
        .then((res) => {
          this.careerList = res.data.careers;
          this.controlBarLoader(false);
        })
        .catch((error) => {
          this.controlBarLoader(false);
          console.log(error);
        });
    },

    onRowReorder(event) {
      this.careerList = event.value;
      let orders = [];
      event.value.forEach((item, index) => {
        orders.push({
          career_id: item.id,
          position: index + 1,
        });
      });
      console.log(orders);
      employeeCarreer
        .sortable_CadryCareers({ orders })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addingCaarres() {
      this.careerDialogType = true;
      this.careerDialogdate1 = "";
      this.careerDialogdate2 = "";
      this.careerDialogname = "";
      this.controlDialog(true);
    },
    editCareer(event) {
      this.careerDialogType = false;
      this.career_id = event.id;
      this.careerDialogdate1 = Formatter.interDateFormatter(event.date1);
      this.careerDialogdate2 =  Formatter.interDateFormatter(event.date2);
      this.careerDialogname = event.staff_name;
      this.controlDialog(true);
    },

    addingAndEdit() {
      this.controlDialog(false);
      let id = this.$route.params.id;
      let data = {
        date1: Formatter.interDateFormatter(this.careerDialogdate1), 
        date2: Formatter.interDateFormatter(this.careerDialogdate2), 
        staff: this.careerDialogname,
      };

      if (this.careerDialogType) {
        employeeCarreer
          .create_CadryCareers({ id, data })
          .then((res) => {
            this.get_CadryCareers(this.$route.params.id, false);
            this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "Qo'shildi",
              life: 2000,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        employeeCarreer
          .update_CadryCareers({ id: this.career_id, data })
          .then((res) => {
            this.get_CadryCareers(this.$route.params.id, false);
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
    },
    deleteCareer(id) {
      employeeCarreer
        .delete_CadryCareers({ id })
        .then((res) => {
          this.get_CadryCareers(this.$route.params.id, false);
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

    controlDialog(item) {
      this.careerDialog = item;
    },
    controlBarLoader(item) {
      this.barLoader = item;
    },
  },
  created() {
    this.get_CadryCareers(this.$route.params.id, true);
  },
};
</script>
