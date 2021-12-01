# employee-directory
 An employee directory using random data from a public API.

1. Toggling Employee Modals

 1.1 The Index Variable
 The index variable has a global scope and tracks which employee's data will be inserted into the modal. When an employee card is clicked, the index variable is assigned the index for that card which corresponds to the index of that employee's data in the JSON results. This way, whenever a card is clicked, a new modal is created and added to the DOM with the correct employee information.

 1.2 Next / Previous (see lines 143 - 154)
 When a modal is created, event listeners are also generated for the next/prev buttons. When one is clicked, the index variable is either increased or decreased by one respectively. The existing modal is removed from the DOM and a new one is created using the updated index. 

 1.3 End of List (see lines 130 - 131)
 When a user is toggling through employees with the modal open and reach either the beginning or end of the list, the appropriate button is prevented from displaying. This is accomplished by checking whether the index is equal to 0 or 11 using a ternary operator. 


2. Search

 2.1 Incremental Attribute (see line 8)
 When the search input is created it is assigned the incremental attribute. This ensures that whenever a user interacts with the search field, whether by typing, pressing return, or pasting text, the event will fire.

 2.2 Submit Button Removed
 Because the event fires when a user pastes text using a mouse, the search submit button was obsolete and therefore removed from the project.

 2.3 Search Error
 An error message is appended to the document and shown whenever a user's search yields no matches to any employees.


3. Styling

 3.1 Changes
 The following minor changes have been made to the CSS:
  -> .modal-btn-container: changed background and border colors
  ->            #no-match: rule added for the search error message
  ->                 body: changed background color
  ->                .card: changed background color
  ->           .card-name: changed color
  ->           .card-text: changed color
  ->          .card:hover: changed background color
  ->     .card-text:hover: removed rule
  ->               .modal: changed background and border colors
  ->          .modal-name: changed color
  ->          .modal-text: cahnged color
  ->            btn:hover: changed background color