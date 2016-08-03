$(document).ready(){
 $.getJSON('/all', function(data){
  for var i = 0; i<data.length; i++{

  }
 }
}


$('#addcomment').on('click', function(){
  $.ajax({
    type: "POST",
    url: '/submit',
    dataType: 'json',
    data: {
      thoughts: $('#thought').val(),
      created: Date.now()
    }
  })
  .done(function(data){
    console.log(data);
  }
  );
  return false;
});