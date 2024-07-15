// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

function floatToCurrency(_float) {
  var s = _float.toString().replace(",", "").split("."),
    decimals = s[1] || "",
    integer_array = s[0].split(""),
    formatted_array = [];

  for (var i = integer_array.length, c = 0; i != 0; i--, c++) {
    if (c % 3 == 0 && c != 0) {
      formatted_array[formatted_array.length] = ".";
    }
    formatted_array[formatted_array.length] = integer_array[i - 1];
  }

  if (decimals.length == 1) {
    decimals = decimals + "0";
  } else if (decimals.length == 0) {
    decimals = "00";
  } else if (decimals.length > 2) {
    decimals = Math.floor(
      parseInt(decimals, 10) / Math.pow(10, decimals.length - 2)
    ).toString();
  }

  return "R$ " + formatted_array.reverse().join("") + "," + decimals;
}

freteGratis = function () {
  var _total_cart =
    $.trim(
      $(".full-cart .summary-totalizers .table tfoot .monetary")
        .eq(0)
        .text()
        .replace("R$ ", "")
        .replace(",", "")
        .replace(".", "")
    ) / 100;
  var _value_shipping =
    $.trim(
      $(".full-cart .summary-totalizers .table tbody .Shipping .monetary")
        .eq(0)
        .text()
        .replace("R$ ", "")
        .replace(",", "")
        .replace(".", "")
    ) / 100;

  var _discount = 199;
  var _container = $(".x-content-minicart__progress");

  if (_value_shipping != "Grátis") {
    _total_cart = _total_cart - _value_shipping;
  }

  if (_total_cart < 199) {
    var _calculo = _discount - _total_cart;
    var animate = _total_cart / 2;
    var progress = (_total_cart * 100) / _discount;

    let qtd = $(".x-content-minicart__progress").length - 1;

    $(".x-content-minicart__progress").each(function (index, el) {
      if (index == qtd) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });

    $(".x-content-minicart__progress").removeClass("fg");
    _container
      .find(".x-progress--text")
      .html(
        "Faltam <strong>" +
          floatToCurrency(_calculo.toFixed(2)) +
          "</strong> para o <strong>frete grátis</strong>"
      );
    $(".x-progress .x-progress--inset").css("width", progress + "%");
  } else {
    $(".x-content-minicart__progress").hide();
    // $('.x-content-minicart__progress').addClass('fg');
    // $('.x-progress .x-progress--inset').css('width', '100%');
    // _container.find('.x-progress--text').html('<span class="icon-yes"><svg height="32" id="icon-check" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"/></svg></span>Você atingiu o <strong>frete grátis</strong>');
  }
};

markuptFreteGratis = function () {
  var markup =
    '<div class="x-content-minicart__progress"><span class="x-progress"><span class="x-progress--inset"></span></span><p class="x-progress--text"></p></div>';
  $(".summary-template-holder").prepend(markup);
  $(".cart-fixed").prepend(markup);
};

cloneBottomButtons = function () {
  let _buttons = $(".cart-links.cart-links-bottom").clone();
  $(".cart-links.cart-links-bottom").remove();
  $(".summary-totalizers.cart-totalizers").append(
    _buttons.attr("id", "buttons-summary")
  );
};

hideBottomButtons = function (hash) {
  if (hash != "#/cart") {
    $(".clearfix.pull-right.cart-links.cart-links-bottom.hide").addClass(
      "hide-checkout"
    );
  } else {
    $(".clearfix.pull-right.cart-links.cart-links-bottom.hide").removeClass(
      "hide-checkout"
    );
  }
};

request_ValidationDocument = function (_cpf, _element) {
  $.ajax({
    headers: {
      Accept: "application/vnd.vtex.ds.v10+json",
      "Content-Type": "application/json",
    },
    type: "GET",
    url: "/api/dataentities/CL/documents/" + _cpf + "&_fields=id,email",

    success: function (_user) {
      if (_user.length) {
        var _email = _user[0].email;

        var _email_user = $("#client-email").val();

        if (_email_user == undefined) {
          _email_user = $(".box-client-info-pf .client-email span").text();
        }

        if (_email_user != _email) {
          if (!$(".e-cpf-error").length) {
            _element.after(
              '<span class="e-cpf-error">Esse CPF está vinculado ao email <span id="e-email-user">' +
                _email +
                '</span> <br /> <span class="e-text">Deseja fazer login com esse email? <span class="e-action-login">clique aqui</span></span></span>'
            );
          }

          _element.val("").change().blur();
        } else {
          $(".e-cpf-error").remove();
        }
      } else {
        $(".e-cpf-error").remove();
      }
    },
  });
};

validationDocument = function () {
  $("body").on("keyup", "#client-document", function (event) {
    var _element = $(this);
    var _cpf = _element.val().replace(/\./g, "").replace(/-/g, "");

    if (_cpf.length == 11) {
      request_ValidationDocument(_cpf, _element);
    }
  });
};

loginAction = function () {
  $("body").on("click", ".e-action-login", function (event) {
    var _email = $("#e-email-user").text();
    vtexid.start({
      returnUrl: "",
      userEmail: _email,
      locale: "pt-BR",
      forceReload: false,
    });
  });
};

progressBar = function (hashName) {
  let hash = hashName;

  switch (hash) {
    case "#/cart":
      $(".progress_carrinho .header__progress__circle").addClass("active");
      $(".header__progress_after.carrinho__after").removeClass("active");
      $(".header__progress_before.identificacao__before").removeClass("active");
      $(".progress_identificacao .header__progress__circle").removeClass(
        "active"
      );
      $(".header__progress_after.identificacao__after").removeClass("active");
      $(".header__progress_before.entrega__before").removeClass("active");
      $(".progress_entrega .header__progress__circle").removeClass("active");
      $(".header__progress_after.entrega__after").removeClass("active");
      $(".header__progress_before.pagamento__before").removeClass("active");
      $(".progress_pagamento .header__progress__circle").removeClass("active");
      $(".regras-entrega").show();
      break;
    case "#/email":
      $(".progress_carrinho .header__progress__circle").addClass("active");
      $(".header__progress_after.carrinho__after").addClass("active");
      $(".header__progress_before.identificacao__before").addClass("active");
      $(".progress_identificacao .header__progress__circle").addClass("active");
      $(".header__progress_after.identificacao__after").removeClass("active");
      $(".header__progress_before.entrega__before").removeClass("active");
      $(".progress_entrega .header__progress__circle").removeClass("active");
      $(".header__progress_after.entrega__after").removeClass("active");
      $(".header__progress_before.pagamento__before").removeClass("active");
      $(".progress_pagamento .header__progress__circle").removeClass("active");

      break;
    case "#/profile":
      $(".progress_carrinho .header__progress__circle").addClass("active");
      $(".header__progress_after.carrinho__after").addClass("active");
      $(".header__progress_before.identificacao__before").addClass("active");
      $(".progress_identificacao .header__progress__circle").addClass("active");
      $(".header__progress_after.identificacao__after").removeClass("active");
      $(".header__progress_before.entrega__before").removeClass("active");
      $(".progress_entrega .header__progress__circle").removeClass("active");
      $(".header__progress_after.entrega__after").removeClass("active");
      $(".header__progress_before.pagamento__before").removeClass("active");
      $(".progress_pagamento .header__progress__circle").removeClass("active");
      $(".regras-entrega").hide();
      break;
    case "#/shipping":
      $(".progress_carrinho .header__progress__circle").addClass("active");
      $(".header__progress_after.carrinho__after").addClass("active");
      $(".header__progress_before.identificacao__before").addClass("active");
      $(".progress_identificacao .header__progress__circle").addClass("active");
      $(".header__progress_after.identificacao__after").addClass("active");
      $(".header__progress_before.entrega__before").addClass("active");
      $(".progress_entrega .header__progress__circle").addClass("active");
      $(".header__progress_after.entrega__after").removeClass("active");
      $(".header__progress_before.pagamento__before").removeClass("active");
      $(".progress_pagamento .header__progress__circle").removeClass("active");
      $(".regras-entrega").hide();
      break;
    case "#/payment":
      $(".progress_carrinho .header__progress__circle").addClass("active");
      $(".header__progress_after.carrinho__after").addClass("active");
      $(".header__progress_before.identificacao__before").addClass("active");
      $(".progress_identificacao .header__progress__circle").addClass("active");
      $(".header__progress_after.identificacao__after").addClass("active");
      $(".header__progress_before.entrega__before").addClass("active");
      $(".progress_entrega .header__progress__circle").addClass("active");
      $(".header__progress_after.entrega__after").addClass("active");
      $(".header__progress_before.pagamento__before").addClass("active");
      $(".progress_pagamento .header__progress__circle").addClass("active");
      $(".regras-entrega").hide();
      break;
  }
};

//#/shipping

$(document).ready(function () {
  progressBar(window.location.hash);
  hideBottomButtons(window.location.hash);

  window.addEventListener("hashchange", function () {
    $("span.newsletter-text")
      .text("")
      .html(
        "Aceito receber promoções, novidades e dicas de acordo com as <a href='/institucional#politica-de-privacidade'>políticas de privacidade<a>"
      );
    progressBar(window.location.hash);
    hideBottomButtons(window.location.hash);
  });

  markuptFreteGratis();
  validationDocument();
  loginAction();
});

$(document).ajaxStop(function () {
  freteGratis();
});

$(function () {
  //var ebit_script = document.createElement('script');
  //ebit_script.setAttribute('type', 'text/javascript');
  //ebit_script.setAttribute('id', 'getSelo');
  //ebit_script.setAttribute('src','//imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?92269');
  //document.head.appendChild(ebit_script);

  //$('.stamp__list').prepend('<a id="seloEbit" href="//www.ebit.com.br/use-orgânico" target="_blank" data-noop="redir(this.href);"></a>');

  if (window.location.href.indexOf("vtexcommercestable") >= 0) {
    $("link").each(function () {
      if ($(this).attr("href").indexOf("checkout5-custom.css") >= 0)
        $(this).attr("href", "/files/useorganico-checkout.css");
    });
  }
});

function shippingSla() {
  if ($("select.srp-delivery-select").length > 0) {
    // Muda texto de todos os options
    $("select.srp-delivery-select optgroup").each(function (index, value) {
      let newText = $("option", value)
        .text()
        .replace("No mesmo dia", "Hoje até as 22:00");
      $("option", value).text("nada");
      $("option", value).text(newText);
    });

    // Change do dropdown
    $("select.srp-delivery-select").trigger("change");
    $("select.srp-delivery-select").change(function (e) {
      let indexSelected = e.target.selectedIndex;
      let textSelected = $("select.srp-delivery-select optgroup option")[
        indexSelected
      ].innerText.split(" - ")[0];
      $(".srp-delivery-current-many__sla")[0].innerText = textSelected.replace(
        "No mesmo dia",
        "Hoje até as 22:00"
      );
    });
  }
}

function activeHelloWhatsapp() {
  $(".r-whatsapp__message").addClass("is--hello");
  $(".r-whatsapp__message--hello").addClass("is--active");

  setTimeout(function () {
    $(".r-whatsapp__message").removeClass("is--hello");
    $(".r-whatsapp__message--hello").removeClass("is--active");
  }, 10000);
}

function activeBuyWhatsapp() {
  setTimeout(function () {
    $(".r-whatsapp__message").addClass("is--buy");
    $(".r-whatsapp__message--buy").addClass("is--active");

    setTimeout(function () {
      $(".r-whatsapp__message").removeClass("is--buy");
      $(".r-whatsapp__message--buy").removeClass("is--active");
    }, 10000);
  }, 30000);
}

function activeWhatsapp() {
  $(".r-whatsapp__logo, .r-whatsapp__message").click(function () {
    $(".r-whatsapp__container").toggleClass("is--active");
    $(".r-whatsapp__logo").toggleClass("is--active");
  });
}

function removeCouponClone() {
  $(".coupon-column").eq(1).remove();
}

// function textSumary() {
//   var shp_option_text_package = function () {
//     $(
//       ".vtex-omnishipping-1-x-leanShippingGroupList .shp-option-text-package span"
//     ).each(function (index, el) {
//       el.innerText = el.innerText.replace("No mesmo dia", "Hoje até as 22:00");
//     });
//   };

//   var summary_cart_template_holder = function () {
//     $(".summary-cart-template-holder .shipping-date").each(function (
//       index,
//       el
//     ) {
//       el.innerText = el.innerText.replace("Mesmo dia", "Hoje até as 22:00");
//     });
//   };

//   var resumeShp = function () {
//     $(".shp-summary-package-time span").each(function (index, el) {
//       el.innerText = el.innerText.replace("No mesmo dia", "Hoje até as 22:00");
//     });
//   };

//   shp_option_text_package();
//   summary_cart_template_holder();
//   resumeShp();

//   $("#cart-to-orderform").click((e) => {
//     summary_cart_template_holder();
//     shp_option_text_package();
//     resumeShp();
//   });

//   window.onpopstate = function (event) {
//     if (document.location.hash == "#/shipping") {
//       summary_cart_template_holder();
//       shp_option_text_package();
//       resumeShp();
//     }
//   };
// }

function validationAttack() {

  vtexjs.checkout.getOrderForm()
  .done(function(orderForm) {
      
      console.log('window.location', window.location.hash)

      console.log(orderForm)

      if(window.location.hash == "#/payment" && orderForm.shippingData.address.postalCode == "02075-046" || window.location.hash == "#/payment" && orderForm.shippingData.address.postalCode == "76870-238") {
        $('.payment-submit-wrap').css("display", "none")
      } else {
        console.log("não entrou")
      }

  });

  
  
}

$(window).on('checkoutRequestEnd.vtex', function(event, orderForm) {
  validationAttack();
});

$(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
  shippingSla();
  
});

$(document).ready(function () {
  let counter = 0;
  let clickButtonInterval = setInterval(() => {
    if ($("button#shipping-calculate-link").length) {
      $("button#shipping-calculate-link").click();

      clearInterval(clickButtonInterval);
    }

    if (counter == 5) {
      clearInterval(clickButtonInterval);
    }

    counter++;
  }, 1000);

  //removeCouponClone();
  activeHelloWhatsapp();
  activeBuyWhatsapp();
  activeWhatsapp();
  cloneBottomButtons();
});

// $(window).on("load", function(){
//   validationAttack();
// })

// $(document).ajaxStop(function () {
//   // textSumary();
//   validationAttack();
// });

setInterval(function () {
  $("#payment-group-payMeePaymentGroup")
    .children()
    .html("Transferência Bancária");
}, 100);
