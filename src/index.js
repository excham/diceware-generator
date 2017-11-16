const DicewareGenerator = require('./DicewareGenerator');
const jquery = require('jquery');

var DWG = new DicewareGenerator();

var generateNew = function() {
  DWG.generateWords(6, (err, worldList) => {
    jquery('[data-value="word-string"]').val(null);
    for (var i = 0; i < worldList.length; i++) {
      jquery('[data-word="' + (i + 1) + '"]').html(worldList[i])
      jquery('[data-value="word-string"]').val(jquery('[data-value="word-string"]').val() + worldList[i])
    }
  });
}

jquery('[data-action="generate"]').on('click', e => {
  e.preventDefault()
  generateNew();
})

jquery('[data-action="copy-modal-open"]').on('click', e => {
  jquery('.copy-modal').addClass('is-active')
  jquery('[data-value="word-string"]').select();
})

jquery('[data-action="copy-modal-close"]').on('click', e => {
  jquery('.copy-modal').removeClass('is-active')
})

generateNew();
