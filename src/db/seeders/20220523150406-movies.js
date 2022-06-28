'use strict';
const {randMovie, randPhrase, rand, randNumber} = require('@ngneat/falso')
const axios = require('axios')

module.exports = {
  async up (queryInterface, Sequelize) {
    let { data: respuesta } = await axios("https://api.themoviedb.org/3/movie/popular?api_key=7be72508776961f3948639fbd796bccd");
    let films = respuesta.results;
    let movies = []
    films.forEach(element => 
      movies.push({
        name: element.title,
        description: element.overview,
        image: element.poster_path,
        platform: rand(['netflix', 'amazon', 'HBO']),
        createdAt: new Date,
        updatedAt: new Date
      })
    )
    await queryInterface.bulkInsert('movies', movies, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  }
};
