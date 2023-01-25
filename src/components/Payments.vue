<script>
    import axios from "axios";

    export default{
        name: 'payments',
        
        data(){
            return{
                name: '',
                allinvoice: [],

                customerDetails: {

                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },
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
                        <h4 class="mb-0">Payments</h4>

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
                <div class="col-12">
                    <div class="card">
                        <div class="card-body table-responsive">

                            <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                <thead>
                                <tr>
                                    <th>Receipt No</th>
                                    <th>#Invoice</th>
                                    <th>Payment channel</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                    <!-- <th>BALANCE</th> -->
                                </tr>
                                </thead>


                                <tbody>
                                <tr v-for="item in allinvoice" :key="item.id">
                                    <td></td>
                                    <td></td>
                                    <td>{{item.invoiceCode}}</td>
                                    <td>{{item.currencyCode}}</td>
                                    <td>{{item.invoiceAmount}}</td>
                                    <td>{{item.paymentStatus}}</td>
                                    
                                    <td>
                                        <router-link :to="'/invoices/'+item.invoiceCode"><button class="btn btn-success btn-sm mr-2">View</button></router-link>
                                    </td>
                                    <!-- <td>61</td> -->
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div> <!-- end col -->
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
