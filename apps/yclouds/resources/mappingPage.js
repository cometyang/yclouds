sc_require('core')

Yclouds.mappingPage = SC.Page.design({
    mainView: SC.View.design({
       classNames: ['mapping-page'],
       layout:{ top:80, left:0, right:0, bottom: 0},
       childViews: 'label'.w(),
       label: SC.LabelView.design({
           layout:{ top:0, centerX: 20, height:353, width:300},
           textAlign: SC.ALIGN_CENTER,
           value: 'Start Mapping Model Editing'
       })

   })



});
