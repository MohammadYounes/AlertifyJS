Bugs
====
If you are reporting a bug you must create a test-case. You can fork this [codepen](http://codepen.io/anon/pen/raohK) or this [jsfiddle](http://jsfiddle.net/g2o52zq7/) to get started.

Also include re-produce steps and environement specs, such as OS and Browser (**We support last 2 versions only**).

> Remember, calls to `alertify.alert`, `alertify.confirm` and `alertify.prompt` are none blocking.
  ```  
  //bad
  if(alertify.confirm('Are you sure?')){
    // this would execute immediatly
  }
  //good
  alertify.confirm('Are you sure?', function(){
    //this would execute when the user clicks ok
  });    
  ```


Questions
====
For how-to questions, please post on [stackoverflow](http://stackoverflow.com/questions/tagged/alertifyjs) and don't forget to tag with `alertifyjs`.
