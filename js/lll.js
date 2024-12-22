var BookNameinput =document.getElementById("BookName");
var siteurlinput =document.getElementById("siteurl");
var searchinput=document.getElementById("search")
var btnAdd=document.getElementById("btnAdd")
var btnUpdate=document.getElementById("btnUpdate")
var closeBtn=document.getElementById("closeBtn")
var boxModal = document.querySelector(".box-info");
var curentindex=0;
var booklist=[];
if(localStorage.getItem("container")  !==null){
    booklist=JSON.parse(localStorage.getItem("container"))
}
displayData()


function addProduct(){
   if( validationName()&&validationurl()){
    var book={
        name:BookNameinput.value.trim(),
        url:siteurlinput.value
    }
booklist.push(book)
// booklist-->[{}{}{}]===>JSON
localStorage.setItem("container",JSON.stringify(booklist) )
displayData()
clear()

   }

}



function clear(){
    BookNameinput.value=null;
    siteurlinput.value=null;
    BookNameinput.classList.remove("is-valid")
    siteurlinput.classList.remove("is-valid")
}
function displayData(){
var cartona=`<tr>
<th>Index</th>
<th>Website Name</th>
<th>Visit</th>
<th>Delete</th>
 <th>Update</th>
</tr>`;
    for(i=0;i<booklist.length;i++){
        cartona+=creatCols(i);
    }
 document.getElementById("tablerow").innerHTML=cartona;
}
function deleteitem(k){
    booklist.splice(k,1)
    localStorage.setItem("container",JSON.stringify(booklist) )
    displayData()
}

function searchData(){
 term=searchinput.value;
 var cartona=`<tr>
<th>Index</th>
<th>Website Name</th>
<th>Visit</th>
<th>Delete</th>
 <th>Update</th>
</tr>`;
    for(i=0;i<booklist.length;i++){
        if(booklist[i].name.toLowerCase().includes(term.toLowerCase())   ){
            cartona+=creatCols(i);
    }
        }
 document.getElementById("tablerow").innerHTML=cartona;
}

function creatCols(){
   return `<tr>
        <td>${i}</td>
        <td>${booklist[i].name}</td>
        <td><button onclick="visitWebsite(${i})" class="btn btn-visit">
    <i class="fa-solid fa-eye"></i>
    Visit</button></td>
        <td> <button onclick="deleteitem(${i})" class="btn btn-delete ">
    <i class="fa-solid fa-eye"></i>
    Delete</button></td>
        <td> <button onclick="setUpdateInfo(${i})" class="btn btn-delete ">
    <i class="fa-solid fa-eye"></i>
    Update</button></td>
    </tr>`  
}

function visitWebsite(index) {
    var httpsRegex = /^https?:\/\//;
   if (httpsRegex.test(booklist[index].url)) {
    open(booklist[index].url);
  } else {
    open(`https://${booklist[index].url}`);
  }
   
  }



function setUpdateInfo(index){
    curentindex=index
    BookNameinput.value=booklist[index].name
    siteurlinput.value=booklist[index].url
    btnAdd.classList.add("d-none")
    btnUpdate.classList.remove("d-none")

}


function updateProduct(){
    var book={
        name:BookNameinput.value,
        url:siteurlinput.value
    }
booklist.splice(curentindex,1,book)
localStorage.setItem("container",JSON.stringify(booklist) )
displayData()
btnAdd.classList.remove("d-none")
btnUpdate.classList.add("d-none")
clear()
}
function validationName(){
var text =BookNameinput.value
var regex=/^\w{3,}(\s+\w+)*$/;
if(regex.test(text)){
   
    BookNameinput.classList.add("is-valid")
    BookNameinput.classList.remove("is-invalid")
return true
}
else{
       BookNameinput.classList.add("is-invalid")
    BookNameinput.classList.remove("is-valid")
   return false
}
}
function validationurl(){
var text =siteurlinput.value
var regex= /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
if(regex.test(text)){
   
    siteurlinput.classList.add("is-valid")
    siteurlinput.classList.remove("is-invalid")
    return true
}
else{
       siteurlinput.classList.add("is-invalid")
    siteurlinput.classList.remove("is-valid")
    return false
   
}

}
btnAdd.addEventListener("click", function () {
    if( validationName()&&validationurl()){
        var book={
            name:BookNameinput.value.trim(),
            url:siteurlinput.value
        }
    booklist.push(book)
    // booklist-->[{}{}{}]===>JSON
    localStorage.setItem("container",JSON.stringify(booklist) )
    displayData()
    clear()
    
       }
       else {
        boxModal.classList.remove("d-none");
      }
    });




//Close Modal Function

function closeModal() {
    boxModal.classList.add("d-none");
  }
  
  // 3 ways to close modal => close button -  Esc key - clicking outside modal
  
  closeBtn.addEventListener("click", closeModal);
  
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
      closeModal();
    }
  });







