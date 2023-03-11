<template >
  <div class="grid py-4 px-3">
    <!-- Page header details -->
    <div class="col-12">
      <div class="grid">
        <div class="col-12 pb-0">
          <bread-crumb
            :breadCump="[{ name: 'Xodimlar', path: '/admin/partemployee' }, { name: 'Yangi xodim', path: '' }]"></bread-crumb>
        </div>
        <div class="col-12 y-0 py-0">
          <span class="text-2xl font-semibold">Yangi xodim ma'lumotlari

          </span>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="grid">
        <div class="col-12">
          <div class="grid">
            <div class="col-12 flex justify-content-end py-0">
              <Button icon="pi pi-search" class="p-button-green p-button-sm mr-2"
                v-tooltip.bottom="`Xodimning mavjudligini tekshirish`" @click="checkCadryByJSHR()" />
              <Button icon="pi pi-save" @click="addEmployee(!v$.$invalid)" class="p-button-secondary p-button-sm"
                label="Saqlash" v-tooltip.bottom="`Ma'lumotlarni saqlash`" />
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="col-12 surface-0 py-6 ">
      <div class="grid">
        <!-- Personal imformation details -->
        <div class="col-12">
          <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">

            <!-- avatar -->
            <div class="col-12 flex justify-content-center mb-4">
              <div class="employee-avatar-box">
                <div class="img-box" @click="$refs.file.click()"
                  :class="{ 'img-box-invalid': submitted_blob && !cropper_blob }">
                  <img v-if="!image.src" class="employee-avatar" src="../assets/avatar/empty-avatar.jpg" alt="" />
                  <img v-if="image.src" class="employee-avatar" :src="image.src" alt="" />
                  <div class="hover-element">
                    <i class="pi pi-cloud-upload"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- firstName, lastname, thirdName -->
            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2">Familiya</h6>
                  <InputText id="new_cadry_lastname" type="text" class="w-full font-semibold" placeholder="Kiriting"
                    v-model="v$.lastName.$model" :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2">Ism</h6>
                  <InputText type="text" class="w-full font-semibold" placeholder="Ismni kiriting"
                    id="new_cadry_firstname" v-model="v$.firstName.$model"
                    :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2">Sharif</h6>
                  <InputText type="text" id="new_cadry_thirdName" v-model="v$.thirdName.$model"
                    :class="{ 'p-invalid': v$.thirdName.$invalid && submitted }" class="w-full font-semibold"
                    placeholder="Sharifni kiriting" />
                </div>
              </div>
            </div>

            <!-- bornDate, bornRegion, bornDistrict -->
            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2">Tug'ilgan sanasi (kun-oy-yil)</h6>
                  <Calendar class="w-full font-semibold" :manualInput="true" id="new_cadry_bornDate"
                    v-model="v$.bornDate.$model" v-maska="'##/##/####'"
                    :class="{ 'p-invalid': v$.bornDate.$invalid && submitted }" dateFormat="dd/mm/yy"
                    :showButtonBar="true" placeholder="Sanani tanlang" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2">Tug'ilgan viloyati</h6>
                  <Dropdown id="new_cadry_bornRegion" v-model="v$.bornRegion.$model"
                    :class="{ 'p-invalid': v$.bornRegion.$invalid && submitted }" :options="RegionsList"
                    optionLabel="name" optionValue="id" placeholder="Viloyatni tanlang" class="w-full font-semibold" />
                </div>
                <div class="col-12 p-fluid">
                  <h6 class="mb-2">Tug'ilgan tumani</h6>
                  <Dropdown id="new_cadry_bornDistric" v-model="v$.bornDistric.$model"
                    :class="{ 'p-invalid': v$.bornDistric.$invalid && submitted }" :options="DistrictList"
                    optionLabel="name" :filter="true" placeholder="Tumanni tanlang" class="w-full font-semibold">
                    <template #value="slotProps">
                      <div class="country-item country-item-value" v-if="slotProps.value">
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
              </div>
            </div>

            <!-- liveRegion, liveDistrict, livestreet -->
            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12 p-fluid">
                  <h6 class="mb-2">Yashash viloyati</h6>
                  <Dropdown id="new_cadry_adressRegion" v-model="v$.adressRegion.$model"
                    :class="{ 'p-invalid': v$.adressRegion.$invalid && submitted }" :options="RegionsList"
                    optionLabel="name" optionValue="id" placeholder="Viloyatni tanlang" class="w-full" />
                </div>
                <div class="col-12 p-fluid">
                  <h6 class="mb-2">Yashash tumani</h6>
                  <Dropdown id="new_cadry_adressDistrict" v-model="v$.adressDistrict.$model" :class="{
                    'p-invalid': v$.adressDistrict.$invalid && submitted,
                  }" :options="DistrictList" optionLabel="name" :filter="true" placeholder="Tumanni tanlang"
                    class="w-full">
                    <template #value="slotProps">
                      <div class="country-item country-item-value" v-if="slotProps.value">
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
                  <h6 class="mb-2 pl-2">Qo'shimcha manzil</h6>
                  <InputText type="text" class="w-full" placeholder="Ko'cha va uy manzili" id="new_cadry_adressStreet"
                    v-model="v$.adressStreet.$model" :class="{ 'p-invalid': v$.adressStreet.$invalid && submitted }" />
                </div>
              </div>
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12 p-fluid">
                  <h6 class="mb-2 pl-2">Jinsi</h6>
                  <Dropdown id="new_cadry_Gender" v-model="v$.employeeGender.$model" :class="{
                    'p-invalid': v$.employeeGender.$invalid && submitted,
                  }" :options="genderList" optionLabel="name" optionValue="id" placeholder="Jinsini tanlang"
                    class="w-full" />
                </div>
                <div class="col-12 p-fluid">
                  <h6 class="mb-2 pl-2">Telefon raqam</h6>
                  <InputText type="text" class="w-full" placeholder="Raqamni kiriting" id="new_cadry_employeePhone"
                    v-model="v$.employeePhone.$model" v-maska="'(##)-###-##-##'"
                    :class="{ 'p-invalid': v$.employeePhone.$invalid && submitted }" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Millati</h6>
                  <Dropdown id="new_cadry_employeeNation" v-model="v$.employeeNation.$model" :class="{
                    'p-invalid': v$.employeeNation.$invalid && submitted,
                  }" :options="NationalityList" optionLabel="name" optionValue="id" placeholder="Millatni tanlang"
                    class="w-full" />
                </div>
              </div>
            </div>


          </div>
        </div>

        <!-- Person pasport details -->

        <div class="col-12">
          <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">
            <div class="col-12 text-500 text-left text-base font-medium uppercase mb-0">
              Pasport ma'lumotlari
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Pasport seriyasi</h6>
              <InputText type="text" class="w-full" placeholder="Seriyani kiriting" id="new_cadry_passportSeriya"
                v-model="v$.passportSeriya.$model"
                :class="{ 'p-invalid': v$.passportSeriya.$invalid && submitted }" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Pasport JSHR</h6>
              <InputText type="text" class="w-full" placeholder="JSHR raqami" id="new_cadry_passportJSHR"
                v-model="v$.passportJSHR.$model" v-maska="'##############'"
                :class="{ 'p-invalid': v$.passportJSHR.$invalid && submitted }" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Berilgan viloyat</h6>
              <Dropdown id="new_cadry_passportRegion" v-model="v$.passportRegion.$model"
                :class="{ 'p-invalid': v$.passportRegion.$invalid && submitted }" :options="RegionsList"
                optionLabel="name" optionValue="id" placeholder="Viloyatni tanlang" class="w-full" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Berilgan tuman</h6>
              <Dropdown id="new_cadry_passportDistrict" v-model="v$.passportDistrict.$model"
                :class="{ 'p-invalid': v$.passportDistrict.$invalid && submitted }" :options="DistrictList"
                optionLabel="name" :filter="true" placeholder="Tumanni tanlang" class="w-full">
                <template #value="slotProps">
                  <div class="country-item country-item-value" v-if="slotProps.value">
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

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Berilgan sana</h6>
              <Calendar class="w-full" :manualInput="true" id="new_cadry_passportDate" v-model="v$.passportDate.$model"
                :class="{ 'p-invalid': v$.passportDate.$invalid && submitted }" v-maska="'##/##/####'"
                placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true" />
            </div>
          </div>
        </div>

        <!-- Position information details -->

        <div class="col-12">
          <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">
            <div class="col-12 text-left text-base font-medium text-500 uppercase">
              Lavozim ma'lumotlari
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Lavozim sanasi</h6>
              <Calendar class="w-full" :manualInput="true" id="new_cadry_positionDate" v-model="v$.positionDate.$model"
                :class="{ 'p-invalid': v$.positionDate.$invalid && submitted }" v-maska="'##/##/####'"
                placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Bo'lim nomi</h6>
              <Dropdown id="new_cadry_positionPart" v-model="v$.positionPart.$model"
                :class="{ 'p-invalid': v$.positionPart.$invalid && submitted }" :options="DepartmentList"
                optionLabel="name" :filter="true" placeholder="Bo'limni tanlang" class="w-full"
                @change="changeDepartment">
                <template #value="slotProps">
                  <div class="country-item country-item-value" v-if="slotProps.value">
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

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Shtat lavozimi</h6>
              <Dropdown id="new_cadry_positionName" v-model="v$.positionName.$model"
                :class="{ 'p-invalid': v$.positionName.$invalid && submitted }" :options="StuffList"
                optionLabel="staff_fullname" :filter="true" placeholder="Shtat lavozimni tanlang" class="w-full">
                <template #value="slotProps">
                  <div class="country-item country-item-value" v-if="slotProps.value">
                    <div>{{ slotProps.value.staff_fullname }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="country-item">
                    <div>{{ slotProps.option.staff_fullname }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Birinchi lavozim sanasi (O'TY)</h6>
              <Calendar class="w-full" :manualInput="true" id="new_cadry_positionFirstDate"
                v-model="v$.positionFirstDate.$model" :class="{ 'p-invalid': v$.positionFirstDate.$invalid && submitted }"
                dateFormat="dd/mm/yy" v-maska="'##/##/####'" placeholder="Sanani tanlang" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Xizmat darajasi</h6>
              <Dropdown id="new_cadry_positionDegree" v-model="v$.positionDegree.$model"
                :class="{ 'p-invalid': v$.positionDegree.$invalid && submitted }" :options="PositionDegreeList"
                optionLabel="name" optionValue="id" placeholder="Darajani tanlang" class="w-full" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Stavka</h6>
              <InputText type="number" id="new_cadry_stavka" class="w-full" placeholder="Kiriting"
                v-model="v$.positionAmount.$model" :class="{ 'p-invalid': v$.positionAmount.$invalid && submitted }" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Buyruq raqami</h6>
              <InputText type="text" class="w-full" placeholder="Kiriting" v-model="v$.command_number.$model"
                :class="{ 'p-invalid': v$.command_number.$invalid && submitted }" id="new_cadry_orderNumber" />
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Karta raqami</h6>
              <InputText type="number" class="w-full" placeholder="Kiriting" v-model="order" id="new_cadry_cardNumber" />
            </div>
            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <h6 class="mb-2 pl-2">Tabel raqami</h6>
              <InputText type="number" class="w-full" placeholder="Kiriting" v-model="status_dec"
                id="new_cadry_tabelNumber" />
            </div>


          </div>
        </div>

        <!-- Academic information details -->

        <div class="col-12">
          <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">
            <div class="col-12 text-500 text-left text-base font-medium uppercase ">
              Akademik ma'lumotlari
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Malumoti</h6>
                  <Dropdown id="new_cadry_academic" v-model="v$.academic.$model"
                    :class="{ 'p-invalid': v$.academic.$invalid && submitted }" :options="EducationList"
                    optionLabel="name" optionValue="id" placeholder="Malumoti tanlang" class="w-full" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Ilmiy darajasi</h6>
                  <Dropdown id="new_cadry_academicDegree" v-model="v$.academicDegree.$model" :class="{
                    'p-invalid': v$.academicDegree.$invalid && submitted,
                  }" :options="AcademicDegreeList" optionLabel="name" optionValue="id" placeholder="Darajani tanlang"
                    class="w-full" />
                </div>

                <div class="col-12">
                  <h6 class="mb-2 pl-2">Ilmiy unvoni</h6>
                  <Dropdown id="new_cadry_academicTitle" v-model="v$.academicTitle.$model"
                    :class="{ 'p-invalid': v$.academicTitle.$invalid && submitted }" :options="AcademicList"
                    optionLabel="name" optionValue="id" placeholder="Unvonni tanlang" class="w-full" />
                </div>
              </div>
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2 pl-2 text-500">Chet tillari</h6>
                  <MultiSelect class="w-full font-semibold" v-model="v$.employeeLanguage.$model" :class="{
                    'p-invalid': v$.employeeLanguage.$invalid && submitted,
                  }" :options="LanguageList" optionLabel="name" placeholder="Tilni tanlang" />
                </div>
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Partiyaviyligi</h6>
                  <Dropdown id="new_cadry_employeeParty" v-model="v$.employeeParty.$model"
                    :class="{ 'p-invalid': v$.employeeParty.$invalid && submitted }" :options="PartList"
                    optionLabel="name" optionValue="id" placeholder="Partiyani tanlang" class="w-full" />
                </div>

                <div class="col-12">
                  <h6 class="mb-2 pl-2 text-500">Pochta manzili</h6>
                  <InputText type="text" class="w-full font-semibold" placeholder="Kiritng" id="email" v-model="gmail" />
                </div>
              </div>
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Xarbiy unvoni</h6>
                  <InputText type="text" class="w-full" placeholder="Unvonni kiriting"
                    id="new_cadry_employeeMilitaryTitle" v-model="v$.employeeMilitaryTitle.$model" :class="{
                      'p-invalid': v$.employeeMilitaryTitle.$invalid && submitted,
                    }" />
                </div>
                <div class="col-12 pt-6 pb-3">
                  <Checkbox inputId="binary" v-model="inostrans" :binary="true" />
                  <span class="pl-4 text-500 text-base font-medium">Xorij fuqarosi</span>
                </div>
                <div class="col-12">
                  <h6 class="mb-2 pl-2 text-500">Tugash mudati</h6>
                  <Calendar class="w-full font-semibold" :manualInput="true" id="date_inostrans" v-model="date_inostrans"
                    v-maska="'##/##/####'" placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true"
                    :disabled="!inostrans" />
                </div>
              </div>
            </div>

            <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-12">
                  <h6 class="mb-2 pl-2">Saylangan organlarga a'zoligi</h6>
                  <InputText type="text" class="w-full" placeholder="Azoligini kiriting"
                    id="new_cadry_employeeSelectedOrgan" v-model="v$.employeeSelectedOrgan.$model" :class="{
                      'p-invalid': v$.employeeSelectedOrgan.$invalid && submitted,
                    }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="col-12">
      <Dialog v-model:visible="cropperDialog" :style="{ width: '380px' }" :modal="true" class="bg-blue-700"
        :closable="false">
        <template #header>
          <h6 class="font-semibold flex uppercase">Rasmni tekislash</h6>
        </template>
        <cropper ref="croppers" class="cropper" :stencil-props="{
          aspectRatio: 3 / 4,
        }" :src="image.src" :autoZoom="true" />
        <template #footer>
          <div class="flex justify-content-between">
            <Button label="Bekor qilish" @click="controlCopper(false)" class="p-button-danger p-button-sm" />
            <Button label="Tasdiqlash" @click="uploadAvatar()" class="p-button-secondary p-button-sm" />
          </div>
        </template>
      </Dialog>
    </div>
    <div class="col-12">
      <input v-show="false" type="file" ref="file" @change="uploadImage($event)" accept="image/*" />

      <success-alert ref="success_alert"></success-alert>
      <warning-alert ref="warning_alert"></warning-alert>
      <Toast position="bottom-right" group="br" />
    </div>
  </div>
</template>
<script>
import avatar from '../assets/avatar/empty-avatar.jpg'
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
import WarningAlert from "../components/Alerts/WarningAlert.vue";
import employeeAdd from "../service/servises/employeeAdd";
import { globalValidate } from "../validation/vuevalidate";
import Formatter from "../util/formatter";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { Cropper } from "vue-advanced-cropper";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb.vue";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    SuccessAlert,
    WarningAlert,
    Cropper,
    BreadCrumb,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      Formatter,
      cropperDialog: false,
      image: {
        src: null,
        type: "image/jpg",
      },
      cropper_blob: null,
      submitted_blob: false,
      firstName: "",
      lastName: "",
      thirdName: "",
      bornDate: "",
      bornRegion: null,
      bornDistric: null,
      adressRegion: null,
      adressDistrict: null,
      adressStreet: "",

      passportSeriya: "",
      passportJSHR: " ",
      passportRegion: null,
      passportDistrict: null,
      passportDate: "",

      positionDate: "",
      positionPart: null,
      positionName: null,
      positionAmount: '1',
      positionFirstDate: "",
      positionDegree: null,

      academic: null,
      academicDegree: null,
      academicTitle: null,
      employeeNation: null,
      employeeLanguage: null,
      employeeParty: null,
      employeeGender: null,
      employeePhone: "",
      employeeMilitaryTitle: "",
      employeeSelectedOrgan: "yo'q",
      command_number: null,
      order: null,
      status_dec: null,
      gmail: null,
      inostrans: false,
      date_inostrans: null,



      RegionsList: [],
      DistrictList: [],
      DepartmentList: [],
      NationalityList: [],
      LanguageList: [],
      AcademicList: [],
      AcademicDegreeList: [],
      PartList: [],
      EducationDegreeList: [],
      EducationList: [],
      PositionDegreeList: [],
      StuffList: [],
      genderList: [
        {
          name: "Erkak",
          id: 1,
        },
        {
          name: "Ayol",
          id: 0,
        },
      ],

      submitted: false,
      displayResponsive: false,
      succesDialog: false,

      position_department: "",
      position_stuff: "",
    };
  },
  countryService: null,

  validations() {
    return {
      firstName: globalValidate.firtName,
      lastName: globalValidate.lastName,
      thirdName: globalValidate.thirdName,
      bornDate: globalValidate.bornDate,
      bornRegion: globalValidate.bornRegion,
      bornDistric: globalValidate.bornDistric,
      adressRegion: globalValidate.adressRegion,
      adressDistrict: globalValidate.adressDistrict,
      adressStreet: globalValidate.adressStreet,

      passportSeriya: globalValidate.passportSeriya,
      passportJSHR: globalValidate.passportJSHR,
      passportRegion: globalValidate.passportRegion,
      passportDistrict: globalValidate.passportDistrict,
      passportDate: globalValidate.passportDate,

      positionDate: globalValidate.positionDate,
      positionPart: globalValidate.positionPart,
      positionName: globalValidate.positionName,
      positionFirstDate: globalValidate.positionFirstDate,
      positionDegree: globalValidate.positionDegree,
      positionAmount: globalValidate.positionAmount,
      command_number: globalValidate.command_number,

      academic: globalValidate.academic,
      academicDegree: globalValidate.academicDegree,
      academicTitle: globalValidate.academicTitle,
      employeeNation: globalValidate.employeeNation,
      employeeLanguage: globalValidate.employeeLanguage,
      employeeParty: globalValidate.employeeParty,
      employeeGender: globalValidate.employeeGender,
      employeePhone: globalValidate.employeePhone,
      employeeMilitaryTitle: globalValidate.employeeMilitaryTitle,
      employeeSelectedOrgan: globalValidate.employeeSelectedOrgan,
    };
  },
  watch: {
    employeeLanguage(value) {
      console.log(value);
    }
  },
  methods: {
    get_AddInfo() {
      employeeAdd
        .get_AddInfo()
        .then((res) => {
          this.RegionsList = res.data.regions;
          this.DistrictList = res.data.cities;
          this.DepartmentList = res.data.departments;
          this.NationalityList = res.data.nationalities;
          this.AcademicDegreeList = res.data.academicdegree;
          this.AcademicList = res.data.academictitlies;
          this.EducationDegreeList = res.data.worklevels;
          this.PartList = res.data.parties;
          this.LanguageList = res.data.languages;
          this.PositionDegreeList = res.data.worklevels;
          this.EducationList = res.data.educations;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addEmployee(isFormValid) {
      this.submitted = true;
      this.submitted_blob = true;
      if (isFormValid && this.cropper_blob) {
        let language_ids = [];
        this.employeeLanguage.forEach((item) => {
          language_ids.push(item.id);
        });
        console.log(language_ids);
        let form = new FormData();
        form.append("photo", this.cropper_blob, "avatar.jpg");
        form.append("last_name", this.lastName)
        form.append("first_name", this.firstName)
        form.append("middle_name", this.thirdName)
        form.append("birht_date", Formatter.outDateFormatter(this.bornDate))
        form.append("birth_city_id", this.bornDistric.id)
        form.append("birth_region_id", this.bornRegion)
        form.append("address_region_id", this.adressRegion)
        form.append("address_city_id", this.adressDistrict.id)
        form.append("address", this.adressStreet)
        form.append("pass_region_id", this.passportRegion)
        form.append("pass_city_id", this.passportDistrict.id)
        form.append("jshshir", this.passportJSHR)
        form.append("passport", this.passportSeriya)
        form.append("pass_date", Formatter.outDateFormatter(this.passportDate))
        form.append("job_date", Formatter.outDateFormatter(this.positionFirstDate))
        form.append("post_date", Formatter.outDateFormatter(this.positionDate))
        form.append("worklevel_id", this.positionDegree)
        form.append("department_id", this.positionPart.id)
        form.append("staff_id", this.positionName.id)
        form.append("stavka", this.positionAmount)
        form.append("education_id", this.academic)
        form.append("academictitle_id", this.academicTitle)
        form.append("academicdegree_id", this.academicDegree)
        form.append("nationality_id", this.employeeNation)
        form.append("language", language_ids)
        form.append("party_id", this.employeeParty)
        form.append("military_rank", this.employeeMilitaryTitle)
        form.append("deputy", this.employeeSelectedOrgan)
        form.append("phone", this.employeePhone)
        form.append("last_name", this.lastName)

        form.append("command_number", this.command_number)
        form.append("order", this.order)
        form.append("status_dec", this.status_dec)

        form.append("gmail", this.gmail? this.gmail : '' )
        form.append("inostrans", this.inostrans ? 1 : 0)
        form.append("date_inostrans", this.inostrans ? Formatter.outDateFormatter(this.date_inostrans) : '')



        console.table(form);

        employeeAdd.create_Cadry({ form }).then((res) => {
          if (res.data.status == 1) {
            this.$refs.warning_alert.controlDialog(true, "Mavjud xodim", res.data.organization, res.data.fullname,)

          } else if (res.data.status == 2) {
            this.$refs.warning_alert.controlDialog(true, "Mavjud xodim", 'Xodim arxivda mavjud',)
          } else if (res.data.status == 3) {
            this.$refs.warning_alert.controlDialog(true, "Taqiqlangan", ' ', "Xodim mehnat faoliyati davrida qo'pol xatolari tufayli")
          }
          else if (res.data.status == 4) {
            this.$refs.warning_alert.controlDialog(true, "Muvofaqqiyatli bajarildi", 'Yangi xodim ishga qabul qilindi.', "",)
          }
        }).catch((error) => {
          console.log(error);
        })
      }
    },

    get_Stuff(id) {
      employeeAdd
        .get_Stuff({ department_id: id })
        .then((res) => {
          console.log(res.data);
          this.StuffList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkCadryByJSHR() {
      console.log(this.passportJSHR.length);
      if (this.passportJSHR.length == 14) {
        employeeAdd.check_Cadry({ pinfl: this.passportJSHR }).then((res) => {
          if (res.data.status == 1) {
            this.$refs.warning_alert.controlDialog(true, "Mavjud xodim", res.data.organization, res.data.fullname,)
          }
          if (res.data.status == 2) {
            this.$refs.warning_alert.controlDialog(true, "Mavjud xodim", "ARXIV", res.data.message,)
          } else if (res.data.status == 3) {
            this.$refs.warning_alert.controlDialog(true, "Taqiqlangan", ' ', "Xodim mehnat faoliyati davrida qo'pol xatolari tufayli")
          } else if (res.data.status == 4) {
            this.$refs.warning_alert.controlDialog(true, "Topilmadi", ' ', "Tizimda mavjud bo'lmagan xodim")
          }
        }).catch((error) => {
          console.log(error);

        })
      } else {
        this.$toast.add({ severity: 'warn', summary: "JSHR noto'g'ri", detail: "JSHR 14 ta raqamdan iborat bo'lishi shart", group: 'br', life: 3000 });
      }
    },
    changeDepartment(event) {
      this.StuffList = [];
      this.position_stuff = "";
      this.get_Stuff(event.value.id);
    },
    uploadImage(event) {
      /// Reference to the DOM input element

      const { files } = event.target;
      console.log(files);
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);

        // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
        this.image = {
          src: blob,
          type: files[0].type,
        };
        this.cropperDialog = true;
      }
    },
    uploadAvatar() {
      this.controlCopper(false);
      this.image.src = this.$refs.croppers.getResult().canvas.toDataURL();
      this.$refs.croppers.getResult().canvas.toBlob((blob) => {
        this.cropper_blob = blob
      });
    },
    controlCopper(item) {
      this.cropperDialog = item;
    },

    goPush() {
      this.$router.push("/admin/partemployee");
    },
    controlDialog() {
      this.displayResponsive = !this.displayResponsive;
    },
    controlSuccessDialog() {
      this.succesDialog = !this.succesDialog;
    },
  },
  created() {
    this.get_AddInfo();
  },
};
</script>
<style lang="scss" scoped>
.employee-avatar-box {
  display: flex;
  justify-content: start;
  align-items: center;

  .img-box-invalid {
    border: 2px solid #e24c4c !important;
  }

  .img-box {
    margin-top: 20px;
    position: relative;
    width: 120px;
    height: 160px;
    overflow: hidden;
    border: 2px solid #767b8338;
    border-radius: 10px;
    box-sizing: border-box;

    &:hover .hover-element {
      opacity: 1;
    }

    .employee-avatar {
      width: 120px;
      height: 160px;
      object-fit: cover;
    }

    .hover-element {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      background: rgba(69, 70, 73, 0.491);
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s linear;
      top: 0px;

      &>i {
        font-size: 24px;
        color: #ffffffc9;
      }
    }
  }
}
</style>