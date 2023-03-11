<template>
  <div class="grid card py-4 px-3" v-if="barLoader">
    <div class="col-12">
      <progress-bar-loader></progress-bar-loader>
    </div>
  </div>
  <div v-if="!barLoader" class="grid card surface-0 py-4 px-2">
    <div class="col-12 md:col-6 lg:col-6 xl:col-6">
      <InputText type="number" class="font-semibold mr-2 p-inputtext-sm" placeholder="Tabel raqami" v-model="order"
        :class="{ 'p-invalid': v$.adressStreet.$invalid && submitted }" v-tooltip.bottom="`Xodimning tabel raqami`" />
      <InputText type="number" class="font-semibold p-inputtext-sm" placeholder="Karta raqami"
        v-tooltip.bottom="`Xodimning karta raqami`" v-model="status_dec"
        :class="{ 'p-invalid': v$.adressStreet.$invalid && submitted }" />
    </div>
    <div class="col-12 md:col-6 lg:col-6 xl:col-6">
      <div class="flex justify-content-end">
        <Button icon="pi pi-trash" @click="controFinishDialog(true)" class="p-button-danger p-button-sm mx-2"
          label="Yakunlash" v-tooltip.bottom="`Xodim mehnat faoliyatini yakunlash`" />
        <Button icon="pi pi-save" @click="updateEmployee(!v$.$invalid)" class="p-button-secondary p-button-sm"
          label="Saqlash" v-tooltip.bottom="`Ma'lumotlarni qayta saqlash`" />
      </div>
    </div>

    <div class="col-12">
      <div class="grid xl:px-8 lg:px-4 py-4">
        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid w-full">
            <div class="col-12">
              <div class="employee-avatar-box">
                <div class="img-box" @click="$refs.file_add.click()">
                  <img class="employee-avatar" :src="defaulAvatar ? defaulAvatar : default_avatar" alt="" />
                  <div class="hover-element">
                    <i class="pi pi-pencil"></i>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- firstName, lastname, thirdName -->
        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Familiya</h6>
              <InputText type="text" class="w-full p-inputtext-sm font-normal text-base" placeholder="Familiyani kiriting"
                v-model="v$.lastName.$model" :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Ism</h6>
              <InputText type="text" class="w-full font-semibold" placeholder="Ismni kiriting" id="lastName"
                v-model="v$.firstName.$model" :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Sharif</h6>
              <InputText type="text" v-model="thirdName"
                class="w-full font-semibold"
                placeholder="Sharifni kiriting" />
            </div>
          </div>
        </div>

        <!-- bornDate, bornRegion, bornDistrict -->
        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Tug'ilgan sanasi (kun-oy-yil)</h6>
              <Calendar class="w-full font-semibold" :manualInput="true" id="bornDate" v-model="v$.bornDate.$model"
                v-maska="'##/##/####'" :class="{ 'p-invalid': v$.bornDate.$invalid && submitted }" dateFormat="dd/mm/yy"
                :showButtonBar="true" placeholder="Sanani tanlang" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Tug'ilgan viloyati</h6>
              <Dropdown id="bornRegion" v-model="v$.bornRegion.$model"
                :class="{ 'p-invalid': v$.bornRegion.$invalid && submitted }" :options="regionList" optionLabel="name"
                placeholder="Viloyatni tanlang" class="w-full font-semibold" />
            </div>
            <div class="col-12 p-fluid">
              <h6 class="mb-2 pl-2 text-500">Tug'ilgan tumani</h6>
              <Dropdown id="bornDistric" v-model="v$.bornDistric.$model"
                :class="{ 'p-invalid': v$.bornDistric.$invalid && submitted }" :options="districtList" optionLabel="name"
                :filter="true" placeholder="Tumanni tanlang" class="w-full font-semibold" @change="changeBornDistrict">
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
              <h6 class="mb-2 pl-2 text-500">Yashash manzili</h6>
              <Dropdown id="adressRegion" v-model="v$.adressRegion.$model"
                :class="{ 'p-invalid': v$.adressRegion.$invalid && submitted }" :options="regionList" optionLabel="name"
                optionValue="id" placeholder="Viloyatni tanlang" class="w-full font-semibold" />
            </div>
            <div class="col-12 p-fluid">
              <h6 class="mb-2 pl-2 text-500">Yashash manzili</h6>
              <Dropdown id="adressDistrict" v-model="v$.adressDistrict.$model" :class="{
                'p-invalid': v$.adressDistrict.$invalid && submitted,
              }" :options="districtList" optionLabel="name" :filter="true" placeholder="Tumanni tanlang"
                class="w-full font-semibold" @change="changeadressDistrict">
                <template #value="slotProps">
                  <div v-if="slotProps.value">
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
              <h6 class="mb-2 pl-2 text-500">Qo'shimcha manzil</h6>
              <InputText type="text" class="w-full font-semibold" placeholder="Ko'cha va uy manzili" id="adressStreet"
                v-model="v$.adressStreet.$model" :class="{ 'p-invalid': v$.adressStreet.$invalid && submitted }" />
            </div>
          </div>
        </div>
      </div>
      <!-- Person pasport details -->
      <div class="col-12 mb-4 border-1 border-300 border-round-sm py-4">
        <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">
          <!-- <div class="col-12 text-left text-lg font-medium uppercase mb-4">
              Pasport ma'lumotlari
            </div> -->

          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Pasport seriyasi</h6>
            <InputText type="text" class="w-full font-semibold" placeholder="Seriyani kiriting" id="passportSeriya"
              v-model="passportSeriya"                
               />
          </div>

          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Pasport JSHR</h6>
            <InputText type="text" class="w-full font-semibold" placeholder="JSHR raqami" id="passportJSHR"
              v-model="v$.passportJSHR.$model" v-maska="'##############'"
              :class="{ 'p-invalid': v$.passportJSHR.$invalid && submitted }" />
          </div>

          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Berilgan viloyat</h6>
            <Dropdown id="passportRegion" v-model="v$.passportRegion.$model" :class="{
              'p-invalid': v$.passportRegion.$invalid && submitted,
            }" :options="regionList" optionLabel="name" optionValue="id" placeholder="Viloyatni tanlang"
              class="w-full font-semibold" />
          </div>

          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Berilgan tuman</h6>
            <Dropdown id="passportDistrict" v-model="v$.passportDistrict.$model" :class="{
              'p-invalid': v$.passportDistrict.$invalid && submitted,
            }" :options="districtList" optionLabel="name" :filter="true" placeholder="Tumanni tanlang"
              class="w-full font-semibold" @change="changePassDistrict">
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
            <h6 class="mb-2 pl-2 text-500">Berilgan sana</h6>
            <Calendar class="w-full font-semibold" :manualInput="true" id="passportDate" v-model="v$.passportDate.$model"
              :class="{ 'p-invalid': v$.passportDate.$invalid && submitted }" v-maska="'##/##/####'"
              placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true" />
          </div>

          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Qachondan beri ishlaydi(O'TY)</h6>
            <Calendar class="w-full font-semibold" :manualInput="true" id="passportDate"
              v-model="v$.positionFirstDate.$model" :class="{
                'p-invalid': v$.positionFirstDate.$invalid && submitted,
              }" v-maska="'##/##/####'" placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true" />
          </div>
          <div class="col-12 sm:col-12 md:col-4 lg:col-2 xl:col-2">
            <h6 class="mb-2 pl-2 text-500">Telefon raqam</h6>
            <InputText type="text" class="w-full font-semibold" placeholder="Raqamni kiriting" id="employeePhone"
              v-model="v$.employeePhone.$model" v-maska="'(##)-###-##-##'" :class="{
                'p-invalid': v$.employeePhone.$invalid && submitted,
              }" />
          </div>
          <div class="col-12 sm:col-12 md:col-4 lg:col-2 xl:col-2">
            <h6 class="mb-2 pl-2 text-500">Jinsi</h6>
            <Dropdown id="employeeGender" v-model="v$.employeeGender.$model" :class="{
              'p-invalid': v$.employeeGender.$invalid && submitted,
            }" :options="genderList" optionLabel="name" optionValue="id" placeholder="Jinsini tanlang"
              class="w-full font-semibold" />
          </div>
          <div class="col-12 sm:col-12 md:col-4 lg:col-2 xl:col-2">
            <h6 class="mb-2 pl-2 text-500">Xizmat darajasi</h6>
            <Dropdown id="employeeGender" v-model="v$.positionDegree.$model" :class="{
              'p-invalid': v$.positionDegree.$invalid && submitted,
            }" :options="workLevel" optionLabel="name" optionValue="id" placeholder="Tanlang"
              class="w-full font-semibold" />
          </div>
          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Pochta manzili</h6>
            <InputText type="text" class="w-full font-semibold" placeholder="Kiritng" id="email" v-model="gmail" />
          </div>
          <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3 pt-6">
                <Checkbox inputId="binary" v-model="inostrans" :binary="true"  />
                <span class="pl-4 text-500 text-base">Xorij fuqarosi</span>
              </div>
              <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3">
            <h6 class="mb-2 pl-2 text-500">Tugash mudati</h6>
            <Calendar
              class="w-full font-semibold"
              :manualInput="true"
              id="date_inostrans"
              v-model="date_inostrans"
              v-maska="'##/##/####'"
              placeholder="Sanani tanlang"
              dateFormat="dd/mm/yy"
              :showButtonBar="true"
              :disabled="!inostrans"
            />
          </div>

         
        </div>
      </div>

      <!-- Position information details -->
      <div class="col-12 mb-4 border-1 border-300 border-round-sm py-4">
        <div class="grid xl:px-4 xl:mx-4 lg:px-2 xl:mx-2">
          <div class="col-12 xl:col-6"></div>
          <div class="col-12 xl:col-6 flex justify-content-end">
            <text-button class="w-16rem" :text="'O\'rindosh lavozimga Tayinlash'" @click="addItemStuff()"></text-button>
          </div>
          <div class="col-12">
            <div class="w-full overflow-x-auto">
              <table class="w-full" style="min-width: 600px">
                <tr>
                  <td width="10%" class="uppercase text-base font-semibold text-center" style="min-width: 10%">
                    Sana
                  </td>
                  <td width="50%" class="uppercase text-base font-semibold" style="min-width: 50%">
                    Lavozim nomi
                  </td>
                  <td width="5%" class="uppercase text-base font-semibold text-center" style="min-width: 5%">
                    Stavka
                  </td>
                  <td width="15%" class="uppercase text-base font-semibold text-center" style="min-width:15%">
                    Faoliyat turi
                  </td>
                  <td width="20%" class="uppercase text-base font-semibold text-center py-1 " style="min-width:20%"></td>
                </tr>
                <tbody class="pt-4">
                  <tr v-for="item in stuffList" :key="item.id" class="border-1 border-300 my-1 w-full">
                    <td class="text-sm font-semibold text-blue-600 text-center">
                      {{ formatter.arrowDateFormat(item.staff_date) }}
                    </td>
                    <td class="text-base font-semibold text-blue-600 text-left">
                      {{ item.staff_full }}
                    </td>
                    <td class="text-base font-semibold text-blue-600 text-center">
                      {{ item.rate }}
                    </td>
                    <td class="text-base font-semibold text-blue-600 text-center">
                      {{ item.staff_status }}
                    </td>
                    <td class="flex gap-2">
                      <Button label="Lavozimni o'zgartirish" @click="editItemStuff(item.id)"
                        class="text-sm font-light py-2" icon="pi pi-user-edit" />
                      <delete-button v-if="stuffList.length > 1" :deleteItem="item.id"
                        @deleteAcceptEvent="deleteStuffItem($event)"></delete-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- <stuff-component :List="stuffList"></stuff-component> -->
      </div>

      <div class="col-12">
        <input v-show="false" type="file" ref="file_add" @change="uploadImage($event)" accept="image/*" />
        <Dialog v-model:visible="cropperDialog" :style="{ width: '380px' }" :modal="true" class="bg-blue-700"
          :closable="false">
          <template #header>
            <h6 class="font-semibold flex uppercase">Rasmni tekislash</h6>
          </template>
          <cropper ref="cropper" class="cropper" :stencil-props="{
            aspectRatio: 3 / 4,
          }" :src="image.src" :autoZoom="true" />
          <template #footer>
            <div class="flex justify-content-between">
              <Button label="Bekor qilish" @click="controlCopper(false)" class="p-button-danger p-button-sm" />
              <Button label="Tasdiqlash" @click="uploadAvatar()" class="p-button-secondary p-button-sm" autofocus />
            </div>
          </template>
        </Dialog>

        <Dialog v-model:visible="finishDialog" :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true">
          <template #header>
            <h6 class="uppercase text-lg text-red-500 font-medium">
              Mehnat faoliyatini yakunlash
            </h6>
          </template>
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Prikaz raqami</h6>
              <InputText type="text" class="w-full font-semibold" placeholder="Kiriting" v-model.trim="prikaz_number"
                :class="{ 'p-invalid': prikaz_num_err && prikaz_submitted }" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Izoh</h6>
              <Textarea class="w-full font-semibold" :class="{ 'p-invalid': prikaz_comment_err && prikaz_submitted }"
                placeholder="Kiriting" id="employeePhone" v-model.trim="prikaz_comment" :autoResize="true" rows="1" />
            </div>
            <div class="col-12">
              <Checkbox inputId="binary" v-model="isBanCadry" :binary="true" />
              <span class="pl-2 text-500">Mehnat faoliyati davrida yo'l qo'ygan qo'pol xatolari
                munosabati bilan</span>
            </div>
          </div>

          <template #footer>
            <div class="col-12 pt-2">
              <div class="flex justify-content-end">
                <Button label="Yakunlash" icon="pi pi-trush" class="p-button-danger p-button-sm" @click="removeCadry()" />
              </div>
            </div>
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteStuffDialog" :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true">
          <template #header>
            <h6 class="uppercase text-lg text-red-500 font-medium">
              Mehnat faoliyatini yakunlash
            </h6>
          </template>
          <div class="grid">
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Prikaz raqami</h6>
              <InputText type="text" class="w-full font-semibold" placeholder="Kiriting"
                v-model.trim="delete_prikaz_number" :class="{ 'p-invalid': delete_prikaz && delete_submitted }" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Sana</h6>
              <Calendar class="w-full font-semibold" :manualInput="true" v-model="delete_date" v-maska="'##/##/####'"
                placeholder="Sanani tanlang" dateFormat="dd/mm/yy" :showButtonBar="true"
                :class="{ 'p-invalid': delete_prikaz_date && delete_submitted }" />
            </div>
            <div class="col-12">
              <h6 class="mb-2 pl-2 text-500">Mehnat faoliyati</h6>
              <Dropdown v-model="delete_career_id" :options="careerList" optionLabel="staff" placeholder="Tanlang"
                option-value="id" class="w-full" :class="{ 'p-invalid': delete_careerId && delete_submitted }" />
            </div>
          </div>

          <template #footer>
            <div class="col-12 pt-2">
              <div class="flex justify-content-end">
                <Button label="Yakunlash" icon="pi pi-trush" class="p-button-danger p-button-sm" @click="deleteStuff()" />
              </div>
            </div>
          </template>
        </Dialog>

        <!-- Change stuff dialog -->
        <Dialog v-model:visible="stuffDialog" :breakpoints="{
          '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true">
          <template #header>
            <h6 class="uppercase text-lg text-blue-500 font-medium">
              {{
                stuffDialogType
                ? "O'rindosh lavozimga tayinlash"
                : " Lavozimni o'zgartirish"
              }}
            </h6>
          </template>
          <div class="grid">

            <div class="col-12" v-show="!stuffDialogType">
              <Checkbox inputId="binary" v-model="status" :binary="true" />
              <span class="pl-2 text-blue-500 font-semibold">Yangi lavozimga tayinlash</span>
            </div>
            <div class="col-12" v-show="stuffDialogType || status">
              <div class="grid py-0">
                <div class="xl:col-4 lg:col-4 md:col-4 col-12 py-0">
                  <h6 class="mb-2 pl-2 text-500">Prikaz raqam</h6>
                  <InputText type="text" class="w-full font-semibold" placeholder="Kiriting" id="command_number"
                    v-model="command_number" />
                </div>
              </div>
            </div>



            <div class="col-12 xl:col-6">
              <h6 class="mb-2 pl-2 text-500">
                Bo'limni tanlang ({{ stuff_departmentList.length }})
              </h6>
              <Dropdown v-model="stuff_department" :options="stuff_departmentList" optionLabel="name" :filter="true"
                placeholder="Tanlang" class="w-full p-input-sm" @change="changeDepartment" :class="{
                  'p-invalid': stuff_department_Error && stuff_submitted,
                }">
                <template #value="slotProps">
                  <div class="font-semibold" v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else class="font-semibold">
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
            <div class="col-12 xl:col-6">
              <h6 class="mb-2 pl-2 text-500">
                Lavozimni tanlang ({{ stuff_stuffList.length }})
              </h6>
              <Dropdown v-model="stuff_stuff" :options="stuff_stuffList" optionLabel="staff_fullname" :filter="true"
                placeholder="Tanlang" class="w-full p-input-sm">
                <template #value="slotProps">
                  <div class="font-semibold" v-if="slotProps.value">
                    <div>{{ slotProps.value.staff_fullname }}</div>
                  </div>
                  <span v-else class="font-semibold">
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

            <div class="col-12 xl:col-4 lg:col-4">
              <h6 class="mb-2 pl-2 text-500">Faoliyat turi</h6>
              <Dropdown v-model="stuff_status" :options="stuff_statusList" optionLabel="name" placeholder="Tanlang"
                class="w-full font-semibold" />
            </div>
            <div class="col-12 xl:col-4 lg:col-4">
              <h6 class="mb-2 pl-2 text-500">Lavozim sanasi</h6>
              <Calendar class="w-full font-semibold" :manualInput="true" v-model="stuff_date" v-maska="'##/##/####'"
                dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" />
            </div>
            <div class="col-12 xl:col-4 lg:col-4">
              <h6 class="mb-2 pl-2 text-500">Plan</h6>
              <InputText type="number" class="w-full font-semibold" placeholder="Kiriting" id="stavka"
                v-model="stuff_plan" />
            </div>

            <div class="xl:col-4 lg:col-4 md:col-4 col-12">
              <Checkbox inputId="binary" v-model="status_sverx" :binary="true" />
              <span class="pl-2 text-500">Ortiqcha ish o'rni</span>
            </div>
            <div class="xl:col-4 lg:col-4 md:col-4 col-12">
              <Checkbox inputId="binary" v-model="status_for_decret" :binary="true" />
              <span class="pl-2 text-500">Dekretdagi xodim o'rniga</span>
            </div>
            <div class="xl:col-4 lg:col-4 md:col-4 col-12">
              <Checkbox inputId="binary" v-model="status_decret" />
              <span class="pl-2 text-500">Dekretdagi xodim?</span>
            </div>
            <div class="col-12">
              <Checkbox inputId="binary" v-model="add_career" :binary="true" />
              <span class="pl-2 text-500">Xodim mehnat faoliyatiga yangi lavozim nomi qo'shilsinmi</span>
            </div>
            <div class="col-12" v-show="add_career && !stuffDialogType">
              <h6 class="mb-2 pl-2 text-500">Mehnat faoliyati</h6>
              <Dropdown v-model="update_career" :options="check_career_list" optionLabel="staff" placeholder="Tanlang"
                option-value="id" class="w-full" />
            </div>
          </div>

          <template #footer>
            <div class="col-12 pt-2">
              <div class="flex justify-content-end">
                <Button label="Saqlash" icon="pi pi-trush" class="p-button-info p-button-sm" @click="editStuff()" />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
  <div class="col-12">
    <Toast position="bottom-right" />
  </div>
</template>
<script>
import ProgressBarLoader from "../../../components/loaders/ProgressBarLoader.vue";
import formatter from "../../../util/formatter";
import default_avatar from "@/assets/avatar/default_avatar.png";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { globalValidate } from "../../../validation/vuevalidate";
import employeeService from "../../../service/servises/employeeService";
import organizationsService from "../../../service/servises/organizationsService";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import EditButton from "@/components/buttons/EditButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import DepartmentStuffService from "../../../service/servises/DepartmentStuffService";
import StuffComponent from "@/views/Cadry/Components/StuffComponent.vue";
import converter from "../../../util/converter";
export default {
  components: {
    Cropper,
    ProgressBarLoader,
    EditButton,
    DeleteButton,
    TextButton,
    TextButton,
    StuffComponent,
  },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      image: {
        src: null,
        type: "image/jpg",
      },

      formatter, //util
      converter, //util
      defaulAvatar: null,
      cropperDialog: false,
      default_avatar,

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
      employeePhone: null,
      positionFirstDate: "",
      positionDegree: null,

      employeeGender: null,
      employeePhone: "",

      order: null,
      status_dec: null,

      regionList: [],
      districtList: [],
      departmentList: [],
      stuffList: [],
      workLevel: [],
      fileName: null,

      cadry: {
        last_name: null,
        first_name: null,
        middle_name: null,
        birht_date: null,
        birth_region_id: null,
        birth_city_id: null,
        address_region_id: null,
        address_city_id: null,
        address: null,
        pass_region_id: null,
        pass_city_id: null,
        pass_date: null,
        passport: null,
        jshshir: null,
        sex: null,
        phone: null,
        worklevel_id: null,
        job_date: null,
        order: null,
        status_dec: null,
        gmail: null,
      inostrans: false,
      date_inostrans: null,
      },

      finishDialog: false,
      prikaz_number: null,
      prikaz_comment: null,
      prikaz_submitted: false,
      isBanCadry: false,
      submitted: false,

      deleteStuffDialog: false,
      careerList: [],
      delete_career_id: null,
      delete_prikaz_number: null,
      delete_date: null,
      delete_submitted: false,
      delete_stuff_id: null,

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

      stuffDialog: false,
      stuffDialogType: true,
      stuff_departmentList: [],
      stuff_department: null,
      stuff_stuffList: [],
      cadry_stuff_id: null,
      stuff_stuff: null,
      stuff_statusList: [],
      stuff_status: null,
      stuff_plan: 0,
      stuff_date: "",
      status: false,
      status_sverx: false,
      status_for_decret: false,
      status_decret: false,
      add_career: false,
      check_career_list: [],
      update_career: null,
      command_number: null,
      gmail: null,
      inostrans: false,
      date_inostrans: null,

      stuff_submitted: false,

      barLoader: false,
    };
  },

  validations() {
    return {
      firstName: globalValidate.firtName,
      lastName: globalValidate.lastName,
      // thirdName: globalValidate.thirdName,
      bornDate: globalValidate.bornDate,
      bornRegion: globalValidate.bornRegion,
      bornDistric: globalValidate.bornDistric,
      adressRegion: globalValidate.adressRegion,
      adressDistrict: globalValidate.adressDistrict,
      adressStreet: globalValidate.adressStreet,

      // passportSeriya: globalValidate.passportSeriya,
      passportJSHR: globalValidate.passportJSHR,
      passportRegion: globalValidate.passportRegion,
      passportDistrict: globalValidate.passportDistrict,
      passportDate: globalValidate.passportDate,
      employeePhone: globalValidate.employeePhone,
      employeeGender: globalValidate.employeeGender,

      positionFirstDate: globalValidate.positionFirstDate,
      positionDegree: globalValidate.positionDegree,
    };
  },
  computed: {
    prikaz_num_err() {
      if (!this.prikaz_number) {
        return true;
      } else {
        return false;
      }
    },
    prikaz_comment_err() {
      if (!this.prikaz_comment) {
        return true;
      } else {
        return false;
      }
    },
    delete_prikaz() {
      if (!this.delete_prikaz_number) {
        return true;
      } else {
        return false;
      }
    },
    delete_prikaz_date() {
      if (!this.delete_date) {
        return true;
      } else {
        return false;
      }
    },
    delete_careerId() {
      if (!this.delete_career_id) {
        return true;
      } else {
        return false;
      }
    },

    stuff_department_Error() {
      if (!this.stuff_department) {
        return true;
      } else {
        return false;
      }
    },

    stuff_stuff_Error() {
      if (!this.stuff_stuff) {
        return true;
      } else {
        return false;
      }
    },

    stuff_status_Error() {
      if (!this.stuff_status) {
        return true;
      } else {
        return false;
      }
    },

    stuff_date_Error() {
      if (!this.stuff_date) {
        return true;
      } else {
        return false;
      }
    },

    stuff_plan_Error() {
      if (!this.stuff_plan) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
    this.getEmployee(this.$route.params.id);
    this.get_Region();
    this.get_District();
    this.getWorkLevel();
  },

  methods: {
    // get cadry details
    getEmployee(id) {
      this.controlLoader(true);
      employeeService
        .get_employeeDetails({ id })

        .then((res) => {
          let cadry = res.data.cadry;
          this.defaulAvatar = cadry.photo;
          this.firstName = cadry.first_name;
          this.lastName = cadry.last_name;
          this.thirdName = cadry.middle_name;
          this.bornDate = formatter.interDateFormatter(cadry.birth_date);
          this.bornRegion = cadry.birth_region_id;
          this.bornDistric = cadry.birth_city_id;
          this.birth_city_id = cadry.birth_city_id.id;
          this.adressRegion = cadry.address_region_id.id;
          this.adressDistrict = cadry.address_city_id;
          this.address_city_id = cadry.address_city_id.id;
          this.adressStreet = cadry.address;
          this.passportSeriya = converter.krillToLotin(cadry.passport);
          this.passportJSHR = cadry.jshshir;
          this.passportRegion = cadry.pass_region_id.id;
          this.passportDistrict = cadry.pass_city_id;
          this.pass_city_id = cadry.pass_city_id.id;
          this.passportDate = formatter.interDateFormatter(cadry.pass_date);
          this.positionFirstDate = formatter.interDateFormatter(cadry.job_date);
          formatter.outDateFormatter(cadry.job_date);
          this.positionDegree = cadry.worklevel_id.id;
          this.order = cadry.order;
          this.status_dec = cadry.status_dec;

          this.employeePhone = cadry.phone;
          this.employeeGender = cadry.sex;

          this.stuffList = cadry.allStaffs;
          this.gmail = cadry.gmail;
          this.inostrans = cadry.inostrans ==1? true : false;
          this.date_inostrans =cadry.inostrans==1? formatter.interDateFormatter(cadry.date_inostrans) : null;

          this.controlLoader(false);
        })
        .catch((error) => {
          console.log(error);
          this.controlLoader(false);
        });
    },

    // update cadry details
    updateEmployee(isFormValid) {
      this.submitted = true;
      this.cadry.first_name = this.firstName;
      this.cadry.last_name = this.lastName;
      this.cadry.middle_name = this.thirdName? this.thirdName : '' ;
      this.cadry.birht_date = formatter.outDateFormatter(this.bornDate);
      this.cadry.birth_region_id = this.bornRegion.id;
      this.cadry.birth_city_id = this.bornDistric.id;
      this.cadry.address_region_id = this.adressRegion;
      this.cadry.address_city_id = this.adressDistrict.id;
      this.cadry.address = this.adressStreet;
      this.cadry.pass_region_id = this.passportRegion;
      this.cadry.pass_city_id = this.passportDistrict.id;
      this.cadry.pass_date = formatter.outDateFormatter(this.passportDate);
      this.cadry.passport = this.passportSeriya;
      this.cadry.jshshir = this.passportJSHR;
      this.cadry.sex = this.employeeGender;
      this.cadry.phone = this.employeePhone;
      this.cadry.worklevel_id = this.positionDegree;
      this.cadry.order = this.order;
      this.cadry.status_dec = this.status_dec;
      this.cadry.job_date = formatter.outDateFormatter(this.positionFirstDate);
      this.cadry.gmail = this.gmail? this.gmail : '';
      this.cadry.inostrans = this.inostrans;
      this.cadry.date_inostrans =this.inostrans?  formatter.outDateFormatter(this.date_inostrans) : null;

      if (isFormValid) {
        employeeService
          .update_empolyee({ id: this.$route.params.id, data: this.cadry })
          .then((res) => {
            this.getEmployee(this.$route.params.id);
          })
          .catch((error) => {
            if (error.response.status == 400) {
              console.log(error.response.data);

              this.$toast.add({
                severity: "warn",
                summary: `Mavjud JSHR`,
                detail: `${error.response.data.fullname} (${error.response.data.organization})`,
                life: 2000,
              });
            }
            console.log(error.response.status == 400);
          });
        console.log(isFormValid);
      }
    },

    // get region list
    get_Region() {
      organizationsService
        .getRegions()
        .then((res) => {
          this.regionList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // get district list
    get_District() {
      organizationsService
        .getDistricts()
        .then((res) => {
          this.districtList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getWorkLevel() {
      employeeService
        .get_workLevel()
        .then((res) => {
          this.workLevel = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goPush() {
      this.$router.push("/admin/partemployee");
    },
    removeCadry() {
      this.prikaz_submitted = true;
      if (!this.prikaz_comment_err && !this.prikaz_num_err) {
        let data = {
          command_number: this.prikaz_number,
          comment: this.prikaz_comment,
          blackStatus: this.isBanCadry,
        };
        let id = this.$route.params.id;

        employeeService
          .remove_Cadry({ id, data })
          .then((res) => {
            this.$router.push({ name: "partemployee" });
          })
          .catch((error) => {
            console.log(error);
          });
        this.controFinishDialog(false);
      }
    },

    deleteStuffItem(id) {
      this.delete_stuff_id = id;
      this.delete_submitted = false;
      employeeService
        .get_checkCarrer({ cadry_id: this.$route.params.id })
        .then((res) => {
          console.log(res.data);
          this.careerList = res.data;
          this.controldeleteStuffDialog(true);
        });
    },

    get_check_career() {
      employeeService
        .get_checkCarrer({ cadry_id: this.$route.params.id })
        .then((res) => {
          this.check_career_list = res.data;
        });
    },

    deleteStuff() {
      this.delete_submitted = true;
      if (
        !this.delete_prikaz &&
        !this.delete_prikaz_date &&
        !this.delete_careerId
      ) {
        let id = this.delete_stuff_id;
        let data = {
          command_number: this.delete_prikaz_number,
          delete_date: formatter.outDateFormatter(this.delete_date),
          career_id: this.delete_career_id,
        };
        console.log(data);
        employeeService.delete_CadryStuff({ id, data }).then((res) => {
          console.log(res.data);
        });
        this.controldeleteStuffDialog(false);
      }
    },

    changeDepartment() {
      let id = this.stuff_department.id;
      this.stuff_stuffList = [];
      DepartmentStuffService.get_DepartmentStuff({
        id, params: {
          page: 1,
          per_page: 100
        }
      }).then((res) => {
        this.stuff_stuff = null;
        this.stuff_stuffList = res.data.department.data;
      });
    },

    changeBornDistrict(event) {
      this.cadry.birth_city_id = event.value.id;
    },
    changeadressDistrict(event) {
      this.cadry.address_city_id = event.value.id;
    },
    changePassDistrict(event) {
      this.cadry.pass_city_id = event.value.id;
    },

    // upload avatar picture method
    uploadAvatar() {
      this.controlCopper(false);
      let id = this.$route.params.id;

      this.$refs.cropper.getResult().canvas.toBlob((blob) => {
        console.log(blob);
        let form = new FormData();
        form.append("photo", blob, "avatar.jpg");

        employeeService
          .get_employeeAvatar({ id: id, form: form })
          .then((res) => {
            console.log(res);
            this.getEmployee(id);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    controlCopper(item) {
      this.cropperDialog = item;
    },

    addItemStuff() {
      this.stuffDialogType = true;
      this.add_career = false;
      this.update_career = null;
      let id = this.$route.params.id;
      employeeService.get_newStuffDetails({ id }).then((res) => {
        this.stuff_departmentList = res.data.departments;
        this.stuff_stuffList = [];
        this.stuff_stuff = null;
        this.stuff_statusList = res.data.staff_statuts;
        this.stuff_status = null;
        this.stuff_plan = 1;
        this.status_sverx = false;
        this.status_decret = false;
        this.status_for_decret = false;
        this.stuff_date = null;
        this.stuff_department = null;
        this.command_number = null;
        this.controlstuffDialog(true);
      });
    },

    editItemStuff(id) {
      this.cadry_stuff_id = id;
      this.stuffDialogType = false;
      employeeService.update_CadryStuff({ id }).then((res) => {
        console.log(res.data);
        this.stuff_departmentList = res.data.departments;
        this.stuff_department = res.data.department_id;
        this.stuff_stuffList = res.data.department_staffs;
        this.stuff_stuff = res.data.staff_id;
        this.stuff_statusList = res.data.staff_statuts;
        this.stuff_status = res.data.staff_status;
        this.stuff_plan = res.data.rate;
        this.status_sverx = res.data.status_decret == 1;
        this.status_decret = res.data.status_for_decret == 1;
        (this.command_number = null),
          (this.stuff_date = formatter.interDateFormatter(res.data.staff_date));
        this.controlstuffDialog(true);
        this.get_check_career();
      });
    },

    editStuff() {
      this.controlstuffDialog(false);
      console.log(this.stuff_department);
      let data = {
        department_id: this.stuff_department.id,
        staff_id: this.stuff_stuff.id,
        rate: this.stuff_plan,
        staff_status: this.stuff_status.id,
        staff_date: formatter.outDateFormatter(this.stuff_date),
        status_sverx: this.status_sverx,
        status_for_decret: this.status_for_decret,
        status_decret: this.status_decret,
        careerCheck: this.add_career,
        career_id: this.update_career,
        command_number: this.command_number,
        status: this.status,
      };
      if (!this.stuff_department_Error) {
        if (this.stuffDialogType) {
          let id = this.$route.params.id;
          delete data.career_id;
          employeeService
            .create_CadryStuff({ id, data })
            .then((res) => {
              this.getEmployee(this.$route.params.id);
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.add({
                  severity: "warn",
                  summary: "Xatolik",
                  detail: "Xodimda asosiy faoliyat turi mavjud",
                  life: 2000,
                });
              }
            });
        } else {
          let id = this.cadry_stuff_id;
          employeeService
            .edit_CadryStuff({ id, data })
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Muvofaqiyatli bajarildi",
                detail: "Lavozim o'zgartirildi",
                life: 2000,
              });
              this.getEmployee(this.$route.params.id);
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.add({
                  severity: "warn",
                  summary: "Xatolik",
                  detail: "Xodimda asosiy faoliyat turi mavjud",
                  life: 2000,
                });
              }
            });
        }
      }
    },

    controlstuffDialog(item) {
      this.stuffDialog = item;
    },

    uploadImage(event) {
      /// Reference to the DOM input element

      const { files } = event.target;
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
    controFinishDialog(item) {
      this.prikaz_submitted = false;
      this.finishDialog = item;
    },
    controldeleteStuffDialog(item) {
      this.deleteStuffDialog = item;
    },

    controlLoader(item) {
      this.barLoader = item;
    },
  },
};
</script>
<style lang="scss">
.employee-avatar-box {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;

  .img-box {
    position: relative;
    margin-top: 20px;
    width: 150px;
    height: 200px;
    overflow: hidden;
    border: 2px solid #767b8338;
    border-radius: 10px;
    box-sizing: border-box;

    &:hover .hover-element {
      opacity: 1;
    }

    .employee-avatar {
      width: 150px;
      height: 100%;
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
      transition: all 0.3s ease;
      top: 0px;

      &>i {
        font-size: 24px;
        color: #ffffffc9;
      }
    }
  }
}
</style>