//Thực thi function sau khi load trang web của mình
$(document).ready(function () {
  //khởi tạo 1 mảng lưu trữ trong local storage
  // let products = JSON.parse(window.localStorage.getItem("products")) || [];
  let products = [];
  let selectedProduct = null;

  currentPage = 1;
  rowPerPage = 5;
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
      renderTable(perListPost);
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
  //   renderProducts(products);
  // });

  //local storage, session storage, cookie
  //session : lưu ở browser nhưng khi tắt tab sẽ mất
  //local :kể cả khi tắt tab tắt trình duyệt thì dữ liệu vẫn còn
  $("#btn-add-new").on("click", function (event) {
    $("#modal").addClass("active");
  });
  $("#modal").on("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });
  $("btn-close-form").on("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });
  $("#productName").on("keydown", function () {
    $("#name-error").empty();
  });

  $("#btn-reset").on("click", function () {
    $("#product-image").text("");
  });

  $("#table").on("click", "#btn-delete-product", function (event) {
    //phải biết được đang chọn product nào
    let rowSelected = this.parentElement.parentElement;
    
    selectedProduct = products.find(
      (product) =>
        String(product.id) === String(rowSelected.children[0].textContent)
    );
    console.log(selectedProduct);
    $.ajax(`http://localhost:3000/products/${String(selectedProduct.id)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  });

  $("#productImg").on("change", function (event) {
   
    $("#product-image").text(this.files[0].name);
  });

  $("#table").on("click", "#btn-edit-product", function (event) {
    
    $(".modal__heading").text("Chỉnh sửa sản phẩm");
    $("#btn-submit-form").text("Chỉnh sửa");
    $("#modal").addClass("active");
    let rowSelected = this.parentElement.parentElement;
    selectedProduct = products.find(
      (product) =>
        String(product.id) === String(rowSelected.children[0].textContent)
    );

    $("input#productName").val(selectedProduct.name);
    $("input#productPrice").val(selectedProduct.price);
    $("input#productRate").val(selectedProduct.rate);
    $("input#productSold").val(selectedProduct.sold);
    $("#productSale").val(selectedProduct.sale);
    $("#productInstall").val(selectedProduct.install);
    $("#product-image").text(selectedProduct.image);
  });

  $("#btn-submit-form").on("click", function (event) {
    event.preventDefault();
    const name = $("#productName").val();
    const price = $("#productPrice").val();
    const rate = $("#productRate").val();
    const sold = $("#productSold").val();
    const sale = $("#productSale").val();
    const install = $("#productInstall").val();
    const image = $("#product-image").text();
    console.log(image);

    //xét valid cho input
    if (name.trim().length === 0) {
      $("#name-error").text("Vui lòng nhập tên sản phẩm");
    }
    if (price.trim().length === 0) {
      $("#price-error").text("Vui lòng nhập giá sản phẩm");
    }
    if (rate.trim().length === 0) {
      $("#rate-error").text("Vui lòng nhập đánh giá sản phẩm");
    }
    if (sold.trim().length === 0) {
      $("#sold-error").text("Vui lòng nhập số lượng đã bán");
    }

    if (install.length === 0) {
      $("#install-error").text("Vui lòng chọn lãi xuất trả góp");
    }
    if (image.length === 0) {
      $("#img-error").text("Vui lòng chọn ảnh ");
    }
    if (
      name.trim().length &&
      price.trim().length &&
      rate.trim().length &&
      sold.trim().length &&
      install.trim().length &&
      image.trim().length
    ) {
      //thêm product vào trong mảng local storage để lưu trữ
      if (!selectedProduct) {
        const product = {
          name: name,
          price: price,
          rate: rate,
          sold: sold,
          sale: sale,
          install: install,
          image: image,
        };
        $.ajax("http://localhost:3000/products", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          data: JSON.stringify(product),
        });

        closeModal();
        clearError();
      } else {
        const product = {
          name: $("input#productName").val(),
          price: $("input#productPrice").val(),
          rate: $("input#productRate").val(),
          sold: $("input#productSold").val(),
          sale: $("#productSale").val(),
          install: $("#productInstall").val(),
          image: $("#product-image").text(),
        };
        $.ajax(`http://localhost:3000/products/${String(selectedProduct.id)}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          data: JSON.stringify(product),
        });
        // products.forEach((product) => {
        //   if (String(product.id) === selectedProduct.id) {
        //     product.name = $("input#productName").val();
        //     product.price = $("input#productPrice").val();
        //     product.rate = $("input#productRate").val();
        //     product.sold = $("input#productSold").val();
        //     product.sale = $("#productSale").val();
        //     product.install = $("#productInstall").val();
        //     product.image = $("#product-image").text();
        //   }
        // });
        // window.localStorage.setItem("products", JSON.stringify(products));
        closeModal();
        clearError();
        // renderProducts();
      }
    }
  });
  changePage = (index) => {
    currentPage = index;
    perListPost = products.slice(
      (currentPage - 1) * rowPerPage,
      (currentPage - 1) * rowPerPage + rowPerPage
    );
    renderTable(perListPost);
    renderPagination();
  };
  //cú pháp nháy kép string literals : khi viết cú pháp vd: "abx" + element + "xyz"
  //cú phép nháy đơn template literal : có thể truyền vào 1 biến, 1 expression  vd : `abc${element}xyz `: Không cần phải + đeẻ nối chuỗi
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

  $("#btn-search").on("click", function (event) {
    event.preventDefault();
    console.log(1);
    if ($("#input-search").val().trim().length) {
      const searchProducts = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes($("#input-search").val().trim().toLowerCase())
      );
      if (searchProducts.length) {
        renderTable(searchProducts);
        $("#pagination").hide();
      } else {
        $("#table").empty();
        $("#null-search").text("Không tìm thấy sản phẩm phù hợp");
        $("#pagination").hide();
      }
    } else {
      perListPost = products.slice(
        (currentPage - 1) * rowPerPage,
        (currentPage - 1) * rowPerPage + rowPerPage
      );
      renderTable(perListPost);
      renderPagination();
      $("#pagination").show();
    }
  });
});

renderTable = (perListPost) => {
  let count =0;
  $("#null-search").text("");
  $("#table").empty();
  if (perListPost.length && perListPost) {
    perListPost.map((item) => {
      if(item.id%2==0){
        count+=item.id
      }
      $("#table").append(`
      <tr>
      <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.rate}</td>
        <td>${item.sold}</td>
       <td>${item.sale}</td>
       <td>${item.install}</td>
       <td>${item.image}</td>
        <td ><button class="btn btn-edit" id="btn-edit-product">Sửa</button></td>
         <td> <button  class="btn btn-delete" id="btn-delete-product">Xoá</button></td>
   
      </tr>
    `);
    });
  }
  console.log(count);
};

function resetForm() {
  $("input#productName").val("");
  $("input#productPrice").val("");
  $("input#productRate").val("");
  $("input#productSold").val("");
  $("#productSale").val("7.5");
  $("#productInstall").val("");
  $("#product-image").text();
}

function closeModal() {
  $("#modal").removeClass("active");
  resetForm();
}

function clearError() {
  $("#name-error").text("");

  $("#price-error").text("");

  $("#rate-error").text("");

  $("#sold-error").text("");
  $("#install-error").text("");
  $("#img-error").text("");
}

// function renderProducts(products) {
//   $("#table").empty();
//   for (let index = 0; index < products.length; index++) {
//     $("#table").append(`
//         <tr>
//         <td>${products[index].id}</td>
//           <td>${products[index].name}</td>
//           <td>${products[index].price}</td>
//           <td>${products[index].rate}</td>
//           <td>${products[index].sold}</td>
//          <td>${products[index].sale}</td>
//          <td>${products[index].install}</td>
//          <td>${products[index].image}</td>
//           <td ><button class="btn btn-edit" id="btn-edit-product">Sửa</button></td>
//            <td> <button  class="btn btn-delete" id="btn-delete-product">Xoá</button></td>
     
//         </tr>
//       `);
//   }
// }
