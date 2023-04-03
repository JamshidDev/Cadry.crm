<template>
  <div class="grid">
    <div class="col-12 py-1 px-0 mb-6" v-show="stuffList.length == 0">
      <add-button
        :title="'Lavozim yo\'riqnomasi qo\'shish'"
        @click="addItemStuff()"
      ></add-button>
    </div>
    <div class="col-12 py-1 px-0" v-show="!stuffList.length == 0">
      <DataTable
        :value="stuffList"
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
                Lavozim yo'riqnomasi
              </h5>
            </div>
            <div class="col-6 flex justify-content-end align-items-center">
              <Button
                icon="pi pi-plus-circle"
                class="p-button-info p-button-sm"
                label="Qo'shish"
                v-tooltip.bottom="`Bilim yurtini qo'shish`"
                @click="addItemStuff()"
              />
            </div>
          </div>
        </template>
        <Column>
          <template #header>
            <div class="text-800 font-semibold">Izoh yoki nom</div>
          </template>
          <template #body="slotProps">
            <div class="text-left cursor-pointer font-semibold">
              {{ slotProps.data.comment }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 120px">
          <template #header>
            <div class="text-800 font-semibold">Ko'rish</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold flex justify-content-center">
              <view-button :file_Link="slotProps.data.file_staff"></view-button>
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
                @deleteAcceptEvent="deleteStuff($event)"
              ></delete-button>
            </div>
          </template>
        </Column>
      </DataTable>
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
            {{
              stuffDialogType ? "Ma'lumot qo'shish" : "Ma'lumotni tahrirlash"
            }}
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Izoh</h6>
            <Textarea
              class="w-full font-semibold"
              placeholder="Kiriting"
              :autoResize="true"
              rows="1"
              v-model="stuff_Comment"
            />
          </div>
          <div class="col-12">
            <h6 class="mb-2 pl-2 text-500">Fayl (.Pdf)</h6>
            <Button
              label="Fayl yuklash"
              icon="pi pi-cloud-upload"
              class="p-button-info p-button-sm w-full"
              @click="$refs.file.click()"
              :class="{ 'p-invalid': file_Error && submitted }"
            />
            <input
              v-show="false"
              type="file"
              ref="file"
              @change="uploadFile($event)"
              accept="application/pdf"
              
            />
            <h6 class="text-sm my-1 text-green-600" v-if="stuff_fileName">
              {{ stuff_fileName }}
            </h6>
            <h6 class="text-sm my-1 text-red-600" v-if="error_msg">
              {{ error_msg }}
            </h6>
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-end">
              <Button
                label="Saqlash"
                class="p-button-secondary p-button-sm"
                @click="addAndEditStuff()"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script>
import AddButton from '@/components/buttons/AddButton.vue';
import ViewButton from '@/components/buttons/ViewButton.vue';

import DeleteButton from '../../../components/buttons/DeleteButton.vue';
import EditButton from '../../../components/buttons/EditButton.vue';
import employeeStuff from '../../../service/servises/employeeStuff';
import formatter from '../../../util/formatter';

export default {
  props: {
    List: {
      type: Array,
      default: [],
    },
  },
  components: {
    EditButton,
    DeleteButton,
    ViewButton,
    AddButton,
  },
  data() {
    return {
      formatter,
      selectitem: null,
      stuffList: [],
      stuffDialogType: true,
      stuffDialog: false,
      stuff_Comment: "",
      stuff_file: null,
      stuff_id: null,
      stuff_fileName: null,
      submitted: false,
      error_msg: null,
    };
  },
  computed: {
    file_Error() {
      if (!this.stuff_file) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    deleteStuff() {
      this.$emit("deleteEvent", true);
    },
    get_Stuff(id) {
      employeeStuff
        .get_CadryStuff({ id })
        .then((res) => {
          this.stuffList = res.data.staff_files;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemStuff() {
      this.stuffDialogType = true;
      this.stuff_Comment = "";
      this.stuff_file = "";
      this.submitted = false;
      (this.error_msg = null),
        (this.stuff_fileName = null),
        this.controlStuffDialog(true);
    },
    uploadFile(event) {
      const { files } = event.target;
      let fileArray = files[0].name.split(".");
      let extention = fileArray[fileArray.length - 1];
      if (extention == "pdf" || extention == "PDF") {
        this.stuff_file = files[0];
        let sizeOfFile = files[0].size / (1024 * 1024);
        this.stuff_fileName = `${files[0].name} (${sizeOfFile} mb)`;
        this.error_msg = null;
      } else {
        this.error_msg = "Faqat pdf fayl yuklash mumkin";
      }
    },
    addAndEditStuff() {
      this.submitted = true;
      if (!this.file_Error) {
        
        let form = new FormData();
        form.append("comment", this.stuff_Comment);
        form.append("file_staff", this.stuff_file);
        let sizeOfFile = this.stuff_file.size / (1024 * 1024);
        if(sizeOfFile <=5){
          this.controlStuffDialog(false);
          employeeStuff
          .create_CadryStuff({ id: this.$route.params.id, form })
          .then((res) => {
            this.$toast.add({
              severity: "success",
              summary: "Muvofaqqiyatli bajarildi",
              detail: "Qo'shildi",
              life: 2000,
            });
            this.get_Stuff(this.$route.params.id);
          })
          .catch((error) => {
            console.log(error);
          });
        }else{
          this.error_msg = "Yuklangan fayl o'lchami 5mb dan oshmasligi shart";
        }
        
      } else {
        this.error_msg = "Fayl yuklanishi shart";
      }
    },
    deleteStuff(id) {
      employeeStuff
        .delete_CadryStuff({ id })
        .then((res) => {
          this.$toast.add({
            severity: "success",
            summary: "Muvofaqqiyatli bajarildi",
            detail: "O'chirildi",
            life: 2000,
          });
          this.get_Stuff(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    controlStuffDialog(item) {
      this.stuffDialog = item;
    },
  },
  created() {
    this.get_Stuff(this.$route.params.id);
  },
};
</script>
<style lang="">
</style>