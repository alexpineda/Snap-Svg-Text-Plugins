Snap.plugin( function( Snap, Element, Paper, global ) {
  Element.prototype.text = function(text) {
    if (text){
        if (this.node.textContent){
          this.node.textContent = text;
        } else {
          this.node.innerText = text;
        }
    } else {
      return this.node.textContent || this.node.innerText;
    }
  }

});

Snap.plugin(function (Snap, Element, Paper, glob) {
  Element.prototype.wrap = function (width, align) {        
    var svgNS = "http://www.w3.org/2000/svg";

    var el = this.node;
    align = align || 'left';

    //already wrapped, unwrap -> idempotent wrap() function
    if (this.select('tspan')){
      this.text(this.text());
    }

    var textContent = this.node.textContent || this.node.innerText;
    if (!textContent)
      textContent = '';
    var words = textContent.split(' ');   
    
    this.node.innerHTML = '';

    var tspans = [];
    //add initial tspan
    var tspan = document.createElementNS(svgNS, "tspan");
    tspans.push(tspan);
    var text = document.createTextNode(words[0]);
    tspan.appendChild(text);
    el.appendChild(tspan);

    var longest = 0;

    for(var i=1; i<words.length; i++)
    {
      //work with tspan until correct length
      var len = tspan.textContent.length;
      tspan.textContent += " " + words[i];
      var clen = tspan.getComputedTextLength();
      tspan.setAttributeNS(null,'data-clen',clen);

      if (clen > width)
      {
        //remove that last word, it was too long, and add a space for easily recombining words later
        tspan.textContent = tspan.textContent.slice(0, len).trim() + ' ';  
        var clen = tspan.getComputedTextLength();
        tspan.setAttributeNS(null,'data-clen',clen);
        
        if (clen > longest)
          longest = clen;

        //can't do the following cause tspan is not wrapped in Element
        //tspan.text(tspan.text().slice(0,len));

        //work on next tspan
        tspan = document.createElementNS(svgNS, "tspan");
        tspans.push(tspan);
        tspan.setAttributeNS(null,"x",this.attr('x'));
        tspan.setAttributeNS(null, "dy", "1em"); 
        text = document.createTextNode(words[i]);
        tspan.appendChild(text);
        el.appendChild(tspan);

        var clen = tspan.getComputedTextLength();
        tspan.setAttributeNS(null,'data-clen',clen);

        if (clen > longest)
          longest = clen;

      } else if (clen > longest)
        longest = clen;

    }

    //second loop for alignment
    if ( align=='center'|| align=='right'){
        var offset = function(clen){
          if (align=='center'){
            return longest/2-clen/2;
          } else {
            return longest-clen;
          }
        }
        for (var i=0;i<tspans.length;i++){
          tspans[i].setAttributeNS(null,'dx',offset(tspans[i].getAttribute('data-clen')));
        }
    }

    //don't think we need this
    this.data('longest',longest);
    return this;
  };

});