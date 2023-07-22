$(document).ready(function () {
  //khởi tạo 1 mảng lưu trữ trong local storage
  let products = JSON.parse(window.localStorage.getItem("products")) || [];
  console.log(products);
  renderProducts(products);

  //local storage, session storage, cookie
  //session : lưu ở browsẻ nhưng khi tắt tab sẽ mất
  //local :kể cả khi tắt tab tắt trình duyệt thì dữ liệu vẫn còn
  $("#btn-add-new").on("click", function (event) {
    $("#modal").addClass("active");
  });
  $("#modal").on("click", function (event) {
    if (event.target === this) {
      $("#modal").removeClass("active");
    }
  });
  $("btn-close-form").on("click", function (event) {
    if (event.target === this) {
      $("#modal").removeClass("active");
    }
  });

  $("#table").on("click","#btn-delete-product", function (event) {
    //phải biết được đang chọn product nào
    let rowSelected = this.parentElement.parentElement;
    const deleteProduct = products.filter(
      (products) => products.id !== rowSelected.children[0].textContent
     
    );

    window.localStorage.setItem("products",JSON.stringify(deleteProduct))
    products.JSON.parse(window.localStorage.getItem("products"))
    console.log(("products",products));
    
    renderProducts(products)
    

    //lấy ra id của product mình chọn

    //lập qua list products để tìm ra product nào có id trùng với id mình chọn

    //xóa product có id tương ứng
  });
  $("#btn-submit-form").on("click", function (event) {
    event.preventDefault();
    const name = $("#productName").val();
    const price = $("#productPrice").val();
    const rate = $("#productRate").val();
    const sold = $("#productSold").val();
    const sale = $("#productSale").val();
    const install = $("#productInstall").val();
    const image = $("#productImg").val();
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
      products.push({
        id: String(Math.random()),
        name: name.trim(),
        price: price.trim(),
        rate: rate.trim(),
        sold: sold.trim(),
        sale: sale,
        install: install,
        image: image,
      });
      window.localStorage.setItem("products", JSON.stringify(products));
      closeModal();
      clearError();
      renderProducts(products);
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
  $("#productImg").empty();
}

function closeModal() {
  $("#modal").removeClass("active");
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
