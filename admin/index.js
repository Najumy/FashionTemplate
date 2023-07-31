$(document).ready(function () {
  //khởi tạo 1 mảng lưu trữ trong local storage
  // let products = JSON.parse(window.localStorage.getItem("products")) || [];
  let products = [];
  let selectedProduct = null;
  // console.log(products);

  $.ajax(`http://localhost:3000/products`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).done(function (data) {
    products = [...data];
    renderProducts(products);
  });

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
    console.log(this);
    $("#product-image").text(this.files[0].name);
  });

  $("#table").on("click", "#btn-edit-product", function (event) {
    $(".modal__heading").text("Chỉnh sửa sản phẩm");
    $("#btn-submit-form").text("Chỉnh sửa");
    $("#modal").addClass("active");
    let rowSelected = this.parentElement.parentElement;
    selectedProduct = products.find(
      (product) => String(product.id) === String(rowSelected.children[0].textContent)
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
});
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
function renderProducts(products) {
  $("#table").empty();
  for (let index = 0; index < products.length; index++) {
    $("#table").append(`
        <tr>
        <td>${products[index].id}</td>
          <td>${products[index].name}</td>
          <td>${products[index].price}</td>
          <td>${products[index].rate}</td>
          <td>${products[index].sold}</td>
         <td>${products[index].sale}</td>
         <td>${products[index].install}</td>
         <td>${products[index].image}</td>
          <td ><button class="btn btn-edit" id="btn-edit-product">Edit</button></td>
           <td> <button  class="btn btn-delete" id="btn-delete-product">Delete</button></td>
     
        </tr>
      `);
  }
}
