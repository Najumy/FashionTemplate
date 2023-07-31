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

  let products =[];
  $.ajax(`http://localhost:3000/products`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).done(function (data) {
    products = [...data];
   
    for (let index = 0; index < products.length; index++) {
      
      $("#products__list").append(`
          
          <div class="products__item">
          <small class="products__install">Trả góp ${products[index].install}%</small>
          <p class="products__img-container">
            <a href="#" class="products__img">
              <img src="../assets/landing-page/${products[index].image}" alt="" />
            </a>
          </p>
          <p><a href="#" class="products__title">${products[index].name}</a></p>
          <p class="products__price">
            <span>${products[index].price} đ</span>
            <span class="products__sale">sale ${products[index].sale}%</span>
          </p>
          <div class="products__rating">
            <span>Đánh giá : ${products[index].rate} </span
            ><span
              ><i class="fa-solid fa-star" style="color: rgb(255,213,0)"></i></span
            >
            <br/><span> Đã bán : ${products[index].sold} sản phẩm</span>
          </div>
        </div>
          `);
    }

  });

  if (products.length === 0) {
    $(".error").text("Không có sản phẩm nào");
    // $(".btn-load-more").css({
    //   display: "none",
    // });
  } else {  

  }
});

//4 method ajax: get , post, pu , delete
