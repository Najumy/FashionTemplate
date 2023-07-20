$(document).ready(function () {
  //khởi tạo 1 mảng lưu trữ trong local storage
  let products = JSON.parse(localStorage.getItem("products")) || [];
  console.log(products);

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
      console.log(products);

      //lấy product từ trong local storage xong render ra màn hình
      products.forEach(element => {
        $("#table").append()
      });
    }
  });

  
});
