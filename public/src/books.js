//It returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//It returns the book object that has the matching ID.
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

/*It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains books THAT HAVE BEEN LOANS OUT, AND NOT RETURNED while the second array contains books THAT HAVE BEEN RETURNED.
You can check for the return status by looking at the first transaction in the `borrows` array. */
function partitionBooksByBorrowedStatus(books) {
  const notReturned = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
  return [notReturned, returned];
}

/*It should return an array of all the transactions from the book's `borrows` key. However, each transaction should include the related
  account information and the `returned` key. */
function getBorrowersForBook(book, accounts) {

  const borrows = book.borrows;
  //const updateAccount = {};
  // borrows.forEach(borrow => {
  //   const foundAccount = (accounts.find((account) => account.id === borrow.id));
  //   updateAccount[borrow.id] = { ...foundAccount, ...borrow };
  // });
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
