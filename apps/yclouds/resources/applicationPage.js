sc_require('core')

Yclouds.applicationPage = SC.Page.design({
    mainView: SC.View.design({
       classNames: ['application-page'],
       layout:{ top:80, left:0, right:0, bottom: 0},
       childViews: 'label canvas'.w(),
       label: SC.LabelView.design({
           layout:{ top:0, left: 20, height:353, width:30},
           textAlign: SC.ALIGN_CENTER,
           value: 'Start Application Model Editing'
       }),
       canvas: LinkIt.CanvasView.design(SCUI.Cleanup, {
           layout: { left:250, right:0, top:0, bottom:0 },
           classNames: ['canvas']
       })

   })



});
