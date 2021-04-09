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
  //sort is ordering the numbers in the array from biggest to smallest
  //slice is starting at the first number (index 0) and taking returning the first 5 indexes
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
  return getTopFive(topGenres);
}


function getMostPopularBooks(books) {
  const borrowCount = [];
  books.forEach(book => {
    let count = book.borrows.length;
    let name = book.title;
    borrowCount.push({ name, count });
  });
  return getTopFive(borrowCount);
}


function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map(author => {
    const { first, last } = author.name;
    const name = `${first} ${last}`;
    const authorId = author.id;

    let count = books.reduce((acc, book) => {
      if (authorId === book.authorId) {
        acc += book.borrows.length;
      }
      return acc;
    }, 0)

    return { name, count };
  });

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
