<script>
    import axios from "axios"
    import { useToast } from "vue-toastification"

    export default{
        name: 'selfassesments',
        
        data(){
            return{
                errors: [],
                message: [],

                items: [],

                org: "",
                sub: "",
                currencyCode: "",
                itemOrg: "",
                itemOrgCode: "",
                customField: "",
                allitem: [],
                allsuborg: [],

                customerData: {
                    mobileNumber: "",
                    contactAddress: "",
                    customerType: 0,
                    customerTin: "",
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    companyName: "",
                    state: "",
                    lga: "",
                    emailAddress: "",
                    mobileNumber2: "",
                    nin: "",
                    bvn: "",
                    
                },

                org: '',

                customFieldValues: [{
                   fieldValue: "",
                   id: 0,
                }],


            }
            
        },

        created(){

            this.org = localStorage.getItem('organisation');
            // this.sub = localStorage.getItem('subOrganization');
            // this.itemOrg = localStorage.getItem('itemOrg');
            // this.currencyCode = localStorage.getItem('currency');
            // this.customField = JSON.parse(localStorage.getItem('customField'));

            // if(!this.itemOrg){
            //     this.$router.push("/self-assesments/"+this.org);
            // }
        },


        async mounted(){

            const results = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/suborganization/'+this.$route.params.organizationCode, {
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);
            this.allsuborg = results.data.result;

            // const result = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+this.itemOrg, {
            //     headers: {
            //         clientid : 'abc123',
            //         Authorization: '0*EI&LBEey28Y#p1e3qmVD'
            //     }
            // },);
            // this.items = result.data.result.itemDetails;

            this.org = localStorage.getItem('organisation');
            this.sub = localStorage.getItem('subOrganization');
            // this.itemOrg = localStorage.getItem('itemOrg');
            // this.currencyCode = localStorage.getItem('currency');
            // this.customField = JSON.parse(localStorage.getItem('customField'));

            const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+this.org,{
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);

            this.allitem = resp.data.result;
            
        },

        methods: {

            onSubChange(event) {

                localStorage.removeItem('subOrganization');

                localStorage.setItem('subOrganization', event.target.value);

                window.location.href = "/selfassessment/"+this.org+'/'+event.target.value;
                
            },

            async onChange(event) {

                const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+event.target.value,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                },);
                this.customFieldValues = resp.data.result.customFields;
                // console.log(this.item)
            },

            async handleCustomer(){
                this.errors = [];
                this.message = [];
                const toast = useToast();

                // this.itemList.push(this.customFieldValues);

                if(!this.customerData.customerType){
                    toast.error("Select a customer type");
                }

                if(!this.customerData.firstName){
                    toast.error("First Name required.");
                }

                if(!this.customerData.lastName){
                    toast.error("Last Name required.");
                }

                if(!this.customerData.mobileNumber){
                    toast.error("Mobile Number required.");
                }

                if(!this.customerData.contactAddress){
                    toast.error("Address required.");
                }

                if(!this.itemOrgCode){
                    toast.error("Please select an item");
                }else{

                    await axios.post('https://assessmentapi.revassuredev.com/api/Invoice/addinvoice', {

                    organizationCode: this.org,
                    subOrganizationCode: this.sub,
                    customerData: this.customerData,
                    currencyCode: "NGN",
                    itemOrgCode: this.itemOrgCode,

                    customFieldValues: this.customFieldValues,

                    },{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                    }).then(response => { 
                        this.$router.push("/viewinvoice/"+response.data.result);

                        this.organizationCode = "";
                        this.subOrganizationCode = "";
                        this.itemOrgCode = "";
                        this.currencyCode = "";

                        this.customerData.mobileNumber = "";
                        this.customerData.contactAddress = "";
                        this.customerData.customerType = "";
                        this.customerData.customerTin = "";
                        this.customerData.firstName = "";
                        this.customerData.lastName = "";
                        this.customerData.middleName = "";
                        this.customerData.companyName = "";
                        this.state = "";
                        this.lga = "";
                        this.emailAddress = "";
                        this.mobileNumber2 = "";
                        this.nin = "";
                        this.bvn = "";
                    })
                    .catch(error => {
                        if(error.response.data.title){
                            // toast.error("An error occured");
                        }
                        
                    });

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
                                <li style="font-size: 16px; color: #333;" class="breadcrumb-item active" aria-current="page"><router-link :to="'/selfassessment/'+this.org">{{this.org}}</router-link></li>
                                <li style="font-size: 16px; color: #333;" class="breadcrumb-item active" aria-current="page">{{this.sub}}</li>
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
                        <div class="col-md-12 p-3 border-bottom pl-4 pr-0">
                            <h3 style="font-size: 24px;font-weight: 500;">{{this.org}}</h3>
                        </div>
                    </div>
                    <div class="row er">
                        <div class="col-md-3 border-right pt-2 pl-0 pr-0">
                            <div class="card-body pb-2">
                                <h3 style="font-size: 18px;font-weight: 500;">Sub-Organization</h3><hr>

                                <div class="check">
                                    <div class="bxxs" v-for="item in allsuborg">
                                        
                                        <input @change="onSubChange($event)" type="radio" :id="item.subOrganisationCode" v-model="subOrganizationCode" name="subOrganisationCode" :value="item.subOrganisationCode" :checked="item.subOrganisationCode == this.sub">&nbsp; <label style="font-size: 14px;font-weight: 400;padding: 0;margin: 0;color: #333;" :for="item.subOrganisationCode">{{ item.subOrganisationName }}</label>
                                        
                                        
                                    </div>
                                </div>

                                <!-- <select v-model="subOrganizationCode" class="form-control s select22">
                                    
                                    <option v-for="item in allsuborg" :value="item.subOrganisationCode">
                                    {{ item.subOrganisationName }}
                                    </option>
                                </select> -->
                            </div>
                        </div>

                        <div class="col-md-3 border-right pt-2 pl-1 pr-1">
                            <div class="card-body table-responsive">
                                <div class="row ss">
                                    <div class="col-md-12 pb-3 border-bottom">
                                        <h3 style="font-size: 18px;font-weight: 500;">{{this.sub}}</h3>
                                    </div>
                                    <div class="col-md-12 pt-4 pb-4 border-bottom">
                                        <h3 style="font-size: 18px;font-weight: 500;">Items</h3>
                                    </div>
                                    <div class="col-md-12 mb-4 pt-4 pb-2 border-bottom">
                                        <div class="d-flex">

                                            <div class="me-auto">
                                                <!-- <label style="font-size: 18px;" for="">Items</label> -->
                                                <div class="checks pt-2">
                                                    <div v-for="item in allitem">
                                                        <input type="radio" name="itemOrgCode" :id="item.itemOrgCode" v-model="itemOrgCode" @change="onChange($event)" :value="item.itemOrgCode"> <label class="mb-4" style="font-size: 16px;font-weight: 400;" :for="item.itemOrgCode">{{ item.itemName }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div class="ml-auto">
                                                <div class="checks pt-2">
                                                    <div v-for="item in allitem">
                                                        <p class="mb-4" style="font-size: 16px;font-weight: 400;" :for="item.price">&#8358;{{ item.price }}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- <h4 style="font-size: 20px;font-weight: 400;">
                                                <span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'NGN'">&#8358;</span><span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'USD'">&#36;</span><span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'GBP'">&#163;</span>{{this.items.price}}
                                            </h4> -->
                                        </div>
                                      
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        

                        <div class="col-md-6 pb-4 pl-1 pr-1">
                            <div class="card-body">
                                <div class="row" v-if="this.itemOrgCode != ''">
                                    <div class="col-md-12">
                                        <div v-for="custom in customFieldValues">
                                    
                                            <div>
                                                <!-- <label class="control-label">Item OrgCode</label> -->
                                                <input class="form-control" type="hidden" v-model="custom.id">
                                            </div>
                                        
                                            <div class="mb-4" v-if="custom.fieldType == 'text'">
                                                <label class="control-label">{{custom.fieldKey}}</label>
                                                <input class="form-control" type="text" v-model="custom.fieldValue">
                                            </div>

                                            <div class="mb-4" v-if="custom.fieldType == 'dropdown'">
                                                <label class="control-label">{{custom.fieldKey}}</label>
                                                <select class="form-control" v-model="custom.fieldValue">
                                                    <!-- <option v-for="f in custom.fieldOptions" :value="f">
                                                        {{f}}
                                                    </option> -->

                                                    <option>
                                                        {{custom.fieldOptions}}
                                                    </option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Customer Type <span class="text-danger">*</span></label>
                                            <select v-model="customerData.customerType" class="form-control" id="">
                                                <option value="10">Individual</option>
                                                <option value="11">Cooperate</option>
                                            </select>
                                        </div>

                                        <div v-if="customerData.customerType == 11">
                                            <div class="form-group mb-4">
                                                <label class="control-label">Company Name <span class="text-danger">*</span></label>
                                                <input class="form-control" v-model="customerData.companyName" type="text">
                                            </div>
                                        </div>
                                    </div>

                                    
                                

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">First Name <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.firstName" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Middle Name</label>
                                            <input class="form-control" v-model="customerData.middleName" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.lastName" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.emailAddress" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Mobile Number <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.mobileNumber" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Mobile Number (Alt)</label>
                                            <input class="form-control" v-model="customerData.mobileNumber2" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">NIN <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.nin" type="number">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">BVN <span class="text-danger">*</span></label>
                                            <input class="form-control" v-model="customerData.bvn" type="number">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group mb-4">
                                            <label class="control-label">TIN</label>
                                            <input class="form-control" v-model="customerData.customerTin" type="text">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">State <span class="text-danger">*</span></label>
                                            <select onchange="toggleLGA(this);" v-model="state" id="state" class="form-control">
                                                <option value="" selected="selected">- Select -</option>
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="AkwaIbom">AkwaIbom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Cross River">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="FCT">FCT</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamafara</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <label class="control-label">LGA <span class="text-danger">*</span></label>
                                            <select v-model="lga" id="lga" class="form-control select-lga">
						                    </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group mb-4">
                                            <label class="control-label">Address <span class="text-danger">*</span></label>
                                            <textarea class="form-control" v-model="customerData.contactAddress" cols="30" rows="5"></textarea>
                                        </div>
                                    </div>

                                </div>
                                
                                <button class="btn btn-outline-success mt-4">Submit</button>

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
    .ss h3{
        font-size: 22px;
    }

    .ss span{
        font-size: 16px;
    }
</style>
