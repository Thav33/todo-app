
const deleteBtn = document.querySelector('.fa-trash-alt')


Array.from(deleteBtn).forEach((elem) => {
    elem.addEventListener('click', deleteTodoList)
})

const deleteTodoList = () => {

    console.log(`delete button clicked`)
    const itemText = this.parentNode.childNodes[1].innerText

    fetch('/deleteItem', {
        method: 'delete',
        headers: {'Content-Type': 'application/javascript'},
        body: JSON.stringify({
            'todoTextFromJS' : itemText
        })
    })
    .then((res) => {
        return res.text()
    })
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(`ERROR MESSAGE: ${error}`)
    })

}
