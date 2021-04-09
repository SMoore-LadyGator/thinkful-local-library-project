//It returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}


//It returns the book object that has the matching ID.
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  //checking if index 0 equals false as borrows is overed by most recent activity
  const notReturned = books.filter((book) => !book.borrows[0].returned);
  //not returned meaning currently checked out by a patron
  const returned = books.filter((book) => book.borrows[0].returned);
  return [notReturned, returned];
}



function getBorrowersForBook(book, accounts) {

  const borrows = book.borrows;
  return borrows.map((borrow) => {
    const foundAccount = (accounts.find((account) => account.id === borrow.id));
    return { ...foundAccount, ...borrow };
  }).slice(0, 10);
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
