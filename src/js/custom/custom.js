+function ($) {
  'use strict';

  // ENTER CLASS DEFINITION
  // ======================

$("#play-video").on('hidden.bs.modal', function (e) { $("#play-video iframe").attr("src", $("#play-video iframe").attr("src"));
});

}(jQuery);
