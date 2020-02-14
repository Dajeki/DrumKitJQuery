let powerSwitch = true;
let lastSoundPlayed = '';
let volume = 50 / 100;

const locationUnclicked = "pics/DrumButtons/clicked/";
const preloadImagesURL = [locationUnclicked+"A.svg", locationUnclicked+"C.svg", locationUnclicked+"D.svg", 
                          locationUnclicked+"E.svg", locationUnclicked+"G.svg", locationUnclicked+"H.svg",
                          locationUnclicked+"S.svg", locationUnclicked+"V.svg", locationUnclicked+"Y.svg",
                          "pics/Switch/power-button-off.svg" ];

/*
    TODO Maybe use que system to stop quick clicks from one button to another from missing the the change back to unclick
    Alternative was not having any image because of regex causing wrong source from speed
    Probably caused from same issue as above mentioned
*/

//SOUND BANKS
const bankOne = {
    'g-drum': {
        keyCode: 103,
        keyTrigger: 'G',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, 
    'h-drum': {
        keyCode: 104,
        keyTrigger: 'H',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, 
    'y-drum': {
        keyCode: 121,
        keyTrigger: 'Y',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, 
    'd-drum': {
        keyCode: 100,
        keyTrigger: 'D',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, 
    'a-drum': {
        keyCode: 97,
        keyTrigger: 'A',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, 
    'e-drum': {
        keyCode: 101,
        keyTrigger: 'E',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, 
    'v-drum': {
        keyCode: 118,
        keyTrigger: 'V',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, 
    'c-drum': {
        keyCode: 99,
        keyTrigger: 'C',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, 
    's-drum': {
        keyCode: 115,
        keyTrigger: 'S',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
};

const bankTwo = {
    'g-drum': {
        keyCode: 103,
        keyTrigger: 'G',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    }, 
    'h-drum': {
        keyCode: 104,
        keyTrigger: 'H',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    'y-drum': {
        keyCode: 121,
        keyTrigger: 'Y',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    'v-drum': {
        keyCode: 118,
        keyTrigger: 'V',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    'e-drum': {
        keyCode: 101,
        keyTrigger: 'E',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    's-drum': {
        keyCode: 115,
        keyTrigger: 'S',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    'c-drum': {
        keyCode: 99,
        keyTrigger: 'C',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    }, 
    'd-drum':{
        keyCode: 100,
        keyTrigger: 'D',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    }, 
    'a-drum': {
        keyCode: 97,
        keyTrigger: 'A',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
};

const bankThree = {
    'g-drum': {
        keyCode: 103,
        keyTrigger: 'G',
        id: 'Slash',
        url: 'sounds/8bitkit-mid-high.wav'
  }, 
    'h-drum': {
        keyCode: 104,
        keyTrigger: 'H',
        id: 'Lazer',
        url: 'sounds/8bitkit-mid-low.wav'
  }, 
    'y-drum': {
        keyCode: 121,
        keyTrigger: 'Y',
        id: 'Miner',
        url: 'sounds/8bitkit-tweet.wav'
  }, 
    'd-drum': {
        keyCode: 100,
        keyTrigger: 'D',
        id: 'Jump',
        url: 'sounds/8bitkit-mid.wav '
  }, 
    'a-drum': {
        keyCode: 97,
        keyTrigger: 'A',
        id: 'Clap',
        url: 'sounds/8bitkit-snare.wav'
  }, 
    'e-drum': {
        keyCode: 101,
        keyTrigger: 'E',
        id: 'Magic Spell',
        url: 'sounds/8bitkit-open-hh.wav'
  }, 
    'v-drum': {
        keyCode: 118,
        keyTrigger: 'V',
        id: "Body Slam",
        url: 'sounds/8bitkit-high-bass.wav'
  }, 
    'c-drum': {
        keyCode: 99,
        keyTrigger: 'C',
        id: 'Landing',
        url: 'sounds/8bitkit-low-bass.wav'
  }, 
    's-drum': {
        keyCode: 115,
        keyTrigger: 'S',
        id: 'Ruby',
        url: 'sounds/8bitkit-closed-hh.wav'
  },
};


const drumkits = {dk1 : bankOne, dk2 : bankTwo, dk3 : bankThree};


function preloadMedia( Media, typeData ){

    let preloadObjects = Object.values(Media);
    let mediaObjects; //to get the objects values from the objects in preloadObjects later

    for (let data = 0; data < preloadObjects.length; ++data)
    {
        if (typeData.toLowerCase() == 'audio')
        {
            mediaObjects = Object.values(preloadObjects[data]);
            for (let drum = 0; drum < mediaObjects.length; ++drum)
            {
                console.log("Loading audio at: " + mediaObjects[drum].url);
                new Audio(mediaObjects[drum].url);           
            }
        }
        else if (typeData.toLowerCase() == 'img')
        {          
                /*
                    Dont need the second loop here because the format for media is a single array instead of
                    an array of object of objects like sounds are
                */
                console.log("Loading image at: " + Media[data]);
                (new Image()).url = Media[data];        
        }
    }
}



function drumResponse()
{
    
    let currentlyClicked = evt.target.id;
    $('#sound-output').html('Clicked: ' + currentlyClicked);
}



function playSound(currentlyClickedAudio)
{
    if (powerSwitch == true)
    {
        let audioSound;
    
        audioSound = new Audio(currentlyClickedAudio['url']);
        audioSound.volume = volume;


        audioSound.play();
    }
}



/*
Function to call at the beggining of program to setup all the action handlers
*/
function setupHandlers(){

    //Click that will display the current drum name in the box and play the sound
    $('.drum-scale').mousedown(drumkits, function(evt){
                        
        let dkSelection = $('#drumkit-select :selected').val();
        let currentlyClicked = evt.target.id;

        //check power switch
        if (powerSwitch == true)
        {
            $('#sound-output').html(evt.data[dkSelection][currentlyClicked]['id']);
        }
        else
        {
            $('#sound-output').html("MUTED");
        }

        //play sound and display clicked button
        playSound(evt.data[dkSelection][currentlyClicked],currentlyClicked);
        $(this).attr("src", $(this).attr("src").replace(/(unclicked|clicked)/, "clicked"));
    });


    //Return the buttons back to unclicked for either of these events.
    $('.drum-scale').mouseup(function(evt){
            $(this).attr("src", $(this).attr("src").replace(/(unclicked|clicked)/, "unclicked"));
    });


    $('.drum-scale').mouseout(function(evt){
        $('.drum-scale').each(function() { $(this).attr("src", $(this).attr("src").replace(/(unclicked|clicked)/, "unclicked")); });
    });


    //keypress for the entire page that will display the current drum name in the box and play the sound
    $(document).keypress(drumkits, function(evt){
                        
        let dkSelection = $('#drumkit-select :selected').val();
        let currentKeyPressed = evt.keyCode;
        let currentDrumPressed;
        let propertyName;

        let appropriateKey = false;

        //gets all the values of an object
        var mainObjectsValues = Object.values(evt.data[dkSelection])

        //loop through to see which keycode is the correct one that matches our keypress
        for(index = 0; index < mainObjectsValues.length; ++index)
        {
            //if we found a match
            if (mainObjectsValues[index]['keyCode'] == currentKeyPressed)
            {   
                //get an array of the property names (we dont know the property in which it came from)     
                propertyName = Object.keys(evt.data[dkSelection]);
                //get the correct index from the array based on where we checked in the loop
                propertyName = propertyName[index];
                
                //get the name of the drum for displaying later
                currentDrumPressed = mainObjectsValues[index]['id'];

                appropriateKey = true;

                //dont need to check more if reached this point
                break;
            }
        }
        if (appropriateKey == false)
        {
            //check to make sure we at least got a match, if not dont follow through with event.
            return false;
        }
        
        if(powerSwitch == true)
        {
            //display the name of the drum to the element
            $('#sound-output').html(currentDrumPressed);
        }
        else
        {
            $('#sound-output').html("MUTED");
        }
        
            $("#" + propertyName).attr("src", $("#" + propertyName).attr("src").replace(/(unclicked|clicked)/, "clicked") )        
            playSound(evt.data[dkSelection][propertyName], currentKeyPressed);          //set it to true so it only happens once  
    });



    //Click the power button to turn the sounds on and off.
    $(document).keyup(drumkits, function(evt){
        
        let dkSelection = $('#drumkit-select :selected').val();
        let currentKeyPressed = evt.key;
        let propertyName;

        //gets all the values of an object
        var mainObjectsValues = Object.values(evt.data[dkSelection])
        

        //loop through to see which keycode is the correct one that matches our keypress
        for(index = 0; index < mainObjectsValues.length; ++index)
        {
            
            //if we found a match (Have to use different check because keyup changes so the computer knows the key is being held down.)
            if (mainObjectsValues[index]['keyTrigger'] == currentKeyPressed.toUpperCase())
            {   
                //get an array of the property names (we dont know the property in which it came from)     
                propertyName = Object.keys(evt.data[dkSelection]);

                
                //get the correct index from the array based on where we checked in the loop
                propertyName = propertyName[index];

                appropriateKey = true;
          
                $("#" + propertyName).attr("src", $("#" + propertyName).attr("src").replace(/(unclicked|clicked)/, "unclicked") );
                
                //dont need to check more if reached this point
                break;
            }
        }
    });


    //Click the power button to turn the sounds on and off.
    $('#power-button').click( function(evt){      

        if ($('#power-button').attr('src') == 'pics/Switch/power-button-on.svg')
        {
            lastSoundPlayed = $('#sound-output').html();
            powerSwitch = false;
            $('#power-button').attr('src', "pics/Switch/power-button-off.svg")
            $('#sound-output').html("MUTED");
        }
        else
        {
            powerSwitch = true;
            $('#power-button').attr('src', 'pics/Switch/power-button-on.svg');
            $('#sound-output').html(lastSoundPlayed);
        }
    });


    $('#volume-selector').change( function(evt){
          
        volume = $('#volume-selector').val()/100;
        
    });
}

function clearTimeout() {
    for (var i = setTimeout(function() {}, 0); i > 0; i--) {
      window.clearTimeout(i);
    }
  }



