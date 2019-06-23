
//key elements within the page
const pageDiv        = document.querySelector('body');
const listOfBooks = document.querySelectorAll('tbody tr');
const pageHeader     = document.querySelector('.page-header');

/*appends html elements from left to right. e.g. appendElements([h1, div, body])
h1 ---APPENDED-TO--- div ---APPENDED-TO--- body*/
 const appendElements = (elements) => {
    for(let i=0; i<elements.length-1; i++){
       elements[i+1].appendChild(elements[i]);
    }
 }

//Creates a pagination menu
const appendPageLinks = (bookList) => {

   //removes UL elem within Pagination Div if it exists - allows us to reconstruct the pagination menu as the user performs search.
    const pagination = document.querySelector('.pagination');
    if(pagination.hasChildNodes() === true){
       pagination.removeChild(pagination.firstElementChild);
    }
    
    //creation of new UL element - used to contain page links
    const paginationList = document.createElement('ul');
    //determines number of page links required for pagination menu.
    const pages = Math.ceil(bookList.length/10);
    
    //creates appropriate number of page links and appends them to the newly created UL element
    for(let i=1; i<=pages; i++){
       const pageItem = document.createElement('li');
       const a = document.createElement('a');
 
       a.textContent = i;
       a.href = "#";
       //assigns the class of active to the 1st page link
       i === 1 ? a.className="active" : a.className="";
 
       appendElements([a, pageItem, paginationList]);
    }

    //UL element attached to Pagination container div
    pagination.appendChild(paginationList);
    //requests the 1st page of the current list to be shown
    showPage(1, currentList);
 }
 
 /*Display students associated with the Page Number selected, achieved using the student's array index
 E.g. 24th Student => Array Index [23]. (23+1)/10 => 2.4, ROUND UP (2.4) => 3. 
 Therefore, 24th Student => 3rd page */
 const showPage = (selectedPage, bookList) => {
    
    for(let i=0; i<bookList.length; i++){
       //determine the student's associated page number
       const bookLocation = Math.ceil((i+1)/10);
       //only show those student's whose associated page number match the page link selected.
       if ( bookLocation === selectedPage ) {
             bookList[i].style.display = '';
       }else{
             bookList[i].style.display = 'none';
       }
    }
 }

 //Adds the 'active' class to the page link selected so it is highlighted via CSS.
 const updateActiveLink = (pageSelected) => {
    
    //obtain all LI elements within Pagination UL 
    const paginationList = paginationDiv.firstElementChild;
    const pages = paginationList.children; 

    for(let i=0; i<pages.length; i++){
       //obtain the A element within the LI element
       const page = pages[i].firstElementChild;
       //Add the 'active' class exclusively to the link that matches the selected page
       if(page.textContent === pageSelected){
          page.className = 'active';
       }else{
          page.className = '';
       }
    }
 }




