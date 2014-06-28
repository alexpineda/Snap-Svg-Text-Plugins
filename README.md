Snap-Svg-Text-Plugins
================


Word wrap

```javascript
Snap.text(0,0,'Hello World!').wrap(10);
Snap.text(0,0,'Hello World!').wrap(10, 'center');//center align
Snap.text(0,0,'Hello World!').wrap(10, 'right');//right align
```

A text feature similar to jQuery text()

```javascript
var s = new Snap();
var t = s.text(0,10,'Hello World!');
t.text();//'Hello World!'
t.text('Goodbye!');
t.text();//'Goodbye!'
```
