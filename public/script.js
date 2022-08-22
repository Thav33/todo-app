
const deleteTodoList = function () {

    console.log(`delete button clicked`)

    // This is an event handler on delete icons:
    const deleteIcon = this;

    // Go up to the <li> containing the delete icon:
    const listItem = deleteIcon.parentNode;

    // Then back down to the <span> text:
    const textSpan = listItem.childNodes[0];

    // Then take the text out of the <span> -- Get the string out of the span.
    const itemText = textSpan.innerText;

    fetch('/deleteItem', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'todoTextFromJS' : itemText
        })
    })
    .then((res) => {
        return res.text()
    })
    .then((result) => {
        console.log('Result from server: ', result);
        // Refresh the page:
        location.reload();
    })
    .catch((error) => {
        console.log(`ERROR MESSAGE: ${error}`)
    })

}


const deleteBtn = document.querySelectorAll('.fa-trash-alt')

Array.from(deleteBtn).forEach((elem) => {
    elem.addEventListener('click', deleteTodoList)
})
