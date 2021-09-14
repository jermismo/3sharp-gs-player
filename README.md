# 3Sharp Guided Simulation Player Library

This library allows you to control the 3Sharp Guided Simulation Player while it is hosted in your website using an iFrame.

Example usage:

```HTML
<head>
    <script type="text/javascript" src="gsPlayer.js"></script>
</head>
<body>
  <iframe id="gsFrame1" src="/index.html" onload="loadPlayer()"></iframe>
  <script type="text/javascript">
    var player;
    function loadPlayer() {
      player = new gsPlayer('gsFrame1');
      player.onNavigated = (data) => {
        alert('Player location changed to section ' + (data.sectionIndex+1) + ', screen ' + (data.screenIndex+1));
      };
      player.onFinished = () => {
        alert('The Demo has completed.');
      };
    };
  </script>
</body>
```

Metadata object

```JavaScript
{
    title: 'the title of the guided simulation',
    currentSection: 'the index of the current section',
    currentScreen: 'the index of the current screen',
    sections: [
        {
            title: 'the title of the section',
            screenCount: 'the count of screens in this section'
        }
    ]
}
```

Navigated object

```JavaScript
{
    action: 'tsgs.Navigated',
    sectionIndex: 'the 0 based index of the new section'
    screenIndex: 'the 0 based index of the new screen'
    screenId: 'the unique ID of the new screen'
}
```

ShapeClick object

```JavaScript
{
    action: 'tsgs.ShapeClick',
    sectionIndex: 'the 0 based index of the new section',
    screenIndex: 'the 0 based index of the new screen',
    screenId: 'the GUID identifying the screen',
    shapeName: 'the name of the shape that was clicked',
    shapeId: 'the unique ID of the shape that was clicked'
}
```
