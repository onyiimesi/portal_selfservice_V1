<script>
    import axios from "axios";

    export default{
        name: 'invoice',
        
        data(){
            return{
                events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],

                warningTimer: null,

                logoutTimer: null,

                warningZone: false,

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
            this.events.forEach(function (event){
                window.addEventListener(event, this.resetTimer)
            }, this);

            this.setTimers();

            const result = await axios.get('api/Invoice/customerinvoices/'+this.$route.params.customerCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allinvoice = result.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
            });
            });

        },

        destroyed(){
            this.events.forEach(function (event){
                window.removeEventListener(event, this.resetTimer)
            }, this);

            this.resetTimer();
        },

        methods:{
            setTimers: function(){
                this.warningTimer = setTimeout(this.warningMessage, 4 * 1000);
                this.logoutTimer = setTimeout(this.logoutUser, 10 * 60 * 1000);// 10 * 60 * 1000

                this.warningZone = false;
            },

            warningMessage: function(){
                this.warningZone = true;
            },

            logoutUser: function(){
                localStorage.removeItem('customercode');
                this.$router.push('/login');
            },

            resetTimer: function(){
                clearTimeout(this.warningTimer);
                clearTimeout(this.logoutTimer);

                this.setTimers();
            },

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
                        <h4 class="mb-0">Bill</h4>

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
                                    <th>Organization</th>
                                    <th>#Invoice</th>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                    <th>Outstanding</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <!-- <th>BALANCE</th> -->
                                </tr>
                                </thead>


                                <tbody>
                                <tr v-for="item in allinvoice" :key="item.id">
                                    <td>{{item.organisationCode}}</td>
                                    <td>{{item.invoiceCode}}</td>
                                    <td>{{item.currencyCode}}</td>
                                    <td>{{item.invoiceAmount}}</td>
                                    <td></td>
                                    <td>{{item.paymentStatus}}</td>
                                    
                                    
                                    <td>
                                        <button class="btn btn-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.invoiceCode">View</button>
                                    </td>
                                    
                                    
                                    <div class="modal fade" :id="'bs-example-modal-lg-' + item.invoiceCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                
                                                <div class="modal-header">
                                                    <h5 id="myLargeModalLabel" class="modal-title mt-0">View Bill</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-6 col-md-4 mb-4">
                                                            <div class="form-group">
                                                                <label class="control-label">Organization</label>
                                                                <h5>{{item.organisationCode}}</h5>
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-md-4 mb-4">
                                                            <div class="form-group">
                                                                <label class="control-label">#Invoice</label>
                                                                <h5>{{item.invoiceCode}}</h5>
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-md-4 mb-4">
                                                            <div class="form-group">
                                                                <label class="control-label">Currency</label>
                                                                <h5>{{item.currencyCode}}</h5>
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-md-4 mb-4">
                                                            <div class="form-group">
                                                                <label class="control-label">Amount</label>
                                                                <h5>{{item.invoiceAmount}}</h5>
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-md-4 mb-4">
                                                            <div class="form-group">
                                                                <label class="control-label">Status</label>
                                                                <h5>{{item.paymentStatus}}</h5>
                                                            </div>
                                                        </div>

                                                    </div><hr>
                                                    <router-link :to="'/viewinvoice/'+item.invoiceCode"><button class="btn btn-success" data-dismiss="modal">View</button></router-link>
                                                </div>
                                                
                                            </div><!-- /.modal-content -->
                                            
                                        </div><!-- /.modal-dialog -->
                                    </div>
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
