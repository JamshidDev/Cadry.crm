<template>
    <div class="grid">
        <div class="col-12 flex  flex-column">

            <div class="box-container" v-if="candidate">
                <div class="action-box">
                    <Button icon="pi pi-ban" label="Rad qilish" @click="ban_candidate()" :loading="reject_loading"
                        class="  p-button-danger uppercase text-sm p-button-sm" />
                    <Button icon="pi pi-circle-fill" label="Qabul qilish" @click="accept_slug()" :loading="accept_loading"
                        class="  p-button-primary uppercase text-sm p-button-sm" />

                </div>

                <div class="document-container mt-4 mx-auto">
                    <div class="image-box">
                        <img :src="candidate.cadry.photo" alt="">
                    </div>

                    <div class="document-title">
                        <!-- Tavsiya etilayotgan nomzod -->
                    </div>
                    <div class="worker-fulname">
                        {{ candidate.cadry.fullname }}
                    </div>
                    <div class="position-date">

                    </div>
                    <div class="position-name">

                    </div>
                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Tug'ilgan yili:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.birth_date }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Tug'ilgan joyi:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.birth_place }}
                            </div>
                        </div>

                    </div>

                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Millati:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.nationality }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Partiyaviyligi:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.party }}
                            </div>
                        </div>

                    </div>


                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Ma'lumoti:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.education }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Tamomlagan:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.educations.map(a => a.name).toString() }}
                            </div>
                        </div>

                    </div>

                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Ma'lumoti bo'yicha mutaxassisligi:
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-subtitle">
                                {{ candidate.educations.map(a => a.speciality).toString() }}r
                            </div>

                        </div>

                    </div>

                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Ilmiy darajasi:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.academec_degree }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Ilmiy unvoni:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.academec_title }}
                            </div>
                        </div>

                    </div>


                    <div class="document-section">
                        <div class="section-one">
                            <div class="section-title">
                                Qaysi chet tillarini biladi:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.lan }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Xarbiy (maxsus) unvoni:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.military_rank }}
                            </div>
                        </div>

                    </div>

                    <div class="document-section">

                        <div class="single-section">
                            <div class="single-section-title">
                                Davlat mukofotlari bilan taqdirlanganmi(qanaqa):
                            </div>
                            <div class="single-section-subtitle">
                                {{ candidate.cadry.deputy }}
                            </div>
                        </div>




                    </div>
                    <div class="document-section">
                        <div class="single-section">
                            <div class="single-section-title">
                                Xalq deputatlari respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa
                                saylanadigan organlarning a'zosimi(to'liq ko'rsatilishi lozim):
                            </div>
                            <div class="single-section-subtitle">
                                Yo'q
                            </div>
                        </div>

                    </div>


                    <!-- cadry careers -->
                    <div class="worker-carrer-title">
                        MEHNAT FAOLIYATI
                    </div>
                    <div class="career-section" v-for="career in candidate.carers" :key="career.id">
                        <div class="career-date">
                            {{ career.date1 + ' - ' + career.date2 }} yy
                        </div>
                        <div class="career-name">
                            {{ career.staff_name }}
                        </div>
                    </div>





                    <!-- cadry relatives -->
                    <div class="worker-relative-title mt-8">
                        {{ candidate.cadry.fullname }} o'g'lining yaqin qarindoshlari haqida
                    </div>
                    <div class="worker-relative-subtitle">
                        MA'LUMOT
                    </div>
                    <div class="relative-table-container">
                        <div class="table-row-header">
                            <div class="row-content-relative row-content">
                                Qarindoshligi
                            </div>
                            <div class="row-content-fulname row-content">
                                Familiyasi,ismi va otasining ismi
                            </div>
                            <div class="row-content-birthdate row-content">
                                Tug'ilgan yili va joyi
                            </div>
                            <div class="row-content-position row-content">
                                Ish joyi va lavozimi
                            </div>
                            <div class="row-content-adress row-content">
                                Turar joyi
                            </div>
                        </div>
                        <div class="table-row-body" v-for="candidate in candidate.relatives" :key="candidate.id">
                            <div class="row-content-relative row-content">
                                {{ candidate.relative.name }}
                            </div>
                            <div class="row-content-fulname row-content">
                                {{ candidate.fullname }}
                            </div>
                            <div class="row-content-birthdate row-content">
                                {{ candidate.birth_place }}
                            </div>
                            <div class="row-content-position row-content">
                                {{ candidate.post }}
                            </div>
                            <div class="row-content-adress row-content">
                                {{ candidate.address }}
                            </div>
                        </div>


                    </div>

                    <div class="additional-title">
                        Qo'shimcha ma'lumotlar

                    </div>
                    <div class="addional-section">
                        <div class="section-one">
                            <div class="section-title">
                                Telefon raqam:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.phone }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Pochta manzili:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.gmail }}
                            </div>
                        </div>
                    </div>
                    <div class="addional-section">
                        <div class="section-one">
                            <div class="section-title">
                                Yashash viloyati:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.address_region }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Yashash tumani:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.address_city }}
                            </div>
                        </div>
                    </div>
                    <div class="addional-section">
                        <div class="section-one">
                            <div class="section-title">
                                Pasport berilgan viloyati:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.pass_region }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Pasport berilgan tumani:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.pass_city }}
                            </div>
                        </div>
                    </div>
                    <div class="addional-section">
                        <div class="section-one">
                            <div class="section-title">
                                Pasport seriya va raqam:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.passport }}
                            </div>
                        </div>
                        <div class="section-two">
                            <div class="section-title">
                                Pasport jshr:
                            </div>
                            <div class="section-subtitle">
                                {{ candidate.cadry.pinfl }}
                            </div>
                        </div>
                    </div>
                    




                </div>

                <!-- Career document -->
                <!-- <div class="document-container mt-4 mx-auto">
                    <div class="worker-carrer-title">
                        MEHNAT FAOLIYATI
                    </div>
                    <div class="career-section">
                        <div class="career-date">
                            2022-2023 yy.
                        </div>
                        <div class="career-name">
                            O‘zbekiston temir yo‘llari AJ personalni boshqarish va kadrlarni tayorlash boshqarmasining
                            kadrlar tayorlash va o‘quv yurtlari bo‘limi mutahassisi
                        </div>
                    </div>
                    <div class="career-section">
                        <div class="career-date">
                            2022-2023 yy.
                        </div>
                        <div class="career-name">
                            O'zbekiston temir yo'llari AJ Ishlarni boshkarish direktsiyasida ish yurituvchi
                        </div>
                    </div>
                    <div class="career-section">
                        <div class="career-date">
                            2022-2023 yy.
                        </div>
                        <div class="career-name">
                            O'zbekiston temir yo'llari AJ Ishlarni boshkarish direktsiyasida ish yurituvchi
                        </div>
                    </div>
                    <div class="career-section">
                        <div class="career-date">
                            2022 y. - h.v.
                        </div>
                        <div class="career-name">
                            O‘zbekiston temir yo‘llari AJ personalni boshqarish va kadrlarni tayorlash va uni boshqarma
                            kadrlar tayorlash va o‘quv yurtlari bo‘limi mutahassisi
                            O‘zbekiston temir yo‘llari AJ personalni boshqarish va kadrlarni tayorlash va uni boshqarma
                            kadrlar tayorlash va o‘quv yurtlari bo‘limi mutahassisi
                        </div>
                    </div>

                </div> -->

                <!-- Relative document -->
                <!-- <div class="document-container mt-4 mx-auto">
                    <div class="worker-relative-title">
                        Raximov Jamshid Shuxrat o'g'lining yaqin qarindoshlari haqida
                    </div>
                    <div class="worker-relative-subtitle">
                        MA'LUMOT
                    </div>
                    <div class="relative-table-container">
                        <div class="table-row-header">
                            <div class="row-content-relative row-content">
                                Qarindoshligi
                            </div>
                            <div class="row-content-fulname row-content">
                                Familiyasi,ismi va otasining ismi
                            </div>
                            <div class="row-content-birthdate row-content">
                                Tug'ilgan yili va joyi
                            </div>
                            <div class="row-content-position row-content">
                                Ish joyi va lavozimi
                            </div>
                            <div class="row-content-adress row-content">
                                Turar joyi
                            </div>
                        </div>
                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>


                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>


                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                        <div class="table-row-body">
                            <div class="row-content-relative row-content">
                                Otasi
                            </div>
                            <div class="row-content-fulname row-content">
                                Polvanov Shuxrat Raximberganovich
                            </div>
                            <div class="row-content-birthdate row-content">
                                1969 yil Xorazm viloyati, Shovot tumani
                            </div>
                            <div class="row-content-position row-content">
                                Chet-elda (quruvchi)
                            </div>
                            <div class="row-content-adress row-content">
                                Xorazm viloyati, Shovot tumani, Beglar ko'chasi 51-uy
                            </div>
                        </div>

                    </div>

                </div> -->

            </div>
            <div class="loader-box" v-if="!candidate">
                <ProgressBarLoader/>
            </div>

        </div>
        <RejectModal ref="reject_modal_ref" @delete_accept="delete_slug_cadry()" />
        <AcceptModal ref="accept_modal_ref" @accept_candidate="add_toCadry($event)"  />
    </div>
</template>

<script>
import ProgressBarLoader from '@/components/loaders/ProgressBarLoader.vue';
import SlugService from '@/service/servises/SlugService';

import AcceptModal from './components/AcceptModal2.vue';
import RejectModal from './components/RejectModal.vue';

export default {
    components: {
        RejectModal,
        ProgressBarLoader,
        AcceptModal,

    },
    data() {
        return {
            candidate: null,
            reject_loading : false,
            accept_loading:false,
        }
    },
    methods: {
        add_toCadry(data){
            this.accept_loading=true;
            SlugService.accept_slug_cadry({slug_cadry_id:this.$route.params.id, data}).then((res)=>{
                this.$router.push('/admin/recomended')
                this.accept_loading=false;
            })

        },
        ban_candidate() {
            this.$refs.reject_modal_ref.control_modal()
        },
        accept_slug(){
            this.$refs.accept_modal_ref.control_modal()
        },
        get_candidate_info() {
            SlugService.get_slug_cadries_info({ slug_cadry_id: this.$route.params.id }).then((res) => {
                this.candidate = res.data;
            })
        },
        delete_slug_cadry(){
            console.log('delete');
            this.reject_loading = true;
            SlugService.delete_slug_cadries({slug_cadry_id:this.$route.params.id}).then((res)=>{
                this.$router.push('/admin/recomended')
            }).finally(()=>{
                this.reject_loading = false;
            })
        },
    },
    created() {
        this.get_candidate_info()
    }
}
</script>

<style lang="scss" scoped>
$text-size: 11pt;
$border-color: #000000;

.box-container {
    width: 100%;
    height: 85vh;
    overflow: auto;
    padding: 10px 50px;
    position: relative;

    &::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgb(115, 115, 115);
        border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #537BDB;
        border-radius: 8px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #2260ef;
    }

    .action-box {
        width: 100%;
        height: auto;
        padding: 10px 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        position: sticky;
        top: -10px;
        left: 0px;
        backdrop-filter: blur(4px);
        z-index: 10;

    }
}



.document-container {
    // width: 595px;
    width: 800px;
    min-height: 842px;
    background-color: #fff;
    box-shadow: 0 1px 2px #38414a26;
    padding: 40px 30px 20px 30px;
    position: relative !important;

    .image-box {
        width: 120px;
        height: 160px;
        border: 1px solid #f0f0f8;
        position: absolute;
        right: 30px;
        top: 100px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .document-title {
        font-size: 14pt;
        text-transform: uppercase;
        font-weight: 800;
        text-align: center;
    }

    .worker-fulname {
        font-size: 14pt;
        font-weight: 600;
        text-align: center;
        margin: 6pt 0pt;
    }

    .position-date {
        font-size: $text-size;
        font-weight: 400;
        text-align: left;
    }

    .position-name {
        font-size: $text-size;
        font-weight: 600;
        text-align: left;
        padding-right: 120px;
        margin-bottom: 6pt;
    }

    .document-section {
        width: 100%;
        display: flex;
        margin-bottom: 6pt;

        .section-one {
            width: 50%;
            padding-right: 50px;

            .section-title {
                font-weight: 600;
                font-size: $text-size;
            }

            .section-subtitle {
                font-weight: 400;
                font-size: $text-size;
            }
        }

        .section-two {
            width: 50%;
            padding-right: 120px;

            .section-title {
                font-weight: 600;
                font-size: $text-size;
            }

            .section-subtitle {
                font-weight: 400;
                font-size: $text-size;
            }
        }

        .single-section {
            width: 100%;

            .single-section-title {
                font-weight: 600;
                font-size: $text-size;
            }

            .single-section-subtitle {
                font-weight: 400;
                font-size: $text-size;
            }

        }

    }

    // career
    .worker-carrer-title {
        width: 100%;
        font-size: 14pt;
        font-weight: 600;
        text-align: center;
        margin-bottom: 4pt;
    }

    .career-section {
        width: 100%;
        display: flex;

        .career-date {
            width: 110px;

        }

        .career-name {
            width: calc(100% - 110px);
        }
    }

    // Relative
    .worker-relative-title {
        width: 100%;
        text-align: center;
        font-size: 12pt;
        font-weight: 600;
    }

    .worker-relative-subtitle {
        width: 100%;
        text-align: center;
        font-size: 14pt;
        font-weight: 600;
    }

    .relative-table-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 6pt;

        .table-row-header {
            display: flex;
            width: 100%;
            border-top: 1px solid $border-color;

            .row-content {
                padding: 10px;
                font-size: 10pt;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: start;
            }

            .row-content-relative {
                width: 15%;
                border-left: 1px solid $border-color;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;

            }

            .row-content-fulname {
                width: 25%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-birthdate {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-position {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-adress {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }
        }

        .table-row-body {
            display: flex;
            width: 100%;

            .row-content {
                padding: 5px;
                font-size: 10pt;
                font-weight: 400;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .row-content-relative {
                width: 15%;
                border-left: 1px solid $border-color;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
                font-weight: 600;

            }

            .row-content-fulname {
                width: 25%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-birthdate {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-position {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }

            .row-content-adress {
                width: 20%;
                border-right: 1px solid $border-color;
                border-bottom: 1px solid $border-color;
            }
        }
    }

    .additional-title {
        width: 100%;
        display: block;
        font-size: 14pt;
        font-weight: 600;
        text-align: center;
        margin-bottom: 4pt;
        margin-top: 60px;
        text-transform: uppercase;
    }

    .addional-section {
        width: 100%;
        display: flex;
        margin-bottom: 6pt;

        .section-one {
            width: 50%;
            padding-right: 50px;

            .section-title {
                font-weight: 600;
                font-size: $text-size;
            }

            .section-subtitle {
                font-weight: 400;
                font-size: $text-size;
            }
        }

        .section-two {
            width: 50%;
            padding-right: 0px;

            .section-title {
                font-weight: 600;
                font-size: $text-size;
            }

            .section-subtitle {
                font-weight: 400;
                font-size: $text-size;
            }
        }
    }



}
</style>