Kiwi.Plugins.LEAPController= {
  name:'LEAPController',
  version:'0.1.3'
};
Kiwi.PluginManager.register(Kiwi.Plugins.LEAPController);

Kiwi.Plugins.LEAPController.PointableObject = function(){
  
  this.active = false;
  this.pointableLength = undefined;
  this.pointableWidth = undefined;

  this.tipX = undefined;
  this.tipY = undefined;
  this.tipZ = undefined;


  this.directionX = undefined;
  this.directionY = undefined;
  this.directionZ = undefined;

  this.touchDistance = undefined;
  this.touchZone = undefined;
  
}





Kiwi.Plugins.LEAPController.HandObject = function(){

  //position
  this.active = false;

  this.posX = undefined;
  this.posY = undefined;
  this.posZ = undefined;


  this.directionX = undefined;
  this.directionY = undefined;
  this.directionZ = undefined;

  this.palmNormalX = undefined;
  this.palmNormalY = undefined;
  this.palmNormalZ = undefined;

  this.roll = undefined;
  this.pitch = undefined;
  this.yaw = undefined;
  

  this.pointables = [new Kiwi.Plugins.LEAPController.PointableObject(), new Kiwi.Plugins.LEAPController.PointableObject(), new Kiwi.Plugins.LEAPController.PointableObject(), new Kiwi.Plugins.LEAPController.PointableObject(), new Kiwi.Plugins.LEAPController.PointableObject(), new Kiwi.Plugins.LEAPController.PointableObject()]





}



//variabels, librarires

Kiwi.Plugins.LEAPController.hands = [];
Kiwi.Plugins.LEAPController.hands.push(new Kiwi.Plugins.LEAPController.HandObject(), new Kiwi.Plugins.LEAPController.HandObject(), new Kiwi.Plugins.LEAPController.HandObject(), new Kiwi.Plugins.LEAPController.HandObject(), new Kiwi.Plugins.LEAPController.HandObject(), new Kiwi.Plugins.LEAPController.HandObject());
Kiwi.Plugins.LEAPController.leapControl = undefined;
Kiwi.Plugins.LEAPController.active = false;

Kiwi.Plugins.LEAPController.currentHand = new Kiwi.Plugins.LEAPController.HandObject();

Kiwi.Plugins.LEAPController.controllerConnected = false;

Kiwi.Plugins.LEAPController.onConnect = new Kiwi.Signal();
Kiwi.Plugins.LEAPController.onDisconnect = new Kiwi.Signal();





Kiwi.Plugins.LEAPController.createController = function(game) {
    //Create Controller
    this.leapControl = new Leap.Controller({enableGestures: true});

    //////////////////////////////
    //Event Listeners
    Kiwi.Plugins.LEAPController.leapControl.on('deviceConnected', function (){  
      Kiwi.Plugins.LEAPController.controllerConnected = true;
      Kiwi.Plugins.LEAPController.onConnect.dispatch();
      console.log("LEAP Motion Controller connected.");
    });


    Kiwi.Plugins.LEAPController.leapControl.on('deviceFrame', function (){    
      if (!Kiwi.Plugins.LEAPController.controllerConnected){
        Kiwi.Plugins.LEAPController.controllerConnected = true;
      }
      //console.log("Receiving data from device.");
    });






    Kiwi.Plugins.LEAPController.leapControl.on('deviceDisconnected', function (){     
      Kiwi.Plugins.LEAPController.controllerConnected = false;
      Kiwi.Plugins.LEAPController.onDisconnect.dispatch();
      console.log("LEAP Motion Controller disconnected.");
    });



    //Controller loop initiated
    this.leapControl.loop(function(frame) {

      for (var i = 0; i < Kiwi.Plugins.LEAPController.hands.length-1; i++){
        Kiwi.Plugins.LEAPController.hands[i].active = false;
        for (var j = 0; j < Kiwi.Plugins.LEAPController.hands[i].pointables.length-1; j++){
          Kiwi.Plugins.LEAPController.hands[i].pointables[j].active = false;
        }
      }

       var myHands = [];

        for (var i in frame.handsMap) {
          var hand = frame.handsMap[i];
          myHands.push(hand);
        }

        

        for (var j = 0; j < myHands.length; j++){
          var myPointables = []
          for (var k in myHands[j].pointables){
            var point = myHands[j].pointables[k];
            myPointables.push(point);

           
          }
           for (var l = 0; l < myPointables.length; l++){
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].active = true;

              Kiwi.Plugins.LEAPController.hands[j].pointables[l].pointableLength = myPointables[l].length;
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].pointableWidth = myPointables[l].width;


              Kiwi.Plugins.LEAPController.hands[j].pointables[l].tipX = myPointables[l].tipPosition[0];
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].tipY = myPointables[l].tipPosition[1];
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].tipZ = myPointables[l].tipPosition[2];

              Kiwi.Plugins.LEAPController.hands[j].pointables[l].directionX = myPointables[l].direction[0];
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].directionY = myPointables[l].direction[1];
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].directionZ = myPointables[l].direction[2];

              Kiwi.Plugins.LEAPController.hands[j].pointables[l].touchDistance = myPointables[l].touchDistance;
              Kiwi.Plugins.LEAPController.hands[j].pointables[l].touchZone = myPointables[l].touchZone;


            }

          Kiwi.Plugins.LEAPController.hands[j].active = true;

          Kiwi.Plugins.LEAPController.hands[j].posX = myHands[j].palmPosition[0];
          Kiwi.Plugins.LEAPController.hands[j].posY = myHands[j].palmPosition[1];
          Kiwi.Plugins.LEAPController.hands[j].posZ = myHands[j].palmPosition[2];

          Kiwi.Plugins.LEAPController.hands[j].directionX = myHands[j].direction[0];
          Kiwi.Plugins.LEAPController.hands[j].directionY = myHands[j].direction[1];
          Kiwi.Plugins.LEAPController.hands[j].directionZ = myHands[j].direction[2];

          Kiwi.Plugins.LEAPController.hands[j].palmNormalX = myHands[j].palmNormal[0];
          Kiwi.Plugins.LEAPController.hands[j].palmNormalY = myHands[j].palmNormal[1];
          Kiwi.Plugins.LEAPController.hands[j].palmNormalZ = myHands[j].palmNormal[2];

          Kiwi.Plugins.LEAPController.hands[j].roll = Math.atan2(Kiwi.Plugins.LEAPController.hands[j].palmNormalX, -Kiwi.Plugins.LEAPController.hands[j].palmNormalY);
          Kiwi.Plugins.LEAPController.hands[j].pitch = Math.atan2(Kiwi.Plugins.LEAPController.hands[j].directionY, -Kiwi.Plugins.LEAPController.hands[j].directionZ);
          Kiwi.Plugins.LEAPController.hands[j].yaw = Math.atan2(Kiwi.Plugins.LEAPController.hands[j].directionX, -Kiwi.Plugins.LEAPController.hands[j].directionZ);

        
        }
        
      });

  return this;
}



Kiwi.Plugins.LEAPController.update = function(){

}


