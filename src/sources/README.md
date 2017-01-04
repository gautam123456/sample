

<!DOCTYPE html>
<html>
<style>
body {
    font-family: "Lato", sans-serif;
}



@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
<body>

<div id="mySidenav" class="sidenav">
  <div href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</div>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
  <span>For any assistance call us on 9971249821</span>
</div>

<h2>Animated Sidenav Example</h2>
<p>Click on the element below to open the side navigation menu.</p>
<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

<script>
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
</script>
     
</body>
</html> 

/*<IndexRoute component = { App } />
      <Route path = "search" component = { Search } />
      <Route path = "book" component = { Book } />
      <Route path = "login" component = { Login } />
      <Route path = "cart" component = { Cart } />*/


login, bookingSummary*(details), cart*(book), address*(continue), addAddress*(Add), OrderConfirmation*(continue), BookingConfirmation*(close #only)  
