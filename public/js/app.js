const app = angular.module('MyApp', []);


app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.modal = false;
  this.loggedIn = false;
  this.noShow = true;
  this.loggedOut =true;
  this.noCurrentUserPage = true;
  controller.logInUsername = '';
  controller.logInPassword = '';
  controller.createUsername = '';
  controller.createPassword = '';

  if(this.loggedOut === true){
    this.noCurrentUserPage = true;

  }


  this.toggleModal = function(){
    this.modal = !this.modal
    console.log(this.modal)
    this.noModal = !this.noModal
  }

  this.createModal = false;

  this.toggleCreateModal = function(){
    this.createModal = !this.createModal
    this.noModal = !this.noModal
    console.log(this.createModal)
  }

//GET USER
  this.getUser = function(){
    console.log('function working');
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response){
      console.log(response);
      controller.users = response.data
    })
  }

//CREATE USER
  this.createUser = function(){
    console.log('function working');
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.createUsername,
        password: this.createPassword,
        beasts: []
      }
    }).then(function(response){
      console.log(response);
      controller.createUsername = '';
      controller.createPassword = '';
      console.log('controller');
    })
  }


//Create Session (Log-in)

this.logIn = function(){
      $http({
          method:'POST',
          url:'/sessions',
          data: {
              username:this.logInUsername,
              password:this.logInPassword
          }
        }).then(function(response){
          controller.loggedOut = !controller.loggedOut
          controller.loggedIn = !controller.loggedIn
          document.getElementById("createUser").reset()
          document.getElementById("loggedInUser").reset()
          controller.currentUserBeasts = response.data.user.beasts
          controller.user = response.config.data.username
          console.log('------------------------')
          console.log(controller.currentUserBeasts)
          console.log('------------------------')
          console.log('------------------------')
          console.log(controller.currentUserBeasts)
          console.log('------------------------')
            console.log(response);
        }, function(error){
          alert('no such username in system')
          console.log(error);
        })
    }


/// Delete session

this.logOut = function(){
  console.log('delete clicked');
  $http({
      method:'DELETE',
      url: '/sessions'
  }).then(
      function(response){
        controller.noCurrentUserPage = true;
        controller.loggedIn = !controller.loggedIn
        console.log(response)
        controller.loggedOut = !controller.loggedOut
        controller.username = 'hi'
        controller.password = 'hi'
        controller.logInUsername = '';
        controller.logInPassword = '';
      },
      function(error){
        console.log(error);
      }
  );
}

//CREATE Beast
  this.createBeast = function(){
    console.log('creatiiingggg...');
      $http({
          method:'POST',
          url:'/beasts',
          data: {
            image: this.image,
            name: this.name,
            description: this.description
          }
      }).then(function(response){
          document.getElementById("createBeast").reset()
          controller.getBeasts();
          controller.toggleCreateModal();
          console.log('success!');
          controller.image = '';
          controller.name = '';
          controller.description = '';
      })
  }

//GET
  this.getBeasts = function(){
    $http({
      method:'GET',
      url: '/beasts'
    }).then(function(response){
      controller.beasts = response.data
    })
  }
//DELETE
  this.deleteBeast = function(beast){
    console.log('delete clicked');
    $http({
        method:'DELETE',
        url: '/beasts/' + beast._id
    }).then(
        function(response){
            controller.getBeasts();
        },
        function(error){
          console.log(error);
        }
    );
  }

/// Mouse-over logic
  this.chooseOneBeast = function(beast){
    console.log('hello')
      this.beast = beast;
      console.log(this.beast.image)
    }

// // Push one beast into the user
//     this.likeBeast = function(beast){
//       $http({
//         method: 'put',
//         url: '/beasts/' + beast._id + '/like',
//         data: {
//           beast: beast
//         }
//       }).then(function(response){
//         console.log(response)
//         controller.currentUserBeasts.push(response.config.data.beast)
//       }, function(error){
//         console.log(error)
//       })
//     }
//
//     // Remove one beast from the user
//         this.dislikeBeast = function(beast){
//           $http({
//             method: 'put',
//             url: '/beasts/' + beast._id + '/dislike',
//             data: {
//               beast: beast
//             }
//           }).then(function(response){
//             console.log(response)
//             let index = controller.currentUserBeasts.indexOf(beast)
//             controller.currentUserBeasts.splice(index, 1)
//           }, function(error){
//             console.log(error)
//           })
//         }


    // Update logic
        this.updateBeast = function(beast){
          $http({
            method: 'PUT',
            url: '/beasts/' + beast._id,
            data: {
              image: this.image,
              name: this.name,
              description: this.description
            }
          }).then(function(response){
            console.log(response)
            controller.getBeasts()
            console.log('hi')
            console.log(response)
            controller.toggleModal();
            controller.image = '';
            controller.name = '';
            controller.description = '';
          })
        }
    // Click for show page

    this.chooseOneShowBeast = function(beast){
        this.beast = beast;
       console.log(this.beast.image)
      }

    this.show = false;

    this.toggleShow = function(beast){
      this.noShow = !this.noShow
      this.show = !this.show
    }


// ==========================NAVIGATION=========================================

this.getSearchedBeasts = function(search){
  console.log('GET SEARCH');
  console.log(search);
  $http({
    method:'GET',
    url: '/beasts/' + search
  }).then(function(response){
    controller.beasts = response.data
  })
}

this.currentBeast = 'all';
this.search ='';
this.wasClicked = false;

this.toggleClicked = function(wasClicked){
    this.wasClicked = !this.wasClicked;
  }

this.getRent = function(search){
  $http({
    method:'GET',
    //url: '/beasts/'+ search
    url: '/beasts/'+ this.currentBeast + '/'+ search
  }).then(function(response){
    controller.beasts = response.data
  })
}

this.currentUserPage = function(){
  this.noCurrentUserPage = !this.noCurrentUserPage
}

this.chooseSearchParam = function(currentBeast){
    this.currentBeast = currentBeast;
  }
  this.noModal = true;

  this.getBeasts();
}]);
