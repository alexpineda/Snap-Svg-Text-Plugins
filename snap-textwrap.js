Snap.plugin(function (Snap, Element, Paper, glob) {
    Element.prototype.textwrap = function (width) {        
        var svgNS = "http://www.w3.org/2000/svg";
        if (this.type != "text")
            throw new "textwrap() must be called on a text element";
        
//      console.log(this);
        var el = this.node;
        var words = this.node.innerHTML.split(' ');   
        this.node.innerHTML = '';

        //add initial tspan
        var tspan = document.createElementNS(svgNS, "tspan");
        var text = document.createTextNode(words[0]);
        tspan.appendChild(text);
        el.appendChild(tspan);
        
        for(var i=1; i<words.length; i++)
        {
            //work with tspan until correct length
            var len = tspan.firstChild.data.length;
            tspan.firstChild.data += " " + words[i];

            if (tspan.getComputedTextLength() > width)
            {
                //remove that last word, it was too long
                tspan.firstChild.data = tspan.firstChild.data.slice(0, len);            
                tspan.setAttributeNS(null, "x", this.attr('x'));
                tspan.setAttributeNS(null, "dy", "1.2em"); 
                
                //work on next tspan
                tspan = document.createElementNS(svgNS, "tspan");
                text = document.createTextNode(words[i]);
                tspan.appendChild(text);
                el.appendChild(tspan);
            }
        }
        
        return this;
    };
});
