// ==========================================================================
// Project:   Yclouds - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Yclouds */

// This page describes the main user interface for your application.  
Yclouds.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
      textAlign: SC.ALIGN_CENTER,
      tagName: "h1", 
      value: "Welcome to SproutCore!"
    }),
    
    topView: SC.ToolbarView.design({
       layout:{top:0, left:0, right:0, height:36},
       childViews: 'labelView'.w(),
       anchorLocation:SC.ANCHOR_TOP,
       labelView:SC.LabelView.design({
          layout: { centerY:0, height:24, left:8, width:200},
           controlSize: SC.LARGE_CONTROL_SIZE,
           fontWeight:SC.BOLD_WEIGHT,
           value: 'Yclouds'
       })

    }),
   
    middleView:SC.MainPane.design({
        //hasHorizontalScroller:NO,
        //layout:{top:36,bottom:32,left:0,right:0},
        //backgroundColor:'white',
        childViews: 'tabViews'.w(),
        tabViews: SC.TabView.design({
             layout:{top:80, centerX:0, width:1024, bottom:60},
             classNames: ['option-tabs'],
             nowShowing: 'Yclouds.applicationPage.mainView',
             items:[
               { title: "Application", value: 'Yclouds.applicationPage.mainView'},
               { title: "Mapping", value:'Yclouds.mappingPage.mainView'},
               { title: "Architecture", value:'Yclouds.architecturePage.mainView'}
             ],
             itemTitleKey: 'title',
             itemValueKey: 'value'

        })
       //    childViews: 'master'.w(),
       //    master: SC.ListView.design({
       //       layout:{left:0, top:0, width:250,bottom:0},
       //       rowHeight:35,
       //       backgroundColor:'blue'
       //    })
    }),
  
    bottomView:SC.ToolbarView.design({
       layout:{ bottom:0, left:0, right:0, height: 32},
       anchorLocation:SC.ANCHOR_BOTTOM
    })

    //canvas:LinkIt.CanvasView.design(SCUI.Cleanup,{
    //  layout: { left: 250, right :0, top:0, bottom: 0},
    //  classNames: ['design-canvas']
    //})
    

  })

});
