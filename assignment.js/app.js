const loadCat = (search) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${search}` 
    fetch(url)
    .then(res => res.json())
    .then(data => displayCat(data.data));
} 

const displayCat = cat =>{
    const newscontainer = document.getElementById('news-container');
    newscontainer.innerHTML = "";
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
                        <p class="card-text">${news.details}</p>
                        <p class="card-text"><small class="text-muted"><span style="color:#2C23DB; ;" >Published Date:</span> ${news.author.published_date}&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2C23DB; ;" >Views:</span> ${news.total_view}</small></p>
                        <h5><img src="${news.author.img}" alt="" style="width:30px; border-radius: 50%;"> ${news.author.name}</h5>
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
    console.log(btns)
    const btngroup = document.getElementById('btn-group');
    btns.forEach(btn => {
        console.log(btn);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <a href="#" onclick="loadCat('${btn.category_id}');" class="btn btn-primary">${btn.category_name}</a>
        `;
        btngroup.appendChild(btnDiv);
       
    })
 }
