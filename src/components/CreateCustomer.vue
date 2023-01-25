<script>
    import axios from "axios"

    export default{
        name: 'selfassesment',
        
        data(){
            return{
                errors: [],
                message: [],

                customerCode: '',

                allsuborg: [],
                allorg: [],
                allitem: [],
                item: [],

                customer: [],

                organizationCode: "",
                subOrganizationCode: "",

                customerData: {
                    mobileNumber: "",
                    contactAddress: "",
                    customerType: 0,
                    customerTin: "",
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    companyName: "",
                },

                currencyCode: "",
                itemOrgCode: "",

                itemList: [],

                customFieldValues: [{
                    fieldValue: "",
                    id: ""
                }],

                allinvoices: [],

                searchQuery: '',
                selectedItem: '',
                isVisible: false,
            }
            
        },

        created(){
            const response = localStorage.getItem('customercode');

            this.customerCode = response;
  
        },

        computed: {
            filteredUser(){
                const query = this.searchQuery.toLowerCase()
                if(this.searchQuery == ""){
                    return this.allorg;
                }

                return this.allorg.filter((org) => {
                    return Object.values(org).some((word => String(word).toLowerCase().includes(query)))
                })
            }
        },

        async mounted(){

            const results = await axios.get('api/Invoice/customerinvoices/'+this.$route.params.customerCode);
            this.allinvoices = results.data.result;

            const result = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/organizations', {
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);
            this.allorg = result.data.result;
            

            let self = this;
            $('.select2').select2().on("change", function() {
                self.onSelectChange(this.value);
            });

            let selfs = this;
            $('.select22').select2().on("change", function() {
                selfs.onSelectChanges(this.value);
            });

            let selfss = this;
            $('.select222').select2().on("change", function() {
                selfss.onSelectChangess(this.value);
            });


            const resultss = await axios.get('https://assessmentapi.revassuredev.com/api/customer/details/'+this.customerCode,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                });

            this.customerData = resultss.data.result;  
            
        },

        methods: {

            handleClick(){
                localStorage.removeItem('customercode');
                this.$router.push('/');
            },

            async onSelectChange(val) {

                this.organizationCode = val;

                const response = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/suborganization/'+val,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                },);

                const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+val,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                },);

                this.allitem = resp.data.result;

                this.allsuborg = response.data.result;
            },

            async onSelectChanges(val) {

                this.subOrganizationCode = val;
            },

            async onSelectChangess(val) {

                this.itemOrgCode = val;

                const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+val,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                },);
                this.customFieldValues = resp.data.result.customFields;
                // console.log(this.item)
            },

            selectItem(item){
                this.selectedItem = item;
                this.isVisible = false;
            },

            // async selectOrg(event) {

            //     const response = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/suborganization/'+this.event,{
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     },);

            //     const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+event.target.value, {
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     });

            //     this.allitem = resp.data.result;

            //     this.allsuborg = response.data.result;
            //     console.log(this.allsuborg)

            // },

            // async itemChange(event) {

            //     const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+event.target.value,{
            //         headers: {
            //             clientid : 'abc123',
            //             Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //         }
            //     },);
            //     this.item = resp.data.result.customFields;

            // },

            async handleCustomer(){
                this.errors = [];
                this.message = [];

                // this.itemList.push(this.customFieldValues);
                

                if (!this.firstname) {
                    this.errors.push("First Name required.");
                }

                if (!this.lastname) {
                    this.errors.push("Last Name required.");
                }

                if (!this.mobileNumber1) {
                    this.errors.push("Mobile Number required.");
                }

                if (!this.emailAddress) {
                    this.errors.push("Email Adrress required.");
                }
                if (!this.bvn) {
                    this.errors.push("BVN required.");
                }
                if (!this.nin) {
                    this.errors.push("NIN required.");
                }
                if (!this.contactAddress) {
                    this.errors.push("Contact Address required.");
                }
                if (!this.lgaCode) {
                    this.errors.push("LGA Code required.");
                }
                if (!this.stateCode) {
                    this.errors.push("State Code required.");
                }
                if (!this.customerType) {
                    this.errors.push("Customer Type required.");
                }
                if (!this.customerTin) {
                    this.errors.push("TIN Number required.");
                }
                
                const response = await axios.post('https://assessmentapi.revassuredev.com/api/Invoice/addinvoice', {

                    organizationCode: this.organizationCode,
                    subOrganizationCode: this.subOrganizationCode,
                    customerData: this.customerData,
                    currencyCode: "NGN",
                    itemOrgCode: this.itemOrgCode,

                    customFieldValues: this.customFieldValues,
                    
                },{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                });
                

                if (response) {
                    // console.log(response);
                    this.message.push(response.data.message);

                    this.$router.push("/viewinvoice/"+response.data.result);
                    
                    this.organizationCode = "";
                    this.subOrganizationCode = "";
                    this.itemOrgCode = "";

                    this.customerData.mobileNumber = "";
                    this.customerData.contactAddress = "";
                    this.customerData.customerType = "";
                    this.customerData.customerTin = "";
                    this.customerData.firstname = "";
                    this.customerData.lastname = "";
                    this.customerData.middlename = "";
                    this.customerData.companyName = "";

                    this.customFieldValues = [{
                        fieldValue: "",
                        fieldID: 0
                    }]
                    
                }else{
                    this.errors.push("Incorrect Parameter");
                }

                
                 
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

                    <li>
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Dashboard</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-receipt" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Bills</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="'/payments/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Payments</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="'/profile/'+this.customerCode" class=" waves-effect text-dark">
                            <i class="mdi mdi-account" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Profile</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="#" @click="handleClick" class=" waves-effect text-dark">
                            <i class="mdi mdi-power" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Logout</span>
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
                        <h4 class="mb-0">Self Assessment </h4>
                        

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
            <!-- <div class="alert alert-danger" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div> -->

            <div class="alert alert-success" v-if="message.length">
                <strong v-for="msg in message">{{ msg }}</strong>
            </div>
            <form @submit.prevent="handleCustomer">
            <div class="row">
                <div class="col-lg-12 card">
                    
                    
                    <div class="row">
                        <div class="col-md-6 border-right pt-2 pb-2">
                            <div class="card-body table-responsive">
                                <div class="row">
                                    <div class="col-md-12 mb-4">
                                        <p class="pb-2" style="font-size: 16px;font-weight: 600;">Organisation</p>

                                        <!-- <section class="dropdown-wrappers mt-2 ">
                                            <div class="selected-items" @click="isVisible = !isVisible">
                                                <span v-if="selectedItem" >
                                                   <input @blur="selectOrg($event)" type="text" v-model="selectedItem.organisationCode" readonly>
                                                </span>
                                                <span v-else>
                                                   
                                                </span>
                                            </div>

                                            <div class="dropdown-popovers" v-if="isVisible">
                                                <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Organisation">
                                                <span class="pl-4 pb-3" style="font-weight: 600;" v-if="filteredUser.length == 0">No Record Found</span>
                                                <div class="optionss">
                                                    <ul>
                                                        <li @click="selectItem(item)" v-for="item in filteredUser">{{item.organisationCode}}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </section> -->

                                        <select v-model="organizationCode" class="form-control select2">
                                            <option :key="'allowance_id'" value=""></option>
                                            <option v-for="item in allorg" :value="item.organisationCode">
                                            {{ item.organisationName }}
                                            </option>
                                        </select>
                                        
                                    </div>

                                    <div class="col-md-12 mb-4">
                                        <p class="pb-2" style="font-size: 16px;font-weight: 600;">Sub-Organisation</p>

                                        <select v-model="subOrganizationCode" class="form-control select22">
                                            
                                            <option v-for="item in allsuborg" :value="item.subOrganisationCode">
                                            {{ item.subOrganisation1 }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-md-12">
                                        <p class="pb-2" style="font-size: 16px;font-weight: 600;">Item</p>

                                        <select v-model="itemOrgCode" class="form-control select222">
                                            
                                            <option v-for="item in allitem" :value="item.itemOrgCode">
                                            {{ item.itemName }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                        <div class="col-md-6 pt-2 pb-4">
                           <div class="card-body" >
                                <p class="pb-2" style="font-size: 16px;font-weight: 600;">Customer Details</p>
                                <hr>

                                <div v-for="custom in customFieldValues">
                                    

                                    <div class="form-group">
                                        <!-- <label class="control-label">Item OrgCode</label> -->
                                        <input class="form-control" type="hidden" v-model="custom.id">
                                    </div>
                                
                                    <div class="form-group mb-4" v-if="custom.fieldType == 'text'">
                                        <label class="control-label">{{custom.fieldKey}}</label>
                                        <input class="form-control" type="text" v-model="custom.fieldValue">
                                    </div>

                                    <div class="form-group mb-4" v-if="custom.fieldType == 'dropdown'">
                                        <label class="control-label">{{custom.fieldKey}}</label>
                                        <select class="form-control" v-model="custom.fieldValue">
                                            <option v-for="f in custom.fieldOptions" :value="f">
                                                {{f}}
                                            </option>
                                        </select>
                                    </div>
                               
                                    
                                </div>

                                <div class="row">
                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">First Name</label>
                                            <input class="form-control" v-model="customerData.firstname" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Last Name</label>
                                            <input class="form-control" v-model="customerData.lastname" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Middle Name</label>
                                            <input class="form-control" v-model="customerData.middlename" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Phone Number</label>
                                            <input class="form-control" v-model="customerData.mobileNumber" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">TIN</label>
                                            <input class="form-control" v-model="customerData.customerTin" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Address</label>
                                            <input class="form-control" v-model="customerData.contactAddress" type="text">
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Customer Type</label>
                                            <select v-model="customerData.customerType" class="form-control" id="">
                                                <option value="10">Individual</option>
                                                <option value="11">Cooperate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Company Name</label>
                                            <input class="form-control" v-model="customerData.companyName" type="text">
                                        </div>
                                    </div>
                                </div>
                                
                                <button class="btn btn-success">Submit</button>

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
