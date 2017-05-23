class Passage {

    room1 : Room;
    room2 : Room;
    locked : boolean;

    constructor(room1:Room, dir1:string, room2:Room, dir2:string, locked:boolean) {
       this.room1 = room1;
       this.room2 = room2;
       this.locked = locked;
       room1.setExit(this, dir1);
       room2.setExit(this, dir2);
    }
}