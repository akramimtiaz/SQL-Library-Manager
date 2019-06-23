/*This variable stores the current list of students, initialized to the entire list at first
however will change once search functionality is used.*/
let currentList = listOfBooks;
let paginationDiv

if(currentList.length > 0){   
   //creation of the pagination div and attachment to the containing page div
   paginationDiv = document.createElement('div');
   paginationDiv.className = "pagination";
   pageDiv.appendChild(paginationDiv);

   //creation of pagination menu
   appendPageLinks(currentList);

   /*event listener for pagination menu. On click, 
   show the page that was selected and set the selected link to the active status.*/
   paginationDiv.addEventListener('click', (e) => {
      if(e.target.tagName === 'A'){
         const pageSelected = e.target.textContent; 
         e.preventDefault();
         showPage(parseInt(pageSelected), currentList);
         updateActiveLink(pageSelected);
      }
   });
}