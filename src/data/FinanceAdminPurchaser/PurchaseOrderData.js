import React from "react";
// import * as Icon from 'react-feather';

export const columns = [
    {
      name: "#",
      selector: "id",
      sortable: true,
      grow:0,
      width:'auto',
    },
    {
        name: "",
        selector: "edit",
        sortable: true,
        grow:0,
        width:'auto',
        wrap: true
    },
    {
        name: "",
        selector: "flag",
        sortable: true,
        grow:0.2,
        width:'auto',
        wrap: true
    },
    {
        name: "PO Code",
        selector: "code",
        sortable: true
    },
    {
      name: "Title",
      selector: "code",
      sortable: true
    },
    {
      name: "	PO Value",
      selector: "code",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Status",
      selector: "status",
      sortable: true
    },
    {
        name: "PO Date",
        selector: "ref",
        sortable: true
    },
    {
        name: "Supplier Invoice Code",
        selector: "project",
        sortable: true
    },
    {
        name: "Creation Date",
        selector: "",
        sortable: true
    },
  ];
  
  export const data = [
    {
      id: 1,
      code:"mafmar",
      project: "Beetlejuice",
      ref: "1988",
      mainCon: "92",
      closing: ["Comedy", "Fantasy"],
      status: "Tim Burton",
      quoted: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
      plot:
        'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    },
    {
      id: 2,
      code:"outsource",
      project: "The Cotton Club",
      ref: "1984",
      mainCon: "127",
      closing: ["Crime", "Drama", "Music"],
      status: "Francis Ford Coppola",
      quoted: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
      plot:
        "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg"
    },
    {
      id: 3,
      code:"Sub Con 1",
      project: "The Shawshank Redemption",
      ref: "1994",
      mainCon: "142",
      closing: ["Crime", "Drama"],
      status: "Frank Darabont",
      quoted: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
      plot:
        "Two imprisoned men bond over a number of refs, finding solace and eventual redemption through acts of common decency.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg"
    },
    {
      id: 4,
      code:"Sub Con 2",
      project: "Crocodile Dundee",
      ref: "1986",
      mainCon: "97",
      closing: ["Adventure", "Comedy"],
      status: "Peter Faiman",
      quoted: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
      plot:
        "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg"
    },
    {
      id: 5,
      code:"SUB-CON 3",
      project: "Valkyrie",
      ref: "2008",
      mainCon: "121",
      closing: ["Drama", "History", "Thriller"],
      status: "Bryan Singer",
      quoted: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
      plot:
        "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg"
    },
    {
      id: 6,
      code:"mafmar",
      project: "Ratatouille",
      ref: "2007",
      mainCon: "111",
      closing: ["Animation", "Comedy", "Family"],
      status: "Brad Bird, Jan Pinkava",
      quoted: "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
      plot:
        "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg"
    },
    {
      id: 7,
      code:"outsource",
      project: "City of God",
      ref: "2002",
      mainCon: "130",
      closing: ["Crime", "Drama"],
      status: "Fernando Meirelles, Kátia Lund",
      quoted:
        "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
      plot:
        "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    },
    {
      id: 8,
      code:"Sub Con 1",
      project: "Memento",
      ref: "2000",
      mainCon: "113",
      closing: ["Mystery", "Thriller"],
      status: "Christopher Nolan",
      quoted: "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano, Mark Boone Junior",
      plot:
        "A man juggles searching for his wife's murderer and keeping his short-term memory loss from being an obstacle.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 9,
      code:"Sub Con 2",
      project: "The Intouchables",
      ref: "2011",
      mainCon: "112",
      closing: ["Biography", "Comedy", "Drama"],
      status: "Olivier Nakache, Eric Toledano",
      quoted: "François Cluzet, Omar Sy, Anne Le Ny, Audrey Fleurot",
      plot:
        "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg"
    },
    {
      id: 10,
      code:"SUB-CON 3",
      project: "Stardust",
      ref: "2007",
      mainCon: "127",
      closing: ["Adventure", "Family", "Fantasy"],
      status: "Matthew Vaughn",
      quoted: "Ian McKellen, Bimbo Hart, Alastair MacIntosh, David Kelly",
      plot:
        "In a countryside town bordering on a magical land, a young man makes a promise to his beloved that he'll retrieve a fallen star by venturing into the magical realm.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@._V1_SX300.jpg"
    },
    {
      id: 11,
      project: "Apocalypto",
      ref: "2006",
      mainCon: "139",
      closing: ["Action", "Adventure", "Drama"],
      status: "Mel Gibson",
      quoted:
        "Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead",
      plot:
        "As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM1NjYyNTY5OV5BMl5BanBnXkFtZTcwMjgwNTMzMQ@@._V1_SX300.jpg"
    },
    {
      id: 12,
      project: "Taxi Driver",
      ref: "1976",
      mainCon: "113",
      closing: ["Crime", "Drama"],
      status: "Martin Scorsese",
      quoted: "Diahnne Abbott, Frank Adu, Victor Argo, Gino Ardito",
      plot:
        "A mentally unstable Vietnam War veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNGQxNDgzZWQtZTNjNi00M2RkLWExZmEtNmE1NjEyZDEwMzA5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 13,
      project: "No Country for Old Men",
      ref: "2007",
      mainCon: "122",
      closing: ["Crime", "Drama", "Thriller"],
      status: "Ethan Coen, Joel Coen",
      quoted: "Tommy Lee Jones, Javier Bardem, Josh Brolin, Woody Harrelson",
      plot:
        "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg"
    },
    {
      id: 14,
      project: "Planet 51",
      ref: "2009",
      mainCon: "91",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Jorge Blanco, Javier Abad, Marcos Martínez",
      quoted: "Jessica Biel, John Cleese, Gary Oldman, Dwayne Johnson",
      plot:
        "An alien civilization is invaded by Astronaut Chuck Baker, who believes that the planet was uninhabited. Wanted by the military, Baker must get back to his ship before it goes into orbit without him.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTUyOTAyNTA5Ml5BMl5BanBnXkFtZTcwODU2OTM0Mg@@._V1_SX300.jpg"
    },
    {
      id: 15,
      project: "Looper",
      ref: "2012",
      mainCon: "119",
      closing: ["Action", "Crime", "Drama"],
      status: "Rian Johnson",
      quoted: "Joseph Gordon-Levitt, Bruce Willis, Emily Blunt, Paul Dano",
      plot:
        "In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe - who one day learns the mob wants to 'close the loop' by sending back Joe's future self for assassination.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTY3NTY0MjEwNV5BMl5BanBnXkFtZTcwNTE3NDA1OA@@._V1_SX300.jpg"
    },
  ];
  