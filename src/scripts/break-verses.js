

export function breakVerses(){
    const verses = document.querySelectorAll('.v')

    verses.forEach(verse => {
        verse.innerHTML = `</br>${verse.innerHTML}.`
    })
}