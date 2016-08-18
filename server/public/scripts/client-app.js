$(document).ready(function () {
  getAnimals();

  // create function for animals
  $('#animal-submit').on('click', postAnimal);
  $('#animal-list').on('click', '.update', putAnimal);
  //need event listener for the drop submit

});
/**
 * Retrieve animals from server and append to DOM
 */
//Function gets animals from the zoo_animals database and appends below
function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log('GET /animals returns:', animals);
      animals.forEach(function (animals) {
        var $el = $('<div></div>');
        //list of properties we wnat to display
        var animalsProperties = ['animal_type', 'number', 'id'];
        //creating an input field
        animalsProperties.forEach(function (property){

          var $input = $('<input type ="text" name ="' + property + '"number ="' + property + '"id = "' + property + '" />');

          $input.val(animals[property]);
          $el.append($input);

        });

        $el.data('animalsId', animal.Id);
        $el.append('<button class = "update">Update</button');

        $('#animal-form').append($el);
      });
    },

    error: function (response) {
      console.log('GET /animals fail. No animals could be retrieved!');
    },
  });
}
/**
 * Add a new book to the database and refresh the DOM
 */
 //new animal function
function postAnimal() {
  event.preventDefault();
// was book
   var animal = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/randomID',
    data: animal,
    success: function () {
      console.log('POST /random works!');
      $('#animal-form').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /random does not work...');
    },
  });
}

//place animals to server
function putAnimal () {
  var animal = {};
  var inputs = $(this).parent().children().serializeArray();
  $.each(inputs, function (i, field){
    animal[field.name] = field.value;
  });
  var animalId = $(this).parent().data('animalId');
  $.ajax({
    type: 'PUT',
    url:'/randomID/' + randomID,
    data: animal,
    success: function () {
      getAnimals();
    },
    error: function(){
      console.log('Error PUT /animals/' + animalId);
    },
  })
}
