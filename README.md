# 3Sharp Guided Simulation Player Library

This library allows you to control the 3Sharp Guided Simulation Player while it is hosted in your website using an iFrame.

## Requests

The gsPlayer library supports sending the following requests:

*Metadata*
- request metadata such as title and section information

*Navigation*
- next page
- previous page
- home page
- navigate to a specific section/page

*Variables*
- get the list of all variables
- get a specific variable
- set a variable's value

## Callbacks

The gsPlayer uses the following callback methods:

- onLoaded: called then the player finishes loading
    - it may already be loaded, you can call checkLoaded to have the onLoaded message sent if that is the case
- onMetadata: called when metadata is received
- onNavigated: called when navigation occurs in the Guided Simulation
- onShapeClick: called when a Shape Click event occurs
- onFinished: called when the last page is viewed
- onVariableList: called when the list of all variables is received
- onGetVariable: called when info on a specific variable is received
- onVariableChanged: called whenever a variable's state changes in the Guided Simulation

## Examples

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
