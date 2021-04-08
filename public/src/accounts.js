function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}


//It returns a NUMBER that represents the number of times the account's ID
// appears in any book's `borrow` array.
function getTotalNumberOfBorrows(account, books) {
  //account is an object, books is an array of objects
  const patronId = account.id; //variable for simplicity
  let count = 0; //to keep track of the number of borrows found

  books.forEach((book) => {
    const borrows = book.borrows;

    count = borrows.reduce((acc, borrow) => {
      if (borrow.id === patronId) {
        return acc + 1;
      }
      return acc;
    }, count);
  });

  return count;
}


/*It returns an array of books and authors that represents all books CURRENTLY
CHECKED OUT by the given account. AUTHOR OBJECT IS EMBEDDED INSIDE BOOK OBJECT
*/
function getBooksPossessedByAccount(account, books, authors) {
  //account is an object, books is an array of objects, authors is an array of objects
  const patronId = account.id; //variable for simplicity
  const patronCheckedOutBooks = []; //set variable to empty array

  books.forEach((book) => {
    const borrows = book.borrows;

    const isCheckedOutByPatron = borrows.some((borrow) => borrow.id === patronId && !borrow.returned);
    if (!isCheckedOutByPatron) {
      return;
    }

    book.author = authors.find((author) => author.id === book.authorId);
    patronCheckedOutBooks.push(book);
  });

  //console.log(patronCheckedOutBooks);
  return patronCheckedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
