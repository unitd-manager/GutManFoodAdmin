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
      name: "Item Code",
      selector: "closing",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Product Name",
      selector: "project",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>,
      sorttype:'input'
    },
    {
      name: "Product Type",
      selector: "ref",
      sortable: true,
      sorttype:'select'
    },
    {
      name: "List Price",
      selector: "closing",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Unit",
      selector: "status",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Stock",
      selector: "quoted",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Updated By",
      selector: "update",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Published",
      selector: "published",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
  ];

  export const data = [
    {
      id: 1,
      
      code:"",
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
    {
      id: 16,
      project: "Corpse Bride",
      ref: "2005",
      mainCon: "77",
      closing: ["Animation", "Drama", "Family"],
      status: "Tim Burton, Mike Johnson",
      quoted: "Johnny Depp, Helena Bonham Carter, Emily Watson, Tracey Ullman",
      plot:
        "When a shy groom practices his wedding vows in the inadvertent presence of a deceased young woman, she rises from the grave assuming he has married her.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTk1MTY1NjU4MF5BMl5BanBnXkFtZTcwNjIzMTEzMw@@._V1_SX300.jpg"
    },
    {
      id: 17,
      project: "The Third Man",
      ref: "1949",
      mainCon: "93",
      closing: ["Film-Noir", "Mystery", "Thriller"],
      status: "Carol Reed",
      quoted: "Joseph Cotten, Alida Valli, Orson Welles, Trevor Howard",
      plot:
        "Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMwNzMzMTQ0Ml5BMl5BanBnXkFtZTgwNjExMzUwNjE@._V1_SX300.jpg"
    },
    {
      id: 18,
      project: "The Beach",
      ref: "2000",
      mainCon: "119",
      closing: ["Adventure", "Drama", "Romance"],
      status: "Danny Boyle",
      quoted:
        "Leonardo DiCaprio, Daniel York, Patcharawan Patarakijjanon, Virginie Ledoyen",
      plot:
        "Twenty-something Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss - excited and intrigued, he sets out to find it.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BN2ViYTFiZmUtOTIxZi00YzIxLWEyMzUtYjQwZGNjMjNhY2IwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 19,
      project: "Scarface",
      ref: "1983",
      mainCon: "170",
      closing: ["Crime", "Drama"],
      status: "Brian De Palma",
      quoted:
        "Al Pacino, Steven Bauer, Michelle Pfeiffer, Mary Elizabeth Mastrantonio",
      plot:
        "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAzOTM4MzEwNl5BMl5BanBnXkFtZTgwMzU1OTc1MDE@._V1_SX300.jpg"
    },
    {
      id: 20,
      project: "Sid and Nancy",
      ref: "1986",
      mainCon: "112",
      closing: ["Biography", "Drama", "Music"],
      status: "Alex Cox",
      quoted: "Gary Oldman, Chloe Webb, David Hayman, Debby Bishop",
      plot:
        "Morbid biographical story of Sid Vicious, bassist with British punk group the Sex Pistols, and his girlfriend Nancy Spungen. When the Sex Pistols break up after their fateful US tour, ...",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExNjA5NzY4M15BMl5BanBnXkFtZTcwNjQ2NzI5NA@@._V1_SX300.jpg"
    },
    {
      id: 21,
      project: "Black Swan",
      ref: "2010",
      mainCon: "108",
      closing: ["Drama", "Thriller"],
      status: "Darren Aronofsky",
      quoted: "Natalie Portman, Mila Kunis, Vincent Cassel, Barbara Hershey",
      plot:
        'A committed dancer wins the lead role in a production of Tchaikovsky\'s "Swan Lake" only to find herself struggling to maintain her sanity.',
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SX300.jpg"
    },
    {
      id: 22,
      project: "Inception",
      ref: "2010",
      mainCon: "148",
      closing: ["Action", "Adventure", "Sci-Fi"],
      status: "Christopher Nolan",
      quoted: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
      plot:
        "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
    },
    {
      id: 23,
      project: "The Deer Hunter",
      ref: "1978",
      mainCon: "183",
      closing: ["Drama", "War"],
      status: "Michael Cimino",
      quoted: "Robert De Niro, John Cazale, John Savage, Christopher Walken",
      plot:
        "An in-depth examination of the ways in which the U.S. Vietnam War impacts and disrupts the lives of people in a small industrial town in Pennsylvania.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzYmRmZTQtYjk2NS00MDdlLTkxMDAtMTE2YTM2ZmNlMTBkXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
      id: 24,
      project: "Chasing Amy",
      ref: "1997",
      mainCon: "113",
      closing: ["Comedy", "Drama", "Romance"],
      status: "Kevin Smith",
      quoted: "Ethan Suplee, Ben Affleck, Scott Mosier, Jason Lee",
      plot:
        "Holden and Banky are comic book artists. Everything's going good for them until they meet Alyssa, also a comic book artist. Holden falls for her, but his hopes are crushed when he finds out she's gay.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BZDM3MTg2MGUtZDM0MC00NzMwLWE5NjItOWFjNjA2M2I4YzgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 25,
      project: "Django Unchained",
      ref: "2012",
      mainCon: "165",
      closing: ["Drama", "Western"],
      status: "Quentin Tarantino",
      quoted: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington",
      plot:
        "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg"
    },
    {
      id: 26,
      project: "The Silence of the Lambs",
      ref: "1991",
      mainCon: "118",
      closing: ["Crime", "Drama", "Thriller"],
      status: "Jonathan Demme",
      quoted:
        "Jodie Foster, Lawrence A. Bonney, Kasi Lemmons, Lawrence T. Wrentz",
      plot:
        "A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2NzkzMDI4OF5BMl5BanBnXkFtZTcwMDA0NzE1NA@@._V1_SX300.jpg"
    },
    {
      id: 27,
      project: "American Beauty",
      ref: "1999",
      mainCon: "122",
      closing: ["Drama", "Romance"],
      status: "Sam Mendes",
      quoted: "Kevin Spacey, Annette Bening, Thora Birch, Wes Bentley",
      plot:
        "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjM4NTI5NzYyNV5BMl5BanBnXkFtZTgwNTkxNTYxMTE@._V1_SX300.jpg"
    },
    {
      id: 28,
      project: "Snatch",
      ref: "2000",
      mainCon: "102",
      closing: ["Comedy", "Crime"],
      status: "Guy Ritchie",
      quoted: "Benicio Del Toro, Dennis Farina, Vinnie Jones, Brad Pitt",
      plot:
        "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 29,
      project: "Midnight Express",
      ref: "1978",
      mainCon: "121",
      closing: ["Crime", "Drama", "Thriller"],
      status: "Alan Parker",
      quoted: "Brad Davis, Irene Miracle, Bo Hopkins, Paolo Bonacelli",
      plot:
        "Billy Hayes, an American college student, is caught smuggling drugs out of Turkey and thrown into prison.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyMDA5MzkyOF5BMl5BanBnXkFtZTgwOTYwNTcxMTE@._V1_SX300.jpg"
    },
    {
      id: 30,
      project: "Pulp Fiction",
      ref: "1994",
      mainCon: "154",
      closing: ["Crime", "Drama"],
      status: "Quentin Tarantino",
      quoted: "Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta",
      plot:
        "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg"
    },
    {
      id: 31,
      project: "Lock, Stock and Two Smoking Barrels",
      ref: "1998",
      mainCon: "107",
      closing: ["Comedy", "Crime"],
      status: "Guy Ritchie",
      quoted: "Jason Flemyng, Dexter Fletcher, Nick Moran, Jason Statham",
      plot:
        "A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyN2JmZmEtNjAyMy00NzYwLThmY2MtYWQ3OGNhNjExMmM4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 32,
      project: "Lucky Number Slevin",
      ref: "2006",
      mainCon: "110",
      closing: ["Crime", "Drama", "Mystery"],
      status: "Paul McGuigan",
      quoted: "Josh Hartnett, Bruce Willis, Lucy Liu, Morgan Freeman",
      plot:
        "A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city's most rival crime bosses: The Rabbi and The Boss. Slevin is under constant surveillance by relentless Detective Brikowski as well as the infamous assassin Goodkat and finds himself having to hatch his own ingenious plot to get them before they get him.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMzc1OTEwMTk4OF5BMl5BanBnXkFtZTcwMTEzMDQzMQ@@._V1_SX300.jpg"
    },
    {
      id: 33,
      project: "Rear Window",
      ref: "1954",
      mainCon: "112",
      closing: ["Mystery", "Thriller"],
      status: "Alfred Hitchcock",
      quoted: "James Stewart, Grace Kelly, Wendell Corey, Thelma Ritter",
      plot:
        "A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNGUxYWM3M2MtMGM3Mi00ZmRiLWE0NGQtZjE5ODI2OTJhNTU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 34,
      project: "Pan's Labyrinth",
      ref: "2006",
      mainCon: "118",
      closing: ["Drama", "Fantasy", "War"],
      status: "Guillermo del Toro",
      quoted: "Ivana Baquero, Sergi López, Maribel Verdú, Doug Jones",
      plot:
        "In the falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.",
      posterUrl: ""
    },
    {
      id: 35,
      project: "Shutter Island",
      ref: "2010",
      mainCon: "138",
      closing: ["Mystery", "Thriller"],
      status: "Martin Scorsese",
      quoted: "Leonardo DiCaprio, Mark Ruffalo, Ben Kingsley, Max von Sydow",
      plot:
        "In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxMTIyNzMxMV5BMl5BanBnXkFtZTcwOTc4OTI3Mg@@._V1_SX300.jpg"
    },
    {
      id: 36,
      project: "Reservoir Dogs",
      ref: "1992",
      mainCon: "99",
      closing: ["Crime", "Drama", "Thriller"],
      status: "Quentin Tarantino",
      quoted: "Harvey Keitel, Tim Roth, Michael Madsen, Chris Penn",
      plot:
        "After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNjE5ZDJiZTQtOGE2YS00ZTc5LTk0OGUtOTg2NjdjZmVlYzE2XkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg"
    },
    {
      id: 37,
      project: "The Shining",
      ref: "1980",
      mainCon: "146",
      closing: ["Drama", "Horror"],
      status: "Stanley Kubrick",
      quoted: "Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers",
      plot:
        "A family heads to an isolated hotel for the winter where an evil and spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BODMxMjE3NTA4Ml5BMl5BanBnXkFtZTgwNDc0NTIxMDE@._V1_SX300.jpg"
    },
    {
      id: 38,
      project: "Midnight in Paris",
      ref: "2011",
      mainCon: "94",
      closing: ["Comedy", "Fantasy", "Romance"],
      status: "Woody Allen",
      quoted: "Owen Wilson, Rachel McAdams, Kurt Fuller, Mimi Kennedy",
      plot:
        "While on a trip to Paris with his fiancée's family, a nostalgic screenwriter finds himself mysteriously going back to the 1920s everyday at midnight.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTM4NjY1MDQwMl5BMl5BanBnXkFtZTcwNTI3Njg3NA@@._V1_SX300.jpg"
    },
    {
      id: 39,
      project: "Les Misérables",
      ref: "2012",
      mainCon: "158",
      closing: ["Drama", "Musical", "Romance"],
      status: "Tom Hooper",
      quoted: "Hugh Jackman, Russell Crowe, Anne Hathaway, Amanda Seyfried",
      plot:
        "In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory worker's daughter. The decision changes their lives forever.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTQ4NDI3NDg4M15BMl5BanBnXkFtZTcwMjY5OTI1OA@@._V1_SX300.jpg"
    },
    {
      id: 40,
      project: "L.A. Confidential",
      ref: "1997",
      mainCon: "138",
      closing: ["Crime", "Drama", "Mystery"],
      status: "Curtis Hanson",
      quoted: "Kevin Spacey, Russell Crowe, Guy Pearce, James Cromwell",
      plot:
        "As corruption grows in 1950s LA, three policemen - one strait-laced, one brutal, and one sleazy - investigate a series of murders with their own brand of justice.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNWEwNDhhNWUtYWMzNi00ZTNhLWFiZDAtMjBjZmJhMTU0ZTY2XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 41,
      project: "Moneyball",
      ref: "2011",
      mainCon: "133",
      closing: ["Biography", "Drama", "Sport"],
      status: "Bennett Miller",
      quoted: "Brad Pitt, Jonah Hill, Philip Seymour Hoffman, Robin Wright",
      plot:
        "Oakland A's general manager Billy Beane's successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_SX300.jpg"
    },
    {
      id: 42,
      project: "The Hangover",
      ref: "2009",
      mainCon: "100",
      closing: ["Comedy"],
      status: "Todd Phillips",
      quoted: "Bradley Cooper, Ed Helms, Zach Galifianakis, Justin Bartha",
      plot:
        "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_SX300.jpg"
    },
    {
      id: 43,
      project: "The Great Beauty",
      ref: "2013",
      mainCon: "141",
      closing: ["Drama"],
      status: "Paolo Sorrentino",
      quoted: "Toni Servillo, Carlo Verdone, Sabrina Ferilli, Carlo Buccirosso",
      plot:
        "Jep Gambardella has seduced his way through the lavish nightlife of Rome for decades, but after his 65th birthday and a shock from the past, Jep looks past the nightclubs and parties to find a timeless landscape of absurd, exquisite beauty.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0ODg1OTQ2Nl5BMl5BanBnXkFtZTgwNTc2MDY1MDE@._V1_SX300.jpg"
    },
    {
      id: 44,
      project: "Gran Torino",
      ref: "2008",
      mainCon: "116",
      closing: ["Drama"],
      status: "Clint Eastwood",
      quoted: "Clint Eastwood, Christopher Carley, Bee Vang, Ahney Her",
      plot:
        "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTQyMTczMTAxMl5BMl5BanBnXkFtZTcwOTc1ODE0Mg@@._V1_SX300.jpg"
    },
    {
      id: 45,
      project: "Mary and Max",
      ref: "2009",
      mainCon: "92",
      closing: ["Animation", "Comedy", "Drama"],
      status: "Adam Elliot",
      quoted: "Toni Collette, Philip Seymour Hoffman, Barry Humphries, Eric Bana",
      plot:
        "A tale of friendship between two unlikely pen pals: Mary, a lonely, eight-ref-old girl living in the suburbs of Melbourne, and Max, a forty-four-ref old, severely obese man living in New York.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDIyNTA1Nl5BMl5BanBnXkFtZTcwMjc2Njk3OA@@._V1_SX300.jpg"
    },
    {
      id: 46,
      project: "Flight",
      ref: "2012",
      mainCon: "138",
      closing: ["Drama", "Thriller"],
      status: "Robert Zemeckis",
      quoted:
        "Nadine Velazquez, Denzel Washington, Carter Cabassa, Adam C. Edwards",
      plot:
        "An airline pilot saves almost all his passengers on his malfunctioning airliner which eventually crashed, but an investigation into the accident reveals something troubling.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxMjI1OTMxNl5BMl5BanBnXkFtZTcwNjc3NTY1OA@@._V1_SX300.jpg"
    },
    {
      id: 47,
      project: "One Flew Over the Cuckoo's Nest",
      ref: "1975",
      mainCon: "133",
      closing: ["Drama"],
      status: "Milos Forman",
      quoted: "Michael Berryman, Peter Brocco, Dean R. Brooks, Alonzo Brown",
      plot:
        "A criminal pleads insanity after getting into trouble again and once in the mental institution rebels against the oppressive nurse and rallies up the scared patients.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BYmJkODkwOTItZThjZC00MTE0LWIxNzQtYTM3MmQwMGI1OWFiXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    },
    {
      id: 48,
      project: "Requiem for a Dream",
      ref: "2000",
      mainCon: "102",
      closing: ["Drama"],
      status: "Darren Aronofsky",
      quoted: "Ellen Burstyn, Jared Leto, Jennifer Connelly, Marlon Wayans",
      plot:
        "The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkzODMzODYwOF5BMl5BanBnXkFtZTcwODM2NjA2NQ@@._V1_SX300.jpg"
    },
    {
      id: 49,
      project: "The Truman Show",
      ref: "1998",
      mainCon: "103",
      closing: ["Comedy", "Drama", "Sci-Fi"],
      status: "Peter Weir",
      quoted: "Jim Carrey, Laura Linney, Noah Emmerich, Natascha McElhone",
      plot:
        "An insurance salesman/adjuster discovers his entire life is actually a television show.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 50,
      project: "The Artist",
      ref: "2011",
      mainCon: "100",
      closing: ["Comedy", "Drama", "Romance"],
      status: "Michel Hazanavicius",
      quoted: "Jean Dujardin, Bérénice Bejo, John Goodman, James Cromwell",
      plot:
        "A silent movie star meets a young dancer, but the arrival of talking pictures sends their careers in opposite directions.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMzk0NzQxMTM0OV5BMl5BanBnXkFtZTcwMzU4MDYyNQ@@._V1_SX300.jpg"
    },
    {
      id: 51,
      project: "Forrest Gump",
      ref: "1994",
      mainCon: "142",
      closing: ["Comedy", "Drama"],
      status: "Robert Zemeckis",
      quoted:
        "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
      plot:
        "Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BYThjM2MwZGMtMzg3Ny00NGRkLWE4M2EtYTBiNWMzOTY0YTI4XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg"
    },
    {
      id: 52,
      project: "The Hobbit: The Desolation of Smaug",
      ref: "2013",
      mainCon: "161",
      closing: ["Adventure", "Fantasy"],
      status: "Peter Jackson",
      quoted: "Ian McKellen, Martin Freeman, Richard Armitage, Ken Stott",
      plot:
        "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_SX300.jpg"
    },
    {
      id: 53,
      project: "Vicky Cristina Barcelona",
      ref: "2008",
      mainCon: "96",
      closing: ["Drama", "Romance"],
      status: "Woody Allen",
      quoted:
        "Rebecca Hall, Scarlett Johansson, Christopher Evan Welch, Chris Messina",
      plot:
        "Two girlfriends on a summer holiday in Spain become enamored with the same painter, unaware that his ex-wife, with whom he has a tempestuous relationship, is about to re-enter the picture.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU2NDQ4MTg2MV5BMl5BanBnXkFtZTcwNDUzNjU3MQ@@._V1_SX300.jpg"
    },
    {
      id: 54,
      project: "Slumdog Millionaire",
      ref: "2008",
      mainCon: "120",
      closing: ["Drama", "Romance"],
      status: "Danny Boyle, Loveleen Tandan",
      quoted: "Dev Patel, Saurabh Shukla, Anil Kapoor, Rajendranath Zutshi",
      plot:
        'A Mumbai teen reflects on his upbringing in the slums when he is accused of cheating on the Indian Version of "Who Wants to be a Millionaire?"',
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTU2NTA5NzI0N15BMl5BanBnXkFtZTcwMjUxMjYxMg@@._V1_SX300.jpg"
    },
    {
      id: 55,
      project: "Lost in Translation",
      ref: "2003",
      mainCon: "101",
      closing: ["Drama"],
      status: "Sofia Coppola",
      quoted:
        "Scarlett Johansson, Bill Murray, Akiko Takeshita, Kazuyoshi Minamimagoe",
      plot:
        "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2NDI5ODk4N15BMl5BanBnXkFtZTYwMTI3NTE3._V1_SX300.jpg"
    },
    {
      id: 56,
      project: "Match Point",
      ref: "2005",
      mainCon: "119",
      closing: ["Drama", "Romance", "Thriller"],
      status: "Woody Allen",
      quoted:
        "Jonathan Rhys Meyers, Alexander Armstrong, Paul Kaye, Matthew Goode",
      plot:
        "At a turning point in his life, a former tennis pro falls for an actress who happens to be dating his friend and soon-to-be brother-in-law.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzNzY4MzE5NF5BMl5BanBnXkFtZTcwMzQ1MDMzMQ@@._V1_SX300.jpg"
    },
    {
      id: 57,
      project: "Psycho",
      ref: "1960",
      mainCon: "109",
      closing: ["Horror", "Mystery", "Thriller"],
      status: "Alfred Hitchcock",
      quoted: "Anthony Perkins, Vera Miles, John Gavin, Janet Leigh",
      plot:
        "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMDI3OWRmOTEtOWJhYi00N2JkLTgwNGItMjdkN2U0NjFiZTYwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 58,
      project: "North by Northwest",
      ref: "1959",
      mainCon: "136",
      closing: ["Action", "Adventure", "Crime"],
      status: "Alfred Hitchcock",
      quoted: "Cary Grant, Eva Marie Saint, James Mason, Jessie Royce Landis",
      plot:
        "A hapless New York advertising executive is mistaken for a government agent by a group of foreign spies, and is pursued across the country while he looks for a way to survive.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjQwMTQ0MzgwNl5BMl5BanBnXkFtZTgwNjc4ODE4MzE@._V1_SX300.jpg"
    },
    {
      id: 59,
      project: "Madagascar: Escape 2 Africa",
      ref: "2008",
      mainCon: "89",
      closing: ["Animation", "Action", "Adventure"],
      status: "Eric Darnell, Tom McGrath",
      quoted: "Ben Stiller, Chris Rock, David Schwimmer, Jada Pinkett Smith",
      plot:
        "The animals try to fly back to New York City, but crash-land on an African wildlife refuge, where Alex is reunited with his parents.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMDA4NDcwMl5BMl5BanBnXkFtZTcwODAxNTQ3MQ@@._V1_SX300.jpg"
    },
    {
      id: 60,
      project: "Despicable Me 2",
      ref: "2013",
      mainCon: "98",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Pierre Coffin, Chris Renaud",
      quoted: "Steve Carell, Kristen Wiig, Benjamin Bratt, Miranda Cosgrove",
      plot:
        "When Gru, the world's most super-bad turned super-dad has been recruited by a team of officials to stop lethal muscle and a host of Gru's own, He has to fight back with new gadgetry, cars, and more minion madness.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExNjAyNTcyMF5BMl5BanBnXkFtZTgwODQzMjQ3MDE@._V1_SX300.jpg"
    },
    {
      id: 61,
      project: "Downfall",
      ref: "2004",
      mainCon: "156",
      closing: ["Biography", "Drama", "History"],
      status: "Oliver Hirschbiegel",
      quoted:
        "Bruno Ganz, Alexandra Maria Lara, Corinna Harfouch, Ulrich Matthes",
      plot:
        "Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator's final days in his Berlin bunker at the end of WWII.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1OTI1MjE2Nl5BMl5BanBnXkFtZTcwMTEwMzc4NA@@._V1_SX300.jpg"
    },
    {
      id: 62,
      project: "Madagascar",
      ref: "2005",
      mainCon: "86",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Eric Darnell, Tom McGrath",
      quoted: "Ben Stiller, Chris Rock, David Schwimmer, Jada Pinkett Smith",
      plot:
        "Spoiled by their upbringing with no idea what wild life is really like, four animals from New York Central Zoo escape, unwittingly assisted by four absconding penguins, and find themselves in Madagascar, among a bunch of merry lemurs",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4NDUwMzQxMF5BMl5BanBnXkFtZTcwMDgwNjgyMQ@@._V1_SX300.jpg"
    },
    {
      id: 63,
      project: "Madagascar 3: Europe's Most Wanted",
      ref: "2012",
      mainCon: "93",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Eric Darnell, Tom McGrath, Conrad Vernon",
      quoted: "Ben Stiller, Chris Rock, David Schwimmer, Jada Pinkett Smith",
      plot:
        "Alex, Marty, Gloria and Melman are still fighting to get home to their beloved Big Apple. Their journey takes them through Europe where they find the perfect cover: a traveling circus, which they reinvent - Madagascar style.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MTIzNzk2MF5BMl5BanBnXkFtZTcwMDcwMzQxNw@@._V1_SX300.jpg"
    },
    {
      id: 64,
      project: "God Bless America",
      ref: "2011",
      mainCon: "105",
      closing: ["Comedy", "Crime"],
      status: "Bobcat Goldthwait",
      quoted:
        "Joel Murray, Tara Lynne Barr, Melinda Page Hamilton, Mackenzie Brooke Smith",
      plot:
        "On a mission to rid society of its most repellent citizens, terminally ill Frank makes an unlikely accomplice in 16-ref-old Roxy.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMTc1MzA4NF5BMl5BanBnXkFtZTcwNzQwMTgzNw@@._V1_SX300.jpg"
    },
    {
      id: 65,
      project: "The Social Network",
      ref: "2010",
      mainCon: "120",
      closing: ["Biography", "Drama"],
      status: "David Fincher",
      quoted: "Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons",
      plot:
        "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2ODk0NDAwMF5BMl5BanBnXkFtZTcwNTM1MDc2Mw@@._V1_SX300.jpg"
    },
    {
      id: 66,
      project: "The Pianist",
      ref: "2002",
      mainCon: "150",
      closing: ["Biography", "Drama", "War"],
      status: "Roman Polanski",
      quoted: "Adrien Brody, Emilia Fox, Michal Zebrowski, Ed Stoppard",
      plot:
        "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTc4OTkyOTA3OF5BMl5BanBnXkFtZTYwMDIxNjk5._V1_SX300.jpg"
    },
    {
      id: 67,
      project: "Alive",
      ref: "1993",
      mainCon: "120",
      closing: ["Adventure", "Biography", "Drama"],
      status: "Frank Marshall",
      quoted: "Ethan Hawke, Vincent Spano, Josh Hamilton, Bruce Ramsay",
      plot:
        "Uruguayan rugby team stranded in the snow swept Andes are forced to use desperate measures to survive after a plane crash.",
      posterUrl: ""
    },
    {
      id: 68,
      project: "Casablanca",
      ref: "1942",
      mainCon: "102",
      closing: ["Drama", "Romance", "War"],
      status: "Michael Curtiz",
      quoted: "Humphrey Bogart, Ingrid Bergman, Paul Henreid, Claude Rains",
      plot:
        "In Casablanca, Morocco in December 1941, a cynical American expatriate meets a former lover, with unforeseen complications.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQwNDYyNTk2N15BMl5BanBnXkFtZTgwMjQ0OTMyMjE@._V1_SX300.jpg"
    },
    {
      id: 69,
      project: "American Gangster",
      ref: "2007",
      mainCon: "157",
      closing: ["Biography", "Crime", "Drama"],
      status: "Ridley Scott",
      quoted: "Denzel Washington, Russell Crowe, Chiwetel Ejiofor, Josh Brolin",
      plot:
        "In 1970s America, a detective works to bring down the drug empire of Frank Lucas, a heroin kingpin from Manhattan, who is smuggling the drug into the country from the Far East.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNzY5MDA5MV5BMl5BanBnXkFtZTcwMjg4MzI3MQ@@._V1_SX300.jpg"
    },
    {
      id: 70,
      project: "Catch Me If You Can",
      ref: "2002",
      mainCon: "141",
      closing: ["Biography", "Crime", "Drama"],
      status: "Steven Spielberg",
      quoted: "Leonardo DiCaprio, Tom Hanks, Christopher Walken, Martin Sheen",
      plot:
        "The true story of Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars' worth of checks as a Pan Am pilot, doctor, and legal prosecutor.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg"
    },
    {
      id: 71,
      project: "American History X",
      ref: "1998",
      mainCon: "119",
      closing: ["Crime", "Drama"],
      status: "Tony Kaye",
      quoted: "Edward Norton, Edward Furlong, Beverly D'Angelo, Jennifer Lien",
      plot:
        "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BZjA0MTM4MTQtNzY5MC00NzY3LWI1ZTgtYzcxMjkyMzU4MDZiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg"
    },
    {
      id: 72,
      project: "Casino",
      ref: "1995",
      mainCon: "178",
      closing: ["Biography", "Crime", "Drama"],
      status: "Martin Scorsese",
      quoted: "Robert De Niro, Sharon Stone, Joe Pesci, James Woods",
      plot:
        "Greed, deception, money, power, and murder occur between two best friends, a mafia underboss and a casino owner, for a trophy wife over a gambling empire.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    },
    {
      id: 73,
      project: "Pirates of the Caribbean: At World's End",
      ref: "2007",
      mainCon: "169",
      closing: ["Action", "Adventure", "Fantasy"],
      status: "Gore Verbinski",
      quoted: "Johnny Depp, Geoffrey Rush, Orlando Bloom, Keira Knightley",
      plot:
        "Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map, navigate treachery and betrayal, find Jack Sparrow, and make their final alliances for one last decisive battle.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_SX300.jpg"
    },
    {
      id: 74,
      project: "Pirates of the Caribbean: On Stranger Tides",
      ref: "2011",
      mainCon: "136",
      closing: ["Action", "Adventure", "Fantasy"],
      status: "Rob Marshall",
      quoted: "Johnny Depp, Penélope Cruz, Geoffrey Rush, Ian McShane",
      plot:
        "Jack Sparrow and Barbossa embark on a quest to find the elusive fountain of youth, only to discover that Blackbeard and his daughter are after it too.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_SX300.jpg"
    },
    {
      id: 75,
      project: "Crash",
      ref: "2004",
      mainCon: "112",
      closing: ["Crime", "Drama", "Thriller"],
      status: "Paul Haggis",
      quoted: "Karina Arroyave, Dato Bakhtadze, Sandra Bullock, Don Cheadle",
      plot:
        "Los Angeles citizens with vastly separate lives collide in interweaving stories of race, loss and redemption.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BOTk1OTA1MjIyNV5BMl5BanBnXkFtZTcwODQxMTkyMQ@@._V1_SX300.jpg"
    },
    {
      id: 76,
      project: "Pirates of the Caribbean: The Curse of the Black Pearl",
      ref: "2003",
      mainCon: "143",
      closing: ["Action", "Adventure", "Fantasy"],
      status: "Gore Verbinski",
      quoted: "Johnny Depp, Geoffrey Rush, Orlando Bloom, Keira Knightley",
      plot:
        "Blacksmith Will Turner teams up with eccentric pirate \"Captain\" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAyNDM4MTc2N15BMl5BanBnXkFtZTYwNDk0Mjc3._V1_SX300.jpg"
    },
    {
      id: 77,
      project: "The Lord of the Rings: The Return of the King",
      ref: "2003",
      mainCon: "201",
      closing: ["Action", "Adventure", "Drama"],
      status: "Peter Jackson",
      quoted: "Noel Appleby, Ali Astin, Sean Astin, David Aston",
      plot:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE4MjA1NTAyMV5BMl5BanBnXkFtZTcwNzM1NDQyMQ@@._V1_SX300.jpg"
    },
    {
      id: 78,
      project: "Oldboy",
      ref: "2003",
      mainCon: "120",
      closing: ["Drama", "Mystery", "Thriller"],
      status: "Chan-wook Park",
      quoted: "Min-sik Choi, Ji-tae Yu, Hye-jeong Kang, Dae-han Ji",
      plot:
        "After being kidnapped and imprisoned for 15 refs, Oh Dae-Su is released, only to find that he must find his captor in 5 days.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
    },
    {
      id: 79,
      project: "Chocolat",
      ref: "2000",
      mainCon: "121",
      closing: ["Drama", "Romance"],
      status: "Lasse Hallström",
      quoted:
        "Alfred Molina, Carrie-Anne Moss, Aurelien Parent Koenig, Antonio Gil",
      plot:
        "A woman and her daughter open a chocolate shop in a small French village that shakes up the rigid morality of the community.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4MDI3NTQwMV5BMl5BanBnXkFtZTcwNjIzNDcyMQ@@._V1_SX300.jpg"
    },
    {
      id: 80,
      project: "Casino Royale",
      ref: "2006",
      mainCon: "144",
      closing: ["Action", "Adventure", "Thriller"],
      status: "Martin Campbell",
      quoted: "Daniel Craig, Eva Green, Mads Mikkelsen, Judi Dench",
      plot:
        "Armed with a licence to kill, Secret Agent James Bond sets out on his first mission as 007 and must defeat a weapons dealer in a high stakes game of poker at Casino Royale, but things are not what they seem.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_SX300.jpg"
    },
    {
      id: 81,
      project: "WALL·E",
      ref: "2008",
      mainCon: "98",
      closing: ["Animation", "Adventure", "Family"],
      status: "Andrew Stanton",
      quoted: "Ben Burtt, Elissa Knight, Jeff Garlin, Fred Willard",
      plot:
        "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczOTA3MzY2N15BMl5BanBnXkFtZTcwOTYwNjE2MQ@@._V1_SX300.jpg"
    },
    {
      id: 82,
      project: "The Wolf of Wall Street",
      ref: "2013",
      mainCon: "180",
      closing: ["Biography", "Comedy", "Crime"],
      status: "Martin Scorsese",
      quoted: "Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey",
      plot:
        "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg"
    },
    {
      id: 83,
      project: "Hellboy II: The Golden Army",
      ref: "2008",
      mainCon: "120",
      closing: ["Action", "Adventure", "Fantasy"],
      status: "Guillermo del Toro",
      quoted: "Ron Perlman, Selma Blair, Doug Jones, John Alexander",
      plot:
        "The mythical world starts a rebellion against humanity in order to rule the Earth, so Hellboy and his team must save the world from the rebellious creatures.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5NzgyMjc2Nl5BMl5BanBnXkFtZTcwOTU3MDI3MQ@@._V1_SX300.jpg"
    },
    {
      id: 84,
      project: "Sunset Boulevard",
      ref: "1950",
      mainCon: "110",
      closing: ["Drama", "Film-Noir", "Romance"],
      status: "Billy Wilder",
      quoted: "William Holden, Gloria Swanson, Erich von Stroheim, Nancy Olson",
      plot:
        "A hack screenwriter writes a screenplay for a former silent-film star who has faded into Hollywood obscurity.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTc3NDYzODAwNV5BMl5BanBnXkFtZTgwODg1MTczMTE@._V1_SX300.jpg"
    },
    {
      id: 85,
      project: "I-See-You.Com",
      ref: "2006",
      mainCon: "92",
      closing: ["Comedy"],
      status: "Eric Steven Stahl",
      quoted: "Beau Bridges, Rosanna Arquette, Mathew Botuchis, Shiri Appleby",
      plot:
        "A 17-ref-old boy buys mini-cameras and displays the footage online at I-see-you.com. The cash rolls in as the site becomes a major hit. Everyone seems to have fun until it all comes crashing down....",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYwMDUzNzA5Nl5BMl5BanBnXkFtZTcwMjQ2Njk3MQ@@._V1_SX300.jpg"
    },
    {
      id: 86,
      project: "The Grand Budapest Hotel",
      ref: "2014",
      mainCon: "99",
      closing: ["Adventure", "Comedy", "Crime"],
      status: "Wes Anderson",
      quoted: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody",
      plot:
        "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
    },
    {
      id: 87,
      project: "The Hitchhiker's Guide to the Galaxy",
      ref: "2005",
      mainCon: "109",
      closing: ["Adventure", "Comedy", "Sci-Fi"],
      status: "Garth Jennings",
      quoted: "Bill Bailey, Anna Chancellor, Warwick Davis, Yasiin Bey",
      plot:
        'Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of "The Hitchhiker\'s Guide to the Galaxy."',
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjEwOTk4NjU2MF5BMl5BanBnXkFtZTYwMDA3NzI3._V1_SX300.jpg"
    },
    {
      id: 88,
      project: "Once Upon a Time in America",
      ref: "1984",
      mainCon: "229",
      closing: ["Crime", "Drama"],
      status: "Sergio Leone",
      quoted: "Robert De Niro, James Woods, Elizabeth McGovern, Joe Pesci",
      plot:
        "A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty refs later, where he once again must confront the ghosts and regrets of his old life.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMGFkNWI4MTMtNGQ0OC00MWVmLTk3MTktOGYxN2Y2YWVkZWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
      id: 89,
      project: "Oblivion",
      ref: "2013",
      mainCon: "124",
      closing: ["Action", "Adventure", "Mystery"],
      status: "Joseph Kosinski",
      quoted: "Tom Cruise, Morgan Freeman, Olga Kurylenko, Andrea Riseborough",
      plot:
        "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission and himself.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMDY0MTA4MF5BMl5BanBnXkFtZTcwNzI3MDgxOQ@@._V1_SX300.jpg"
    },
    {
      id: 90,
      project: "V for Vendetta",
      ref: "2005",
      mainCon: "132",
      closing: ["Action", "Drama", "Thriller"],
      status: "James McTeigue",
      quoted: "Natalie Portman, Hugo Weaving, Stephen Rea, Stephen Fry",
      plot:
        'In a future British tyranny, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow it with the help of a young woman.',
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg"
    },
    {
      id: 91,
      project: "Gattaca",
      ref: "1997",
      mainCon: "106",
      closing: ["Drama", "Sci-Fi", "Thriller"],
      status: "Andrew Niccol",
      quoted: "Ethan Hawke, Uma Thurman, Gore Vidal, Xander Berkeley",
      plot:
        "A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream of space travel.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDQxOTc0MzMtZmRlOS00OWQ5LWI2ZDctOTAwNmMwOTYxYzlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 92,
      project: "Silver Linings Playbook",
      ref: "2012",
      mainCon: "122",
      closing: ["Comedy", "Drama", "Romance"],
      status: "David O. Russell",
      quoted: "Bradley Cooper, Jennifer Lawrence, Robert De Niro, Jacki Weaver",
      plot:
        "After a stint in a mental institution, former teacher Pat Solitano moves back in with his parents and tries to reconcile with his ex-wife. Things get more challenging when Pat meets Tiffany, a mysterious girl with problems of her own.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MTI5NzA3MF5BMl5BanBnXkFtZTcwODExNTc0OA@@._V1_SX300.jpg"
    },
    {
      id: 93,
      project: "Alice in Wonderland",
      ref: "2010",
      mainCon: "108",
      closing: ["Adventure", "Family", "Fantasy"],
      status: "Tim Burton",
      quoted: "Johnny Depp, Mia Wasikowska, Helena Bonham Carter, Anne Hathaway",
      plot:
        "Nineteen-ref-old Alice returns to the magical world from her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwNjAxMTc0Nl5BMl5BanBnXkFtZTcwODc3ODk5Mg@@._V1_SX300.jpg"
    },
    {
      id: 94,
      project: "Gandhi",
      ref: "1982",
      mainCon: "191",
      closing: ["Biography", "Drama"],
      status: "Richard Attenborough",
      quoted: "Ben Kingsley, Candice Bergen, Edward Fox, John Gielgud",
      plot:
        "Gandhi's character is fully explained as a man of nonviolence. Through his patience, he is able to drive the British out of the subcontinent. And the stubborn nature of Jinnah and his commitment towards Pakistan is portrayed.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMzJiZDRmOWUtYjE2MS00Mjc1LTg1ZDYtNTQxYWJkZTg1OTM4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    },
    {
      id: 95,
      project: "Pacific Rim",
      ref: "2013",
      mainCon: "131",
      closing: ["Action", "Adventure", "Sci-Fi"],
      status: "Guillermo del Toro",
      quoted: "Charlie Hunnam, Diego Klattenhoff, Idris Elba, Rinko Kikuchi",
      plot:
        "As a war between humankind and monstrous sea creatures wages on, a former pilot and a trainee are paired up to drive a seemingly obsolete special weapon in a desperate effort to save the world from the apocalypse.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg"
    },
    {
      id: 96,
      project: "Kiss Kiss Bang Bang",
      ref: "2005",
      mainCon: "103",
      closing: ["Comedy", "Crime", "Mystery"],
      status: "Shane Black",
      quoted: "Robert Downey Jr., Val Kilmer, Michelle Monaghan, Corbin Bernsen",
      plot:
        "A murder mystery brings together a private eye, a struggling actress, and a thief masquerading as an actor.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTY5NDExMDA3M15BMl5BanBnXkFtZTYwNTc2MzA3._V1_SX300.jpg"
    },
    {
      id: 97,
      project: "The Quiet American",
      ref: "2002",
      mainCon: "101",
      closing: ["Drama", "Mystery", "Romance"],
      status: "Phillip Noyce",
      quoted: "Michael Caine, Brendan Fraser, Do Thi Hai Yen, Rade Serbedzija",
      plot:
        "An older British reporter vies with a young U.S. doctor for the affections of a beautiful Vietnamese woman.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjE2NTUxNTE3Nl5BMl5BanBnXkFtZTYwNTczMTg5._V1_SX300.jpg"
    },
    {
      id: 98,
      project: "Cloud Atlas",
      ref: "2012",
      mainCon: "172",
      closing: ["Drama", "Sci-Fi"],
      status: "Tom Tykwer, Lana Wachowski, Lilly Wachowski",
      quoted: "Tom Hanks, Halle Berry, Jim Broadbent, Hugo Weaving",
      plot:
        "An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczMTgxMjc4NF5BMl5BanBnXkFtZTcwNjM5MTA2OA@@._V1_SX300.jpg"
    },
    {
      id: 99,
      project: "The Impossible",
      ref: "2012",
      mainCon: "114",
      closing: ["Drama", "Thriller"],
      status: "J.A. Bayona",
      quoted: "Naomi Watts, Ewan McGregor, Tom Holland, Samuel Joslin",
      plot:
        "The story of a tourist family in Thailand caught in the destruction and chaotic aftermath of the 2004 Indian Ocean tsunami.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5NTA3NzQ5Nl5BMl5BanBnXkFtZTcwOTYxNjY0OA@@._V1_SX300.jpg"
    },
    {
      id: 100,
      project: "All Quiet on the Western Front",
      ref: "1930",
      mainCon: "136",
      closing: ["Drama", "War"],
      status: "Lewis Milestone",
      quoted: "Louis Wolheim, Lew Ayres, John Wray, Arnold Lucy",
      plot:
        "A young soldier faces profound disillusionment in the soul-destroying horror of World War I.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM5OTg2NDY1NF5BMl5BanBnXkFtZTcwNTQ4MTMwNw@@._V1_SX300.jpg"
    },
    {
      id: 101,
      project: "The English Patient",
      ref: "1996",
      mainCon: "162",
      closing: ["Drama", "Romance", "War"],
      status: "Anthony Minghella",
      quoted:
        "Ralph Fiennes, Juliette Binoche, Willem Dafoe, Kristin Scott Thomas",
      plot:
        "At the close of WWII, a young nurse tends to a badly-burned plane crash victim. His past is shown in flashbacks, revealing an involvement in a fateful love affair.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDg2OTcxNDE0OF5BMl5BanBnXkFtZTgwOTg2MDM0MDE@._V1_SX300.jpg"
    },
    {
      id: 102,
      project: "Dallas Buyers Club",
      ref: "2013",
      mainCon: "117",
      closing: ["Biography", "Drama"],
      status: "Jean-Marc Vallée",
      quoted: "Matthew McConaughey, Jennifer Garner, Jared Leto, Denis O'Hare",
      plot:
        "In 1985 Dallas, electrician and hustler Ron Woodroof works around the system to help AIDS patients get the medication they need after he is diagnosed with the disease.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYwMTA4MzgyNF5BMl5BanBnXkFtZTgwMjEyMjE0MDE@._V1_SX300.jpg"
    },
    {
      id: 103,
      project: "Frida",
      ref: "2002",
      mainCon: "123",
      closing: ["Biography", "Drama", "Romance"],
      status: "Julie Taymor",
      quoted: "Salma Hayek, Mía Maestro, Alfred Molina, Antonio Banderas",
      plot:
        "A biography of artist Frida Kahlo, who channeled the pain of a crippling injury and her tempestuous marriage into her work.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTMyODUyMDY1OV5BMl5BanBnXkFtZTYwMDA2OTU3._V1_SX300.jpg"
    },
    {
      id: 104,
      project: "Before Sunrise",
      ref: "1995",
      mainCon: "105",
      closing: ["Drama", "Romance"],
      status: "Richard Linklater",
      quoted: "Ethan Hawke, Julie Delpy, Andrea Eckert, Hanno Pöschl",
      plot:
        "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyMTM3MTQxMl5BMl5BanBnXkFtZTcwMDAzNjQ4Mg@@._V1_SX300.jpg"
    },
    {
      id: 105,
      project: "The Rum Diary",
      ref: "2011",
      mainCon: "120",
      closing: ["Comedy", "Drama"],
      status: "Bruce Robinson",
      quoted: "Johnny Depp, Aaron Eckhart, Michael Rispoli, Amber Heard",
      plot:
        "American journalist Paul Kemp takes on a freelance job in Puerto Rico for a local newspaper during the 1960s and struggles to find a balance between island culture and the expatriates who live there.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM5ODA4MjYxM15BMl5BanBnXkFtZTcwMTM3NTE5Ng@@._V1_SX300.jpg"
    },
    {
      id: 106,
      project: "The Last Samurai",
      ref: "2003",
      mainCon: "154",
      closing: ["Action", "Drama", "History"],
      status: "Edward Zwick",
      quoted: "Ken Watanabe, Tom Cruise, William Atherton, Chad Lindberg",
      plot:
        "An American military advisor embraces the Samurai culture he was hired to destroy after he is captured in battle.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMzkyNzQ1Mzc0NV5BMl5BanBnXkFtZTcwODg3MzUzMw@@._V1_SX300.jpg"
    },
    {
      id: 107,
      project: "Chinatown",
      ref: "1974",
      mainCon: "130",
      closing: ["Drama", "Mystery", "Thriller"],
      status: "Roman Polanski",
      quoted: "Jack Nicholson, Faye Dunaway, John Huston, Perry Lopez",
      plot:
        "A private detective hired to expose an adulterer finds himself caught up in a web of deceit, corruption and murder.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BN2YyNDE5NzItMjAwNC00MGQxLTllNjktZGIzMWFkZjA3OWQ0XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
      id: 108,
      project: "Calvary",
      ref: "2014",
      mainCon: "102",
      closing: ["Comedy", "Drama"],
      status: "John Michael McDonagh",
      quoted: "Brendan Gleeson, Chris O'Dowd, Kelly Reilly, Aidan Gillen",
      plot:
        "After he is threatened during a confession, a good-natured priest must battle the dark forces closing in around him.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc3MjQ1MjE2M15BMl5BanBnXkFtZTgwNTMzNjE4MTE@._V1_SX300.jpg"
    },
    {
      id: 109,
      project: "Before Sunset",
      ref: "2004",
      mainCon: "80",
      closing: ["Drama", "Romance"],
      status: "Richard Linklater",
      quoted: "Ethan Hawke, Julie Delpy, Vernon Dobtcheff, Louise Lemoine Torrès",
      plot:
        "Nine refs after Jesse and Celine first met, they encounter each other again on the French leg of Jesse's book tour.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_SX300.jpg"
    },
    {
      id: 110,
      project: "Spirited Away",
      ref: "2001",
      mainCon: "125",
      closing: ["Animation", "Adventure", "Family"],
      status: "Hayao Miyazaki",
      quoted: "Rumi Hiiragi, Miyu Irino, Mari Natsuki, Takashi Naitô",
      plot:
        "During her family's move to the suburbs, a sullen 10-ref-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjYxMDcyMzIzNl5BMl5BanBnXkFtZTYwNDg2MDU3._V1_SX300.jpg"
    },
    {
      id: 111,
      project: "Indochine",
      ref: "1992",
      mainCon: "159",
      closing: ["Drama", "Romance"],
      status: "Régis Wargnier",
      quoted: "Catherine Deneuve, Vincent Perez, Linh Dan Pham, Jean Yanne",
      plot:
        "This story is set in 1930, at the time when French colonial rule in Indochina is ending. A widowed French woman who works in the rubber fields, raises a Vietnamese princess as if she was ...",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1MTkzNzA3NF5BMl5BanBnXkFtZTYwNTI2MzU5._V1_SX300.jpg"
    },
    {
      id: 112,
      project: "Birdman or (The Unexpected Virtue of Ignorance)",
      ref: "2014",
      mainCon: "119",
      closing: ["Comedy", "Drama", "Romance"],
      status: "Alejandro G. Iñárritu",
      quoted: "Michael Keaton, Emma Stone, Kenny Chin, Jamahl Garrison-Lowe",
      plot:
        "Illustrated upon the progress of his latest Broadway play, a former popular actor's struggle to cope with his current life as a wasted actor is shown.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_SX300.jpg"
    },
    {
      id: 113,
      project: "Boyhood",
      ref: "2014",
      mainCon: "165",
      closing: ["Drama"],
      status: "Richard Linklater",
      quoted:
        "Ellar Coltrane, Patricia Arquette, Elijah Smith, Lorelei Linklater",
      plot: "The life of Mason, from early childhood to his arrival at college.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzNDc2MDc0N15BMl5BanBnXkFtZTgwOTcwMDQ5MTE@._V1_SX300.jpg"
    },
    {
      id: 114,
      project: "12 Angry Men",
      ref: "1957",
      mainCon: "96",
      closing: ["Crime", "Drama"],
      status: "Sidney Lumet",
      quoted: "Martin Balsam, John Fiedler, Lee J. Cobb, E.G. Marshall",
      plot:
        "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BODQwOTc5MDM2N15BMl5BanBnXkFtZTcwODQxNTEzNA@@._V1_SX300.jpg"
    },
    {
      id: 115,
      project: "The Imitation Game",
      ref: "2014",
      mainCon: "114",
      closing: ["Biography", "Drama", "Thriller"],
      status: "Morten Tyldum",
      quoted:
        "Benedict Cumberbatch, Keira Knightley, Matthew Goode, Rory Kinnear",
      plot:
        "During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDkwNTEyMzkzNl5BMl5BanBnXkFtZTgwNTAwNzk3MjE@._V1_SX300.jpg"
    },
    {
      id: 116,
      project: "Interstellar",
      ref: "2014",
      mainCon: "169",
      closing: ["Adventure", "Drama", "Sci-Fi"],
      status: "Christopher Nolan",
      quoted: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      plot:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg"
    },
    {
      id: 117,
      project: "Big Nothing",
      ref: "2006",
      mainCon: "86",
      closing: ["Comedy", "Crime", "Thriller"],
      status: "Jean-Baptiste Andrea",
      quoted: "David Schwimmer, Simon Pegg, Alice Eve, Natascha McElhone",
      plot:
        "A frustrated, unemployed teacher joining forces with a scammer and his girlfriend in a blackmailing scheme.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY5NTc2NjYwOV5BMl5BanBnXkFtZTcwMzk5OTY0MQ@@._V1_SX300.jpg"
    },
    {
      id: 118,
      project: "Das Boot",
      ref: "1981",
      mainCon: "149",
      closing: ["Adventure", "Drama", "Thriller"],
      status: "Wolfgang Petersen",
      quoted:
        "Jürgen Prochnow, Herbert Grönemeyer, Klaus Wennemann, Hubertus Bengsch",
      plot:
        "The claustrophobic world of a WWII German U-boat; boredom, filth, and sheer terror.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE5Mzk5OTQ0Nl5BMl5BanBnXkFtZTYwNzUwMTQ5._V1_SX300.jpg"
    },
    {
      id: 119,
      project: "Shrek 2",
      ref: "2004",
      mainCon: "93",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Andrew Adamson, Kelly Asbury, Conrad Vernon",
      quoted: "Mike Myers, Eddie Murphy, Cameron Diaz, Julie Andrews",
      plot:
        "Princess Fiona's parents invite her and Shrek to dinner to celebrate her marriage. If only they knew the newlyweds were both ogres.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MTMwNjI4M15BMl5BanBnXkFtZTcwMjExMzUyMQ@@._V1_SX300.jpg"
    },
    {
      id: 120,
      project: "Sin City",
      ref: "2005",
      mainCon: "124",
      closing: ["Crime", "Thriller"],
      status: "Frank Miller, Robert Rodriguez, Quentin Tarantino",
      quoted: "Jessica Alba, Devon Aoki, Alexis Bledel, Powers Boothe",
      plot:
        "A film that explores the dark and miserable town, Basin City, and tells the story of three different people, all caught up in violent corruption.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BODZmYjMwNzEtNzVhNC00ZTRmLTk2M2UtNzE1MTQ2ZDAxNjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      id: 121,
      project: "Nebraska",
      ref: "2013",
      mainCon: "115",
      closing: ["Adventure", "Comedy", "Drama"],
      status: "Alexander Payne",
      quoted: "Bruce Dern, Will Forte, June Squibb, Bob Odenkirk",
      plot:
        "An aging, booze-addled father makes the trip from Montana to Nebraska with his estranged son in order to claim a million-dollar Mega Sweepstakes Marketing prize.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU2Mjk2NDkyMl5BMl5BanBnXkFtZTgwNTk0NzcyMDE@._V1_SX300.jpg"
    },
    {
      id: 122,
      project: "Shrek",
      ref: "2001",
      mainCon: "90",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Andrew Adamson, Vicky Jenson",
      quoted: "Mike Myers, Eddie Murphy, Cameron Diaz, John Lithgow",
      plot:
        "After his swamp is filled with magical creatures, an ogre agrees to rescue a princess for a villainous lord in order to get his land back.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NTE1NTE0M15BMl5BanBnXkFtZTgwNjY4NTYxMTE@._V1_SX300.jpg"
    },
    {
      id: 123,
      project: "Mr. & Mrs. Smith",
      ref: "2005",
      mainCon: "120",
      closing: ["Action", "Comedy", "Crime"],
      status: "Doug Liman",
      quoted: "Brad Pitt, Angelina Jolie, Vince Vaughn, Adam Brody",
      plot:
        "A bored married couple is surprised to learn that they are both assassins hired by competing agencies to kill each other.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxMzcxNzQzOF5BMl5BanBnXkFtZTcwMzQxNjUyMw@@._V1_SX300.jpg"
    },
    {
      id: 124,
      project: "Original Sin",
      ref: "2001",
      mainCon: "116",
      closing: ["Drama", "Mystery", "Romance"],
      status: "Michael Cristofer",
      quoted: "Antonio Banderas, Angelina Jolie, Thomas Jane, Jack Thompson",
      plot:
        "A woman along with her lover, plan to con a rich man by marrying him and on earning his trust running away with all his money. Everything goes as planned until she actually begins to fall in love with him.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BODg3Mjg0MDY4M15BMl5BanBnXkFtZTcwNjY5MDQ2NA@@._V1_SX300.jpg"
    },
    {
      id: 125,
      project: "Shrek Forever After",
      ref: "2010",
      mainCon: "93",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Mike Mitchell",
      quoted: "Mike Myers, Eddie Murphy, Cameron Diaz, Antonio Banderas",
      plot:
        "Rumpelstiltskin tricks a mid-life crisis burdened Shrek into allowing himself to be erased from existence and cast in a dark alternate timeline where Rumpel rules supreme.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_SX300.jpg"
    },
    {
      id: 126,
      project: "Before Midnight",
      ref: "2013",
      mainCon: "109",
      closing: ["Drama", "Romance"],
      status: "Richard Linklater",
      quoted:
        "Ethan Hawke, Julie Delpy, Seamus Davey-Fitzpatrick, Jennifer Prior",
      plot:
        "We meet Jesse and Celine nine refs on in Greece. Almost two decades have passed since their first meeting on that train bound for Vienna.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjA5NzgxODE2NF5BMl5BanBnXkFtZTcwNTI1NTI0OQ@@._V1_SX300.jpg"
    },
    {
      id: 127,
      project: "Despicable Me",
      ref: "2010",
      mainCon: "95",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Pierre Coffin, Chris Renaud",
      quoted: "Steve Carell, Jason Segel, Russell Brand, Julie Andrews",
      plot:
        "When a criminal mastermind uses a trio of orphan girls as pawns for a grand scheme, he finds their love is profoundly changing him for the better.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_SX300.jpg"
    },
    {
      id: 128,
      project: "Troy",
      ref: "2004",
      mainCon: "163",
      closing: ["Adventure"],
      status: "Wolfgang Petersen",
      quoted: "Julian Glover, Brian Cox, Nathan Jones, Adoni Maropis",
      plot:
        "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTk5MzU1MDMwMF5BMl5BanBnXkFtZTcwNjczODMzMw@@._V1_SX300.jpg"
    },
    {
      id: 129,
      project: "The Hobbit: An Unexpected Journey",
      ref: "2012",
      mainCon: "169",
      closing: ["Adventure", "Fantasy"],
      status: "Peter Jackson",
      quoted: "Ian McKellen, Martin Freeman, Richard Armitage, Ken Stott",
      plot:
        "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg"
    },
    {
      id: 130,
      project: "The Great Gatsby",
      ref: "2013",
      mainCon: "143",
      closing: ["Drama", "Romance"],
      status: "Baz Luhrmann",
      quoted: "Lisa Adam, Frank Aldridge, Amitabh Bachchan, Steve Bisley",
      plot:
        "A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_SX300.jpg"
    },
    {
      id: 131,
      project: "Ice Age",
      ref: "2002",
      mainCon: "81",
      closing: ["Animation", "Adventure", "Comedy"],
      status: "Chris Wedge, Carlos Saldanha",
      quoted: "Ray Romano, John Leguizamo, Denis Leary, Goran Visnjic",
      plot:
        "Set during the Ice Age, a sabertooth tiger, a sloth, and a wooly mammoth find a lost human infant, and they try to return him to his tribe.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNzI1ODA0MF5BMl5BanBnXkFtZTYwODIxODY3._V1_SX300.jpg"
    },
    {
      id: 132,
      project: "The Lord of the Rings: The Fellowship of the Ring",
      ref: "2001",
      mainCon: "178",
      closing: ["Action", "Adventure", "Drama"],
      status: "Peter Jackson",
      quoted: "Alan Howard, Noel Appleby, Sean Astin, Sala Baker",
      plot:
        "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle Earth from the Dark Lord Sauron.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNTEyMjAwMDU1OV5BMl5BanBnXkFtZTcwNDQyNTkxMw@@._V1_SX300.jpg"
    },
    {
      id: 133,
      project: "The Lord of the Rings: The Two Towers",
      ref: "2002",
      mainCon: "179",
      closing: ["Action", "Adventure", "Drama"],
      status: "Peter Jackson",
      quoted: "Bruce Allpress, Sean Astin, John Bach, Sala Baker",
      plot:
        "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyNDU0NjY4NTheQTJeQWpwZ15BbWU2MDk4MTY2Nw@@._V1_SX300.jpg"
    },
    {
      id: 134,
      project: "Ex Machina",
      ref: "2015",
      mainCon: "108",
      closing: ["Drama", "Mystery", "Sci-Fi"],
      status: "Alex Garland",
      quoted: "Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander",
      plot:
        "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg"
    },
    {
      id: 135,
      project: "The Theory of Everything",
      ref: "2014",
      mainCon: "123",
      closing: ["Biography", "Drama", "Romance"],
      status: "James Marsh",
      quoted: "Eddie Redmayne, Felicity Jones, Tom Prior, Sophie Perry",
      plot:
        "A look at the relationship between the famous physicist Stephen Hawking and his wife.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg"
    },
    {
      id: 136,
      project: "Shogun",
      ref: "1980",
      mainCon: "60",
      closing: ["Adventure", "Drama", "History"],
      status: "N/A",
      quoted: "Richard Chamberlain, Toshirô Mifune, Yôko Shimada, Furankî Sakai",
      plot:
        "A English navigator becomes both a player and pawn in the complex political games in feudal Japan.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1ODI4NzYxMl5BMl5BanBnXkFtZTcwNDA4MzUxMQ@@._V1_SX300.jpg"
    },
    {
      id: 137,
      project: "Spotlight",
      ref: "2015",
      mainCon: "128",
      closing: ["Biography", "Crime", "Drama"],
      status: "Tom McCarthy",
      quoted: "Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber",
      plot:
        "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg"
    },
    {
      id: 138,
      project: "Vertigo",
      ref: "1958",
      mainCon: "128",
      closing: ["Mystery", "Romance", "Thriller"],
      status: "Alfred Hitchcock",
      quoted: "James Stewart, Kim Novak, Barbara Bel Geddes, Tom Helmore",
      plot:
        "A San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's wife, all the while becoming dangerously obsessed with her.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BNzY0NzQyNzQzOF5BMl5BanBnXkFtZTcwMTgwNTk4OQ@@._V1_SX300.jpg"
    },
    {
      id: 139,
      project: "Whiplash",
      ref: "2014",
      mainCon: "107",
      closing: ["Drama", "Music"],
      status: "Damien Chazelle",
      quoted: "Miles Teller, J.K. Simmons, Paul Reiser, Melissa Benoist",
      plot:
        "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4OTQ3MDUyMV5BMl5BanBnXkFtZTgwOTA2MjU0MjE@._V1_SX300.jpg"
    },
    {
      id: 140,
      project: "The Lives of Others",
      ref: "2006",
      mainCon: "137",
      closing: ["Drama", "Thriller"],
      status: "Florian Henckel von Donnersmarck",
      quoted: "Martina Gedeck, Ulrich Mühe, Sebastian Koch, Ulrich Tukur",
      plot:
        "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_SX300.jpg"
    },
    {
      id: 141,
      project: "Hotel Rwanda",
      ref: "2004",
      mainCon: "121",
      closing: ["Drama", "History", "War"],
      status: "Terry George",
      quoted: "Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim",
      plot:
        "Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg"
    },
    {
      id: 142,
      project: "The Martian",
      ref: "2015",
      mainCon: "144",
      closing: ["Adventure", "Drama", "Sci-Fi"],
      status: "Ridley Scott",
      quoted: "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",
      plot:
        "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg"
    },
    {
      id: 143,
      project: "To Kill a Mockingbird",
      ref: "1962",
      mainCon: "129",
      closing: ["Crime", "Drama"],
      status: "Robert Mulligan",
      quoted: "Gregory Peck, John Megna, Frank Overton, Rosemary Murphy",
      plot:
        "Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg"
    },
    {
      id: 144,
      project: "The Hateful Eight",
      ref: "2015",
      mainCon: "187",
      closing: ["Crime", "Drama", "Mystery"],
      status: "Quentin Tarantino",
      quoted:
        "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins",
      plot:
        "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg"
    },
    {
      id: 145,
      project: "A Separation",
      ref: "2011",
      mainCon: "123",
      closing: ["Drama", "Mystery"],
      status: "Asghar Farhadi",
      quoted: "Peyman Moaadi, Leila Hatami, Sareh Bayat, Shahab Hosseini",
      plot:
        "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
      posterUrl:
        "http://ia.media-imdb.com/images/M/MV5BMTYzMzU4NDUwOF5BMl5BanBnXkFtZTcwMTM5MjA5Ng@@._V1_SX300.jpg"
    },
    {
      id: 146,
      project: "The Big Short",
      ref: "2015",
      mainCon: "130",
      closing: ["Biography", "Comedy", "Drama"],
      status: "Adam McKay",
      quoted: "Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert",
      plot:
        "Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    }
  ];
  