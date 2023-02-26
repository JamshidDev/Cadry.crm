<template >
  <div class="grid card py-4" v-if="barLoader">
    <div class="col-12">
      <progress-bar-loader :min-height="'600px'"></progress-bar-loader>
    </div>
  </div>

  <div class="grid card xl:p-4 lg:p-2 pt-4 px-0" v-if="!barLoader">
    <!-- Med table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="medList.length==0">
      <add-button :title="'Tibbiy ko\'rik'" :text="true"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!medList.length==0">
      <DataTable
        :value="medList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Tibbiy ko'rik 
              </h5>
            </div>
            <div
              class="col-6 flex justify-content-end align-items-center"
            ></div>
          </div>
        </template>
        <Column style="min-width: 200px;">
          <template #header>
            <div class="text-800 font-semibold">Tibbiy ko'rik xulosasi</div>
          </template>
          <template #body="slotProps">
            <div class="text-left cursor-pointer font-semibold">
              {{ slotProps.data.result }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">O'tgan sanasi</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date1) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Keyingi sanasi</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date2) }}
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
                @editEvent="editItemMed($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemMed($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

     <!-- Vacation table -->
     <div class="col-12 py-1 px-0 mb-6" v-show="VacationList.length==0">
      <add-button :title="'Ta\'tillar'" :text="true"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!VacationList.length==0">
      <DataTable
        :value="VacationList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Ta'tillar
              </h5>
            </div>
            <div
              class="col-6 flex justify-content-end align-items-center"
            ></div>
          </div>
        </template>
        <Column style="min-width: 200px;">
          <template #header>
            <div class="text-800 font-semibold">Ta'til turi</div>
          </template>
          <template #body="slotProps">
            <div class="text-left cursor-pointer font-semibold">
              {{ slotProps.data.status_decret==0? "Mehnat ta'tili" : "Bola parvarishlash ta'tili" }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Qachondan</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date1) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Qachongacha</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date2) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 200px; width: 240px">
          <template #header>
            <div class="text-800 font-semibold">Ta'til davri</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{slotProps.data.period1? formatter.arrowDateFormat(slotProps.data.period1) : ""}} <span class="mx-3"></span> {{slotProps.data.period2? formatter.arrowDateFormat(slotProps.data.period2) : ""}}
             </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 100px; width: 150px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div class="flex gap-2">
            
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteVacation($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- VacationDate table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="Vacation_date_list.length==0">
      <add-button :title="'Ta\'til muddati'" :text="true"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!Vacation_date_list.length==0">
      <DataTable
        :value="Vacation_date_list"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Ta'til muddatlari
              </h5>
            </div>
            <div
              class="col-6 flex justify-content-end align-items-center"
            ></div>
          </div>
        </template>
        <!-- <Column style="min-width: 200px;">
          <template #header>
            <div class="text-800 font-semibold">Ta'til turi</div>
          </template>
          <template #body="slotProps">
            <div class="text-left cursor-pointer font-semibold">
              {{ slotProps.data.status_decret==0? "Mehnat ta'tili" : "Bola parvarishlash ta'tili" }}
            </div>
          </template>
        </Column> -->
        <Column style="min-width: 100px;">
          <template #header>
            <div class="text-800 font-semibold">Sana</div>
          </template>
          <template #body="slotProps">
            <div class="text-800 font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date1) }}
            </div>
          </template>
        </Column>
        <!-- <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-medium text-sm">Muddati</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{ formatter.arrowDateFormat(slotProps.data.date2) }}
            </div>
          </template>
        </Column> -->
        <Column style="min-width: 200px; width: 240px">
          <template #header>
            <div class="text-800 font-semibold">Ta'til davri</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              {{slotProps.data.period1? formatter.arrowDateFormat(slotProps.data.period1) : ""}} <span class="mx-3"></span> {{slotProps.data.period2? formatter.arrowDateFormat(slotProps.data.period2) : ""}}
             </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 100px; width: 150px">
          <template #header>
            <div class="text-800 font-semibold">Amallar</div>
          </template>
          <template #body="slotProps">
            <div v-show="false">
            
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteVacation($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    

    <!--Punishment table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="punishmentList.length==0">
      <add-button :title="'Intizomiy jazo qo\'shish'" @click="addItemPunishment()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!punishmentList.length==0">
      <DataTable
        :value="punishmentList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Intizomiy jazo
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItemPunishment()"
              />
            </div>
          </div>
        </template>
        <Column  style="min-width: 200px;">
          <template #header>
            <div class="text-800 font-semibold"> Jazo sababi</div>
          </template>
          <template #body="slotProps">
            <div class="text-left pl-2 cursor-pointer font-semibold">
              {{ slotProps.data.reason_punishment }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 200px; width: 300px">
          <template #header>
            <div class="text-800 font-semibold">Jazo turi</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.type_punishment }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Sanasi</div>
          </template>
          <template #body="slotProps">
            <div class="text-center cursor-pointer font-semibold">
              {{ formatter.arrowDateFormat(slotProps.data.date_punishment) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold"> Prikaz nomer</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.command_number }}
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
                @editEvent="editItemPunishment($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="deleteItemPunishment($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>



    <!-- Incentive table -->
    <div class="col-12 py-1 px-0 mb-6" v-show="incentiveList.length==0">
      <add-button :title="'Rag\'batlantirish qo\'shish'" @click="addItemIncentive()"></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!incentiveList.length==0">
      <DataTable
        :value="incentiveList"
        dataKey="id"
        :paginator="false"
        responsiveLayout="scroll"
        showGridlines
        class="pb-6 p-datatable-sm"
      >
        <template #header>
          <div class="grid">
            <div class="col-6">
              <h5
                class="text-base md:m-0 p-as-md-center uppercase text-blue-600"
              >
                Rag'batlantirish
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItemIncentive()"
              />
            </div>
          </div>
        </template>
        <Column style="min-width: 200px;">
          <template #header>
            <div class="text-800 font-semibold">Kim tomonidan</div>
          </template>
          <template #body="slotProps">
            <div class="text-left cursor-pointer font-semibold">
              {{ slotProps.data.by_whom }}
            </div>
          </template>
        </Column>

        <Column style="min-width: 200px; width: 500px">
          <template #header>
            <div class="text-800 font-semibold">Rag'bat sababi</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.reason_incentive }}
            </div>
          </template>
        </Column>
       
        <Column style="min-width: 200px; width: 300px">
          <template #header>
            <div class="text-800 font-semibold">Rag'bat turi</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.type_incentive }}
            </div>
          </template>
        </Column>
      
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Sanasi</div>
          </template>
          <template #body="slotProps">
            <div class="text-center cursor-pointer font-semibold">
              {{ formatter.textDateFormat(slotProps.data.incentive_date) }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Buyruq raqami</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold">
              {{ slotProps.data.command_number }}
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
                @editEvent="editItemIncentive($event)"
              ></edit-button>
              <delete-button
                :deleteItem="slotProps.data.id"
                @deleteAcceptEvent="delete_Incentive($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>




    <div class="col-12 p-0">
      <stuff-component></stuff-component>
    </div>

    <div class="col-12 p-0">
      <pasport-component></pasport-component>
    </div>



    <!-- Punishment Dialog -->
    <div class="col-12">
      <Dialog
        v-model:visible="punishmentDialog"
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
              punishmentDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Prikaz Nomer</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="punishment_number"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="passportDate"
              v-model="punishment_date"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              dateFormat="dd/mm/yy"
              :showButtonBar="true"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Jazo turi</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="punishment_type"
            />
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Jazo sababi</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model="punishment_reason"
              :autoResize="true"
              rows="1"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditPunishment()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
    <!-- Incentive Dialog -->
    <div class="col-12">
      <Dialog
        v-model:visible="incentiveDialog"
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
              incentiveDialogType
                ? "Ma'lumot qo'shish"
                : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Kim tomonidan</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="incentive_byWhom"
            />
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Buyruq raqami</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="incentive_command_number"
            />
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="passportDate"
              v-model="incentive_incentive_date"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              dateFormat="dd/mm/yy"
              :showButtonBar="true"
            />
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Rag'bat turi</h6>
            <InputText
              type="text"
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="incentive_type_incentive"
            />
          </div>

          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Rag'bat sababi</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              v-model="incentive_reason_incentive"
              :autoResize="true"
              rows="1"
            />
          </div>
          <div class="col-12">
            <Checkbox inputId="binary" v-model="incentive_status" :binary="true" />
            <label class="pl-2" for="binary">Davlat mukofati sifatida qo'shilsin </label>
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditIncenstive()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>

    <div class="col-12">
      <!-- Med dialog -->
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
            Tibbiy ko'rik hulosasini tahrilash
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Oxirgi o'tgan sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="positionFirstDate"
              v-model="med_date1"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-6">
            <h6 class="mb-2 pl-2 text-500">Keyingi o'tish sanasi</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              v-model="med_date2"
              dateFormat="dd/mm/yy"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Izoh</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              id="employeePhone"
              v-model="med_comment"
              :autoResize="true"
              rows="1"
            />
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="updateMed()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import DeleteButton from '@/components/buttons/DeleteButton.vue'
import EditButton from '@/components/buttons/EditButton.vue'
import ViewButton from '@/components/buttons/ViewButton.vue'
import formatter from '@/util/formatter'
import ProgressBarLoader from '@/components/loaders/ProgressBarLoader.vue'
import employeeAdditionalService from '@/service/servises/employeeAdditionalService'
import employeeIncentiveService from '@/service/servises/employeeIncentiveService'
import employeeMed from '@/service/servises/employeeMed'
import VacationService from '@/service/servises/VacationService'
import AddButton from '@/components/buttons/AddButton.vue'
import PasportComponent from '@/views/Cadry/Components/PasportComponent.vue'
import StuffComponent from '../Components/StuffComponent.vue'
import VacationDate from '@/service/servises/VacationDate'

export default {
  components: {
    DeleteButton,
    EditButton,
    ViewButton,
    ProgressBarLoader,
    AddButton,
    PasportComponent,
    StuffComponent,
  },

  data() {
    return {
      formatter,
      barLoader: false,

      punishmentList: [],
      punishmentDialogType: true,
      punishmentDialog: false,
      punishment_number: "",
      punishment_date: "",
      punishment_type: "",
      punishment_reason: "",
      punishment_id: null,

      incentiveList: [],
      incentiveDialogType: true,
      incentiveDialog: false,
      incentive_byWhom: "",
      incentive_command_number: "",
      incentive_incentive_date: "",
      incentive_type_incentive: "",
      incentive_reason_incentive: "",
      incentive_id: null,
      incentive_status: false,

      med_dialog:false,
      med_id:null,
      med_date1:null,
      med_date2:null,
      med_comment:null,
      medList: [],

      VacationList:[],

      Vacation_date_list:[],
    };
  },
  methods: {
    get_punishment(id, loader) {
      this.controlLoader(loader);
      employeeAdditionalService
        .get_CadryPunishment({ id })
        .then((res) => {
          this.punishmentList = res.data.punishments;

          this.controlLoader(false);
        })
        .catch((error) => {
          this.controlLoader(false);
          console.log(error);
        });
    },
    addItemPunishment() {
      this.punishmentDialogType = true;
      this.punishment_number = "";
      this.punishment_date = "";
      this.punishment_type = "";
      this.punishment_reason = "";
      this.controlPunishmentDialog(true);
    },
    editItemPunishment(event) {
      this.punishment_id = event.id;
      this.punishmentDialogType = false;
      this.punishment_number = event.command_number;
      this.punishment_date = formatter.interDateFormatter(
        event.date_punishment
      );
      this.punishment_type = event.type_punishment;
      this.punishment_reason = event.reason_punishment;

      this.controlPunishmentDialog(true);
    },

    addAndEditPunishment() {
      this.controlPunishmentDialog(false);
      let data = {
        command_number: this.punishment_number,
        date_punishment: formatter.outDateFormatter(this.punishment_date),
        type_punishment: this.punishment_type,
        reason_punishmend: this.punishment_reason,
      };
      if (this.punishmentDialogType) {
        employeeAdditionalService
          .create_CadryPunishment({ id: this.$route.params.id, data })
          .then((res) => {
            this.get_punishment(this.$route.params.id, false);
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
        employeeAdditionalService
          .update_CadryPunishment({ id: this.punishment_id, data })
          .then((res) => {
            this.get_punishment(this.$route.params.id, false);
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

    deleteItemPunishment(id) {
      employeeAdditionalService
        .delete_CadryPunishment({ id })
        .then((res) => {
          this.get_punishment(this.$route.params.id, false);
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

    get_Incentive(id, loader) {
      employeeIncentiveService
        .get_CadryIncentive({ id })
        .then((res) => {
          this.incentiveList = res.data.incentives;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addItemIncentive() {
      this.incentiveDialogType = true;
      this.incentive_byWhom = "";
      this.incentive_command_number = "";
      this.incentive_incentive_date = "";
      this.incentive_type_incentive = "";
      this.incentive_reason_incentive = "";
      this.incentive_status =false;
      this.controlIncentiveDialog(true);
    },

    editItemIncentive(event) {
      this.incentiveDialogType = false;
      this.incentive_id = event.id;
      this.incentive_byWhom = event.by_whom;
      this.incentive_command_number = event.command_number;
      this.incentive_incentive_date = formatter.interDateFormatter(
        event.incentive_date
      );
      this.incentive_type_incentive = event.type_incentive;
      this.incentive_reason_incentive = event.reason_incentive;
      this.incentive_status =event.status==1;
      this.controlIncentiveDialog(true);
    },

    addAndEditIncenstive() {
      this.controlIncentiveDialog(false);
      let data = {
        by_whom: this.incentive_byWhom,
        command_number: this.incentive_command_number,
        incentive_date: formatter.outDateFormatter(
          this.incentive_incentive_date
        ),
        type_incentive: this.incentive_type_incentive,
        reason_incentive: this.incentive_reason_incentive,
        status: this.incentive_status,
      };

      if (this.incentiveDialogType) {
        employeeIncentiveService
          .create_CadryIncentive({ id: this.$route.params.id, data })
          .then((res) => {
            this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "Qo'shildi",
            life: 2000,
          });
            this.get_Incentive(this.$route.params.id);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        employeeIncentiveService
          .update_CadryIncentive({ id: this.incentive_id, data })
          .then((res) => {
            this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "Tahrirlandi",
            life: 2000,
          });
            this.get_Incentive(this.$route.params.id);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    delete_Incentive(id) {
      employeeIncentiveService
        .delete_CadryIncentive({ id })
        .then((res) => {
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "O'chirildi",
            life: 2000,
          });
          this.get_Incentive(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_cadryMed(id) {
      employeeMed
        .get_CadryMed({ id })
        .then((res) => {
          this.medList = res.data.meds;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItemMed(event){
      this.med_id = event.id;
      this.med_date1 =formatter.interDateFormatter(event.date1);
      this.med_date2 =formatter.interDateFormatter(event.date2);
      this.med_comment = event.result;
      this.med_dialog= true;
    },

    updateMed(){
      this.med_dialog= false;
      let data ={
        date1:formatter.outDateFormatter(this.med_date1),
        date2:formatter.outDateFormatter(this.med_date2),
        result:this.med_comment,
      }
      employeeMed.update_CadryMed({id:this.med_id, data}).then((res)=>{
        this.get_cadryMed(this.$route.params.id);
        this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "Tahrirlandi",
            life: 2000,
          });
      })
    },

    deleteItemMed(id) {
      employeeMed
        .delete_CadryMed({ id })
        .then((res) => {
          this.get_cadryMed(this.$route.params.id);
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

    get_vacationList(id){
      VacationService.get_CadryVacationList({id}).then((res)=>{
        this.VacationList = res.data.vacations
      })
    },

    deleteVacation(id){
      VacationService.delete_CadryVacationList({id}).then((res)=>{
        this.get_vacationList(this.$route.params.id)
        this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "O'chirildi",
            life: 2000,
          });
      })
    },
    get_VacationDate(){
      VacationDate.get_Cadry_Vacation_Date({cadry_id:this.$route.params.id}).then((res)=>{
        this.Vacation_date_list = res.data.vacation_cadries;

      })
    },

    controlPunishmentDialog(item) {
      this.punishmentDialog = item;
    },

    controlIncentiveDialog(item) {
      this.incentiveDialog = item;
    },


    controlLoader(item) {
      this.barLoader = item;
    },
  },

  created() {
    this.get_cadryMed(this.$route.params.id);
    this.get_Incentive(this.$route.params.id);
    this.get_vacationList(this.$route.params.id)
    this.get_punishment(this.$route.params.id, true);
    this.get_VacationDate();
  },
};
</script>