// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            portions copyright @2009 Apple Inc.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/*global module test ok equals same stop start */

(function() {
    var appleURL="http://photos4.meetupstatic.com/photos/event/4/6/9/9/600_4518073.jpeg";
    var iv=SC.ImageView.design({value: appleURL, layout: {height:400, width:400}});
    var pane = SC.ControlTestPane.design({ height: 100 })
    .add("basic", SC.ScrollView, {
  
    })

    .add("basic2", SC.ScrollView, {
        contentView: iv
    })
    
    .add("basic3", SC.ScrollView, {
      contentView: iv,
      isHorizontalScrollerVisible: NO,
      autohidesHorizontalScroller: NO,
      autohidesVerticalScroller: NO
    })
    
    .add("disabled", SC.ScrollView, {
      isEnabled: NO
    })
    
    .add("verticalScrollerBottom",SC.ScrollView, {
      contentView: iv,
      hasHorizontalScroller : NO,
      verticalScrollerBottom: 16,
      isVerticalScrollerVisible: YES,
      autohidesVerticalScroller: NO
      
    });

    pane.show(); // add a test to show the test pane

  // ..........................................................
  // TEST VIEWS
  // 
  module('SC.ScrollView UI', pane.standardSetup());
  
  test("basic", function() {
    var view = pane.view('basic');
    ok(!view.$().hasClass('disabled'), 'should not have disabled class');
    ok(!view.$().hasClass('sel'), 'should not have sel class');
    
    equals(view.getPath('childViews.length'), 3, 'scroll view should have only three child views');

    var containerView = view.get('containerView') ;
    ok(containerView, 'scroll views should have a container view');
    ok(containerView.kindOf(SC.ContainerView), 'default containerView is a kind of SC.ContainerView');
    ok(containerView.get('contentView') === null, 'default containerView should have a null contentView itself');
    ok(view.get('contentView') === null, 'scroll view should have no contentView by default');
    equals(containerView.getPath('childViews.length'), 0, 'containerView should have no child views');
    
    var horizontalScrollerView = view.get('horizontalScrollerView');
    ok(view.get('hasHorizontalScroller'), 'default scroll view wants a horizontal scroller');
    ok(horizontalScrollerView, 'default scroll view has a horizontal scroller');
    
    var verticalScrollerView = view.get('verticalScrollerView');
    ok(view.get('hasVerticalScroller'), 'default scroll view wants a vertical scroller');
    ok(verticalScrollerView, 'default scroll view has a vertical scroller');
  });
  
  
  
  test("basic2", function() {
    var view = pane.view('basic2');
    ok(view.$().hasClass('sc-scroll-view'), 'should have sc-scroll-view class');    
        
    var horizontalScrollerView = view.get('horizontalScrollerView');
    ok(view.get('hasHorizontalScroller'), 'default scroll view wants a horizontal scroller');
    ok(horizontalScrollerView, 'default scroll view has a horizontal scroller');
    ok(horizontalScrollerView.$().hasClass('sc-horizontal'), 'should have sc-horizontal class');        
	  var maxHScroll = view.maximumHorizontalScrollOffset();    
	  ok((maxHScroll > 0), 'Max horizontal scroll should be greater than zero');
    
    var verticalScrollerView = view.get('verticalScrollerView');
    ok(view.get('hasVerticalScroller'), 'default scroll view wants a vertical scroller');
    ok(verticalScrollerView, 'default scroll view has a vertical scroller');
    ok(verticalScrollerView.$().hasClass('sc-vertical'), 'should have sc-vertical class');    
	  var maxVScroll = view.maximumVerticalScrollOffset();    
	  ok((maxVScroll > 0), 'Max vertical scroll should be greater than zero');
    
  });
   
  test("basic3", function() {
    var view = pane.view('basic3');
    view.set('isHorizontalScrollerVisible',NO);
    ok(!view.get('canScrollHorizontal'),'cannot scroll in horizontal direction');
    ok(view.$().hasClass('sc-scroll-view'), 'should have sc-scroll-view class');    
    var horizontalScrollerView = view.get('horizontalScrollerView');
    ok(view.get('hasHorizontalScroller'), 'default scroll view wants a horizontal scroller');
    ok(horizontalScrollerView, 'default scroll view has a horizontal scroller');
    ok(horizontalScrollerView.$().hasClass('sc-horizontal'), 'should have sc-horizontal class');        
    var maxHScroll = view.maximumHorizontalScrollOffset();    
    equals(maxHScroll , 0, 'Max horizontal scroll should be equal to zero');

    view.set('isVerticalScrollerVisible',NO);
    ok(!view.get('canScrollVertical'),'cannot scroll in vertical direction');
    var verticalScrollerView = view.get('verticalScrollerView');
    ok(view.get('hasVerticalScroller'), 'default scroll view wants a vertical scroller');
    ok(verticalScrollerView, 'default scroll view has a vertical scroller');
    ok(verticalScrollerView.$().hasClass('sc-vertical'), 'should have sc-vertical class');    
    var maxVScroll = view.maximumVerticalScrollOffset();    
    equals(maxVScroll ,0, 'Max vertical scroll should be equal to zero');
  });

  test("disabled", function() {
     var view = pane.view('disabled'); 
     ok(view.$().hasClass('disabled'), 'should have disabled class');
     ok(!view.$().hasClass('sel'), 'should not have sel class');
   });
   
   test("Setting the scroller to a specific value", function() {
     var viewsc = pane.view('basic2');
     // should be testing against the layer.scrollTop property
     SC.RunLoop.begin();
     viewsc.scrollTo(0, 10);
     SC.RunLoop.end();
     equals(viewsc.get('verticalScrollOffset'), 10, "1After setting the value to the 10 on a vertical scroller, the verticalscrollOffset property of the layer must be");
     equals(viewsc.get('verticalScrollerView').get('layer').scrollTop, 10, "2After setting the value to the 10 on a vertical scroller, the scrollTop property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(0, 0);
     SC.RunLoop.end();
     equals(viewsc.get('verticalScrollOffset'), 0, "1After setting the value to the 0 on a vertical scroller, the verticalscrollOffset property of the layer must be");
     equals(viewsc.get('verticalScrollerView').get('layer').scrollTop, 0, "2After setting the value to the 0 on a vertical scroller, the scrollTop property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(0, 100);
     SC.RunLoop.end();
     equals(viewsc.get('verticalScrollOffset'), 100, "1After setting the value to the 100 on a vertical scroller, the verticalscrollOffset property of the layer must be");
     equals(viewsc.get('verticalScrollerView').get('layer').scrollTop, 100, "2After setting the value to the 100 on a vertical scroller, the scrollTop property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(0, -1);
     SC.RunLoop.end();
     equals(viewsc.get('verticalScrollOffset'), 0, "1After setting the value to the -1 on a vertical scroller, the verticalscrollOffset property of the layer must be");
     equals(viewsc.get('verticalScrollerView').get('layer').scrollTop, 0, "2After setting the value to the -1 on a vertical scroller, the scrollTop property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(0, 101);
     SC.RunLoop.end();
     equals(viewsc.get('verticalScrollOffset'), 101, "1After setting the value to the 101 on a vertical scroller, the verticalscrollOffset property of the layer must be");
     equals(viewsc.get('verticalScrollerView').get('layer').scrollTop, 101, "2After setting the value to the 101 on a vertical scroller, the scrollTop property of the layer must be");

     // should be testing against the layer.scrollLeft property
     viewsc.set('layoutDirection', SC.LAYOUT_HORIZONTAL);
     SC.RunLoop.begin();
     viewsc.scrollTo(10, 0);
     SC.RunLoop.end();
     equals(viewsc.get('horizontalScrollOffset'), 10, "After setting the value to the 10 on a horizontal scroller, the horizontalScrollOffset property of the layer must be");
     equals(viewsc.get('horizontalScrollerView').get('layer').scrollLeft, 10, "After setting the value to the 10 on a horizontal scroller, the scrollLeft property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(0, 0);
     SC.RunLoop.end();
     equals(viewsc.get('horizontalScrollOffset'), 0, "After setting the value to the 0 on a horizontal scroller, the horizontalScrollOffset property of the layer must be");
     equals(viewsc.get('horizontalScrollerView').get('layer').scrollLeft, 0, "After setting the value to the 0 on a horizontal scroller, the scrollLeft property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(50, 0);
     SC.RunLoop.end();
     equals(viewsc.get('horizontalScrollOffset'), 50, "After setting the value to the 50 on a horizontal scroller, the horizontalScrollOffset property of the layer must be");
     equals(viewsc.get('horizontalScrollerView').get('layer').scrollLeft, 50, "After setting the value to the 50 on a horizontal scroller, the scrollLeft property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo( - 1, 0);
     SC.RunLoop.end();
     equals(viewsc.get('horizontalScrollOffset'), 0, "After setting the value to the -1 on a horizontal scroller, the horizontalScrollOffset property of the layer must be");
     equals(viewsc.get('horizontalScrollerView').get('layer').scrollLeft, 0, "After setting the value to the -1 on a horizontal scroller, the scrollLeft property of the layer must be");
     SC.RunLoop.begin();
     viewsc.scrollTo(101, 0);
     SC.RunLoop.end();
     equals(viewsc.get('horizontalScrollOffset'), 73, "After setting the value to the 101 on a horizontal scroller, the horizontalScrollOffset property of the layer must be");
     equals(viewsc.get('horizontalScrollerView').get('layer').scrollLeft, 73, "After setting the value to the 101 on a horizontal scroller, the scrollLeft property of the layer must be");
  });
   
   
   test("non-zero bottom in vertical scrollbar", function() {
      var view = pane.view('verticalScrollerBottom'); 
      equals(view.get('verticalScrollerBottom'),16, "should have verticalScrollerBottom as ");
      var scroller = view.get('verticalScrollerView') ;
      ok(scroller, 'should have vertical scroller view ');
      equals(scroller.get('layout').bottom,16, 'should have layout.bottom of scroller as ');
      equals(scroller.$()[0].style.bottom,'16px', 'should have style.bottom of scroller as ');
    });
   
   
})();
