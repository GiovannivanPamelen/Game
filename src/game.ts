/**
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 * 
 * Users can walk around some scenery. That's all. It should really be 
 * extended to make it more interesting!
 * 
 * To play this game, create an instance of this class and call the "play"
 * method.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
class Game {
    parser : Parser;
    out : Printer;

    currentRoom : Room;

    isOn : boolean;

    private rooms: Array<Room> = [];


    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }

    

    /**
     * Create all the rooms and link their exits together.
     */
    createRooms() : void {
        // create the rooms
               
        let entrance = new Room("at the Entrance");
        let room2 = new Room("in room2");
        let room3 = new Room("in room3");
        let room4 = new Room("in room4");
        let room5 = new Room("in room5");
        let room6 = new Room("in room6");
        let room7 = new Room("in room7");
        let room8 = new Room("in room8");
        let room9 = new Room("in room9");
        let room10 = new Room("in room10");
        let room11 = new Room("in room11");
        let room12 = new Room("in room12");
        let room13 = new Room("in room13");
        let room14 = new Room("in room14");
        let room15 = new Room("in room15");

        // initialise room exits
        entrance.setExits(null, null, null, null, null, null, null, room2);
        room2.setExits(null, room5, null, room4, null, entrance, null, room3);
        room3.setExits(null, null, null, room5, room3, null, null, null);
        room4.setExits(null, room5, null, room9, null, room2, null, null);
        room5.setExits(room7, null, null, room4, null, room2, null, room3);
        room6.setExits(null, room8, null, null, null, null, null, null);
        room7.setExits(null, null, null, room11, null, room5, null, null);
        room8.setExits(null, room9, null, room12, null, null, null, room6);
        room9.setExits(null, null, null, room8, null, room4, null, null);
        room10.setExits(null, room11, null, room13, null, null, null, null)
        room11.setExits(null, room15, null, null, room10, room7, null, null);
        room12.setExits(null, room13, null, null, null, null, room8, null);
        room13.setExits(room14, null, null, room12, null, null, null, room10);
        room14.setExits(null, room15, null, null, null, room13, null, null);
        room15.setExits(null, null, null, null, room14, null, null, room11);
        // spawn player outside
        this.currentRoom = entrance;
    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("Welcome to the Trial of ages");
        this.out.println("Trial of ages is a new, incredibly boring adventure game.");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.out.println("You are " + this.currentRoom.description);
        this.out.print("Exits: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if(this.currentRoom.northeastExit != null) {
            this.out.print("northeast ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if(this.currentRoom.southeastExit != null) {
            this.out.print("southeast ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if(this.currentRoom.southwestExit != null) {
            this.out.print("southwest ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        if(this.currentRoom.northwestExit != null) {
            this.out.print("northwest ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    }

    /**
     * Print out error message when user enters unknown command.
     * Here we print some erro message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printError(params : string[]) : boolean {
        this.out.println("I don't know what you mean...");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go quit help");
        return false;
    }

    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printHelp(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Help what?");
            return false;
        }
        this.out.println("You are lost. You are alone. You wander");
        this.out.println("around at the university.");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go quit help");
        return false;
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "northeast" :
                nextRoom = this.currentRoom.northeastExit;
                break;    
            case "east" : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "southeast" :
                nextRoom = this.currentRoom.southeastExit;
                break;
            case "south" : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "southwest" :
                nextRoom = this.currentRoom.southwestExit;
                break;
            case "west" : 
                nextRoom = this.currentRoom.westExit;
                break;
            case "northwest" :
                nextRoom = this.currentRoom.northwestExit;
                break;
        }

        if (nextRoom == null) {
            this.out.println("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("You are " + this.currentRoom.description);
            this.out.print("Exits: ");

        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
            }
        if(this.currentRoom.northeastExit != null) {
            this.out.print("northeast ");
            }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
            }
        if(this.currentRoom.southeastExit != null) {
            this.out.print("southeast ");
            }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
            }
        if(this.currentRoom.southwestExit != null) {
            this.out.print("southwest ");
            }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
            }
        if(this.currentRoom.northwestExit != null) {
            this.out.print("northwest ");
            }
            this.out.println();
        }
        return false;
    }
    
    /**
     * Locking the doors to room number 15
     */

     

    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    quit(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}