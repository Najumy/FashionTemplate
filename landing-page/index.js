$(document).ready(function () {
 
  let products = [];
  let currentPage = 1;
  let rowPerPage = 8;
  let perListPost = [];
  let totalPage = 0;


  $.ajax({
    url: "http://localhost:3000/products",
    method: "GET",
    dataType: "json",
    success: function (data) {
      products = [...data];
      console.log(products);
      //sử dụng hàm slice để lọc các các bản ghi trong products
      perListPost = products.slice(
        (currentPage - 1) * rowPerPage,
        (currentPage - 1) * rowPerPage + rowPerPage
      );
      renderProducts(perListPost);
      renderPagination();
    },
    error: function (error) {
      console.log("Error", error);
    },
  });


  if (products.length === 0) {
    $(".error").text("Không có sản phẩm nào");
   
  }
  changePage = (index) => {
    currentPage = index;
    perListPost = products.slice(
      (currentPage - 1) * rowPerPage,
      (currentPage - 1) * rowPerPage + rowPerPage
    );
    renderProducts(perListPost);
    renderPagination();
    console.log(index);
  };

  renderPagination = () => {
    $("#pagination").empty();
    totalPage = Math.ceil(products.length / rowPerPage);
    for (let i = 1; i <= totalPage; i++) {
      $("#pagination").append(
        `
      <li class="page-item" onclick="changePage(${i})">${i}</li>
      `
      );
      if (currentPage == i) {
        $("#pagination li").removeClass("active");
        $("#pagination li").addClass("active");
      }
    }
    $("#pagination li").not(`:nth-child(${currentPage})`).removeClass("active");
  };
});

renderProducts = (perListPost) => {
  $("#products__list").empty();
  let count =0;
  if (perListPost.length && perListPost) {
    perListPost.map((item) => {
      count +=item.id;
      $("#products__list").append(`
          
          <div class="products__item">
          <small class="products__install">Trả góp ${item.install}%</small>
          <p class="products__img-container">
            <a href="#" class="products__img">
              <img src="../assets/landing-page/${item.image}" alt="" />
            </a>
          </p>
          <p><a href="#" class="products__title">${item.name}</a></p>
          <p class="products__price">
            <span>${item.price} đ</span>
            <span class="products__sale">Giảm ${item.sale}%</span>
          </p>ƒ
          <div class="products__rating">
            <span>Đánh giá : ${item.rate} </span
            ><span
              ><i class="fa-solid fa-star" style="color: rgb(255,213,0)"></i></span
            >
            <br/><span> Đã bán : ${item.sold} sản phẩm</span>
          </div>
        </div>
          `);
    });
  }

};

//4 method ajax: get , post, pu , delete