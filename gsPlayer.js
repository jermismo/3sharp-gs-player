/**
 * The gsPlayer object handles sending and receiving post messages from a Guided Simulation
 * hosted in an iFrame. 
 * @param {string} elementId The ID of the iFrame hosting the Guided Simulation
 */
window.gsPlayer = function(elementId) {
    this.elementId = elementId;
    this.sectionIndex = 0;
    this.screenIndex = 0;
    this.metadata = null;
    this.win = document.getElementById(elementId).contentWindow;
    
    // callbacks
    /**
     * The method to call when the player has loaded and is ready for calls.
     * @returns nothing
     */
    this.onLoaded = null;

    /**
     * The method to call when navigation happens in the Guided Simulation.
     * @returns data: { sectionIndex, screenIndex, screenId }
     */
    this.onNavigated = null;
    
    /**
     * The method to call when a Shape has been clicked
     * @returns data: { sectionIndex,  screenIndex, screenId, shapeName, shapeId }
     */
    this.onShapeClick = null;
    
    /**
     * The method to call when receiving metadata about the Guided Simulation
     * @returns data: { title, currentSection, currentScreen, currentScreenId, sections: [{ title, screenCount }] }
     */
    this.onMetadata = null;
    
    /**
     * The method to call when the Guided Simulation has reached the last screen
     */
    this.onFinished = null;
    
    /**
     * The method to call when the list of all variables has been received.
     * @returns [{ key, type, default, value }]
     */
    this.onVariableList = null;
    
    /**
     * The method to call when a variable is received.
     * @returns data: { key, value }
     */
    this.onGetVariable = null;
    
    /**
     * The method to call when any variable is changed.
     * @returns data: { key, value }
     */
    this.onVariableChanged = null;
    
    // action names
    this.actions = {
        loaded: 'tsgs.Loaded',
        shapeClick: 'tsgs.ShapeClick',
        navigated: 'tsgs.Navigated',
        endScreen: 'tsgs.EndScreen',
        metadata: 'tsgs.Metadata',
        listVariables: 'tsgs.ListVariables',
        variable: 'tsgs.Variable',
        variableChanged: 'tsgs.VariableChanged'
    }
    // message names
    this.messages = {
        loaded: 'tsgs.Loaded',
        next: 'tsgs.Next',
        previous: 'tsgs.Prev',
        home: 'tsgs.Home',
        navigate: 'tsgs.Nav',
        metadata: 'tsgs.Metadata',
        variableList: 'tsgs.VariableList',
        getVariable: 'tsgs.GetVariable',
        setVariable: 'tsgs.SetVariable',
    }
    
    /**
     * Request the player to send the loaded if it is already loaded
     */
    this.checkLoaded = function() {
        this.win.postMessage({action: this.messages.loaded}, '*');
    };

    /**
     * Navigate to the next page
     */
    this.nextPage = function() {
        this.win.postMessage({action: this.messages.next}, '*');
    };
    /**
     * Navigate to the previous page
     */
    this.previousPage = function() {
        this.win.postMessage({action: this.messages.previous}, '*');
    };
    /**
     * Navigate to the home page
     */
    this.homePage = function() {
        this.win.postMessage({action: this.messages.home}, '*');
    };
    /**
     * Navigate to a secific screen by indexes
     * @param {number} section  
     * @param {number} screen 
     */
    this.gotoPage = function(section, screen) {
        this.win.postMessage({action: this.messages.navigate, nav: {sectionIndex:section, screenIndex:screen}}, '*');
    };
    /**
     * Navigate to a screen by ID
     * @param {string} screenId 
     */
    this.gotoScreen = function(screenId) {
        this.win.postMessage({action: this.messages.navigate, screenId: screenId});
    }
    /**
     * Send a request to get metadata
     */
    this.getMetadata = function() {
        this.win.postMessage({action: this.messages.metadata}, '*');
    }
    /**
     * Send a request to get the list of variables
     */
    this.getVariableList = function() {
        this.win.postMessage({action:this.messages.variableList}, '*');
    }
    /**
     * Send a request to get the current value of a variable
     * @param {string} key 
     */
    this.getVariable = function(key) {
        this.win.postMessage({action: this.messages.getVariable, key: key}, '*')
    }
    /**
     * Set the variable to the specified value
     * @param {string} key 
     * @param {string} value 
     */
    this.setVariable = function(key, value) {
        this.win.postMessage({action: this.messages.setVariable, key: key, value: value}, '*')
    }

    this.onMessage = function(event) {
        if (event.source == this.win && event.data) { 
            var data = event.data;
            if (data.action == this.actions.loaded) {
                if (this.onLoaded){
                    this.onLoaded();
                }
            } else if (data.action == this.actions.navigated) {
                this.sectionIndex = data.sectionIndex;
				this.screenIndex = data.screenIndex;
				if (this.onNavigated) {
                    this.onNavigated(data);
                }
            } else if (data.action == this.actions.metadata) {
                this.metadata = data;
                this.sectionIndex = data.currentSection;
                this.screenIndex = data.currentScreen;
                if (this.onMetadata) {
                    this.onMetadata(this.metadata);
                }
            } else if (data.action == this.actions.endScreen) {
                if (this.onFinished) {
                    this.onFinished();
                }
            } else if (data.action == this.actions.shapeClick) {
                if (this.onShapeClick) {
                    this.onShapeClick(data);
                }
            } else if (data.action == this.actions.listVariables) {
                if (this.onVariableList) {
                    this.onVariableList(data.variables);
                }
            } else if (data.action == this.actions.variable) {
		if (this.onGetVariable) {
		    this.onGetVariable(data);
		}
            } else if (data.action == this.actions.variableChanged) {
		if (this.onVariableChanged) {
		    this.onVariableChanged(data);
		}
            }
        }
    };
    window.addEventListener('message', this.onMessage.bind(this));
}
