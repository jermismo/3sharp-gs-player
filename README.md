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
      player.onNavigated = (section, screen) => {
        alert('Player location changed to section ' + (section+1) + ', screen ' + (screen+1));
      };
      player.onFinished = () => {
        alert('The Demo has completed.');
      };
    };
  </script>
</body>
```

When requesting metadata about the guided simulation, the respose is in this format:

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
