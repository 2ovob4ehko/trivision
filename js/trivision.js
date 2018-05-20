'use strict';
jQuery.prototype.trivision = function(params){
    let trivision = new Trivision($(this),params);
    trivision.draw();
    $(window).resize(function(){
        trivision.redraw();
    });
    console.log(trivision);
    return trivision;
};
class Trivision{
  constructor($wrapper,params){
      let def_params = {
          partsNum: 20
      };
      Object.assign(def_params,params);

      this.wrapper = $wrapper;
      this.original = this.wrapper.html();
      this.width = this.wrapper.width();
      this.height = this.wrapper.height();
      this.images = this.getImagesUrl();
      this.partsNum = def_params.partsNum;
  }
  draw(){
      this.wrapper.addClass('trivision_element');
      this.wrapper.html('');
      for(let j=0;j<this.partsNum;j++){
          let elW = this.width/this.partsNum/*-0.3*/;
          let elPos = this.width/this.partsNum*-j;
          let $part = $("<div></div>");
          $part.css({
              'width': elW+'px',
              'height': this.height+'px'
          });
          $part.addClass('trivision_part');
          for(let i=0;i<this.images.length;i++){
              let $side = $("<div></div>");
              $side.addClass('trivision_side');
              switch(i){
                  case 0:
                  $side.addClass('first');
                  $side.css('transform','translateZ('+elW/2+'px)');
                  break;
                  case 1:
                  $side.addClass('second');
                  $side.css('transform','rotateY(-90deg) translateX(-'+elW/2+'px)');
                  break;
                  case 2:
                  $side.addClass('third');
                  $side.css('transform','rotateY(180deg) translateZ('+elW/2+'px)');
                  break;
                  case 3:
                  $side.addClass('fourth');
                  $side.css('transform','rotateY(90deg) translateX('+elW/2+'px)');
                  break;
                  default: break;
              }
              $side.css({
                  'width': elW+'px',
                  'height': this.height+'px',
                  'background-image': "url('"+this.images[i]+"')",
                  'background-position': elPos+'px 0px'
              });
              $part.append($side);
          }
          this.wrapper.append($part);
      }
  }
  redraw(){
      this.width = this.wrapper.width();
      this.height = this.wrapper.height();
      this.draw();
  }
  destroy(){
      this.wrapper.removeClass('trivision_element');
      this.wrapper.html(this.original);
  }
  getImagesUrl(){
      let imgs = this.wrapper.children();
      let arrayUrl = [];
      imgs.each(function(){
          let attr = $(this).attr('src');
          if(typeof attr !== typeof undefined && attr !== false){
              arrayUrl.push(attr);
          }else{
              let attr = $(this).attr('data-src');
              if(typeof attr !== typeof undefined && attr !== false){
                  arrayUrl.push(attr);
              }
          }
      });
      return arrayUrl;
  }
}