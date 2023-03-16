let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let taxes = document.getElementById('taxes');
let count = document.getElementById('count');
let category  = document.getElementById('category');
let submit  = document.getElementById('Submit');
let searchTitle = document.getElementById('searchtitle');
let searchCategorie = document.getElementById('searchCategory');
let searchInput = document.getElementById('search');
let datapro ;
let mood ='create'
let tmp;
let cntrl = false;

//control function
 function controldata ()
{
    if (title.value == '' )
    {
alert('type a title pls');
cntrl = false;
    }

    else if (category.value == '')  
    {
        alert('type a category pls');
        cntrl = false;
    }
    else if (count.value == '' || count.value > 100 )  
    {
        alert('verify nbumber of products is valid (under 100)');
        cntrl = false;
    }
      else 
      {
        cntrl = true;
      }  
}


if (localStorage.product != null)
{
    datapro = JSON.parse(localStorage.product);
}
else 
{
    datapro = [];
}
console.log(datapro.length)



//read data
function showData(){
    gettotal();
let table = '';
for (let i=0; i < datapro.length;i++)
{
    table += `
    <tr>   
    <td> ${i}</td>
    <td> ${datapro[i].title}  </td>
    <td> ${datapro[i].price}  </td>
    <td> ${datapro[i].taxes}  </td>
    <td> ${datapro[i].ads}  </td>
    <td> ${datapro[i].discount}  </td>
    <td> ${datapro[i].total}  </td>
    <td> ${datapro[i].category}  </td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
}
document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById('deleteAll');
if(datapro.length > 0)
{
btndelete.innerHTML = `<button onclick="DeleteAll()">deleteALL</button>`;
}
else 
{
    btndelete.innerHTML=``
}
}


//get total
function gettotal()
{

 if (price.value != '')
 {
let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
total.innerHTML = result;
total.style.background = '#040';

}
else 
{
    total.innerHTML='';
    total.style.background = '#a00d02';
    

}
}



//create product
submit.onclick = function()
{
let newPro = {
    title : title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total:total.innerHTML,
    count: count.value,
    category:category.value.toLowerCase(),

}
if (cntrl == false)
{
    controldata();
}
else
{
if (mood == 'create')
{
if (newPro.count > 1 )
{
for (let i=0;i<newPro.count;i++ ){
    datapro.push(newPro);
}
}
else{
    datapro.push(newPro);
}
cleardata();

}
else  
{
    datapro[tmp] = newPro;
    mood ='create';
    submit.innerHTML='Create';
    count.style.display ="block";
}
localStorage.setItem('product' ,JSON.stringify(datapro));
showData();

}
}






//save data in localstorage
//clear inputs
function cleardata(){
 title.value = ''
   price.value=''
 taxes.value=''
    ads.value =''
     discount.value =''
  total.innerHTML =''
  count.value =''
category.value  =''
}





//count
//delete
function deleteData(id)
{
datapro.splice(id,1)
localStorage.setItem('product' ,JSON.stringify(datapro));
showData();
}
function DeleteAll()
{
    datapro.splice(0)
localStorage.clear();
showData();

}
//update
function updateData(i)
{
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    taxes.value = datapro[i].taxes;
    gettotal();
    category.value = datapro[i].category;
    count.style.display = "none";
    submit.innerText = "Update";
    mood='update';
tmp = i;
window.scroll(
    {
        top:0,
        behavior: 'smooth'
    }
)
}

//search
let searchmood = 'searchtitle'
function SearchMood(value)
{
    searchmood=value;
if (value == 'searchtitle')
{
        searchInput.placeholder = 'search By title';
      }
else 
{ 

    searchInput.placeholder = 'search By Category';  
    
}
searchInput.focus()
searchInput.value='';
showData();
}

function SearchData(value)
{
    let table = '';
if (searchmood == 'searchtitle')
{
for (let i=0 ; i < datapro.length; i++)
{
    if(datapro[i].title.toLowerCase().includes(value.toLowerCase()))
    {
        table += `
        <tr>   
        <td> ${i}</td>
        <td> ${datapro[i].title}  </td>
        <td> ${datapro[i].price}  </td>
        <td> ${datapro[i].taxes}  </td>
        <td> ${datapro[i].ads}  </td>
        <td> ${datapro[i].discount}  </td>
        <td> ${datapro[i].total}  </td>
        <td> ${datapro[i].category}  </td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
}
}
else {
    for (let i=0 ; i < datapro.length; i++)
    {
        if(datapro[i].category.toLowerCase().includes(value.toLowerCase()))
        {
            table += `
            <tr>   
            <td> ${i}</td>
            <td> ${datapro[i].title}  </td>
            <td> ${datapro[i].price}  </td>
            <td> ${datapro[i].taxes}  </td>
            <td> ${datapro[i].ads}  </td>
            <td> ${datapro[i].discount}  </td>
            <td> ${datapro[i].total}  </td>
            <td> ${datapro[i].category}  </td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
        }
    }    
}

document.getElementById('tbody').innerHTML = table;
}

//clean data

showData();