<script>
    import axios from "axios";

    export default{
        name: 'profile',
        
        data(){
            return{
                name: '',
                allinvoice: [],

                customerData: [],
            }
        },

        created(){
            const response = localStorage.getItem('customercode');

            if(!response){
                this.$router.push("/");
            }

            this.customerCode = response;
  
        },

        async mounted(){

            const result = await axios.get('api/Invoice/customerinvoices/'+this.$route.params.customerCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allinvoice = result.data.result;

            const resultss = await axios.get('https://assessmentapi.revassuredev.com/api/customer/details/'+this.customerCode,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                });

            this.customerData = resultss.data.result;

        },

        methods:{
            handleClick(){
                localStorage.removeItem('customercode');
                this.$router.push('/');
            }
        },
    }
</script>

<template>
  <div id="layout-wrapper">
    

    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100">

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

                    <li v-if="this.customerCode">
                        <router-link :to="'/self-assessment/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Pay for a Service</span>
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
                        <h4 class="mb-0">Profile</h4>

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

            <div class="row">
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body table-responsive">
                            <div class="row">
                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">First Name</h6>
                                        <span>{{customerData.firstname}}</span>
                                    </div>
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Middle Name</h6>
                                        <span>{{customerData.middlename}}</span>
                                    </div> 
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Last Name</h6>
                                        <span>{{customerData.lastname}}</span>
                                    </div>
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Email Address</h6>
                                        <span>{{customerData.emailAddress}}</span>
                                    </div>
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Mobile Number</h6>
                                        <span>{{customerData.mobileNumber1}}</span>
                                    </div>
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Mobile Number 2</h6>
                                        <span>{{customerData.mobileNumber2}}</span>
                                    </div>
                                </div>

                                <div class="col-6 col-md-4 mb-4">
                                    <div>
                                        <h6 class="pb-2">Address</h6>
                                        <span>{{customerData.contactAddress}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- end col -->

                <div class="col-md-3 example-screen">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-3">
                                <p>View Invoice:</p><hr>
                                <router-link :to="'/invoice/'+this.customerCode"><button class="btn btn-danger w-100 btn-sm">View</button></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end row -->


        </div> <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-8">
                  <div class="text-sm-right d-none d-sm-block">
                      &copy; 2022 Federal Government Revenue Assurance Project. Powered by Intelligence
                  </div>
              </div>
          </div>
      </div>
    </footer>
    </div>
  </div>


  <router-view></router-view>
</template>

<style>

</style>
