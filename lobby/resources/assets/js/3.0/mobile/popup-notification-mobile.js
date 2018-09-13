
popup_notification = {
  main() {
    var self = this.context;
    this.winsArray = [];
    this.clearStacksTimeout = null;
    this.background = '#E5C160';
    this.removedArrs = [];
    this.init = 0;
  },

  animatePopup (tableName, amount, prefix = '+') {

    $('.notification-container').show();

    let self = this;

    if(this.winsArray.length >= 3)
    {
      this.removedArrs = _.dropRight(this.winsArray, this.winsArray.length - 1);
      this.winsArray = _.drop(this.winsArray, this.winsArray.length - 2)
    }

    if (this.init >= 3) {
      this.moveStacks();
    }

    this.init++;

    let winBox = this.makeWinBox(tableName, amount, prefix, this.firstPos());
    this.addStack(winBox);
  },

  firstPos () {
    return this.init == 1 ? 0 : this.init == 2 ? 64 : 128;
  },

  addStack (winBox) {
    let self = this;
    this.winsArray.push(winBox);

    winBox.animate({
      'opacity' : 1,
      'left' : 0
    }, 250, function(){
      winBox.find('.notif-box_close').on('click', function(){
        self.winsArray.splice(self.winsArray.indexOf(winBox), 1);
        self.rearrangeStack();
        winBox.animate({
          'opacity' : 0,
          'left' : '-280px'
        }, 250, function() {
          winBox.remove();
        });
      })
    })
    self.clearStacks();
  },

  moveStacks () {
    let self = this;

    _.each(self.removedArrs, (arr)=>{
      arr.delay(100).animate({
        opacity: 0
      },250, function(){
        arr.remove();
      })
    });

    let pos = 2 - this.winsArray.length;
    for (let i = 0; i < this.winsArray.length; i++) {
      this.winsArray[i].animate({
        'bottom': pos * 64
      },250, function(){
        if(self.winsArray.length > 3)
        {
          self.removedArrs = _.dropRight(self.winsArray, self.winsArray.length - 1);
          self.winsArray = _.drop(self.winsArray, self.winsArray.length - 2)
        }
        self.clearStacks();
      })
      pos++;
    }
  },

  rearrangeStack () {
    let self = this;
    let pos = 2 - this.winsArray.length;

    if(self.winsArray.length < 3) self.init = self.winsArray.length;

    for (let i = 0; i < this.winsArray.length; i++) {

      this.winsArray[i].animate({
        'bottom' : pos * 64
      },250, function(){
        self.clearStacks();
      });
      pos++;
    }
  },

  clearStacks () {

    clearTimeout(this.clearStacksTimeout);
    let self = this;

    this.clearStacksTimeout = setTimeout(function() {

      self.init = 0;

      for (let i = 0; i < self.winsArray.length; i++) {
        self.winsArray[i].delay(i * 100).animate({
          'opacity': 0,
          'left': '-280px'
        }, 500, function() {
          self.winsArray = [];
          $('.notification-container').empty();
          $('.notification-container').hide();
        });
      }
    }, 3000);
  },

  makeWinBox (tableName, amount, prefix, point = 0) {

    //container box
    let notif_box = $('<div></div>').addClass('notif-box');

    //switch background
    if (this.winsArray[this.winsArray.length - 1]) {
      this.background = this.winsArray[this.winsArray.length - 1].background == "#E5C160" ? '#F1E382' : "#E5C160";
    }

    notif_box.background = this.background;

    //initial position
    notif_box.css({
      'opacity' : 0,
      'left': '-280px',
      'bottom' : point
    });

    // draw wrap & container
    notif_box
    .append(
      $('<div></div>').addClass('notif-box__wrap')
    )
    .append(
      $('<div></div>').addClass('notif-box__con').css({'background' : this.background})
      .append(
        $('<i></i>').addClass('notif-box_close')
      )
      .append(
        $(`<h4>${tableName}</h4>`).addClass('notif-box_close')
      )
      .append(
        $(`<span>${prefix} ${this.numberWithCommas(amount)}</span>`).addClass('notif-box_money')
      )
    )

    $('.notification-container').append(notif_box)

    return notif_box;
  },

  numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
export default {
  popup_notification
}
