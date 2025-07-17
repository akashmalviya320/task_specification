    <!DOCTYPE html>
    <html lang="en">

    <?php include_once "ht_gs_head.php"; ?>
 
      <body class="loading">
        
        <!--Ajax Spinner-->
        <div class="overlay"></div>
        <!--Ajax Spinner-->

        <div class="wrapper theme-1-active pimary-color-green">

          <div id="navbar"></div>
          <div id="lsidebar"></div>  

          <!-- Main Content -->
          <div class="page-wrapper">
            <div class="bg-canvas container-fluid">
              <div id="page-content"></div>
              <?php include_once "ht_gs_footer.php";?>
            </div>
          </div>
          <!-- /Main Content -->

        </div>
        <!-- /#wrapper -->
        
        <!-- JavaScript -->
        <?php 
          include_once "ht_gs_include.php"; 
          include_once "ht_rp_include.php"; 
        ?>
        
      </body>

    </html>