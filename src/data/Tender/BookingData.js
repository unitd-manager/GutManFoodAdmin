import React from "react";
// import * as Icon from 'react-feather';

export const columns = [
    {
      name: "#",
      selector: "id",
      sortable: true,
      grow:0,
      width:'max-content',
      wrap: true
    },
    {
        name: "",
        selector: "edit",
        sortable: true,
        grow:0,
        width:'auto',
    },
    {
      name: "Date",
      selector: "name",
      sortable: true,
      width:'auto',
      wrap: true,
    },
    {
      name: "Assign Time",
      selector: "email",
      sortable: true,
      cell: d => <span>{d.Category.join(", ")}</span>
    },
    {
      name: "Customer Name",
      selector: "status",
      sortable: true
    },
    {
        name: "Employee Name",
        selector: "phone",
        sortable: true,
        cell: d => <span>{d.Category.join(", ")}</span>
      },
    {
      name: "Address",
      selector: "phone",
      sortable: true,
      cell: d => <span>{d.Category.join(", ")}</span>
    },
  ];
  
  export const data = [
    {
      id: 1,
      name:"renuka",
      email: "Beetlejuice",
      status: "1988",
      phone: "92",
      Category: ["Comedy", "Fantasy"],
      Status: "Tim Burton",
    },
    {
      id: 2,
      email: "The Cotton Club",
      status: "1984",
      phone: "127",
      Category: ["Crime", "Drama", "Music"],
      Status: "Francis Ford Coppola",
    },
    {
      id: 3,
      email: "The Shawshank Redemption",
      status: "1994",
      phone: "142",
      Category: ["Crime", "Drama"],
      Status: "Frank Darabont",
    },
    {
      id: 4,
      email: "Crocodile Dundee",
      status: "1986",
      phone: "97",
      Category: ["Adventure", "Comedy"],
      Status: "Peter Faiman",
    },
    {
      id: 5,
      email: "Valkyrie",
      status: "2008",
      phone: "121",
      Category: ["Drama", "History", "Thriller"],
      Status: "Bryan Singer",
    },
    {
      id: 6,
      email: "Ratatouille",
      status: "2007",
      phone: "111",
      Category: ["Animation", "Comedy", "Family"],
      Status: "Brad Bird, Jan Pinkava",
    },
    {
      id: 7,
      email: "City of God",
      status: "2002",
      phone: "130",
      Category: ["Crime", "Drama"],
      Status: "Fernando Meirelles, Kátia Lund",
    },
    {
      id: 8,
      email: "Memento",
      status: "2000",
      phone: "113",
      Category: ["Mystery", "Thriller"],
      Status: "Christopher Nolan",
    },
    {
      id: 9,
      email: "The Intouchables",
      status: "2011",
      phone: "112",
      Category: ["Biography", "Comedy", "Drama"],
      Status: "Olivier Nakache, Eric Toledano",
    },
    {
      id: 10,
      email: "Stardust",
      status: "2007",
      phone: "127",
      Category: ["Adventure", "Family", "Fantasy"],
      Status: "Matthew Vaughn",
    },
    {
      id: 11,
      email: "Apocalypto",
      status: "2006",
      phone: "139",
      Category: ["Action", "Adventure", "Drama"],
      Status: "Mel Gibson",
    },
    {
      id: 12,
      email: "Taxi Driver",
      status: "1976",
      phone: "113",
      Category: ["Crime", "Drama"],
      Status: "Martin Scorsese",
    },
    {
      id: 13,
      email: "No Country for Old Men",
      status: "2007",
      phone: "122",
      Category: ["Crime", "Drama", "Thriller"],
      Status: "Ethan Coen, Joel Coen",
    },
    {
      id: 14,
      email: "Planet 51",
      status: "2009",
      phone: "91",
      Category: ["Animation", "Adventure", "Comedy"],
      Status: "Jorge Blanco, Javier Abad, Marcos Martínez",
    },
    {
      id: 15,
      email: "Looper",
      status: "2012",
      phone: "119",
      Category: ["Action", "Crime", "Drama"],
      Status: "Rian Johnson",
    },
  ];
  