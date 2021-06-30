window.gsPlayer = function(elementId) {
    this.elementId = elementId;
    this.sectionIndex = 0;
    this.screenIndex = 0;
    this.metadata = null;
    this.win = document.getElementById(elementId).contentWindow;
    // callbacks
    this.onNavigated = null;
    this.onMetadata = null;
    this.onFinished = null;
    // methods
    this.nextPage = function() {
        this.win.postMessage({action: 'tsgs.Next'}, '*');
    };
    this.previousPage = function() {
        this.win.postMessage({action: 'tsgs.Prev'}, '*');
    };
    this.homePage = function() {
        this.win.postMessage({action: 'tsgs.Home'}, '*');
    };
    this.gotoPage = function(section, screen) {
        this.win.postMessage({action: 'tsgs.Nav', nav: {sectionIndex:section, screenIndex:screen}}, '*');
    };
    this.getMetadata = function() {
        this.win.postMessage({action: 'tsgs.Metadata'}, '*');
    }
    this.onMessage = function(event) {
        if (event.source == this.win && event.data) { 
            var data = event.data;
            if (data.action == 'tsgs.Navigated') {
                this.sectionIndex = data.sectionIndex;
                this.screenIndex = data.screenIndex;
                if (this.onNavigated) {
                    this.onNavigated(this.sectionIndex, this.screenIndex);
                }
            } else if (data.action == 'tsgs.Metadata') {
                this.metadata = data;
                this.sectionIndex = data.currentSection;
                this.screenIndex = data.currentScreen;
                if (this.onMetadata) {
                    this.onMetadata(this.metadata);
                }
            } else if (data.action == 'tsgs.EndScreen') {
                if (this.onFinished) {
                    this.onFinished();
                }
            }
        }
    };
	window.addEventListener('message', this.onMessage.bind(this));
}
