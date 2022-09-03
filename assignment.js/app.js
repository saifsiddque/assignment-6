const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
 }
const loadCat = (search) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${search}` 
    fetch(url)
    .then(res => res.json())
    .then(data => displayCat(data.data));
    toggleSpinner(true);
} 

const displayCat = cat =>{
    
    console.log(cat);
    const newscontainer = document.getElementById('news-container');
    const newslength = cat.length ;
    newscontainer.innerHTML = "";
    itemcounter = document.getElementById('item-count');
    itemcounter.innerText = newslength;
    const noresult = document.getElementById('no-result-found');
    if(newslength == 0){
        noresult.classList.remove('d-none')
    }
    else{
        noresult.classList.add('d-none')

    }
    toggleSpinner(false);
    cat.forEach(news => {
        
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card " >
                <div class="row g-4 mb-4">
                    <div class="col-md-3">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded-start m-4 " alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 600)}...</p>
                        <p class="card-text"><small class="text-muted"><span style="color:#2C23DB; ;" >Published Date:</span> ${news.author.published_date}&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2C23DB; ;" >Views:</span> ${news.total_view}</small></p>
                        <h5>
                        <img src="${news.author.img}" alt="" style="width:30px; border-radius: 50%;">
                         ${news.author.name ? news.author.name : 'No Data Found' }
                         <button id="model" data-bs-toggle="modal" 
                         data-bs-target="#staticBackdrop" 
                         onclick="newsdetail('${news._id}');" >
                           Show Detail..
                           </button>      </h5>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        `;
        newscontainer.appendChild(newsDiv);
        

    })
 }
const loadbtn = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories` 
    fetch(url)
    .then(res => res.json())
    .then(data => displaybtn(data.data.news_category));
}
loadbtn(); 
const displaybtn = btns =>{

    const btngroup = document.getElementById('btn-group');
    btns.forEach(btn => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <a href="#" onclick="loadCat('${btn.category_id}');" class="btn btn-primary">${btn.category_name}</a>
        `;
        btngroup.appendChild(btnDiv);
        
       
    })
    
 }

 const newsdetail = (newsid) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsid}` 
    fetch(url)
    .then(res => res.json())
    .then(data => displaynewsdetail(data.data[0]));
}
const displaynewsdetail = detail =>{
    console.log(detail);
    const details = document.getElementById('modal-body');
    details.innerHTML = `
        <table class="table">
            <tbody>
                <tr>
                    <th scope="row">Author</th>
                    <td>${detail.author.name ? detail.author.name : 'No Data Found' }</td>
                </tr>
                <tr>
                    <th scope="row" >Published Date</th>
                    <td>${detail.author.published_date ? detail.author.published_date : 'No Data Found' }</td>
                </tr>
                <tr>
                    <th scope="row">Rating</th>
                    <td colspan="2">${detail.rating.number ? detail.rating.number : 'No Data Found' }</td>
                </tr>
                <tr>
                    <th scope="row">Vadge</th>
                    <td colspan="2">${detail.rating.vadge ? detail.rating.vadge : 'No Data Found' }</td>
                </tr>
                <tr>
                    <th scope="row">Views</th>
                    <td colspan="2">${detail.total_view ? detail.total_view : 'No Data Found' }</td>
                </tr>
                <tr>
                    <th scope="row">URL</th>
                    <td colspan="2">${detail.image_url ? detail.image_url : 'No Data Found' }</td>
                </tr>
            </tbody>
        </table>
    `
        
 
 }

