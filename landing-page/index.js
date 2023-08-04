$(document).ready(function () {
  //Ajax
  // $.getJSON("../mock-data/products.json", function (data) {
  //   if (data.length === 0) {
  //     $(".error").text("Không có sản phẩm nào");
  //     $(".btn-load-more").css({
  //       display: "none",
  //     });
  //   } else {
  //     console.log("data", data);
  //     for (let index = 0; index < data.length; index++) {
  //       $("#products__list").append(`

  //         <div class="products__item">
  //         <small>Trả góp ${data[index].install}%</small>
  //         <p class="products__img-container">
  //           <a href="#" class="products__img">
  //             <img src=${data[index].imgUrl} alt="" />
  //           </a>
  //         </p>
  //         <p><a href="#" class="products__title">${data[index].title}</a></p>
  //         <p class="products__price">
  //           <span>${data[index].price}</span>
  //           <span>-${data[index].sale}</span>
  //         </p>
  //         <div class="products__rating">
  //           <span>${data[index].rate}</span
  //           ><span
  //             ><i class="fa-solid fa-star" style="color: #dc18d6"></i></span
  //           ><span>(${data[index]["quality"]})</span>
  //         </div>
  //       </div>
  //         `);
  //     }
  //   }
  // }).fail(function (jqxhr, textStatus, error) {
  //   console.log(jqxhr, textStatus, error);
  //   $(".error").text(error);
  //   $(".btn-load-more").css({
  //       display: "none",
  //     });
  // });

  // let products = JSON.parse(window.localStorage.getItem("products")) || [];
  // console.log(products);

  let products = [];

  currentPage = 1;
  rowPerPage = 8;
  perListPost = [];
  totalPage = 0;
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

  // $.ajax(`http://localhost:3000/products`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "GET",
  // }).done(function (data) {
  //   products = [...data];

  //   for (let index = 0; index < products.length; index++) {

  //     $("#products__list").append(`

  //         <div class="products__item">
  //         <small class="products__install">Trả góp ${products[index].install}%</small>
  //         <p class="products__img-container">
  //           <a href="#" class="products__img">
  //             <img src="../assets/landing-page/${products[index].image}" alt="" />
  //           </a>
  //         </p>
  //         <p><a href="#" class="products__title">${products[index].name}</a></p>
  //         <p class="products__price">
  //           <span>${products[index].price} đ</span>
  //           <span class="products__sale">sale ${products[index].sale}%</span>
  //         </p>
  //         <div class="products__rating">
  //           <span>Đánh giá : ${products[index].rate} </span
  //           ><span
  //             ><i class="fa-solid fa-star" style="color: rgb(255,213,0)"></i></span
  //           >
  //           <br/><span> Đã bán : ${products[index].sold} sản phẩm</span>
  //         </div>
  //       </div>
  //         `);
  //   }

  // });

  if (products.length === 0) {
    $(".error").text("Không có sản phẩm nào");
    // $(".btn-load-more").css({
    //   display: "none",
    // });
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
          </p>
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
  // console.log(count);
};

//4 method ajax: get , post, pu , delete
