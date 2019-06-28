var noteText = 'Bacon ipsum dolor amet brisket burgdoggen pork chop jerky. Burgdoggen sirloin sausage pig corned beef' +
    'cow t-bone spare ribs. Fatback capicola bacon ribeye t-bone prosciutto. Corned beef shoulder shankle' +
    'kielbasa burgdoggen. Shank swine strip steak, brisket turkey frankfurter leberkas boudin tri-tip alcatra' +
    'burgdoggen meatloaf sirloin buffalo. Cow leberkas strip steak ball tip ham hock pastrami shank' +
    'landjaeger venison doner.\n' +

    'Brisket pig fatback ground round, beef biltong meatball buffalo hamburger pork chop jerky. Short loin' +
    'brisket beef ribs strip steak, ham turducken shankle cow chicken jowl tongue boudin pork loin leberkas' +
    'shoulder. Shankle doner beef filet mignon drumstick boudin meatball turducken shoulder. Pork belly kevin' +
    'meatloaf hamburger pancetta jerky tail. Meatball kevin picanha, alcatra brisket bresaola strip steak.\n' +

    'Buffalo filet mignon ham hock, frankfurter pig strip steak ground round. Filet mignon short ribs cupim' +
    'buffalo, porchetta burgdoggen beef ribs turkey shank ball tip sausage pork shoulder jowl fatback.' +
    'Leberkas pancetta filet mignon kevin shoulder bresaola short ribs. Landjaeger rump capicola, leberkas' +
    'boudin beef ribs beef cupim kielbasa picanha short loin strip steak andouille tri-tip. Salami pork loin' +
    'venison, ham hock beef ribs fatback tenderloin pork belly bresaola ribeye ball tip meatloaf picanha' +
    'capicola.\n\n' +

    'Turkey capicola buffalo ball tip brisket shankle turducken prosciutto chicken bacon. Frankfurter strip' +
    'steak chicken, sausage jowl biltong ball tip sirloin corned beef beef shankle tongue cupim kielbasa.' +
    'Drumstick ball tip shankle, filet mignon leberkas flank chicken. Ground round sausage alcatra turkey' +
    'frankfurter venison. Rump jowl bacon tri-tip meatball short ribs, pork chop sausage filet mignon tail' +
    'frankfurter pork ham jerky beef. Beef cupim pork chop brisket, pork belly filet mignon cow strip steak' +
    'beef ribs pig turducken ribeye spare ribs.\n' +

    'Meatball swine pork venison porchetta sirloin. Ham hock pork chop ham, ground round venison tenderloin' +
    'shank pancetta buffalo prosciutto shoulder landjaeger. Cupim boudin chicken tongue meatloaf. Sirloin' +
    'landjaeger bacon fatback burgdoggen hamburger biltong pig capicola short loin.'

class Note {

    constructor({id, text, color}) {
        id == undefined ? this.id = Note.incrementId() : this.id = id;
        this.text = text;
        this.color = color;
        this.textTrimmed = text.substring(0, 20) + '...';
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    getColor() {
        return this.color;
    }

    getTextTrimmed() {
        return this.textTrimmed;
    }

    setText(text1) {
        this.text = text1;
    }
}

class NoteTile {
    constructor(tileId, note) {
        this.tileId = tileId;
        this.note = note;
    }

    getDisplayedNote() {
        return this.note;
    }

    getNoteTile() {
        return this.tileId + " " + this.note;
    }

    editNote(text1) {
        this.note.setText(text1);
    }

    updateTile(note) {
        this.note = note;
        this.textTrimmed = text.substring(0, 20) + '...';
        $(this.tileId).empty();
        $(this.tileId).append(jQuery.parseHTML(note.text));
    }
}