<script>
    import axios from "axios"
    import { useToast } from "vue-toastification"

    export default{
        name: 'selfassesment',
        
        data(){
            return{
                errors: [],
                message: [],

                allorg: [],
                allsuborg: [],
                allitem: [],
                currencyCode: "",

                org: '',
                allcurrency: [],

            }
            
        },

        async mounted(){

            this.org = localStorage.getItem('organisation');

            const result = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/organizations', {
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);
            this.allorg = result.data.result;

            const results = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/suborganization/'+this.$route.params.organizationCode, {
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);
            this.allsuborg = results.data.result;

            // const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+this.$route.params.organizationCode,{
            //     headers: {
            //         clientid : 'abc123',
            //         Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //     }
            // },);

            // this.allitem = resp.data.result;
            // setTimeout(() => {
            // $("#datatable").DataTable({
            //     lengthMenu: [
            //     [5,10, 25, 50, -1],
            //     [5,10, 25, 50, "All"],
            //     ],
            //     pageLength: 10,
            // });
            // });
            

            // let self = this;
            // $('.select2').select2().on("change", function() {
            //     self.onSelectChange(this.value);
            // });

            // let selfs = this;
            // $('.select22').select2().on("change", function() {
            //     selfs.onSelectChanges(this.value);
            // });

            // let selfss = this;
            // $('.select222').select2().on("change", function() {
            //     selfss.onSelectChangess(this.value);
            // });

            const curren = await axios.get('api/Currency/allcurrencies', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcurrency = curren.data.result;

        },

        methods: {

            // async onSelectChange(val) {

            //     this.organizationCode = val;

            //     const response = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/suborganization/'+val,{
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     },);

            //     const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+val,{
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     },);

            //     this.allitem = resp.data.result;

            //     this.allsuborg = response.data.result;
            // },

            // async onSelectChanges(val) {

            //     this.subOrganizationCode = val;
            // },

            // async onSelectChangess(val) {

            //     this.itemOrgCode = val;

            //     const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+val,{
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     },);
            //     this.customFieldValues = resp.data.result.customFields;
            // },

            async handleCustomer(){
                this.errors = [];
                this.message = [];
                const toast = useToast();

                if(!this.subOrganizationCode){
                    toast.error("Please choose a sub-organization");
                }else{

                    localStorage.getItem('organisation');
                    localStorage.setItem('subOrganization', this.subOrganizationCode);
                    // localStorage.setItem('itemOrg', this.itemOrgCode);
                    // localStorage.setItem('currency', this.currencyCode);
                    // localStorage.setItem('customField', JSON.stringify(this.customFieldValues));


                    this.$router.push("/selfassessment/"+this.org+'/'+this.subOrganizationCode);

                }

                // this.itemList.push(this.customFieldValues);
                
                // const response = await axios.post('https://assessmentapi.revassuredev.com/api/Invoice/addinvoice', {

                //     organizationCode: this.organizationCode,
                //     subOrganizationCode: this.subOrganizationCode,
                //     customerData: this.customerData,
                //     currencyCode: "NGN",
                //     itemOrgCode: this.itemOrgCode,

                //     customFieldValues: this.customFieldValues,
                    
                // },{
                //     headers: {
                //         clientid : 'abc123',
                //         Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                //     }
                // });
   
            }

        }
        
    }
</script>

<template>
  <div id="layout-wrapper">
    
    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100" >

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title" style="color: #fff !important;">Menu</li>

                    <li v-if="!this.customerCode">
                        <router-link :to="'/selfassessment/'+this.org" class="waves-effect text-dark">
                            <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Dashboard</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Dashboard</span>
                        </router-link>
                    </li>

                    <li v-if="!this.customerCode">
                        <router-link to="/login" class="waves-effect text-dark">
                            <i class="mdi mdi-receipt" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Bills</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-receipt" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Bills</span>
                        </router-link>
                    </li>

                    <li v-if="!this.customerCode">
                        <router-link to="/login" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Payments</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/payments/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Payments</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/self-assesment/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Pay for a Service</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/profile/'+this.customerCode" class=" waves-effect text-dark">
                            <i class="mdi mdi-account" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Profile</span>
                        </router-link>
                    </li>



                </ul>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
    <!-- Left Sidebar End -->

        <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link style="font-size: 16px; color: #333;" to="/">Self Assessment</router-link></li>
                                <li style="font-size: 16px; color: #333;" class="breadcrumb-item active" aria-current="page">{{this.org}}</li>
                            </ol>
                        </nav>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">fg-ras</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="alert alert-success" v-if="message.length">
                <strong v-for="msg in message">{{ msg }}</strong>
            </div>
            <form @submit.prevent="handleCustomer">
            <div class="row">
                <div class="col-lg-12 card">
                    
                    
                    <div class="row">
                        <div class="col-md-12 pt-2 pb-2">
                            <div class="card-body table-responsive">
                                <div class="row">
                                    <div class="col-md-8">
                                        <!-- <div class="pt-2 pb-3 border-bottom">
                                            <h3 style="font-size: 24px;font-weight: 500;">{{this.org}}</h3>
                                        </div> -->

                                        <div class="pb-2">
                                            <h3 style="font-size: 18px;font-weight: 500;">Choose Sub-Organization <span class="text-danger">*</span></h3><hr>

                                            <div class="check">
                                                <div class="bxx" v-for="item in allsuborg">
                                                    <input type="radio" :id="item.subOrganisationCode" v-model="subOrganizationCode" name="subOrganizationCode" :value="item.subOrganisationCode">&nbsp; <label style="font-size: 16px;font-weight: 400;padding: 0;margin: 0;color: #333;" :for="item.subOrganisationCode">{{ item.subOrganisationName }}</label>
                                                </div>
                                            </div>

                                            <!-- <select v-model="subOrganizationCode" class="form-control s select22">
                                                
                                                <option v-for="item in allsuborg" :value="item.subOrganisationCode">
                                                {{ item.subOrganisationName }}
                                                </option>
                                            </select> -->
                                        </div>

                                        <!-- <div class="pt-4 pb-2 as">
                                            <div class="row">
                                                <div class="col-md-9 mb-4">
                                                    <h4 class="pb-2" style="font-size: 16px;font-weight: 500;">Select Item <span class="text-danger">*</span></h4>

                                                    <select v-model="itemOrgCode" class="form-control s select222">
                                                        
                                                        <option v-for="item in allitem" :value="item.itemOrgCode">
                                                            {{ item.itemName }}
                                                        </option>
                                                    </select>
                                                </div>

                                                <div class="col-md-3 mb-3">
                                                    <h4 class="pb-2" style="font-size: 16px;font-weight: 500;">Choose Currency <span class="text-danger">*</span></h4>

                                                    <select v-model="currencyCode" class="form-control" style="height: 30px !important; font-size: 12px;">
                                                        
                                                        <option :value="this.allcurrency[0]">{{this.allcurrency[0]}}</option>

                                                        <option :value="this.allcurrency[1]">{{this.allcurrency[1]}}</option>

                                                        <option :value="this.allcurrency[2]">{{this.allcurrency[2]}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>

                                    

                                </div>
                                
                                <!-- <div class="row mt-2">
                                    
                                    <div class="col-md-4" v-for="custom in customFieldValues">

                                        <div class="">
                                            <input class="form-control" type="hidden" v-model="custom.id">
                                        </div>

                                        <div class="mb-4" v-if="custom.fieldType == 'text'">
                                            <label class="control-label">{{custom.fieldKey}}</label>
                                            <input class="form-control" type="text" v-model="custom.fieldValue">
                                        </div>
                                    
                                        <div class="mb-4" v-if="custom.fieldType == 'dropdown'">
                                            <label class="control-label">{{custom.fieldKey}}</label>
                                            <select class="form-control w-100" v-model="custom.fieldValue">
                                                <option>
                                                    {{custom.fieldOptions}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div> -->
                                
                                <button class="btn btn-outline-success">Next</button>
                            </div>

                            
                        </div>

                        
                    </div>
                    
                    <!-- end select2 -->
                </div>



            </div>
            </form>
            <!-- end row -->
        </div> <!-- container-fluid -->
        </div>
    
    <!-- End Page-content -->

    
    </div>
  </div>
  <div class="container-fluid">
    <div class="row mt-5">
        <div class="col-lg-12 card p-3">
            <div class="text-center">
                &copy; 2022 Federal Government Revenue Assurance Project. Powered by Intelligence
            </div>
        </div>
   </div>
  </div>


  <router-view></router-view>
</template>

<style>
    
</style>
