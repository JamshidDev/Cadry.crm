<template>
  <div class="grid px-3">
    <div class="col-12">
      <div class="grid">
        <div class="col-12 pb-0">
          <bread-crumb :breadCump="[{ name: 'Xodimlar', path: '/admin/partemployee' }]"></bread-crumb>
        </div>
        <div class="col-12 y-0 py-0">
          <span class="text-2xl font-semibold">Xodimlar
            <span class="text-base text-primary pl-2">
              ({{ totalCadries }})</span>
          </span>
        </div>
      </div>
    </div>
    <div class="col-12 py-0">
      <div class="grid">
        <div class="col-12 pb-0">
          <!-- Leader cadry -->
          <div class="grid p-0" v-if="get_adminPermissions('cadry_leader_cadries')">
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3 p-fluid">
              <h6 class="mb-1 pl-2 text-sm">Katta korxona - 1</h6>
              <Dropdown id="adressDistrict" v-model="railwayVal" :options="railwayList" optionLabel="name"
                class="p-inputtext-sm" :filter="true" placeholder="Katta korxona" emptyMessage="Hech narsa topilmadi"
                emptyFilterMessage="Tizmda ma'lumot topilmadi..." disabled>
                <template #value="slotProps" class="custop_dropdown">
                  <div class="max-w-100" v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="max-w-100">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3 p-fluid">
              <h6 class="mb-1 pl-2 text-sm">
                Korxona -
                {{
                  organizationList.length
                  ? organizationList.length - 1
                  : organizationList.length
                }}
              </h6>
              <Dropdown id="adressDistrict" v-model="organizationVal" :options="organizationList" optionLabel="name"
                class="p-inputtext-sm" :filter="true" placeholder="Korxona" emptyMessage="Hech narsa topilmadi"
                emptyFilterMessage="Tizmda ma'lumot topilmadi..." @change="changeOrganization">
                <template #value="slotProps" class="custop_dropdown">
                  <div class="max-w-100" v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="max-w-100">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3 p-fluid">
              <h6 class="mb-1 pl-2 text-sm">
                Bo'lim va bekat -
                {{
                  departmentList.length
                  ? departmentList.length - 1
                  : departmentList.length
                }}
              </h6>
              <Dropdown id="adressDistrict" v-model="departmentValue" :options="departmentList" optionLabel="name"
                class="p-inputtext-sm" :filter="true" :loading="loadingDepartment" placeholder="Bo'lim va bekat"
                emptyMessage="Hech narsa topilmadi" emptyFilterMessage="Tizmda ma'lumot topilmadi..."
                @change="changeDepartment">
                <template #value="slotProps" class="custop_dropdown">
                  <div class="max-w-100" v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="max-w-100">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div class="grid mt-2">
                <div class="col-12">
                  <Button icon="pi pi-filter" label="Filter" class="w-full p-button-secondary mx-2 p-button-sm"
                    @click="openFilterPanel2" />
                </div>
              </div>

              <!-- Additional filter menu -->
              <OverlayPanel ref="op2" :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '550px' }">
                <div class="grid">
                  <div class="col-12">
                    <h6 class="text-sm mb-0 font-bold">
                      Qo'shimcha filter sozlamalari
                    </h6>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Ism</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <InputText type="text" v-model="organization.first_name" class="w-full p-inputtext-sm"
                          placeholder="Ismni kiriting" @keyup.enter="searchBtn()" />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Familiya</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <InputText type="text" v-model="organization.last_name" class="w-full p-inputtext-sm"
                          placeholder="Familiyani kiriting" @keyup.enter="searchBtn()" />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Sharif</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <InputText type="text" v-model="organization.middle_name"
                          class="w-full font-semibold p-inputtext-sm" placeholder="Kiriting" @keyup.enter="searchBtn()" />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Ma'lumoti</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="educationValue" :options="educationList" optionLabel="name"
                          placeholder="Tanlang" class="w-full p-inputtext-sm" @change="changeEducation" />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Viloyat(Yashash)</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="regionValue" :options="regionList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="change_adressRegion" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">
                        Tuman(Yashash) {{ districtList.length }}
                      </h6>
                    </div>
                    <div class="w-full flex">
                      <Dropdown :loading="districtLoading" v-model="districtVal" :options="districtList"
                        optionLabel="name" :filter="true" placeholder="Tanlang" class="w-full p-inputtext-sm"
                        emptyMessage="Hech narsa topilmadi" @change="change_adressDistrict"
                        :disabled="districtList.length == 0" emptyFilterMessage="Tizmda ma'lumot topilmadi...">
                        <template #value="slotProps">
                          <div class="country-item country-item-value w-full" v-if="slotProps.value">
                            <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                            {{ slotProps.placeholder }}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item w-full">
                            <div>{{ slotProps.option.name }}</div>
                          </div>
                        </template>
                      </Dropdown>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Viloyat(Tug'ilgan)</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="birth_region" :options="regionList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="change_BirthRegion" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">
                        Tuman(Tug'ilgan) {{ birth_districtList.length }}
                      </h6>
                    </div>
                    <div class="w-full flex">
                      <Dropdown :loading="birth_districtLoading" v-model="birth_districtVal" :options="birth_districtList"
                        optionLabel="name" :filter="true" placeholder="Tanlang" class="w-full p-inputtext-sm"
                        emptyMessage="Hech narsa topilmadi" @change="birth_changeDistrict"
                        :disabled="birth_districtList.length == 0" emptyFilterMessage="Tizmda ma'lumot topilmadi...">
                        <template #value="slotProps">
                          <div class="country-item country-item-value w-full" v-if="slotProps.value">
                            <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                            {{ slotProps.placeholder }}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item w-full">
                            <div>{{ slotProps.option.name }}</div>
                          </div>
                        </template>
                      </Dropdown>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Ta'til</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="vacationValue" :options="vacationList" optionLabel="name" placeholder="Ta'til"
                          class="w-full p-inputtext-sm" @change="changeVacation" />
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-1">Yosh oralig'i</h6>
                      <p class="text-center text-blue-600 font-semibold">
                        {{ selectedAge[0] + " -- " + selectedAge[1] }}
                      </p>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Slider class="" v-model="selectedAge" :step="1" :range="true" @change="changeCadrAge" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Jinsi</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="genderValue" :options="genderList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="changeGender" />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="grid">
                      <div class="col-6">
                        <p class="text-left text-sm text-600 mb-0 font-normal">
                          Filter sozlamalari
                        </p>
                      </div>
                      <div class="col-6">
                        <div class="grid">
                          <div class="col-6">
                            <Tag class="cursor-pointer w-full" value="Izlash" severity="info" icon="pi pi-search"
                              @click="searchBtn()"></Tag>
                          </div>
                          <div class="col-6">
                            <Tag class="cursor-pointer w-full" value="Tozalash" severity="danger"
                              icon="pi pi-filter-slash" @click="clearFilterDetails()"></Tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
        </div>

        <!-- Cadry -->
        <div class="col-12 pb-0">
          <div class="grid p-0" v-if="!get_adminPermissions('cadry_leader_cadries')">
            <div class="col-12 sm:col-6 md:col-6 lg:col-2 xl:col-2 p-fluid">
              <InputText type="text" v-model="organization.first_name" class="w-full p-inputtext-sm"
                placeholder="Ismni kiriting" @keyup.enter="searchBtn()" />
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-2 xl:col-2 p-fluid">
              <InputText type="text" v-model="organization.last_name" class="w-full p-inputtext-sm"
                placeholder="Familiyani kiriting" @keyup.enter="searchBtn()" />
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3 p-fluid">
              <Dropdown id="adressDistrict" v-model="departmentValue" :options="departmentList" optionLabel="name"
                class="p-inputtext-sm" :filter="true" placeholder="Bo'limni tanlang" emptyMessage="Hech narsa topilmadi"
                emptyFilterMessage="Tizmda ma'lumot topilmadi..." @change="changeDepartment">
                <template #value="slotProps" class="custop_dropdown">
                  <div class="max-w-100" v-if="slotProps.value">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="max-w-100">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
              <div class="grid">
                <div class="col-6">
                  <Button icon="pi pi-filter" label="Filter" class="w-full p-button-secondary mx-2 p-button-sm"
                    @click="openFilterPanel" />
                </div>
                <div class="col-6">
                  <SplitButton label="Yuklash" @click="downloadControl(true)" icon="pi pi-arrow-circle-down"
                    class="p-button-sm p-button-success w-full" :model="downloadItems"></SplitButton>
                </div>
              </div>

              <!-- Additional filter menu -->
              <OverlayPanel ref="op" :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '550px' }">
                <div class="grid">
                  <div class="col-12">
                    <h6 class="text-sm mb-0 font-bold">
                      Qo'shimcha filter sozlamalari
                    </h6>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Lavozim {{ Stuffs.length }}</h6>
                    </div>
                    <div class="w-full flex">
                      <Dropdown id="adressDistrict" v-model="stuffValue" :options="Stuffs" optionLabel="name"
                        :filter="true" placeholder="Tanlang" class="w-full p-inputtext-sm" @change="changeStuffs"
                        emptyMessage="Hech narsa topilmadi" emptyFilterMessage="Tizmda ma'lumot topilmadi..."
                        @before-show="beforeOpen" :disabled="Stuffs.length == 0">
                        <template #value="slotProps">
                          <div class="country-item country-item-value w-full" v-if="slotProps.value">
                            <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                            {{ slotProps.placeholder }}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item w-full">
                            <div>{{ slotProps.option.name }}</div>
                          </div>
                        </template>
                      </Dropdown>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Ma'lumoti</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="educationValue" :options="educationList" optionLabel="name"
                          placeholder="Tanlang" class="w-full p-inputtext-sm" @change="changeEducation" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Viloyat(Yashash)</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="regionValue" :options="regionList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="change_adressRegion" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">
                        Tuman(Yashash) {{ districtList.length }}
                      </h6>
                    </div>
                    <div class="w-full flex">
                      <Dropdown :loading="districtLoading" v-model="districtVal" :options="districtList"
                        optionLabel="name" :filter="true" placeholder="Tanlang" class="w-full p-inputtext-sm"
                        emptyMessage="Hech narsa topilmadi" @change="change_adressDistrict"
                        :disabled="districtList.length == 0" emptyFilterMessage="Tizmda ma'lumot topilmadi...">
                        <template #value="slotProps">
                          <div class="country-item country-item-value w-full" v-if="slotProps.value">
                            <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                            {{ slotProps.placeholder }}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item w-full">
                            <div>{{ slotProps.option.name }}</div>
                          </div>
                        </template>
                      </Dropdown>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Viloyat(Tug'ilgan)</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="birth_region" :options="regionList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="change_BirthRegion" />
                      </div>
                    </div>
                  </div>


                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">
                        Tuman(Tug'ilgan) {{ birth_districtList.length }}
                      </h6>
                    </div>
                    <div class="w-full flex">
                      <Dropdown :loading="birth_districtLoading" v-model="birth_districtVal" :options="birth_districtList"
                        optionLabel="name" :filter="true" placeholder="Tanlang" class="w-full p-inputtext-sm"
                        emptyMessage="Hech narsa topilmadi" @change="birth_changeDistrict"
                        :disabled="birth_districtList.length == 0" emptyFilterMessage="Tizmda ma'lumot topilmadi...">
                        <template #value="slotProps">
                          <div class="country-item country-item-value w-full" v-if="slotProps.value">
                            <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                            {{ slotProps.placeholder }}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item w-full">
                            <div>{{ slotProps.option.name }}</div>
                          </div>
                        </template>
                      </Dropdown>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Ta'til</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="vacationValue" :options="vacationList" optionLabel="name" placeholder="Ta'til"
                          class="w-full p-inputtext-sm" @change="changeVacation" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Sharif</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <InputText type="text" v-model="organization.middle_name"
                          class="w-full font-semibold p-inputtext-sm" placeholder="Kiriting" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-1">Yosh oralig'i</h6>
                      <p class="text-center text-blue-600 font-semibold">
                        {{ selectedAge[0] + " -- " + selectedAge[1] }}
                      </p>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Slider class="" v-model="selectedAge" :step="1" :range="true" @change="changeCadrAge" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <h6 class="text-sm mb-0">Jinsi</h6>
                    </div>
                    <div class="w-full flex">
                      <div class="w-full">
                        <Dropdown v-model="genderValue" :options="genderList" optionLabel="name" placeholder="Tanlang"
                          class="w-full p-inputtext-sm" @change="changeGender" />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="grid">
                      <div class="col-6">
                        <p class="text-left text-sm text-600 mb-0 font-normal">
                          Filter sozlamalari
                        </p>
                      </div>
                      <div class="col-6">
                        <div class="grid">
                          <div class="col-6">
                            <Tag class="cursor-pointer w-full" value="Izlash" severity="info" icon="pi pi-search"
                              @click="searchBtn()"></Tag>
                          </div>
                          <div class="col-6">
                            <Tag class="cursor-pointer w-full" value="Tozalash" severity="danger"
                              icon="pi pi-filter-slash" @click="clearFilterDetails()"></Tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OverlayPanel>
            </div>
            <div class="col-12 sm:col-6 md:col-6 lg:col-2 xl:col-2 p-fluid">
              <Button icon="pi pi-plus" @click="goNewPush()" class="p-button-info font-medium p-button-sm" label="Xodim"
                v-tooltip.bottom="`Yangi xodim qo'shish`" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Employees table ---start -->
    <div class="col-12 pt-0" v-show="!loadingtable">
      <DataTable ref="dt" :value="cadries" dataKey="id"  responsiveLayout="scroll"  showGridlines  class="p-datatable-sm"
        v-show="totalCadries" v-model:selection="selectitem" selectionMode="single">
        <template #header v-if="selectMode">
          <div class="grid">
            <div class="col-12">
              <div class="
                    text-800 text-sm
                    lg:text-base
                    xl:text-base
                    font-medium
                    text-center text-blue-600
                  " v-show="!isSelectAll">
                Tanlanganlar soni - {{ this.selectOptions.length }}
              </div>
              <div class="
                    text-800 text-sm
                    lg:text-base
                    xl:text-base
                    font-medium
                    text-center text-red-600
                  " v-show="isSelectAll">
                Tanlanmaganlar soni - {{ this.unSelectItemId.length }}
              </div>
            </div>
          </div>
        </template>
        <Column style="min-width: 30px; width: 36px">
          <template #header>
            <div class=" text-sm uppercase font-medium">No</div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-sm font-normal">
              {{ slotProps.data.number }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 50px; width: 50px">
          <template #header>
            <div class="text-sm uppercase font-medium">
              Rasm
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-content-center">
              <Image :src="slotProps.data.photo" alt="Rasm yo'q" width="30" height="30" preview />
            </div>
          </template>
        </Column>
        <Column style="min-width: 50px; width: 50px" v-if="selectMode">
          <template #header>
            <div class="text-800 flex justify-content-center w-full">
              <Checkbox :value="true" v-model="selectAllOption" @change="changeSelectAll" />
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-content-center">
              <Checkbox :value="slotProps.data.id" v-model="selectOptions" @change="changeRowSelect(slotProps.data.id)" />
            </div>
          </template>
        </Column>
        <Column field="name" style="min-width: 100px; width: 200px" frozen alignFrozen="left">
          <template #header>
            <div class="text-sm uppercase font-medium">
              F.I.SH
            </div>
          </template>
          <template #body="slotProps">
            <div class="
                  text-sm
                  sm:text-sm
                  md:text-sm
                  lg:text-base
                  xl:text-base
                  font-normal
                  hover:text-blue-500
                  cursor-pointer
                " v-tooltip.bottom="`Tahrirlash`" @click="goPush(slotProps.data.id)">
              <div>{{ slotProps.data.fullname }}</div>
            </div>
          </template>
        </Column>

        <Column style="min-width: 200px">
          <template #header>
            <div class="text-sm uppercase font-medium">Lavozim</div>
          </template>
          <template #body="slotProps">
            <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base font-poppins">
              {{
                slotProps.data.staff
                ? slotProps.data.staff.staff_full
                : `Tizimda ma'lumot yo'q`
              }}
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 200px" v-if="!departmentValue?.id">
          <template #header>
            <div class="text-sm uppercase font-medium">
              {{
                get_adminPermissions("cadry_leader_cadries")
                ? organization.organization_id
                  ? "Bo'lim nomi"
                  : "Korxona nomi"
                : "Bo'lim nomi"
              }}
            </div>
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
              <span v-if="!get_adminPermissions('cadry_leader_cadries')">{{ slotProps.data.department }}</span>
              <span v-if="
                get_adminPermissions('cadry_leader_cadries') &&
                organization.organization_id
              ">{{ slotProps.data.department }}</span>
              <span v-if="
                get_adminPermissions('cadry_leader_cadries') &&
                !organization.organization_id
              ">{{ slotProps.data.organization }}</span>
            </div>
          </template>
        </Column>
        <Column style="min-width: 100px; width: 200px">
          <template #header>
            <div class="text-sm uppercase font-medium">
              Pochta
            </div>
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
              {{ slotProps.data.gmail }}
            </div>
          </template>
        </Column>


       

        <Column  style="min-width: 60px; width: 60px" lignFrozen="right" frozen >
          <template #header>
            <div class="text-800 text-sm lg:text-base xl:text-base font-medium">

            </div>
          </template>
          <template #body="slotProps">
            <div class="flex w-full align-items-center gap-2">
              <button v-ripple class="custom-icon-btn custom-btn-primary" @click="toggle($event, slotProps.data.id)">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <Menu ref="menu" id="overlay_menu" :model="menu_items" :popup="true" />
            </div>
          </template>
        </Column>
        <template #footer>
          <table-pagination v-show="totalCadries > 10" :total_page="totalCadries" :page="organization.page"
            :per_page="organization.per_page" @pagination="changePagination($event)"></table-pagination>
        </template>
      </DataTable>
      <search-not-found-page v-show="!totalCadries"></search-not-found-page>
    </div>
    <div class="col-12 pt-2" v-show="loadingtable">
      <employee-loader></employee-loader>
    </div>
    <div class="col-12">
      <Toast position="bottom-right" />
      <word-template :cadry_id="Dowload_cadry_id" v-show="false" ref="word_resume"></word-template>
      <employee-details ref="show_resume"></employee-details>
      <export-panel ref="export_to_excel"></export-panel>
      <Dialog v-model:visible="selectionDialog" :breakpoints="{
        '1960px': '30vw',
        '1600px': '40vw',
        '1200px': '70vw',
        '960px': '80vw',
        '640px': '90vw',
      }" :style="{ width: '50vw' }" :modal="true">
        <template #header>
          <h6 class="uppercase text-lg text-center text-blue-500 font-medium">
            Xodimlarni ma'lumotlarini yuklash
          </h6>
        </template>
        <div class="grid pt-2">
          <div class="col-12">
            <InputText type="text" v-model="file_name" class="w-full p-inputtext-sm font-medium text-base"
              placeholder="Fayl nomi" />
          </div>
          <div class="col-12">
            <Checkbox :value="true" v-model="cadry_pasport" />
            <label class="pl-2 text-700 font-normal">Xodimlarni pasport nusxasi ham yuklansinmi?</label>
          </div>

          <div class="col-12">
            <h6 class="mb-1 pl-2 mt-0 text-700 font-normal">
              Yuklanishga yuborilayotgan ma'lumotlari soni -
              <span class="text-blue-500 font-medium">{{
                isSelectAll
                ? totalCadries - unSelectItemId.length
                : selectItemId.length
              }}</span>
            </h6>
            <h6 class="mb-1 mt-0 pl-2 text-700 font-normal">
              Xodimlarni ma'lumotlarini yuklash jarayoni bir necha daqiqa vaqt
              olishi mumkin.
            </h6>
          </div>
        </div>

        <template #footer>
          <div class="col-12 pt-2">
            <div class="flex justify-content-center">
              <Button :loading="dowloadLoading" icon="pi pi-arrow-circle-down" :label="downloadBtnText"
                class="p-button-success p-button-sm font-bold" @click="startDownloadZip()" />

            </div>
          </div>
        </template>
      </Dialog>
      <BusinnesTripModal @commander_send="send_commander_cadry($event)" ref="business_ref"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import DownloadButton from '@/components/buttons/DownloadButton.vue';
import commanderService from '@/service/servises/commanderService';
import EksportService from '@/service/servises/EksportService';
import LeaderService from '@/service/servises/LeaderService';

import BreadCrumb from '../components/BreadCrumb/BreadCrumb.vue';
import ExportPanel from '../components/Eksport/ExportPanel.vue';
import WordTemplate from '../components/Eksport/WordTemplate.vue';
import SearchNotFoundPage
  from '../components/EmptyComponent/SearchNotFoundPage.vue';
import EmployeeLoader from '../components/loaders/EmployeeLoader.vue';
import TablePagination from '../components/Pagination/TablePagination.vue';
import EmployeeDetails from '../components/partEmployee/EmployeeDetails.vue';
import employeeService from '../service/servises/employeeService';
import organizationsService from '../service/servises/organizationsService';
import BusinnesTripModal from './BusinessTrip/BusinnesTripModal.vue';

export default {
  components: {
    EmployeeLoader,
    TablePagination,
    SearchNotFoundPage,
    WordTemplate,
    EmployeeDetails,
    DownloadButton,
    ExportPanel,
    BreadCrumb,
    BusinnesTripModal,
  },
  data() {
    return {
      districtLoading: false,
      birth_districtLoading: false,

      menu_items: [
        {
          label: 'Amallar',
          items: [
            {
              label: "Yuklash",
              icon: 'pi pi-download',
              command:()=>{
                this.DowloadResume();
              } 
            },
            {
              label: "Ko'rish",
              icon: 'pi pi-id-card',
              command: () => {
                this.goPushDetails()
              }
            },
            {
              label: "Xizmat safari",
              icon: 'pi pi-home',
              command: () => {
                this.business_trip()
              }
            },
          ]
        },
      ],
        active_cadry_id:null,
      selectitem: null,
      isSelectAll: false,
      selectOptions: [],
      selectAllOption: [],
      selectItemId: [],
      unSelectItemId: [],
      selectMode: false,
      selectionDialog: false,
      file_name: "Xodimlar ma'lumotlari",
      cadry_pasport: [],
      dowloadLoading: false,
      downloadBtnText: "Yuklashni boshlash",

      loadingtable: false,
      cadries: [],
      Dowload_cadry_id: null,
      selectedAge: [10, 80],
      loadingDepartment: false,

      // Organization
      railwayList: [],
      railwayVal: null,
      organizationList: [],
      organizationVal: null,
      departmentList: [],
      departmentValue: null, //fake
      Stuffs: [],
      stuffValue: null, //fake
      educationList: [],
      educationValue: null, //fake
      regionList: [],
      regionValue: null, //fak
      birth_region: null,
      districtList: [],
      districtVal: null,
      birth_districtList: [],
      birth_districtVal: null,

      vacationList: [],
      vacationValue: null, //fake
      genderList: [
        {
          name: "Erkak",
          id: "true",
        },
        {
          name: "Ayol",
          id: "false",
        },
      ],
      genderValue: null, //fake
      selectedAge: [10, 80],

      totalCadries: 0,

      page: localStorage.getItem("page_1") || 1,
      per_page: localStorage.getItem("per_page_1") || 10,

      // Organization params
      organization: {
        railway_id: null,
        organization_id: null,
        department_id: null,
        page: localStorage.getItem("page_1")
          ? Number(localStorage.getItem("page_1"))
          : 1,
        per_page: localStorage.getItem("per_page_1")
          ? Number(localStorage.getItem("per_page_1"))
          : 10,
        last_name: null,
        first_name: null,
        middle_name: null,
        staff_id: null,
        sex: null,
        vacation_id: null,
        education_id: null,
        age_start: null,
        age_end: null,
        birth_region_id: null,
        birth_city_id: null,
        address_region_id: null,
        address_city_id: null,
      },
      downloadItems: [
        {
          label: "Excel",
          icon: "pi pi-file-excel",
          command: () => {
            this.controlExportDialog(true);
          },
        },
        {
          label: "Tanlash",
          icon: "pi pi-user-plus",
          command: () => {
            this.selectMode = !this.selectMode;
          },
        },
        {
          label: "Yuklanganlar",
          icon: "pi pi-folder",
          to: "/admin/zipfiles",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["get_adminPermissions"]),
  },
  methods: {
    // get Employee function
    getEmployee(params) {
      this.controlLoading(true);
      if (this.get_adminPermissions("cadry_leader_cadries")) {
        this.organization.organization_id = this.organizationVal?.id;
        this.organization.department_id = this.departmentValue?.id;
        LeaderService.get_LeaderCadry(this.organization).then((res) => {
          this.totalCadries = res.data.cadries.pagination.total;
          let number =
            (this.organization.page - 1) * this.organization.per_page;
          res.data.cadries.data.forEach((item) => {
            number++;
            item.number = number;
          });
          this.cadries = res.data.cadries.data;
          this.controlLoading(false);
        });
      } else {
        employeeService
          .get_Employees(this.organization)
          .then((res) => {
            this.totalCadries = res.data.cadries.pagination.total;
            let number =
              (this.organization.page - 1) * this.organization.per_page;
            res.data.cadries.data.forEach((item) => {
              number++;
              item.number = number;
            });
            this.cadries = res.data.cadries.data;
            this.controlLoading(false);
            if (this.isSelectAll) {
              this.cadries.forEach((item) => {
                if (!this.unSelectItemId.includes(item.id)) {
                  this.selectOptions.push(item.id);
                }
              });
            }
          })
          .catch((error) => {
            this.controlLoading(false);
            console.log(error);
          });
      }
    },
    get_Department(id) {
      this.loadingDepartment = true;
      organizationsService
        .getDepartment({ organization_id: id })
        .then((res) => {
          res.data.unshift({
            name: "Barchasi",
            id: null,
          });
          this.departmentList = res.data;
          this.loadingDepartment = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_Organization(id) {
      organizationsService.get_Organization({ railway_id: id }).then((res) => {
        this.organizationList = res.data;
        this.organizationList.unshift({
          name: "Barchasi",
          id: null,
        });
      });
    },
    changeOrganization() {
      this.departmentValue = null;
      this.getEmployee();
      this.get_Department(this.organizationVal.id);
    },
    checkLeader() {
      let org = JSON.parse(localStorage.getItem("organization"));

      if (this.get_adminPermissions("cadry_leader_cadries")) {
        this.railwayList = [org.railway];
        this.railwayVal = org.railway;
        this.get_Organization(org.railway.id);
      } else {
        this.organization.organization_id = org.id;
        this.get_Department(org.id);
      }
    },
    send_commander_cadry(data){
      commanderService.add_commander({
        cadry_id:this.active_cadry_id,
        data,
      }).then((res)=>{
        this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Xizmat safariga jo'natildi",
        life: 2000,
      });
      })
    },

    toggle(event, id){
      this.active_cadry_id = id;
       this.$refs.menu.toggle(event);
},
    get_Stuffs(id) {
      employeeService
        .get_Stuffs({ organization_id: id })
        .then((res) => {
          this.Stuffs = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_Education() {
      organizationsService
        .getEducation()
        .then((res) => {
          this.educationList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_getRegions() {
      organizationsService
        .getRegions()
        .then((res) => {
          this.regionList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_adress_District(id) {
      this.districtLoading = true;
      organizationsService
        .getDistricts({ region_id: id })
        .then((res) => {
          this.districtList = res.data;
          this.districtLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_birthDistrict(id) {
      this.birth_districtLoading = true;
      organizationsService
        .getDistricts({ region_id: id })
        .then((res) => {
          this.birth_districtList = res.data;
          this.birth_districtLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    get_getVacations() {
      organizationsService
        .getVacations()
        .then((res) => {
          this.vacationList = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changeDepartment(event) {
      this.organization.department_id = event.value.id;
      this.getEmployee(this.organization);
    },

    changeStuffs(event) {
      this.organization.staff_id = event.value.id;
      this.searchBtn();
    },
    changeEducation(event) {
      this.organization.education_id = event.value.id;
      this.searchBtn();
    },
    change_adressRegion(event) {
      this.organization.address_region_id = event.value.id;
      this.get_adress_District(event.value.id);
      this.districtVal = null;
      this.searchBtn();
    },
    change_adressDistrict(event) {
      this.organization.address_city_id = event.value.id;
      this.searchBtn();
    },
    change_BirthRegion(event) {
      this.organization.birth_region_id = event.value.id;
      this.get_birthDistrict(event.value.id);
      this.birth_districtVal = null;
      this.searchBtn();
    },

    birth_changeDistrict(event) {
      this.organization.birth_city_id = event.value.id;
      this.searchBtn();
    },

    changeCadrAge(event) {
      this.organization.age_start = event[0];
      this.organization.age_end = event[1];
    },
    changeGender(event) {
      this.organization.sex = event.value.id;
      this.searchBtn();
    },

    changeVacation(event) {
      this.organization.vacation_id = event.value.id;
      this.searchBtn();
    },
    changePagination(event) {
      this.organization.page = event.page;
      this.organization.per_page = event.per_page;
      localStorage.setItem("page_1", event.page);
      localStorage.setItem("per_page_1", event.per_page);
      this.getEmployee(this.organization);
    },

    changeSelectAll(event) {
      if (this.selectAllOption.length > 0) {
        this.isSelectAll = true;
        this.selectOptions = this.cadries.map((item) => item.id);
        this.unSelectItemId = [];
        this.selectItemId = [];
      } else {
        this.isSelectAll = false;
        this.selectOptions = [];
        this.unSelectItemId = [];
        this.selectItemId = [];
      }
    },
    changeRowSelect(id) {
      if (this.selectOptions.includes(id) && this.isSelectAll) {
        this.unSelectItemId = this.unSelectItemId.filter((item) => item !== id);
      } else if (!this.selectOptions.includes(id) && this.isSelectAll) {
        if (!this.unSelectItemId.includes(id)) {
          this.unSelectItemId.push(id);
        }
      } else if (this.selectOptions.includes(id) && !this.isSelectAll) {
        this.selectItemId.push(id);
      } else if (!this.selectOptions.includes(id) && !this.isSelectAll) {
        this.selectItemId = this.selectItemId.filter((item) => item !== id);
      }
    },
    downloadControl() {
      if (this.selectMode) {
        this.controlSectionDialog(true);
        this.dowloadLoading = false;
        this.downloadBtnText = "Yuklashni boshlash";
      } else {
        this.controlExportDialog(true);
      }
    },
    startDownloadZip() {
      let params = { ...this.organization };
      params.comment = this.file_name;
      params.passport_files = this.cadry_pasport.length > 0;
      params.send_all = this.isSelectAll ? 1 : 0;
      params.not_send_arr = this.unSelectItemId;
      params.send_arr = this.selectItemId;

      this.dowloadLoading = true;
      this.downloadBtnText = "Yuklanmoqda...";
      EksportService.get_cadryZip(params)
        .then((res) => {
          this.dowloadLoading = false;
          this.downloadBtnText = "Yuklashni boshlash";
          this.$router.push("/admin/zipfiles");
        })
        .catch((error) => {
          this.dowloadLoading = false;
          this.downloadBtnText = "Yuklashni boshlash";
          this.$toast.add({
            severity: "warn",
            summary: "Ruxsat etilmadi",
            detail: error.response.data.message,
            life: 2000,
          });
        });
    },

    goPush(id) {
      this.$router.push(`/admin/editemployee/${id}`);
    },
    goPushDetails(id) {
      this.$router.push(`/admin/employee/view/${this.active_cadry_id}`);
    },
    goNewPush() {
      this.$router.push("/admin/addnewemployee");
    },

    searchBtn() {
      this.getEmployee(this.organization);
    },

    // Dowload resume
    DowloadResume() {
      this.$refs.word_resume.generateWord(this.active_cadry_id);
    },

    // Opent resume
    openResume(id) {
      this.$refs.show_resume.showResume(id);
    },
    business_trip(){
      this.$refs.business_ref.control_modal()
    },

    beforeOpen(event) {

    },
    // clear additional filter details
    clearFilterDetails() {
      this.organization.staff_id = null;
      this.stuffValue = null;
      this.organization.education_id = null;
      this.educationValue = null;
      this.organization.vacation_id = null;
      this.vacationValue = null;
      this.organization.first_name = null;
      this.organization.last_name = null;
      this.organization.middle_name = null;
      this.organization.age_end = null;
      this.organization.age_start = null;
      this.organization.sex = null;
      this.organization.birth_region_id = null;
      this.organization.birth_city_id = null;
      this.organization.address_region_id = null;
      this.organization.address_city_id = null;
      this.regionValue = null;
      this.birth_region = null;
      this.genderValue = null;
      this.birth_districtList = [];
      this.birth_districtVal = null;
      this.districtList = [];
      this.districtVal = null;

      this.selectedAge = [10, 80];
      this.$toast.add({
        severity: "success",
        summary: "Muvofaqqiyatli bajarildi",
        detail: "Tozalandi",
        life: 2000,
      });
    },

    openFilterPanel(event) {
      this.$refs.op.toggle(event);
    },
    openFilterPanel2(event) {
      this.$refs.op2.toggle(event);
    },
    controlLoading(item) {
      this.loadingtable = item;
    },
    controlExportDialog(item) {
      this.$refs.export_to_excel.controlPanel(true, this.organization);
    },
    controlSectionDialog(item) {
      this.selectionDialog = item;
    },
  },
  mounted() {
    this.getEmployee(this.organization);
    this.checkLeader();
    // this.get_Department();
    this.get_Education();
    this.get_getRegions();
    this.get_getVacations();
    this.get_Stuffs();
  },
};
</script>
<style lang="scss" scoped>
// custom-icon-btn custom-btn-primary

// table {
//   border-collapse: collapse;
//   width: 100%;
// }

// td,
// th {
//   border: 1px solid #dddddd;
//   text-align: left;
//   padding: 8px;
// }

// tr:nth-child(even) {
//   background-color: #dddddd;
// }
</style>
