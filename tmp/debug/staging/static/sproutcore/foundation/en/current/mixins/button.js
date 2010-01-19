// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @namespace

  This mixin implements many of the basic state-handling attributes for 
  button-like views, including an auto-updated title, and mapping the current
  value to an isSelected state.
  
  Usually you will not work with this mixin directly.  Instead, you should use
  a class that incorporates the mixin such as SC.ButtonView, SC.CheckboxView
  or SC.RadioView.
  
  This mixin assumes you have already applied the SC.Control and 
  SC.DelegateSupport mixins as well.
  
  @since SproutCore 1.0  
*/
SC.Button = {
  
  // ..........................................................
  // VALUE PROPERTIES
  // 
  
  /**
    Used to automatically update the state of the button view for toggle style
    buttons.

    for toggle style buttons, you can set the value and it will be used to
    update the isSelected state of the button view.  The value will also
    change as the user selects or deselects.  You can control which values
    the button will treat as isSelected by setting the toggleOnValue and 
    toggleOffValue.  Alternatively, if you leave these properties set to
    YES or NO, the button will do its best to convert a value to an 
    appropriate state:
  
    - null, false, 0  -> isSelected = false
    - any other single value -> isSelected = true
    - array -> if all values are the same state: that state.  otherwise MIXED.
    
    @property {Object}
  */  
  value: null,
  
  /**
    Value of a selected toggle button.
  
    for a toggle button, set this to any object value you want.  The button
    will be selected if the value property equals the targetValue.  If the
    value is an array of multiple items that contains the targetValue, then
    the button will be set to a mixed state.

    default is YES
    
    @property {Object}
  */
  toggleOnValue: YES,

  /**
    Value of an unselected toggle button.
  
    For a toggle button, set this to any object value you want.  When the
    user toggle's the button off, the value of the button will be set to this
    value.
  
    default is NO 
  
    @property {Object}
  */
  toggleOffValue: NO,
  
  // ..........................................................
  // TITLE 
  // 
  
  /**
    If YES, then the title will be localized.
    
    @property {Boolean}
  */
  localize: NO,
  
  /** @private */
  localizeBindingDefault: SC.Binding.bool(),

  /**
    The button title.  If localize is YES, then this should be the localization key to display.  Otherwise, this will be the actual string displayed in the title.  This property is observable and bindable.
    
    @property {String}
  */  
  title: '',

  /**
    If you set this property, the title property will be updated automatically
    from the content using the key you specify.
    
    @property {String}
  */
  contentTitleKey: null,
  
  /**
    The button icon.  Set this to either a URL or a CSS class name (for 
    spriting).  Note that if you pass a URL, it must contain at 
    least one slash to be detected as such.
    
    @property {String}
  */
  icon: null,

  /**
    If you set this property, the icon will be updated automatically from the
    content using the key you specify.
    
    @property {String}
  */
  contentIconKey: null,

  /**
    If YES, button will attempt to display an ellipsis if the title cannot 
    fit inside of the visible area.  This feature is not available on all
    browsers.
    
    @property {Boolean}
  */
  needsEllipsis: YES,
  
  /**
    The computed display title.  This is generated by localizing the title 
    property if necessary.
    
    @property {String}
  */
  displayTitle: function() {
    var ret = this.get('title');
    return (ret && this.get('localize')) ? ret.loc() : (ret || '');
  }.property('title','localize').cacheable(),
  
  /**
    The key equivalent that should trigger this button on the page.
    
    @property {String}
  */
  keyEquivalent: null,
  
  // ..........................................................
  // METHODS
  // 
  
  /**
    Classes that include this mixin can invoke this method from their 
    render method to render the proper title HTML.  This will include an 
    icon if necessary along with any other standard markup.
    
    @param {SC.RenderContext} context the context to render
    @param {Boolean} firstTime YES if first time rendering
    @returns {SC.RenderContext} the context
  */
  renderTitle: function(context, firstTime) {
    var icon = this.get('icon'),
        image = '' ,
        title = this.get('displayTitle') ,
        needsTitle = (!SC.none(title) && title.length>0),
        elem, htmlNode, imgTitle;
    // get the icon.  If there is an icon, then get the image and update it.
    // if there is no image element yet, create it and insert it just before
    // title.
    if (icon) {
      var blank = SC.BLANK_IMAGE_URL;

      if (icon.indexOf('/') >= 0) {
        image = '<img src="'+icon+'" alt="" class="icon" />';
      } else {
        image = '<img src="'+blank+'" alt="" class="'+icon+'" />';
      }
      needsTitle = YES ;
    }
    imgTitle = image + title;
    if(firstTime){
      if(this.get('needsEllipsis')){
        context.push('<label class="sc-button-label ellipsis">'+imgTitle+'</label>'); 
      }else{
          context.push('<label class="sc-button-label">'+imgTitle+'</label>'); 
      }  
      this._ImageTitleCached = imgTitle;
    }else{
      elem = this.$('label');  
      if ( (htmlNode = elem[0])){
        if(needsTitle) { 
          if(this.get('needsEllipsis')){
            elem.addClass('ellipsis');
            if(this._ImageTitleCached !== imgTitle) htmlNode.innerHTML = imgTitle;
          }else{
            elem.removeClass('ellipsis');
            if(this._ImageTitleCached !== imgTitle) htmlNode.innerHTML = imgTitle;
          } 
        }
        else { htmlNode.innerHTML = ''; } 
      }
    }  
    return context ;
  },

  /**
    Updates the value, title, and icon keys based on the content object, if 
    set.
    
    @property {Object} target the target of the object that changed
    @property {String} key name of property that changed
    @returns {SC.Button} receiver
  */
  contentPropertyDidChange: function(target, key) {
    var del = this.get('displayDelegate'), 
        content = this.get('content'), value ;

    var valueKey = this.getDelegateProperty('contentValueKey', del) ;
    if (valueKey && (key === valueKey || key === '*')) {
      this.set('value', content ? content.get(valueKey) : null) ;
    }

    var titleKey = this.getDelegateProperty('contentTitleKey', del) ;
    if (titleKey && (key === titleKey || key === '*')) {
      this.set('title', content ? content.get(titleKey) : null) ;
    }

    var iconKey = this.getDelegateProperty('contentIconKey', del);
    if (iconKey && (key === iconKey || key === '*')) {
      this.set('icon', content ? content.get(iconKey) : null) ;
    }
    
    return this ;
  },

  /** @private - when title changes, dirty display. */
  _button_displayObserver: function() {
    this.displayDidChange();
  }.observes('title', 'icon', 'value'),

  /**
    Handle a key equivalent if set.  Trigger the default action for the 
    button.  Depending on the implementation this may vary.
    
    @param {String} keystring
    @param {SC.Event} evt
    @returns {Boolean}  YES if handled, NO otherwise
  */
  performKeyEquivalent: function(keystring, evt) {

    if (!this.get('isEnabled')) return NO;
    var equiv = this.get('keyEquivalent');

    // button has defined a keyEquivalent and it matches!
    // if triggering succeeded, true will be returned and the operation will 
    // be handeled (i.e performKeyEquivalent will cease crawling the view 
    // tree)
    if (equiv) {
      if (equiv === keystring) return this.triggerAction(evt);
    
    // should fire if isDefault OR isCancel.  This way if isDefault AND 
    // isCancel, responds to both return and escape
    } else if ((this.get('isDefault') && (keystring === 'return')) ||
        (this.get('isCancel') && (keystring === 'escape'))) {
          return this.triggerAction(evt);
    }

    return NO; // did not handle it; keep searching
  },

  /**
    Your class should implement this method to perform the default action on
    the button.  This is used to implement keyboard control.  Your button
    may make this change in its own way also.
    
    @property {SC.Event} evt the event
    @returns {void}
  */
  triggerAction: function(evt) {
    throw "SC.Button.triggerAction() is not defined in %@".fmt(this);
  },

  // ..........................................................
  // VALUE <-> isSelected STATE MANAGEMNT
  // 

  /**
    This is the standard logic to compute a proposed isSelected state for a
    new value.  This takes into account the toggleOnValue/toggleOffValue 
    properties, among other things.  It may return YES, NO, or SC.MIXED_STATE.
    
    @param {Object} value
    @returns {Boolean} return state
  */
  computeIsSelectedForValue: function(value) {
    var targetValue = this.get('toggleOnValue'), state, next ;
    
    if (SC.typeOf(value) === SC.T_ARRAY) {

      // treat a single item array like a single value
      if (value.length === 1) {
        state = (value[0] == targetValue) ;
        
      // for a multiple item array, check the states of all items.
      } else {
        state = null;
        value.find(function(x) {
          next = (x == targetValue) ;
          if (state === null) {
            state = next ;
          } else if (next !== state) state = SC.MIXED_STATE ;
          return state === SC.MIXED_STATE ; // stop when we hit a mixed state.
        });
      }
      
    // for single values, just compare to the toggleOnValue...use truthiness
    } else {
      if(value === SC.MIXED_STATE) state = SC.MIXED_STATE;
      else state = (value == targetValue) ;
    }
    return state ;
  },
  
  /** @ignore */
  initMixin: function() {
    // if value is not null, update isSelected to match value.  If value is
    // null, we assume you may be using isSelected only.  
    if (!SC.none(this.get('value'))) this._button_valueDidChange();  
  },
  
  /** @private
    Whenever the button value changes, update the selected state to match.
  */
  _button_valueDidChange: function() {
    var value = this.get('value'),
        state = this.computeIsSelectedForValue(value);
    this.set('isSelected', state) ; // set new state...
  }.observes('value'),
  
  /** @private
    Whenever the selected state is changed, make sure the button value is also updated.  Note that this may be called because the value has just changed.  In that case this should do nothing.
  */
  _button_isSelectedDidChange: function() {
    var newState = this.get('isSelected'),
        curState = this.computeIsSelectedForValue(this.get('value'));
    
    // fix up the value, but only if computed state does not match.
    // never fix up value if isSelected is set to MIXED_STATE since this can
    // only come from the value.
    if ((newState !== SC.MIXED_STATE) && (curState !== newState)) {
      var valueKey = (newState) ? 'toggleOnValue' : 'toggleOffValue' ;
      this.set('value', this.get(valueKey));
    }
  }.observes('isSelected')
  
} ;