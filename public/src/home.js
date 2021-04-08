function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc += 1;
    }
    return acc;
  }, 0)
}

function getTopFive(array) {
  return array.sort((indexA, indexB) => indexB.count - indexA.count).slice(0, 5)
}


function getMostCommonGenres(books) {
  const genreCount = {};
  books.forEach(book => {
    const genre = book.genre;
    if (!genreCount[genre]) {
      genreCount[genre] = 1;
    } else {
      genreCount[genre] += 1;
    }
  });
  const topGenres = [];
  for (const key in genreCount) {
    topGenres.push({ name: key, count: genreCount[key] })
  }
  //return topGenres.sort((genreA, genreB) => genreB.count - genreA.count).slice(0, 5)
  return getTopFive(topGenres);
}


function getMostPopularBooks(books) {
  const borrowCount = [];
  books.forEach(book => {
    let count = book.borrows.length;
    let name = book.title;
    borrowCount.push({ name, count });
  });
  //return borrowCount.sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
  return getTopFive(borrowCount);
}


function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map(author => {
    const { first, last } = author.name;
    let name = `${first} ${last}`;
    const authorId = author.id;

    let count = books.reduce((acc, book) => {
      if (authorId === book.authorId) {
        acc += book.borrows.length;
      }
      return acc;
    }, 0)

    return { name, count };
  });

  //return popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
  return getTopFive(popularAuthors);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
